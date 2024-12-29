<?php

namespace App\Http\Controllers\Api;

use App\Models\Blog;
use App\Models\BlogContent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function blog($sortby = null, $sort = null, $show = null, $page = null) {
        // Mengambil semua data blog dengan urutan berdasarkan ID secara menurun
        if (!$sortby) {
            $sortby = 'id';
        }

        if ($sort == 'asc' OR $sort != 'desc') {
            $sort = 'asc';
        } else if ($sort == 'desc') {
            $sort = 'desc';
        }

        if (!$show AND !$page) {

            $blogs = Blog::orderBy($sortby , $sort)->get();

            if ($blogs->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan!',
                ], 404);
            }    

            return new BlogResource(true, 'Daftar Blog', $blogs);

        } else if ($show AND $page) {
            $blogs = Blog::orderBy($sortby , $sort)->paginate($show, ['*'], 'page', $page);

            if ($blogs->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan!',
                ], 404);
            }
            
            $blog = $blogs->toArray();
            
            $url = 'api/blog/read/' . $sortby . '/' . $sort . '/';
            $blog['first_page_url'] = url($url . $show . '/1');
            $blog['prev_page_url'] = $blog['prev_page_url'] ?? null;
            $blog['next_page_url'] = $blog['next_page_url'] ?? null;
            $blog['last_page_url'] = url($url . $show . '/' . $blog['last_page']);

            if ($blog['prev_page_url']) {
            $blog['prev_page_url'] = url($url . $show . '/' . ($page - 1));
            }

            if ($blog['next_page_url']) {
            $blog['next_page_url'] = url($url . $show . '/' . ($page + 1));
            }

            // Menyesuaikan URL pada setiap link pagination
            foreach ($blog['links'] as &$link) {
                if ($link['url']) {
                    $pageNumber = explode('page=', $link['url'])[1];
                    $link['url'] = url($url . $show . '/' . $pageNumber);
                }
            }

            return new BlogResource(true, 'Daftar Blog', $blog);
        }
    }

    public function blogDetail($title = null) {

        $blog = Blog::where('title', $title)->first();
        
        if ($blog->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }
        
        return new BlogResource(true, "Blog Detail", $blog);
    }

    public function BlogStore(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'title'        => 'required',
            'author'        => 'required',
            'thumbnail'      => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Initialize variable for image path
        $imagePath = null;
    
        // Check if an image was uploaded
        if ($request->hasFile('thumbnail')) {
            // Upload and convert the image to WebP
            $images = $request->file('thumbnail');
            $imageName = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/blog/') . $imageName;
    
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
            $imagePath = '/images/blog/' . $imageName;
        }
    
        // Create post with the full path stored in the database
        $blog = Blog::create([
            'title'         => $request->title,
            'author'  => $request->author,
            'thumbnail'       => $imagePath, // Simpan path lengkap ke dalam database
            'content'  => $request->content,
        ]);
    
        // Return response
        return new BlogResource(true, 'Data Berhasil Ditambahkan!', $blog);
    }

    public function BlogUpdate(Request $request, $id)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'title'        => 'required',
            'author'        => 'required',
            'thumbnail'      => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Find the project by ID
        $blog = Blog::find($id);
    
        if (!$blog) {
            return response()->json(['error' => 'Project not found'], 404);
        }
    
        // If a new image is uploaded, handle the upload
        if ($request->hasFile('thumbnail')) {

            if ($blog->thumbnail) {
                $oldImagePath = public_path($blog->thumbnail);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Upload and convert the image to WebP
            $images = $request->file('thumbnail');
            $imageName = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/blog/') . $imageName;
    
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
             $blog->thumbnail = '/images/blog/' . $imageName;
        }
    
        // Update the other fields
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->content = $request->content;
    
        // Save the updated project
        $blog->save();
    
        // Return response
        return new BlogResource(true, 'Data Berhasil Diperbarui!', $blog);
    }

    public function BlogDestroy($id)
    {
        // Temukan service berdasarkan ID
        $blog = Blog::find($id);

        // Cek apakah project ditemukan
        if (!$blog) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        // Hapus file gambar jika ada
        if ($blog->thumbnail) {
            $imagePath = public_path($blog->thumbnail);
            if (file_exists($imagePath)) {
                unlink($imagePath); // Hapus file gambar
            }
        }

        // Hapus project dari database
        $blog->delete();

        // Kembalikan respons berhasil
        return new BlogResource(true, 'Data Berhasil Dihapus!', null);
    }
    
    
}
