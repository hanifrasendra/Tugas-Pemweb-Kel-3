<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('register_user', function (Blueprint $table) {
            // Kolom 'id' sebagai primary key yang auto-increment
            $table->id(); 
            
            // Kolom 'nama' untuk menyimpan nama lengkap
            $table->string('nama'); 
            
            // Kolom 'email' dibuat unik agar tidak ada email yang kembar
            $table->string('email')->unique(); 
            
            // Kolom 'password' untuk menyimpan string password
            $table->string('password'); 
            
            // Opsional: Menambahkan kolom created_at dan updated_at otomatis bawaan Laravel
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('register_user');
    }
};