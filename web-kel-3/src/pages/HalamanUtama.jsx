import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ── Hero ─────────────────────────────────────────────────
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      id="beranda"
      className="bg-surface h-[999px] [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px] relative"
    >
      {/* Background Glow */}
      <div className="absolute z-0 w-full h-[999px] overflow-hidden [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px]">
        <div className="absolute right-[0px] bottom-[0px] bg-secondary w-[545.62px] h-[760.81px] rotate-[55.63deg] rounded-[50%] blur-[180px] [@media(0px<width<=768px)]:w-[300px] [@media(0px<width<=768px)]:h-[400px] [@media(768px<width<=1024px)]:w-[200px] [@media(768px<width<=1024px)]:h-[350px]"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center h-full relative z-1 py-[80px] [@media(0px<width<=768px)]:py-[120px] [@media(768px<width<=1024px)]:py-[140px]">
        <h1 className="text-[64px] font-plex font-semibold text-center mx-auto text-primary [@media(0px<width<=768px)]:text-[32px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:text-[48px] [@media(768px<width<=1024px)]:px-[40px] [@media(1024px<width<=1440px)]:text-[48px]">
          Akses <span className="text-secondary font-bold font-plex">Beasiswa</span> Terpercaya<br /> dalam Genggaman
        </h1>
        
        <p className="text-[20px] text-center w-[888px] mx-auto font-plex mt-6 text-primary opacity-80 [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:text-[14px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:text-[16px] [@media(768px<width<=1024px)]:px-[60px] [@media(1024px<width<=1440px)]:w-[700px] [@media(1024px<width<=1440px)]:text-[18px]">
          Portal beasiswa digital yang dirancang khusus untuk membantu mahasiswa Indonesia menemukan, memahami, dan mendaftar beasiswa — secara cepat, akurat, dan gratis.
        </p>

        {/* Tombol ke Catalog */}
        <button
          onClick={() => navigate("/catalog")}
          className="mt-12 bg-secondary text-surface font-plex font-bold text-[18px] px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-secondary-dark active:scale-95 [@media(0px<width<=768px)]:text-[15px] [@media(0px<width<=768px)]:px-8 [@media(0px<width<=768px)]:mt-8"
        >
          Eksplor Beasiswa Sekarang
        </button>
      </div>
    </div>
  );
};

// ── Identitas Portal ─────────────────────────────────────
const IdentitasPortal = () => {
  const itemSedia = [
    { 
      title: "Akurasi", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] text-secondary">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    { 
      title: "Inklusivitas", 
      text: "Kami menjangkau mahasiswa dari semua latar belakang, daerah, dan kondisi ekonomi.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] text-secondary">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      title: "Update", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] text-secondary">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    { 
      title: "Pendampingan", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] text-secondary">
          <circle cx="12" cy="12" r="10" />
          <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>
      )
    },
  ];

  return (
    <div
      id="profil"
      className="flex items-stretch gap-[48px] bg-[#515052] min-h-[1080px] w-full rounded-[30px] [@media(1024px<width<=1440px)]:min-h-[950px] [@media(768px<width<=1024px)]:flex-col [@media(768px<width<=1024px)]:h-auto [@media(768px<width<=1024px)]:rounded-[20px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:rounded-[20px]"
    >
      {/* SEKSI KIRI */}
      <div className="bg-[rgba(0,1,3,1)] w-[55%] h-auto rounded-[30px] pl-[100px] pr-[50px] pb-[80px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:px-[40px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:px-[24px]">
        
        <h1 className="text-[56px] text-surface font-plex font-semibold mt-[118px] [@media(1024px<width<=1440px)]:text-[32px]">
          <span className="bg-gradient-to-r from-secondary via-secondary-light to-[#515052] bg-clip-text text-transparent">Platform Independen</span> yang Berpihak pada Mahasiswa
        </h1>

        <p className="text-[24px] text-surface font-plex mt-[157px] [@media(1024px<width<=1440px)]:text-[16px] [@media(1024px<width<=1440px)]:mt-[60px]">
          ScholarHub dibangun dengan satu tujuan: menghapus kesenjangan informasi antara mahasiswa dan peluang beasiswa yang tersedia.
        </p>

        <div className="bg-gradient-to-r from-secondary to-transparent w-[300px] h-[5px] mt-[30px]"></div>

        <p className="text-[24px] text-surface font-plex mt-[28px] [@media(1024px<width<=1440px)]:text-[16px]">
          Kami bukan lembaga pemberi beasiswa. Kami adalah agregator dan kurator informasi.
        </p>

        <div className="flex justify-center items-center bg-primary text-surface font-plex h-[150px] mt-[70px] mr-[40px] border border-secondary text-center px-6 [@media(1024px<width<=1440px)]:h-[80px]">
          Layanan 100% Gratis untuk seluruh mahasiswa Indonesia.
        </div>
      </div>

      {/* SEKSI KANAN */}
      <div className="flex flex-col justify-center w-[45%] pr-[100px] py-[80px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:px-[40px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:px-[24px]">
        <div className="flex flex-col gap-[62px] w-full [@media(1024px<width<=1440px)]:gap-[30px]">
          {itemSedia.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-[26px] bg-primary h-[145px] mr-[100px] px-[29px] [@media(1024px<width<=1440px)]:mr-[0px] [@media(1024px<width<=1440px)]:h-[110px] [@media(768px<width<=1024px)]:h-auto [@media(768px<width<=1024px)]:py-[24px]"
            >
              <div className="bg-[#515052] border border-secondary rounded-[10px] w-[93px] h-[93px] flex-shrink-0 flex items-center justify-center [@media(1024px<width<=1440px)]:w-[60px] [@media(1024px<width<=1440px)]:h-[60px]">
                {item.icon}
              </div>
              <div className="flex-1 flex flex-col justify-center overflow-hidden">
                <h2 className="text-surface font-semibold font-plex text-[24px] [@media(1024px<width<=1440px)]:text-[16px]">{item.title}</h2>
                <p className="text-surface font-normal font-plex text-[20px] leading-tight opacity-70 [@media(1024px<width<=1440px)]:text-[12px]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Layanan / Jenis Beasiswa ─────────────────────────────
const LayananBeasiswa = () => {
  const itemBeasiswa = [
    { 
      jenis: "Prestasi", 
      pengelola: "Pemerintah", 
      text: "Apresiasi dana pendidikan yang dikhususkan bagi mahasiswa dengan pencapaian akademik luar biasa.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%] text-secondary">
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      )
    },
    { 
      jenis: "Reguler", 
      pengelola: "Pemerintah", 
      text: "Bantuan biaya pendidikan secara berkala untuk mahasiswa aktif dari berbagai jurusan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%] text-secondary">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      )
    },
    { 
      jenis: "Leadership", 
      pengelola: "Pemerintah", 
      text: "Dukungan bagi agen perubahan yang aktif berkontribusi di organisasi kampus.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%] text-secondary">
          <circle cx="9" cy="7" r="4" />
          <path d="m14.5 12.5 3 3 4.5-4.5" />
        </svg>
      )
    },
  ];

  return (
    <div id="jenis" className="h-auto bg-surface pb-[200px]">
      <div className="flex flex-col mt-[136px] mx-[100px] gap-[30px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mx-[24px]">
        {itemBeasiswa.map((item) => (
          <div
            key={item.jenis}
            className="bg-gradient-to-r from-transparent via-transparent to-secondary w-full h-[250px] [@media(0px<width<=768px)]:h-auto"
          >
            <div className="flex bg-surface w-[99%] h-[240px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto">
              <div className="w-[250px] h-[250px] bg-[#515052] flex-shrink-0 flex items-center justify-center [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:h-[160px]">
                {item.icon}
              </div>
              
              <div className="px-[20px] ml-[70px] w-[calc(100%-250px)] [@media(0px<width<=768px)]:ml-[0px] [@media(0px<width<=768px)]:w-full">
                <div className="flex justify-between mt-[20px]">
                  <h2 className="text-secondary text-[24px] font-semibold">{item.jenis}</h2>
                  <div className="bg-secondary text-surface text-[18px] flex items-center justify-center font-semibold font-plex w-[155px] h-[33px] rounded-[20px] [@media(0px<width<=768px)]:w-[110px] text-sm">
                    {item.pengelola}
                  </div>
                </div>
                <p className="text-[16px] font-semibold font-plex text-primary mt-[30px]">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Pengajuan Beasiswa ───────────────────────────────────
const PengajuanBeasiswa = () => {
  const listItems = [
    { text: "Prestasi Akademik", icon: "path-to-icon" },
    { text: "Motivasi Kuat", icon: "path-to-icon" },
    { text: "Keterbatasan Finansial", icon: "path-to-icon" },
    { text: "Visi ke Depan", icon: "path-to-icon" },
  ];

  return (
    <div id="pengajuan" className="relative min-h-screen bg-secondary-soft overflow-hidden flex items-center py-20">
      <div className="relative z-10 mx-[100px] w-full [@media(0px<width<=768px)]:mx-[24px]">
        <h1 className="font-plex text-[48px] font-bold text-primary">
          Ayo ikut! ajukan dirimu untuk<br />
          <span className="block text-secondary-dark font-semibold">mendapatkan beasiswa</span>
        </h1>

        <div className="flex flex-row justify-between items-stretch mt-[80px] gap-8 [@media(0px<width<=1024px)]:flex-col">
          <div className="flex flex-col gap-4 flex-[1.2]">
            {listItems.map((item) => (
              <div
                key={item.text}
                className="group flex items-center bg-primary text-surface font-plex font-semibold h-[120px] transition-all duration-300 hover:bg-secondary hover:translate-x-4"
              >
                <div className="ml-[40px] text-secondary group-hover:text-surface transition-colors">
                  <div className="w-8 h-8 bg-current"></div>
                </div>
                <p className="ml-[40px] text-[24px] [@media(0px<width<=768px)]:text-[18px]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="group border-2 border-secondary rounded-[4px] p-8 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center gap-8 flex-1 transition-all duration-500 hover:shadow-[15px_15px_0px_0px_theme(colors.secondary)]">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-surface mb-4 animate-bounce">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p className="font-plex text-[24px] text-center font-bold text-primary italic">"Tujuan studi yang jelas adalah kunci utama lolos seleksi."</p>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Footer ───────────────────────────────────────────────
const CTAFooter = () => {
  const navigate = useNavigate();
  const navLinks = ["Beranda", "Tentang", "Jenis", "Kontak"];

  return (
    <div className="font-plex bg-[rgba(0,1,3,1)]">
      <section className="relative overflow-hidden mx-[100px] pt-20 pb-[72px] [@media(0px<width<=768px)]:mx-[24px]">
        <div className="relative z-10 max-w-[500px]">
          <h2 className="text-surface text-[40px] font-bold leading-[1.2] mb-6">
            Siap Menemukan Beasiswamu?
          </h2>
          <p className="text-surface opacity-60 text-[14px] leading-[1.75] mb-10">
            Ratusan peluang beasiswa menunggumu. Mulai pencarian sekarang – gratis, cepat, dan tanpa ribet.
          </p>
          <div className="flex gap-5 flex-wrap">
            <button
              onClick={() => navigate("/catalog")}
              className="bg-secondary text-surface text-[15px] font-semibold px-12 py-[18px] rounded-[4px] transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
            >
              Mulai Cari
            </button>
            <a href="#" className="bg-transparent text-surface text-[15px] border border-white/35 px-12 py-[18px] rounded-[4px] hover:border-surface">
              Pelajari lebih lanjut
            </a>
          </div>
        </div>
      </section>
      <div className="bg-[#140606] px-16">
        <hr className="border-none border-t border-secondary opacity-70" style={{ borderTopWidth: "1px", borderTopStyle: "solid" }} />
      </div>
      <footer className="bg-[#140606] relative px-16 py-6 flex items-center justify-between [@media(0px<width<=768px)]:flex-col">
        <span className="text-surface text-[16px] font-bold">Portal Beasiswa</span>
        <nav className="flex gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-surface opacity-50 text-[13px] hover:opacity-100 transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <span className="text-surface opacity-40 text-[13px]">© 2025 Portal Beasiswa Indonesia.</span>
      </footer>
    </div>
  );
};

// ─── HALAMAN UTAMA ───────────────────────────────────────
const HalamanUtama = () => (
  <div className="font-sans bg-surface">
    <Hero />
    <IdentitasPortal />
    <LayananBeasiswa />
    <PengajuanBeasiswa />
    <CTAFooter />
  </div>
);

export default HalamanUtama;