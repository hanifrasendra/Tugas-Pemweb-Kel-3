<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    protected $table = 'pengajuan'; // nama tabel di database

    protected $fillable = [
        'deskripsi',
        'gender',
        'univ',
        'prodi',
        'semester',
        'ipk',
        'ukt',
        'status',
        'ktp_url',
        'ktm_url',
        'video_url',
        'proposal_url',
        'nama_lengkap',
        'id_user',
        'nama_beasiswa',
        'id_beasiswa',
        'lembaga',
        'id_lembaga',
    ];
}