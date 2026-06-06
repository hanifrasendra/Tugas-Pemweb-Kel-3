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
            $table->string('username'); // Kolom username, bisa kosong (nullable)
            
            // Kolom nama lengkap, bisa kosong (nullable)
            $table->string('namalengkap'); // Kolom nama lengkap, bisa kosong (nullable)
            
            // Kolom 'email' dibuat unik agar tidak ada email yang kembar
            $table->string('email')->unique(); 
            
            // Kolom 'password' untuk menyimpan string password
            $table->string('password');

            $table->string('gender')->nullable();

            $table->integer('nim')->nullable();
            
            $table->enum('status', ['Mahasiswa', 'Umum'])->default('Umum')->nullable(); // Kolom status dengan nilai default 'Mahasiswa'

            $table->string('universitas')->nullable(); // Kolom universitas, bisa kosong (nullable)
            
            $table->string('jurusan')->nullable(); // Kolom jurusan, bisa kosong%
            
            $table->integer('semester')->nullable(); // Kolom semester, bisa kosong (nullable)
            
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