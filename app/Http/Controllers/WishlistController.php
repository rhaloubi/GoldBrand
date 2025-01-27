<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class WishlistController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $existing = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $request->input('product_id'))
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Product already in wishlist'], 400);
        }

        $wishlist = Wishlist::create([
            'user_id' => $request->user()->id,
            'product_id' => $request->input('product_id'),
        ]);

        return response()->json(['message' => 'Product added to wishlist', 'wishlist' => $wishlist]);
    }



    public function remove(Request $request)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $request->input('product_id'))
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Product removed from wishlist']);
        }

        return response()->json(['message' => 'Product not found in wishlist'], 404);
    }
    public function getCount(Request $request)
    {
        $user = $request->user();
        $count = $user->wishlist()->count(); // Make sure `wishlist` relationship is defined in User model
        return response()->json(['count' => $count]);
    }
    // WishlistController.php

    public function getWishlist(Request $request)
    {
        $user = $request->user(); // Get the authenticated user

        // Eager load the product and its images
        $wishlistItems = $user->wishlist()->with('product.images')->get();

        if ($wishlistItems->isEmpty()) {
            return response()->json([]); // Return an empty array if no items
        }

        return response()->json($wishlistItems);
    }
}
