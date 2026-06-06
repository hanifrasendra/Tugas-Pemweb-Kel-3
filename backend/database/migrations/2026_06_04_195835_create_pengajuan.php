<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->id();
            $table->text('deskirpsi')->nullable();
            $table->enum('gender', ['Laki-laki', 'Perempuan'])->nullable();
            $table->string('univ')->nullable();
            $table->string('prodi')->nullable();
            $table->integer('semester')->nullable();
            $table->double('ipk')->nullable();
            $table->integer('ukt')->nullable();
            $table->string('nama_lengkap')->nullable();
            $table->foreignId('id_user')->nullable()->constrained('register_user')->onDelete('cascade');
            $table->string('nama_beasiswa')->nullable();
            $table->foreignId('id_beasiswa')->nullable()->constrained('beasiswa')->onDelete('cascade');
            $table->string('lembaga')->nullable();
            $table->foreignId('id_lembaga')->nullable()->constrained('pendonor')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};