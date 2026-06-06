<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use App\Models\Lembaga;

class PenyelenggaraController extends Controller
{
    public function register(Request $request)
    {
        $User = Lembaga::where('email', $request->email)->first();
        if($User) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email sudah terdaftar'
            ], 409);
        }

        $User = Lembaga::create([
            'nama_lembaga' => $request->nama_lembaga,
            'kategori' => $request->kategori,
            'description' => $request->deskripsi,
            'email' => $request->email,
            'password' => $request->pass,
        ]);

        return response()->json([
            'status' => 'success',
            'isLogin' => true,
            'data' => $User
        ]);
    }

    public function login(Request $request)
    {
        $User = Lembaga::where('email', $request->email)->first();

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
            ], 406);
        }

        return response()->json([
            'status' => 'success',
            'isLogin' => true,
            'data' => $User
        ]);
    }
}
?>