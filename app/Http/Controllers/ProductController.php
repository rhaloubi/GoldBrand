<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    // Display a listing of the products
    public function index()
    {
        $products = Product::with('images')->get();
        return response()->json($products);
    }

    // Store a newly created product in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'cost_price' => 'required|numeric', // Add validation for cost_price
            'size' => 'nullable|string',
            'category' => 'required|string',
            'markname' => 'required|string',
            'stock_status' => 'required|in:in_stock,out_of_stock',
            'discount' => 'required|integer|min:0|max:100',
            'gender' => 'required|in:male,female,kids',
            'quantity' => 'required|integer',
            'images' => 'required', // Images are required
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,mov|max:2048' // Validate each image
        ]);

        $product = Product::create($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    // Display the specified product
    public function show($id)
    {
        $product = Product::with('images')->findOrFail($id);

        $product->images->transform(function ($image) {
            $image->image_path = asset('storage/' . $image->image_path);
            return $image;
        });

        return response()->json($product);
    }

    // Update the specified product in storage
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'cost_price' => 'required|numeric', // Add validation for cost_price
            'size' => 'nullable|string',
            'category' => 'required|string',
            'markname' => 'required|string',
            'stock_status' => 'required|in:in_stock,out_of_stock',
            'discount' => 'required|integer|min:0|max:100',
            'gender' => 'required|in:male,female,kids',
            'quantity' => 'required|integer',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,mov|max:2048'
        ]);

        $product->update($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        return response()->json($product->load('images'), 200);
    }

    // Remove the specified product from storage
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->images()->delete();
        $product->delete();
        return response()->json(null, 204);
    }
}
