<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Events\ProjectChanged;
use Pusher\Pusher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * index
     *
     */
    public function index($sort = null, $show = null, $page = null)
{
    // Penentuan sorting
    $sort = ($sort == 'asc' OR $sort != 'desc') ? 'asc' : 'desc';

    if (!$show && !$page) {
        $project = Project::orderBy('id', $sort)->get();
        
        if ($project->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }
        // Broadcast event ke semua listener
        event(new ProjectChanged($project, 'created')); 
        return new ProjectResource(true, 'Project', $project);
    } else {
        $projects = Project::orderBy('id', $sort)->paginate($show, ['*'], 'page', $page);
        if ($projects->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }
        $project = $projects->toArray();

        // Menyesuaikan URL pagination
        $project['first_page_url'] = url('/api/project/read/' . $sort . '/' . $show . '/1');
        $project['prev_page_url'] = $project['prev_page_url'] ?? null;
        $project['next_page_url'] = $project['next_page_url'] ?? null;
        $project['last_page_url'] = url('/api/project/read/' . $sort . '/' . $show . '/' . $project['last_page']);

        if ($project['prev_page_url']) {
            $project['prev_page_url'] = url('/api/project/read/' . $sort . '/' . $show . '/' . ($page - 1));
        }

        if ($project['next_page_url']) {
            $project['next_page_url'] = url('/api/project/read/' . $sort . '/' . $show . '/' . ($page + 1));
        }

        // Menyesuaikan URL pada setiap link pagination
        foreach ($project['links'] as &$link) {
            if ($link['url']) {
                $pageNumber = explode('page=', $link['url'])[1];
                $link['url'] = url('/api/project/read/' . $sort . '/' . $show . '/' . $pageNumber);
            }
        }

        // Broadcast event ke semua listener
        event(new ProjectChanged($project, 'created'));
        return new ProjectResource(true, 'Project', $project);
    }
}



    public function ProjectShowByName($name)
    {
        $project = Project::where('name', $name)->orderBy('id', 'desc')->get();

        if ($project->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Project Details',
            'data' => $project,
        ]);
    }

    public function ProjectStore(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'        => 'required',
            'images'      => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'description' => 'required',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Initialize variable for image path
        $imagePath = null;
    
        // Check if an image was uploaded
        if ($request->hasFile('images')) {
            // Upload and convert the image to WebP
            $images = $request->file('images');
            $imageName = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/project/') . $imageName;
    
            // Load the image and convert to WebP
            $image = null;
            switch ($images->getClientOriginalExtension()) {
                case 'jpeg':
                case 'jpg':
                    $image = imagecreatefromjpeg($images->getPathname());
                    break;
                case 'png':
                    $image = imagecreatefrompng($images->getPathname());
                    break;
                case 'gif':
                    $image = imagecreatefromgif($images->getPathname());
                    break;
                case 'webp':
                    $image = imagecreatefromwebp($images->getPathname());
                    break;
                default:
                    return response()->json(['error' => 'Unsupported image type'], 422);
            }
    
            if ($image) {
                imagewebp($image, $imagePathOnDisk);
                imagedestroy($image);
            }
    
            // Set the image path
            $imagePath = '/images/project/' . $imageName;
        }
    
        // Create post with the full path stored in the database
        $project = Project::create([
            'name'         => $request->name,
            'images'       => $imagePath, // Simpan path lengkap ke dalam database
            'description'  => $request->description,
            'preview_link' => $request->preview_link,
            'github_link'  => $request->github_link,
        ]);
    
        event(new ProjectChanged($project, 'created'));
    
        // Return response
        return new ProjectResource(true, 'Data Berhasil Ditambahkan!', $project);
    }

    public function ProjectUpdate(Request $request, $id)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'        => 'sometimes|required',
            'images'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'description' => 'sometimes|required',
            'preview_link' => 'nullable|string',
            'github_link' => 'nullable|string',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Find the project by ID
        $project = Project::find($id);
    
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }
    
        // If a new image is uploaded, handle the upload
        if ($request->hasFile('images')) {
            // Delete the old image
            if ($project->images) {
                $oldImagePath = public_path($project->images);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
    
            // Upload and convert the new image to WebP
            $images = $request->file('images');
            $imageName = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/project/') . $imageName;
    
            // Load the image and convert to WebP
            $image = null;
            switch ($images->getClientOriginalExtension()) {
                case 'jpeg':
                case 'jpg':
                    $image = imagecreatefromjpeg($images->getPathname());
                    break;
                case 'png':
                    $image = imagecreatefrompng($images->getPathname());
                    break;
                case 'gif':
                    $image = imagecreatefromgif($images->getPathname());
                    break;
                case 'webp':
                    $image = imagecreatefromwebp($images->getPathname());
                    break;
                default:
                    return response()->json(['error' => 'Unsupported image type'], 422);
            }
    
            if ($image) {
                imagewebp($image, $imagePathOnDisk);
                imagedestroy($image);
            }
    
            // Update the image path in the database
            $project->images = '/images/project/' . $imageName;
        }
    
        // Only update the fields that are present in the request
        $project->fill($request->only([
            'name',
            'description',
            'preview_link',
            'github_link'
        ]));
    
        // Save the updated project
        $project->save();
    
        event(new ProjectChanged($project, 'updated'));
    
        // Return response
        return new ProjectResource(true, 'Data Berhasil Diperbarui!', $project);
    }   
    

    public function ProjectDestroy($id)
    {
        // Temukan service berdasarkan ID
        $project = Project::find($id);

        // Cek apakah project ditemukan
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($project->images) {
            $imagePath = public_path($project->images);
            if (file_exists($imagePath)) {
                unlink($imagePath); // Hapus file gambar
            }
        }

        // Hapus project dari database
        $project->delete();

        // Kembalikan respons berhasil
        return new ProjectResource(true, 'Data Berhasil Dihapus!', null);
    }
}
