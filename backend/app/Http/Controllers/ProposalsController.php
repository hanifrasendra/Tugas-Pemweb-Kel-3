<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request; 
use App\Models\Proposal;

class ProposalsController extends Controller
{
    public function proposals(Request $request)
    {
        // 1. Ambil SEMUA data teks yang dikirim dari FormData React
        $inputData = $request->only([
            'nama_lengkap', 'univ', 'prodi', 'gender', 'semester', 
            'ipk', 'ukt', 'deskripsi', 'nama_beasiswa', 'id_beasiswa', 
            'lembaga', 'id_lembaga', 'id_user'
        ]);

        // Cek dan handle jika di database kamu tidak sengaja tertulis 'deskirpsi' (typo)
        if ($request->has('deskripsi')) {
            $inputData['deskirpsi'] = $request->input('deskripsi');
        }

        // Set status pendaftaran awal
        $inputData['status'] = 'Pending';

        // 2. Upload file Video (Gunakan method upload + resource_type video)
        if ($request->hasFile('video')) {
            $videoUrl = Cloudinary::upload($request->file('video')->getRealPath(), [
                'resource_type' => 'video'
            ])->getSecurePath();
            $inputData['video_url'] = $videoUrl;
        }

        // 3. Upload file KTM
        if ($request->hasFile('ktm')) {
            $ktmUrl = Cloudinary::upload($request->file('ktm')->getRealPath())->getSecurePath();
            $inputData['ktm_url'] = $ktmUrl;
        }

        // 4. Upload file KTP
        if ($request->hasFile('ktp')) {
            $ktpUrl = Cloudinary::upload($request->file('ktp')->getRealPath())->getSecurePath();
            $inputData['ktp_url'] = $ktpUrl;
        }

        // 5. SOLUSI FIX MASALAH 1: Disamakan dengan React yang mengirim key 'proposal'
        if ($request->hasFile('proposal')) {
            $proposalUrl = Cloudinary::upload($request->file('proposal')->getRealPath())->getSecurePath();
            $inputData['proposal_url'] = $proposalUrl; // Tetap disimpan ke field 'proposal_url' di database
        }
        // Simpan semua gabungan data teks dan URL Cloudinary ke Database
        Proposal::create($inputData);

        return response()->json([
            'status' => 'success',
            'message' => 'Proposal & Dokumen Berhasil Disimpan!'
        ], 201);
    }

    public function peserta()
    {
        $peserta = Proposal::all();
        return response()->json([
            'status' => 'success',
            'data' => $peserta
        ]);
    }

    public function status(Request $request, $id)
    {
        $proposal = Proposal::find($id);

        $proposal->status = $request->status;
        $proposal->save();

        return response()->json([
            'status' => 'success',
            'data' => $proposal
        ]);
    }

    public function show($id)
    {
        $proposal = Proposal::find($id);
        return response()->json([
            'status' => 'success',
            'data' => $proposal
        ]);
    }

    public function proposal_user(Request $request)
    {
        {
            $proposal = Proposal::where('id_user', $request->id_user)->get();

            return response()->json([
                'status' => 'success',
                'data' => $proposal
            ]);
        }
    }
}
?>