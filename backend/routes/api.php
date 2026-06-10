<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\PrestasiController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/kegiatan', [KegiatanController::class, 'index']);
Route::get('/kegiatan/{id}', [KegiatanController::class, 'show']);

Route::get('/prestasi/approved', [PrestasiController::class, 'approved']);
Route::get('/prestasi/{id}', [PrestasiController::class, 'show']);
Route::get('/categories', [CategorieController::class, 'index']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Route::get('/categories', [CategorieController::class, 'index']); moved to public
    Route::get('/categories/{id}', [CategorieController::class, 'show']);

    Route::get('/prestasi/pending', [PrestasiController::class, 'pending']);
    Route::get('/prestasi', [PrestasiController::class, 'index']);
    // Siswa can upload prestasi
    Route::post('/prestasi', [PrestasiController::class, 'store']);
    Route::put('/prestasi/{id}', [PrestasiController::class, 'update']);
    Route::delete('/prestasi/{id}', [PrestasiController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | ADMIN & GURU ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,guru')->group(function () {
        Route::post('/kegiatan', [KegiatanController::class, 'store']);
        Route::put('/kegiatan/{id}', [KegiatanController::class, 'update']);
        Route::delete('/kegiatan/{id}', [KegiatanController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | GURU ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:guru')->group(function () {
        Route::put('/prestasi/{id}/approve', [PrestasiController::class, 'approve']);
        Route::put('/prestasi/{id}/reject', [PrestasiController::class, 'reject']);
        Route::put('/prestasi/{id}/revise', [PrestasiController::class, 'revise']);
        Route::put('/prestasi/{id}/pending', [PrestasiController::class, 'setPending']);
    });

    /*
    |--------------------------------------------------------------------------
    | ADMIN ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('categories', CategorieController::class)->except(['index', 'show']);
    });
});
