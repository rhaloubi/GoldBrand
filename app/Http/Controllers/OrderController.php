<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Display a listing of the orders
    public function index()
    {
        $orders = Order::with('product')->get();
        return response()->json($orders);
    }

    // Store a newly created order in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_address' => 'required|string|max:500',
        ]);

        $product = Product::findOrFail($validatedData['product_id']);
        $totalPrice = $product->price * $validatedData['quantity'];

        $order = Order::create([
            'product_id' => $validatedData['product_id'],
            'quantity' => $validatedData['quantity'],
            'total_price' => $totalPrice,
            'customer_name' => $validatedData['customer_name'],
            'customer_email' => $validatedData['customer_email'],
            'customer_address' => $validatedData['customer_address'],
        ]);

        return response()->json($order, 201);
    }

    // Display the specified order
    public function show($id)
    {
        $order = Order::with('product')->findOrFail($id);
        return response()->json($order);
    }

    // Update the specified order in storage
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validatedData = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'customer_name' => 'sometimes|string|max:255',
            'customer_email' => 'sometimes|email|max:255',
            'customer_address' => 'sometimes|string|max:500',
        ]);

        if (isset($validatedData['quantity'])) {
            $product = $order->product;
            $order->total_price = $product->price * $validatedData['quantity'];
        }

        $order->update($validatedData);

        return response()->json($order);
    }

    // Remove the specified order from storage
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}
