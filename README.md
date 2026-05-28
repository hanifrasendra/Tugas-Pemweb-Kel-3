# 🎓 CompeteHub — Portal Beasiswa Digital

Aplikasi web portal beasiswa untuk mahasiswa Indonesia. Dibangun dengan **React + Vite** (frontend) dan **Laravel 10** (backend API).

---

## 📁 Struktur Proyek

```
Tugas-Pemweb-Kel-3/
├── web-kel-3/        # Frontend — React + Vite + Tailwind CSS
└── backend/          # Backend  — Laravel 10 + Sanctum
```

---

## 🖥️ Halaman Aplikasi

| Route | File | Deskripsi |
|---|---|---|
| `/` atau `/home` | `HalamanUtama.jsx` | Landing page utama dengan hero section dan informasi beasiswa |
| `/login` | `LoginPage.jsx` | Form login pengguna |
| `/register` | `RegisterPage.jsx` | Form registrasi akun baru |
| `/catalog` | `CatalogPage.jsx` | Daftar semua proposal beasiswa yang masuk |
| `/explore` | `ExplorePage.jsx` | Jelajahi dan cari beasiswa tersedia dengan filter & sort |
| `/tambah` | `TambahProposal.jsx` | Form pengajuan proposal beasiswa (perlu login) |
| `/edit/:id` | `EditPage.jsx` | Edit proposal yang sudah diajukan |
| `/post-proposal` | `PostProposalPage.jsx` | Form lengkap ajukan beasiswa dengan upload dokumen |
| `/profil` | `UserProfilePage.jsx` | Profil pengguna, riwayat proposal, dan beasiswa tersimpan |
| `/admin` | `AdminPage.jsx` | Dashboard admin — review dan kelola semua pengajuan |

---

## ⚙️ Cara Menjalankan

### 🔵 Frontend

```bash
cd web-kel-3
npm install //tidak perlu karna sudah ada di project. kalo belum boleh dijalankan baris ini
npm run dev
```

Berjalan di **http://localhost:5173**

---

### 🔴 Backend

```bash
cd backend
composer install 
php artisan migrate
php artisan serve
```

Berjalan di **http://localhost:8000**

Sebelum `php artisan migrate`, buka file `.env` dan sesuaikan konfigurasi database:

```env
DB_DATABASE=competehub
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🗃️ Migrasi Database

### 1. `users`

File: `2014_10_12_000000_create_users_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `name` | string | |
| `email` | string unique | |
| `password` | string | |
| `role` | enum | `user` / `admin` — default `user` |
| `universitas` | string nullable | |
| `prodi` | string nullable | |
| `semester` | tinyint nullable | |
| `ipk` | decimal(3,2) nullable | |
| `jenis_kelamin` | enum nullable | `Laki-laki` / `Perempuan` |
| `bio` | text nullable | |
| `foto_profil` | string nullable | |
| `email_verified_at` | timestamp nullable | |
| `created_at / updated_at` | timestamp | |

### 2. `beasiswa`

File: `2024_01_01_000001_create_beasiswa_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `judul` | string | |
| `penyelenggara` | string | |
| `tipe` | enum | `Prestasi` / `Reguler` / `Leadership` |
| `nominal` | bigint unsigned | dalam rupiah |
| `kuota` | int unsigned | |
| `deadline` | date nullable | |
| `prodi` | string | default `Semua Jurusan` |
| `deskripsi` | text nullable | |
| `is_active` | boolean | default `true` |
| `created_at / updated_at` | timestamp | |

### 3. `pengajuan`

File: `2024_01_01_000002_create_pengajuan_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | FK → users | siapa yang mengajukan |
| `nama` | string | |
| `deskripsi` | text nullable | |
| `universitas` | string | |
| `prodi` | string | |
| `semester` | tinyint unsigned | |
| `ipk` | decimal(3,2) | |
| `ukt` | string nullable | |
| `tipe_beasiswa` | enum | `Prestasi` / `Reguler` / `Leadership` |
| `status` | enum | `Pending` / `Review` / `Diterima` / `Ditolak` — default `Pending` |
| `catatan_admin` | text nullable | feedback dari admin |
| `reviewed_by` | FK → users nullable | admin yang mereview |
| `reviewed_at` | timestamp nullable | |
| `created_at / updated_at` | timestamp | |

### 4. `saved_beasiswa`

File: `2024_01_01_000003_create_saved_beasiswa_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | FK → users | |
| `beasiswa_id` | FK → beasiswa | |
| `saved_at` | timestamp | |
| *(unique)* | `user_id` + `beasiswa_id` | tidak bisa simpan beasiswa yang sama dua kali |

### 5. `dokumen`

File: `2024_01_01_000004_create_dokumen_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `pengajuan_id` | FK → pengajuan | |
| `tipe_dokumen` | enum | `ktp` / `transkrip` / `video` / `surat_rekomendasi` / `lainnya` |
| `file_path` | string | |
| `uploaded_at` | timestamp | |

---

## 🔌 API Endpoints

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/catalogs` | Ambil semua data proposal pengajuan |
| `GET` | `/user` | Ambil data user yang sedang login (butuh auth Sanctum) |

---

## 🛠️ Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router v7 |
| Backend | Laravel 10, PHP 8.1, Laravel Sanctum |
| Database | MySQL |

---

## 👥 Kelompok 3

> Tugas Pemrograman Web — Kelompok 3
