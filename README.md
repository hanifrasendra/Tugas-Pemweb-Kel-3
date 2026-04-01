# 📦 Cara Menjalankan Project Web

Panduan ini menjelaskan langkah-langkah untuk menjalankan project web ini di lingkungan lokal.

---

## 🚀 1. Clone Repository

Clone project dari repository ke komputer kamu:

git clone https://github.com/username/nama-repo.git
cd nama-repo

---

## 📥 2. Install Dependencies

Pastikan kamu sudah menginstall Node.js (disarankan versi 18 atau lebih baru).

Lalu jalankan:

npm install

---

## ▶️ 3. Menjalankan Project

Untuk menjalankan project dalam mode development:

klik terminal di atas kiri 
type -> cd web-kel-3
enter
type -> npm run dev
---

## 🏗️ 4. Build untuk Production

Untuk membuat versi production:

npm run build

---

## 👀 5. Preview Hasil Build

Untuk melihat hasil build secara lokal:

npm run preview

---

## ⚙️ Persyaratan Sistem

- Node.js (versi 18+)
- npm atau yarn
- Browser (Chrome, Edge, dll)

---

## 🛠️ Troubleshooting

Jika terjadi error saat install atau menjalankan project:

1. Hapus folder node_modules dan file package-lock.json:
   
   rm -rf node_modules package-lock.json

2. Install ulang dependencies:

   npm install

3. Jalankan kembali project:

   npm run dev

Jika port sudah digunakan, kamu bisa mengganti port di file konfigurasi (misalnya vite.config.js).

---

## 📌 Teknologi yang Digunakan

- React
- Vite
- Tailwind CSS

---

## 📞 Kontak

Jika ada kendala atau pertanyaan, silakan hubungi developer.

---
