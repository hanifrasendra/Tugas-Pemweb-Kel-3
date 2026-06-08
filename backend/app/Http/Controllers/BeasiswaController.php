<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Beasiswa;

class BeasiswaController extends Controller
{
    public function beasiswa()
    {
        $beasiswa = Beasiswa::all();
        return response()->json([
            'status' => 'success',
            'data' => $beasiswa
        ]);
    }

    public function beasiswa_lembaga(Request $request)
    {
        $beasiswa_lembaga = Beasiswa::where('nama_lembaga', $request->nama_lembaga)->get();
        return response()->json([
            'status' => 'success', 
            'data' => $beasiswa_lembaga
        ]);
    }

    public function upload_beasiswa(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'nama_beasiswa' => 'required|string|max:255',
                'id_lembaga'    => 'required',
                'nama_lembaga'  => 'required|string',
                'type'          => 'required|string',
                'kuota'         => 'required|integer',
                'nominal'       => 'required|numeric',
                'deadline'      => 'required|date',
                'status'        => 'required|string',
                'deskripsi'     => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal, pastikan data React terkirim dengan benar.',
                    'errors' => $validator->errors()
                ], 422);
            }

            $beasiswa = Beasiswa::create([
                'nama_beasiswa' => $request->nama_beasiswa,
                'id_lembaga'    => $request->id_lembaga,
                'nama_lembaga'  => $request->nama_lembaga,
                'type'          => $request->type,
                'kuota'         => $request->kuota,
                'nominal'       => $request->nominal,
                'deadline'      => $request->deadline,
                'status'        => $request->status,
                'deskripsi'     => $request->deskripsi,
                // 'terdaftar' secara default akan terisi 0 lewat database default value atau seeder jika diatur
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Data beasiswa berhasil dibuat',
                'data' => $beasiswa
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan internal pada server Laravel.',
                'error_detail' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }
}
?>