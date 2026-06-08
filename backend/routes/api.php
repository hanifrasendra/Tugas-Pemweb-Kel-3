<?php

use App\Http\Controllers\ProposalsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PenyelenggaraController;
use App\Http\Controllers\BeasiswaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/proposals', [ProposalsController::class, 'proposals']);

Route::get('/catalogs', [ProposalsController::class, 'catalogs']);
Route::get('/proposal/{id}', [ProposalsController::class, 'show']);
Route::get('/proposal_user', [ProposalsController::class, 'proposal_user']);

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/update', [UserController::class, 'update']);

Route::post('/register-penyelenggara', [PenyelenggaraController::class, 'register']);
Route::post('/login-penyelenggara', [PenyelenggaraController::class, 'login']);

Route::get('/beasiswa', [BeasiswaController::class, 'beasiswa']);
Route::get('/beasiswa_lembaga', [BeasiswaController::class, 'beasiswa_lembaga']);
Route::get('/peserta', [ProposalsController::class, 'peserta']);
Route::post('/upload_beasiswa', [BeasiswaController::class, 'upload_beasiswa']);
Route::post('/peserta/{id}/status', [ProposalsController::class, 'status']);
