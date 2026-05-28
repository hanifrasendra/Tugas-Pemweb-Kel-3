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
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->id(); // id (Primary Key)
            
            $table->string('nama'); // nama mahasiswa (VARCHAR)
            $table->text('deskripsi'); // deskripsi beasiswa (TEXT karena isi teksnya bisa panjang)
            $table->string('universitas'); // nama universitas (VARCHAR)
            $table->string('prodi'); // program studi (VARCHAR)
            $table->integer('semester'); // semester saat ini (INT)
            
            // Menggunakan tipe integer dan dibuat nullable karena nilainya bisa kosong (NULL) seperti di gambar
            $table->integer('ukt')->nullable(); 
            
            // IPK menggunakan float atau decimal untuk menyimpan nilai angka pecahan (contoh: 3.00)
            $table->decimal('ipk', 3, 2); // Nilai maks 9.99, presisi 2 angka di belakang koma
            
            $table->string('tipe_beasiswa'); // tipe beasiswa (VARCHAR, contoh: Reguler)
            
            $table->timestamps(); // Otomatis membuat created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};