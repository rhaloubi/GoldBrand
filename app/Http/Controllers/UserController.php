<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255', // Validate last_name
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name, // Store last_name
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate a token for the user
        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token // Return the token in the response
        ], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('user-token')->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
    }

    // Create a new admin
    public function admin_create(Request $request)
    {
        // Check if the authenticated user is an admin
        if (Auth::user()->admin !== 1) {
            return response()->json(['message' => 'Only admins can create another admin'], 403);
        }

        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255', // Validate last_name
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new admin user
        $admin = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'admin' => 1, // Set admin column to 1
        ]);

        // Return the new admin's details without generating a token
        return response()->json(['admin' => $admin], 201);
    }

    // List all users with admin column = 0
    public function index()
    {
        // Check if the authenticated user is an admin
        if (Auth::user()->admin !== 1) {
            return response()->json(['message' => 'Only admins can view this list'], 403);
        }

        // Retrieve users where admin is 0
        $users = User::where('admin', 0)->get();

        return response()->json(['users' => $users], 200);
    }

    // Show details of a specific user (admin = 0)
    public function show($id)
    {
        // Check if the authenticated user is an admin
        if (Auth::user()->admin !== 1) {
            return response()->json(['message' => 'Only admins can view user details'], 403);
        }

        // Find the user where admin = 0 and the id matches
        $user = User::where('admin', 0)->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found or is an admin'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    // Delete a user with admin column = 0
    public function destroy($id)
    {
        // Check if the authenticated user is an admin
        if (Auth::user()->admin !== 1) {
            return response()->json(['message' => 'Only admins can delete users'], 403);
        }

        // Find and delete the user where admin = 0 and the id matches
        $user = User::where('admin', 0)->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found or is an admin'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
