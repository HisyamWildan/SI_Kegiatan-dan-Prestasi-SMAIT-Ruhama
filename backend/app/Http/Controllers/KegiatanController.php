<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class KegiatanController extends Controller
{
    public function index()
    {
        $query = Kegiatan::with(['category', 'user'])->orderBy('date', 'desc');
        
        // If user is guru, only show their own kegiatan in dashboard context (if needed).
        // For public API, we might need all. But let's assume index is for both.
        // Actually, if we want public to see all, we shouldn't filter here unless requested.
        // Let's filter it on the frontend for Guru to keep backend simple for public.
        
        $kegiatan = $query->get();
        return response()->json([
            'success' => true,
            'message' => 'Daftar kegiatan',
            'data' => $kegiatan
        ], 200);
    }

    public function show($id)
    {
        $kegiatan = Kegiatan::with(['category', 'user'])->find($id);
        if (!$kegiatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Detail kegiatan',
            'data' => $kegiatan
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'date' => 'required|date',
            'location' => 'nullable|string|max:150',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'categories_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors()
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('kegiatan', 'public');
        }

        $imagePath2 = null;
        if ($request->hasFile('image2')) {
            $imagePath2 = $request->file('image2')->store('kegiatan', 'public');
        }

        $imagePath3 = null;
        if ($request->hasFile('image3')) {
            $imagePath3 = $request->file('image3')->store('kegiatan', 'public');
        }

        $kegiatan = Kegiatan::create([
            'title' => $request->title,
            'date' => $request->date,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $imagePath,
            'image2' => $imagePath2,
            'image3' => $imagePath3,
            'categories_id' => $request->categories_id,
            'users_id' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil ditambahkan',
            'data' => $kegiatan
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::find($id);
        if (!$kegiatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'date' => 'required|date',
            'location' => 'nullable|string|max:150',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'categories_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['image', 'image2', 'image3']);

        if ($request->hasFile('image')) {
            if ($kegiatan->image) Storage::disk('public')->delete($kegiatan->image);
            $data['image'] = $request->file('image')->store('kegiatan', 'public');
        }

        if ($request->hasFile('image2')) {
            if ($kegiatan->image2) Storage::disk('public')->delete($kegiatan->image2);
            $data['image2'] = $request->file('image2')->store('kegiatan', 'public');
        }

        if ($request->hasFile('image3')) {
            if ($kegiatan->image3) Storage::disk('public')->delete($kegiatan->image3);
            $data['image3'] = $request->file('image3')->store('kegiatan', 'public');
        }

        $kegiatan->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil diperbarui',
            'data' => $kegiatan
        ], 200);
    }

    public function destroy($id)
    {
        $kegiatan = Kegiatan::find($id);
        if (!$kegiatan) {
            return response()->json([
                'success' => false,
                'message' => 'Kegiatan tidak ditemukan'
            ], 404);
        }

        if ($kegiatan->image) Storage::disk('public')->delete($kegiatan->image);
        if ($kegiatan->image2) Storage::disk('public')->delete($kegiatan->image2);
        if ($kegiatan->image3) Storage::disk('public')->delete($kegiatan->image3);

        $kegiatan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil dihapus'
        ], 200);
    }
}
