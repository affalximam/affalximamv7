<?php

namespace App\Http\Controllers\Api;

use App\Models\Services;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ServicesResource;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    /**
     * index
     *
     */
    public function index($sort = null, $show = null, $name = null) {

        if ($sort == 'asc' OR $sort != 'desc') {
            $sort = 'asc';
        } else if ($sort == 'desc') {
            $sort = 'desc';
        }
        
        if ($show) {
            if ($name) {
                $services = Services::orderBy('id', $sort)->where('name', $name)->first();
                if ($services->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan!',
                    ], 404);
                }
                return new ServicesResource(true, 'Services', $services);
            } else {
                $services = Services::orderBy('id', $sort)->limit($show)->get();
                if ($services->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan!',
                    ], 404);
                }
                return new ServicesResource(true, 'Services', $services);
            }
        } else {
            $services = Services::orderBy('id', $sort)->get();
            if ($services->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan!',
                    ], 404);
                }
            return new ServicesResource(true, 'Services', $services);
        }
    }

    public function ServicesStore(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name'       => 'required',
            'icons'      => 'required|mimes:svg|max:2048',
            'description'=> 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Handle icon upload
        $iconPath = null;
        if ($request->hasFile('icons')) {
            // Upload the new SVG icon
            $icons = $request->file('icons');
            $iconName = time() . '_' . $icons->getClientOriginalName(); // Use unique name
            $icons->move(public_path('images/services/'), $iconName);

            // Set icon path
            $iconPath = '/images/services/' . $iconName;
        }

        // Create a new service with the uploaded icon
        $services = Services::create([
            'name'        => $request->name,
            'icons'       => $iconPath,
            'description' => $request->description,
            'whatsapp'    => $request->whatsapp,
            'telegram'    => $request->telegram,
            'instagram'   => $request->instagram,
        ]);

        // Return response
        return new ServicesResource(true, 'Data Berhasil Ditambahkan!', $services);
    }
   
    public function ServicesUpdate(Request $request, $id)
    {
        $services = Services::find($id);

        if (!$services) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        // Handle icon upload if present
        if ($request->hasFile('icons')) {
            // Delete the old icon if it exists
            if ($services->icons) {
                $oldIconPath = public_path($services->icons);
                if (file_exists($oldIconPath)) {
                    unlink($oldIconPath);
                }
            }

            // Upload the new SVG icon
            $icons = $request->file('icons');
            $iconName = time() . '_' . $icons->getClientOriginalName(); // Use unique name
            $icons->move(public_path('images/services/'), $iconName);

            // Update the icon path in the database
            $services->icons = '/images/services/' . $iconName;
        }

       // Update the other fields if filled
            $services->name = $request->name;
            $services->description = $request->description;
            $services->whatsapp = $request->whatsapp;
            $services->telegram = $request->telegram;
            $services->instagram = $request->instagram;

        // Save the updated service
        $services->save();

        // Return response
        return new ServicesResource(true, 'Data Berhasil Diperbarui!', $services);
    }

    public function ServicesDestroy($id)
    {
        // Temukan service berdasarkan ID
        $services = Services::find($id);

        // Cek apakah service ditemukan
        if (!$services) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        // Hapus service dari database
        $services->delete();

        // Kembalikan respons berhasil
        return new ServicesResource(true, 'Data Berhasil Dihapus!', null);
    }
    






}
