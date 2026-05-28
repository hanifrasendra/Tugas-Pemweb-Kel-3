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

### Prasyarat

Pastikan sudah terinstall:
- **Node.js** v18+ dan **npm**
- **PHP** 8.1+
- **Composer**
- **MySQL** (atau bisa pakai XAMPP/Laragon)

---

### 🔵 Frontend (React + Vite)

```bash
# 1. Masuk ke folder frontend
cd web-kel-3

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Frontend akan berjalan di **http://localhost:5173**

| Script | Perintah | Keterangan |
|---|---|---|
| Development | `npm run dev` | Jalankan server lokal dengan hot-reload |
| Build | `npm run build` | Build untuk produksi |
| Preview | `npm run preview` | Preview hasil build |

---

### 🔴 Backend (Laravel 10)

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install dependencies
composer install

# 3. Salin file environment
cp .env.example .env

# 4. Generate app key
php artisan key:generate
```

**Konfigurasi database** — buka file `.env` dan sesuaikan:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kompeteHub      # sesuaikan nama database kamu
DB_USERNAME=root             # sesuaikan username MySQL
DB_PASSWORD=                 # sesuaikan password MySQL
```

```bash
# 5. Buat database di MySQL terlebih dahulu, lalu jalankan migrasi
php artisan migrate

# 6. Isi data awal (admin, contoh user, contoh beasiswa & pengajuan)
php artisan db:seed

# 7. Jalankan server
php artisan serve
```

Backend akan berjalan di **http://localhost:8000**

> **Jika perlu reset database dari awal:**
> ```bash
> php artisan migrate:fresh --seed
> ```

---

## 🗃️ Migrasi Database

Urutan migrasi dan isi tabel masing-masing:

### 1. `users` — diperbarui dari bawaan Laravel

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
| `foto_profil` | string nullable | path file foto |
| `email_verified_at` | timestamp nullable | |
| `created_at / updated_at` | timestamp | |

### 2. `beasiswa` — tabel baru

File: `2024_01_01_000001_create_beasiswa_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `judul` | string | |
| `penyelenggara` | string | |
| `tipe` | enum | `Prestasi` / `Reguler` / `Leadership` |
| `nominal` | bigint unsigned | nominal beasiswa dalam rupiah |
| `kuota` | int unsigned | |
| `deadline` | date nullable | |
| `prodi` | string | default `Semua Jurusan` |
| `deskripsi` | text nullable | |
| `is_active` | boolean | default `true` |
| `created_at / updated_at` | timestamp | |

### 3. `pengajuan` — tabel baru (sebelumnya tidak ada migrationnya)

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

### 4. `saved_beasiswa` — tabel baru

File: `2024_01_01_000003_create_saved_beasiswa_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `user_id` | FK → users | |
| `beasiswa_id` | FK → beasiswa | |
| `saved_at` | timestamp | |
| *(unique)* | `user_id` + `beasiswa_id` | tidak bisa simpan beasiswa yang sama dua kali |

### 5. `dokumen` — tabel baru

File: `2024_01_01_000004_create_dokumen_table.php`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `pengajuan_id` | FK → pengajuan | |
| `tipe_dokumen` | enum | `ktp` / `transkrip` / `video` / `surat_rekomendasi` / `lainnya` |
| `file_path` | string | path file yang diupload |
| `uploaded_at` | timestamp | |

---

## 🌱 Data Awal (Seeder)

File: `database/seeders/DatabaseSeeder.php`

Setelah `php artisan db:seed`, database akan terisi:

| | |
|---|---|
| **Admin** | email: `admin@competehub.id` · password: `admin123` |
| **User contoh** | email: `budi@mahasiswa.id` · password: `password` |
| **Beasiswa** | 6 data beasiswa dari berbagai penyelenggara |
| **Pengajuan** | 1 contoh pengajuan dari user contoh |

---

## 🔌 API Endpoints

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/catalogs` | Ambil semua data proposal pengajuan |
| `GET` | `/user` | Ambil data user yang sedang login (butuh auth Sanctum) |

---

## 🗄️ Skema Database

### Tabel yang sudah ada

| Tabel | Keterangan |
|---|---|
| `users` | Data akun pengguna |
| `pengajuan` | Data proposal beasiswa yang diajukan mahasiswa |
| `personal_access_tokens` | Token autentikasi Sanctum |

### Tabel yang perlu ditambahkan

| Tabel | Keterangan |
|---|---|
| `beasiswa` | Master data beasiswa tersedia (untuk ExplorePage) |
| `saved_beasiswa` | Relasi user dengan beasiswa yang disimpan/bookmark |
| `dokumen` | File dokumen pendukung pengajuan |

### Kolom yang perlu ditambah

**Tabel `users`:** `role`, `universitas`, `prodi`, `semester`, `ipk`, `jenis_kelamin`, `bio`, `foto_profil`

**Tabel `pengajuan`:** `user_id` *(FK ke users)*, `status`, `catatan_admin`, `reviewed_by`, `reviewed_at`

---

## 🛠️ Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router v7 |
| Backend | Laravel 10, PHP 8.1, Laravel Sanctum |
| Database | MySQL |
| Package Manager | npm (FE), Composer (BE) |

---

## 👥 Kelompok 3

> Tugas Pemrograman Web — Kelompok 3
