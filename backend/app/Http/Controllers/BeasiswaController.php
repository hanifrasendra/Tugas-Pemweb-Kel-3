<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
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
}
?>