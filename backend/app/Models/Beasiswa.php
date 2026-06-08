<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beasiswa extends Model
{
    protected $table = 'beasiswa'; // nama tabel di database

    protected $fillable = [
    'nama_beasiswa', 'id_lembaga', 'nama_lembaga', 
    'nominal', 'kuota', 'deadline', 'type', 'status', 'deskripsi'
    ];
}