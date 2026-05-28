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
