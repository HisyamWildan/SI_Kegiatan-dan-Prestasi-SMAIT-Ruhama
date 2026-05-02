<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function index(Request $request)
    {
        $query = Categorie::query();
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        $categories = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'daftar kategori',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:kegiatan,prestasi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        $categorie = Categorie::create([
            'name' => $request->name,
            'type' => $request->type,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Categorie created successfully',
            'data' => $categorie
        ], 201);
    }

    public function show($id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Categorie found',
            'data' => $categorie
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:kegiatan,prestasi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        $categorie->update([
            'name' => $request->name,
            'type' => $request->type,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Categorie updated successfully',
            'data' => $categorie
        ], 200);
    }

    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found'
            ], 404);
        }

        $categorie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Categorie deleted successfully'
        ], 200);
    }
}
