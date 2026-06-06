<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pendonor', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->string('nama_lembaga', 150);
            $table->enum('kategori', [
                'Pemerintah',
                'Swasta', 
                'BUMN',
                'Internasional',
                'Yayasan'
            ]);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pendonor');
    }
};
