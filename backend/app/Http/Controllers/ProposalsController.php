<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Proposal;

class ProposalsController extends Controller
{
    public function peserta()
    {
        $peserta = Proposal::all();
        return response()->json([
            'status' => 'success',
            'data' => $peserta
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
}
?>