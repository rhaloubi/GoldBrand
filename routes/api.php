<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;

Route::post('/wishlist/add', [WishlistController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/wishlist/remove', [WishlistController::class, 'remove'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/wishlist/count', [WishlistController::class, 'getCount']);
Route::middleware('auth:sanctum')->get('/wishlist/items', [WishlistController::class, 'getWishlist']);

// User authentication routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// Public routes that don't require authentication
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/{id}/images', [ImageController::class, 'index']); // Publicly accessible images

// Protect routes with auth:sanctum middleware
Route::middleware('auth:sanctum')->group(function () {
    // Product routes that require authentication
    Route::resource('products', ProductController::class)->except(['index', 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::resource('products.images', ImageController::class)->only(['store', 'destroy']);

    // Order routes
    Route::resource('orders', OrderController::class);

    // Get authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // User management routes for admins
    Route::get('/users', [UserController::class, 'index']); // List users (admin only)
    Route::get('/users/{id}', [UserController::class, 'show']); // Show user (admin only)
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user (admin only)
    Route::post('/admin/create', [UserController::class, 'admin_create']); // Create admin (admin only)
});
