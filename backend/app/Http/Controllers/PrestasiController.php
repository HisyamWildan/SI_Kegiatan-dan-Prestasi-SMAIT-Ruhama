<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PrestasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Prestasi::with(['category', 'user', 'verifier'])->orderBy('date', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json([
            'success' => true,
            'message' => 'Daftar prestasi',
            'data' => $query->get()
        ], 200);
    }

    public function approved()
    {
        $prestasi = Prestasi::with(['category', 'user', 'verifier'])
            ->where('status', 'approved')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar prestasi yang disetujui',
            'data' => $prestasi
        ], 200);
    }

    public function pending()
    {
        $prestasi = Prestasi::with(['category', 'user'])
            ->where('status', 'pending')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar prestasi menunggu verifikasi',
            'data' => $prestasi
        ], 200);
    }

    public function show($id)
    {
        $prestasi = Prestasi::with(['category', 'user', 'verifier'])->find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Detail prestasi',
            'data' => $prestasi
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'type' => 'required|in:individu,kelompok',
            'student_name' => 'required|string|max:150',
            'class_name' => 'nullable|string|max:50',
            'achievement_level' => 'nullable|string|max:100',
            'date' => 'required|date',
            'location' => 'nullable|string|max:150',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'certificate' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
            $imagePath = $request->file('image')->store('prestasi', 'public');
        }

        $imagePath2 = null;
        if ($request->hasFile('image2')) {
            $imagePath2 = $request->file('image2')->store('prestasi', 'public');
        }

        $imagePath3 = null;
        if ($request->hasFile('image3')) {
            $imagePath3 = $request->file('image3')->store('prestasi', 'public');
        }

        $certificatePath = null;
        if ($request->hasFile('certificate')) {
            $certificatePath = $request->file('certificate')->store('prestasi', 'public');
        }

        $user = auth()->user();
        
        $status = 'pending';
        $verified_by = null;
        $verified_at = null;

        if ($user->role === 'guru' || $user->role === 'admin') {
            $status = 'approved';
            $verified_by = $user->id;
            $verified_at = Carbon::now();
        }

        $prestasi = Prestasi::create([
            'title' => $request->title,
            'type' => $request->type,
            'student_name' => $request->student_name,
            'class_name' => $request->class_name,
            'achievement_level' => $request->achievement_level,
            'date' => $request->date,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $imagePath,
            'image2' => $imagePath2,
            'image3' => $imagePath3,
            'certificate' => $certificatePath,
            'categories_id' => $request->categories_id,
            'users_id' => $user->id,
            'status' => $status,
            'verified_by' => $verified_by,
            'verified_at' => $verified_at,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prestasi berhasil ditambahkan',
            'data' => $prestasi
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'type' => 'required|in:individu,kelompok',
            'student_name' => 'required|string|max:150',
            'class_name' => 'nullable|string|max:50',
            'achievement_level' => 'nullable|string|max:100',
            'date' => 'required|date',
            'location' => 'nullable|string|max:150',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'certificate' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'categories_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['image', 'image2', 'image3', 'certificate', 'verified_by', 'verified_at']);

        if (auth()->user()->role === 'siswa') {
            $data['status'] = 'pending';
            $data['verified_by'] = null;
            $data['verified_at'] = null;
            $data['rejection_message'] = null;
        }

        if ($request->hasFile('image')) {
            if ($prestasi->image) Storage::disk('public')->delete($prestasi->image);
            $data['image'] = $request->file('image')->store('prestasi', 'public');
        }

        if ($request->hasFile('image2')) {
            if ($prestasi->image2) Storage::disk('public')->delete($prestasi->image2);
            $data['image2'] = $request->file('image2')->store('prestasi', 'public');
        }

        if ($request->hasFile('image3')) {
            if ($prestasi->image3) Storage::disk('public')->delete($prestasi->image3);
            $data['image3'] = $request->file('image3')->store('prestasi', 'public');
        }

        if ($request->hasFile('certificate')) {
            if ($prestasi->certificate) {
                Storage::disk('public')->delete($prestasi->certificate);
            }
            $data['certificate'] = $request->file('certificate')->store('prestasi', 'public');
        }

        $prestasi->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Prestasi berhasil diperbarui',
            'data' => $prestasi
        ], 200);
    }

    public function destroy($id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        if ($prestasi->image) Storage::disk('public')->delete($prestasi->image);
        if ($prestasi->image2) Storage::disk('public')->delete($prestasi->image2);
        if ($prestasi->image3) Storage::disk('public')->delete($prestasi->image3);
        if ($prestasi->certificate) Storage::disk('public')->delete($prestasi->certificate);

        $prestasi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Prestasi berhasil dihapus'
        ], 200);
    }

    public function approve($id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        $prestasi->update([
            'status' => 'approved',
            'verified_by' => auth()->id(),
            'verified_at' => Carbon::now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prestasi disetujui',
            'data' => $prestasi
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        $prestasi->update([
            'status' => 'rejected',
            'verified_by' => auth()->id(),
            'verified_at' => Carbon::now(),
            'rejection_message' => $request->rejection_message
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prestasi ditolak',
            'data' => $prestasi
        ], 200);
    }

    public function revise(Request $request, $id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        $prestasi->update([
            'status' => 'revised',
            'verified_by' => auth()->id(),
            'verified_at' => Carbon::now(),
            'rejection_message' => $request->rejection_message
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prestasi diminta revisi',
            'data' => $prestasi
        ], 200);
    }

    public function setPending($id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json([
                'success' => false,
                'message' => 'Prestasi tidak ditemukan'
            ], 404);
        }

        $prestasi->update([
            'status' => 'pending',
            'verified_by' => null,
            'verified_at' => null,
            'rejection_message' => null
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status prestasi diatur ulang menjadi pending',
            'data' => $prestasi
        ], 200);
    }
}
