<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beasiswa', function (Blueprint $table) {
            $table->id();
            $table->string('nama_beasiswa');
            $table->foreignId('id_lembaga')->constrained('pendonor')->onDelete('cascade');
            $table->string('nama_lembaga');
            $table->enum('type', ['Reguler', 'Prestasi', 'Organisasi']); // Adjust options as needed
            $table->integer('kuota')->nullable();
            $table->integer('nominal')->nullable();
            $table->enum('status', ['Draft', 'Aktif', 'Selesai']);
            $table->text('deskripsi')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beasiswa');
    }
};
