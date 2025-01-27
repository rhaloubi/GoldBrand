<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Display a listing of images for a specific product
    public function index($productId)
    {
        $images = Image::where('product_id', $productId)->get();
        return response()->json($images);
    }

    // Store a newly created image in storage
    public function store(Request $request, $productId)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $path = $request->file('image')->store('products', 'public');
        $image = Image::create(['product_id' => $productId, 'image_path' => $path]);

        return response()->json($image, 201);
    }

    // Remove the specified image from storage
    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        // Delete the image file from storage
        \Storage::disk('public')->delete($image->image_path);
        // Delete the record from the database
        $image->delete();

        return response()->json(null, 204);
    }
}
