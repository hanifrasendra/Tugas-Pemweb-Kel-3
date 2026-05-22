<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Proposal;

class ProposalsController extends Controller
{
    public function catalogs()
    {
        $catalogs = Proposal::all();
        return response()->json([
            'status' => 'success',
            'data' => $catalogs
        ]);
    }
}
?>