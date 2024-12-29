<?php

namespace App\Http\Controllers\Api;

//import model Post
use App\Models\About;
use App\Models\Images;

use App\Http\Controllers\Controller;

//import resource PostResource
use App\Http\Resources\AboutResource;

//import Http request
use Illuminate\Http\Request;

//import facade Validator
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    /**
     * index
     *
     */
    public function index()
    {
        //get all posts
        $about = About::orderBy('id', 'asc')->get();

        //return collection of posts as a resource
        return new AboutResource(true, 'List Data About', $about);
    }


    public function AboutProfileImage() 
    {
        // Mencari berdasarkan category dan name
        $about = About::where('category', 'about-me')->where('name', 'profile image')->first();

        // Jika tidak ditemukan, kembalikan response error
        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }

        return new AboutResource(true, $about->name, $about->content);
    }

    public function AboutProfileImageUpdate(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'content' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Find the about record by category and name
        $about = About::where('category', 'about-me')->where('name', 'profile image')->first();

        if (!$about) {
            return response()->json(['error' => 'about not found'], 404);
        }

        // If a new image is uploaded, handle the upload
        if ($request->hasFile('content')) {
            // Delete the old image
            if ($about->content) {
                $oldImagePath = public_path($about->content);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Upload the new image
            $images = $request->file('content');
            $imagename = $images->hashName();
            $images->move(public_path('images/about'), $imagename);
            $about->content = '/images/about/' . $imagename;
        }

        // Save changes to the database
        $about->save();

        // Return response
        return new AboutResource(true, 'Data Berhasil Diperbarui!', $about->content);
    }

    public function AboutProfileDescription()
    {
        $about = About::where('category', 'about-me')->where('name', 'profile description')->first();
        // Jika tidak ditemukan, kembalikan response error
        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan!',
            ], 404);
        }

        return new AboutResource(true, $about->name, $about);
    }

    public function AboutProfileDescriptionUpdate(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'content'       => 'required',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $about = About::where('category', 'about-me')->where('name', 'profile description')->first();
    
        if (!$about) {
            return response()->json(['error' => 'Service not found'], 404);
        }
    
        // Update the other fields
        $about->content = $request->content;
    
        // Save the updated service
        $about->save();
    
        // Return response
        return new AboutResource(true, $about->name, $about->content);
    }

    public function AboutSkills($name = null) 
    {
        $category = "skills-icons";
        if (!$name) {
            // Mencari berdasarkan category
            $about = About::where('category', $category)->get();

            // Jika tidak ditemukan, kembalikan response error
            if ($about->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan!',
                ], 404);
            }

            return new AboutResource(true, "skills icons", $about);

        } else {
            $about = About::where('category', $category)->where('name', $name)->first();

            // Jika tidak ditemukan, kembalikan response error
            if (!$about) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan!',
                ], 404);
            }

            return new AboutResource(true, $category, $about);
        }
    }

    public function AboutSkillsStore(Request $request)
    {
        $category = "skills-icons";
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'       => 'required',
            'icons'      => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Upload image directly to public/images/services
        $icons = $request->file('icons');
        $iconName = $icons->hashName();
        $icons->move(public_path('images/skills-icons'), $iconName);

        // Create post with the full path stored in the database
        $about = About::create([
            'name'        => $request->name,
            'category'    => $category,
            'content'       => '/images/skills-icons/' . $iconName, // Simpan path lengkap ke dalam database
        ]);

        // Return response
        return new AboutResource(true, 'Data Berhasil Ditambahkan!', $about);
    }

    public function AboutSkillsUpdate(Request $request, $id)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'content' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Find the about record by category and name
        $about = About::where('id', $id)->first();

        if (!$about) {
            return response()->json(['error' => 'about not found'], 404);
        }

        // If a new image is uploaded, handle the upload
        if ($request->hasFile('content')) {
            // Delete the old image
            if ($about->content) {
                $oldImagePath = public_path($about->content);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Upload the new image
            $images = $request->file('content');
            $imagename = $images->hashName();
            $images->move(public_path('images/skills-icons'), $imagename);
            $about->content = '/images/skills-icons/' . $imagename;
        }

        $about->name = $request->name;

       // Save changes to the database
        $about->save();

        // Return response
        return new AboutResource(true, 'Data Berhasil Diperbarui!', $about);
    }

    public function AboutSkillsDestroy($id)
    {
        // Temukan service berdasarkan ID
        $about = About::find($id);

        // Cek apakah service ditemukan
        if (!$about) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($about->icons) {
            $iconPath = public_path($about->icons);
            if (file_exists($iconPath)) {
                unlink($iconPath); // Hapus file gambar
            }
        }

        // Hapus service dari database
        $about->delete();

        // Kembalikan respons berhasil
        return new AboutResource(true, 'Data Berhasil Dihapus!', null);
    }

    public function AboutCertificate($sort, $category = null, $show = null, $page = null, $name = null) 
    {
        if ($sort == 'asc' OR $sort != 'desc') {
            $sort = 'asc';
        } else if ($sort == 'desc') {
            $sort = 'desc';
        }

        if (!$category AND !$show AND !$page AND !$name) {
            // Mencari berdasarkan category
            $about = About::whereIn('category', ['certificate-course', 'certificate-organization', 'certificate-champions'])->orderBy('id' , $sort)->get();

            // Jika tidak ditemukan, kembalikan response error
            if ($about->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan!',
                ], 404);
            }

            // Mengembalikan data sebagai resource dengan tambahan content dari tabel images
            return new AboutResource(true, 'certificate', $about);
        
        } else if ($category == 'certificate-course' OR $category == 'certificate-organization' OR $category == 'certificate-champions') {
            if ($show && $page) {
                    
                $abouts = About::where('category', $category)
                                ->orderBy('id' , $sort)
                                ->paginate($show, ['*'], 'page', $page);

                $about = $abouts->toArray();
                                
                $url = 'api/about/certificate/read/' . $sort . '/' . $category . '/';
                $about['first_page_url'] = url($url . $show . '/1');
                $about['prev_page_url'] = $about['prev_page_url'] ?? null;
                $about['next_page_url'] = $about['next_page_url'] ?? null;
                $about['last_page_url'] = url($url . $show . '/' . $about['last_page']);
        
                if ($about['prev_page_url']) {
                    $about['prev_page_url'] = url($url . $show . '/' . ($page - 1));
                }
                
                if ($about['next_page_url']) {
                    $about['next_page_url'] = url($url . $show . '/' . ($page + 1));
                }
        
                // Menyesuaikan URL pada setiap link pagination
                foreach ($about['links'] as &$link) {
                    if ($link['url']) {
                        $pageNumber = explode('page=', $link['url'])[1];
                        $link['url'] = url($url . $show . '/' . $pageNumber);
                    }
                }

                return new AboutResource(true, 'certificate', $about);

            } else if (!$show && !$page) {
                $about = About::where('category', $category)
                                ->orderBy('id' , $sort)->get();

                if ($about->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan!',
                    ], 404);
                }

                return new AboutResource(true, $category , $about);

            }
        } else if ($category == 'all') {
            if ($show AND $page) {
                    
                $abouts = About::whereIn('category', ['certificate-course' , 'certificate-organization' , 'certificate-champions'])
                                ->orderBy('id' , $sort)
                                ->paginate($show, ['*'], 'page', $page);

                $about = $abouts->toArray();
                                
                $url = 'api/about/certificate/read/' . $sort . '/' . $category . '/';
                $about['first_page_url'] = url($url . $show . '/1');
                $about['prev_page_url'] = $about['prev_page_url'] ?? null;
                $about['next_page_url'] = $about['next_page_url'] ?? null;
                $about['last_page_url'] = url($url . $show . '/' . $about['last_page']);
        
                if ($about['prev_page_url']) {
                    $about['prev_page_url'] = url($url . $show . '/' . ($page - 1));
                }
                
                if ($about['next_page_url']) {
                    $about['next_page_url'] = url($url . $show . '/' . ($page + 1));
                }
        
                // Menyesuaikan URL pada setiap link pagination
                foreach ($about['links'] as &$link) {
                    if ($link['url']) {
                        $pageNumber = explode('page=', $link['url'])[1];
                        $link['url'] = url($url . $show . '/' . $pageNumber);
                    }
                }

                return new AboutResource(true, 'certificate', $abouts);

            } else {
                $about = About::whereIn('category', ['certificate-course' , 'certificate-organization' , 'certificate-champions'])->orderBy('id' , $sort)->get();

                return new AboutResource(true, 'certificate', $about);
            }
        }
    }

    public function AboutCertificateDetail($category, $name) {
        $about = About::whereIn('category', ['certificate-course' , 'certificate-organization' , 'certificate-champions'])->where('category', $category)->where('name', $name)->orderBy('id', 'asc')->first();

        return new AboutResource(true, $about->name, $about);
    } 

    public function AboutCertificateStore(Request $request) {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'       => 'required',
            'category'   => 'required',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Initialize variable for image path
        $imagePath = null;
    
        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Upload and convert the image to WebP
            $images = $request->file('image');
            $imagename = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/certificate/') . $imagename;
    
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
            $imagePath = '/images/certificate/' . $imagename;
        }
    
        // Create post with the image path if exists
        $about = About::create([
            'name'     => $request->name,
            'category' => $request->category,
            'content'  => $imagePath, // Simpan path jika ada gambar
        ]);
    
        // Return response
        return new AboutResource(true, 'Data Berhasil Ditambahkan!', $about);
    }  

    public function AboutCertificateUpdate(Request $request, $id)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'       => 'required',
            'category'   => 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Find the certificate by ID within specified categories
        $about = About::whereIn('category', ['certificate-course', 'certificate-organization', 'certificate-champions'])
                    ->where('id', $id)
                    ->first();

        if (!$about) {
            return response()->json(['error' => 'Certificate not found'], 404);
        }

        // If a new image is uploaded, handle the upload
        if ($request->hasFile('image')) {
            // Delete the old image
            if ($about->content) {
                $oldIconPath = public_path($about->content);
                if (file_exists($oldIconPath)) {
                    unlink($oldIconPath);
                }
            }

            // Upload and convert the new image to WebP
            $images = $request->file('image');
            $imageName = pathinfo($images->hashName(), PATHINFO_FILENAME) . '.webp';
            $imagePathOnDisk = public_path('images/certificate/') . $imageName;

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
            $about->content = '/images/certificate/' . $imageName;
        }

        // Update the other fields
        $about->name = $request->name;
        $about->category = $request->category;

        // Save the updated certificate
        $about->save();

        // Return response
        return new AboutResource(true, 'Data Berhasil Diperbarui!', $about);
    }


    public function AboutCertificateDestroy($id)
    {
        // Temukan service berdasarkan ID
        $about = About::find($id);

        // Cek apakah about ditemukan
        if (!$about) {
            return response()->json(['error' => 'about not found'], 404);
        }

        // Hapus file gambar jika ada
        if ($about->images) {
            $imagePath = public_path($about->images);
            if (file_exists($imagePath)) {
                unlink($imagePath); // Hapus file gambar
            }
        }

        // Hapus about dari database
        $about->delete();

        // Kembalikan respons berhasil
        return new AboutResource(true, 'Data Berhasil Dihapus!', null);
    }

}
