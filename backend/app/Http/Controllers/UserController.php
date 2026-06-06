<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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

        $username = $request->namalengkap;

        $User = User::create([
            'username' => $username,
            'namalengkap' => $request->namalengkap,
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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'        => 'required|email',
            'username'     => 'sometimes|string|max:60',
            'namalengkap'  => 'sometimes|string|max:60',
            'universitas'  => 'sometimes|string|nullable',
            'jurusan'      => 'sometimes|string|nullable',
            'semester'     => 'sometimes|integer|nullable',
            'gender'       => 'sometimes|in:Laki-laki,Perempuan|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()], 422);
        }

        $User = User::where('email', $request->email)->first();

        $fieldsToUpdate = $request->only([
            'username', 
            'namalengkap', 
            'universitas', 
            'jurusan', 
            'semester', 
            'gender'
        ]);

        $User->update($fieldsToUpdate);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui',
            'data' => $User
        ]);
    }
}
?>