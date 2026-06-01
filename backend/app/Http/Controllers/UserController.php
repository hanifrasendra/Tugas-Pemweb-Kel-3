<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $User = User::where('email', $request->email)->first();
        if($User) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email sudah terdaftar'
            ], 409);
        }

        $User = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'status' => 'success',
            'isLogin' => true,
            'data' => $User
        ]);
    }

    public function login(Request $request)
    {
        $User = User::where('email', $request->email)->first();

        if (!$User) {
            return response()->json([
                'status' => 'error',
                'message' => 'User belum terdaftar'
            ], 401);
        }
        if(!Hash::check($request->password, $User->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password salah'
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'isLogin' => true,
            'data' => $User
        ]);
    }
}
?>