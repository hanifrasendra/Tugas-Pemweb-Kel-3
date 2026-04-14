import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Beranda", href: "index.html" },
  { label: "Tentang", href: "about.html" },
  { label: "Profil Portal", href: "profile.html", active: true },
  { label: "Kontak", href: "contact.html" },
];

const LAYANAN = [
  { icon: "🎓", title: "KIP Kuliah", pengelola: "Kemdikbudristek", jenjang: "S1 / D4 / D3", desc: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi.", tag: "Pemerintah" },
  { icon: "🌏", title: "LPDP", pengelola: "Kemenkeu RI", jenjang: "S2 / S3", desc: "Beasiswa penuh untuk studi lanjut dalam dan luar negeri bagi calon pemimpin dan profesional masa depan.", tag: "Pemerintah" },
  { icon: "🏢", title: "Beasiswa Swasta", pengelola: "Berbagai Perusahaan", jenjang: "S1 / S2", desc: "Program beasiswa dari perusahaan swasta nasional dan multinasional untuk mahasiswa berprestasi.", tag: "Swasta" },
  { icon: "🌐", title: "Beasiswa Internasional", pengelola: "Lembaga Global", jenjang: "S1 / S2 / S3", desc: "Peluang studi di luar negeri dari universitas dan lembaga internasional terkemuka di seluruh dunia.", tag: "Internasional" },
];

// ── Hero ─────────────────────────────────────────────────
const Hero = () => {
  return (
    <div
      id="beranda"
      className={`bg-[rgba(255,255,255,1)] h-[999px] [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px]`}
    >
      <div className={`absolute z-0 w-full h-[999px] overflow-hidden [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px]`}>
        <div className={`absolute right-[0px] bottom-[0px] bg-[rgba(255,49,46,1)] w-[545.62px] h-[760.81px] rotate-[55.63deg] rounded-[50%] blur-[180px] [@media(0px<width<=768px)]: [@media(0px<width<=768px)]:w-[300px] [@media(0px<width<=768px)]:h-[400px] [@media(768px<width<=1024px)]:w-[200px] [@media(768px<width<=1024px)]:h-[350px]`}></div>
      </div>
      <div className={`flex flex-col justify-center h-full relative z-1 py-[80px] [@media(0px<width<=768px)]:py-[120px] [@media(768px<width<=1024px)]:py-[140px]`}>
        <h1 className={`text-[64px] font-plex font-semibold text-center mx-auto [@media(0px<width<=768px)]:text-[32px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:text-[48px] [@media(768px<width<=1024px)]:px-[40px] [@media(1024px<width<=1440px)]:text-[48px]`}>
          Mengenal <span className="text-[rgba(255,49,46,1)] font-bold">Portal Beasiswa</span> <br />Lebih Dekat
        </h1>
        <p className={`text-[20px] text-center w-[888px] mx-auto font-plex [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:text-[14px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:text-[16px] [@media(768px<width<=1024px)]:px-[60px] [@media(1024px<width<=1440px)]:w-[700px] [@media(1024px<width<=1440px)]:text-[18px]`}>
          Portal beasiswa digital yang dirancang khusus untuk membantu mahasiswa Indonesia menemukan, memahami, dan mendaftar beasiswa — secara cepat, akurat, dan gratis.
        </p>
      </div>
    </div>
  );
};

// ── Identitas Portal ─────────────────────────────────────
const IdentitasPortal = () => {
  const itemSedia = [
    { icon: "", title: "Akurasi", text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan." },
    { icon: "", title: "Inklusivitas", text: "Kami menjangkau mahasiswa dari semua latar belakang, daerah, dan kondisi ekonomi." },
    { icon: "", title: "Update", text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan." },
    { icon: "", title: "Pendampingan", text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan." },
  ];

  return (
    <div
      id="profil"
      className={`flex gap-[48px] bg-[rgba(81,80,82,1)] h-[1080px] w-full rounded-[30px] [@media(1024px<width<=1440px)]:h-[950px] [@media(768px<width<=1024px)]:flex-col [@media(768px<width<=1024px)]:h-auto [@media(768px<width<=1024px)]:rounded-[20px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:rounded-[20px]`}
    >
      <div className={`bg-[rgba(0,1,3,1)] w-[55%] h-full rounded-[30px] pl-[100px] pr-[50px] [@media(1024px<width<=1440px)]:w-[976px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:rounded-[20px] [@media(768px<width<=1024px)]:pl-[40px] [@media(768px<width<=1024px)]:pr-[40px] [@media(768px<width<=1024px)]:pb-[40px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:rounded-[20px] [@media(0px<width<=768px)]:pl-[24px] [@media(0px<width<=768px)]:pr-[24px] [@media(0px<width<=768px)]:pb-[40px]`}>
        <h1 className={`text-[rgba(255,255,255,1)] text-[56px] font-plex font-semibold mt-[118px] [@media(1024px<width<=1440px)]:text-[32px] [@media(768px<width<=1024px)]:text-[36px] [@media(768px<width<=1024px)]:mt-[60px] [@media(0px<width<=768px)]:text-[26px] [@media(0px<width<=768px)]:mt-[48px]`}>
          <span className={`bg-[linear-gradient(90deg,rgba(131,130,133,1),rgba(182,180,184,1),rgba(81,80,82,1))] bg-clip-text text-transparent`}>Platform Independen</span> yang Berpihak pada Mahasiswa
        </h1>
        <p className={`text-[24px] text-[rgba(255,255,255,1)] font-plex mt-[157px] [@media(1024px<width<=1440px)]:text-[20px] [@media(768px<width<=1024px)]:text-[18px] [@media(768px<width<=1024px)]:mt-[40px] [@media(0px<width<=768px)]:text-[15px] [@media(0px<width<=768px)]:mt-[32px]`}>
          ScholarHub dibangun dengan satu tujuan: menghapus kesenjangan informasi antara mahasiswa dan peluang beasiswa yang tersedia.
        </p>
        <div className={`bg-[linear-gradient(90deg,rgba(255,49,46,1),rgba(255,255,255,0))] w-[300px] h-[5px] mt-[30px] [@media(0px<width<=768px)]:w-[200px]`}></div>
        <p className={`text-[24px] text-[rgba(255,255,255,1)] font-plex mt-[28px] [@media(1024px<width<=1440px)]:text-[20px] [@media(768px<width<=1024px)]:text-[18px] [@media(0px<width<=768px)]:text-[15px]`}>
          Kami bukan lembaga pemberi beasiswa. Kami adalah agregator dan kurator informasi. Setiap data yang kami sajikan berasal langsung dari sumber resmi.
        </p>
        <div className={`flex justify-center items-center bg-[rgba(51,49,56,1)] text-[rgba(255,255,255,1)] font-plex h-[150px] mt-[70px] mr-[40px] border border-[rgba(255,49,46,1)] [@media(768px<width<=1024px)]:mr-[0px] [@media(768px<width<=1024px)]:mt-[40px] [@media(0px<width<=768px)]:mr-[0px] [@media(0px<width<=768px)]:mt-[32px] [@media(768px<width<=1024px)]:h-[120px] [@media(0px<width<=768px)]:h-[80px]`}>
          Layanan 100% Gratis untuk seluruh mahasiswa Indonesia.
        </div>
      </div>
      <div className={`flex justify-center items-center h-full w-[45%] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:pb-[40px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:pb-[40px]`}>
        <div className={`flex flex-col gap-[62px] [@media(768px<width<=1024px)]:gap-[24px] [@media(0px<width<=768px)]:gap-[16px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:px-[24px]`}>
          {itemSedia.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-[26px] bg-[rgba(51,49,56,1)] h-[145px] mr-[100px] px-[29px] [@media(1024px<width<=1440px)]:h-[120px] [@media(768px<width<=1024px)]:mr-[40px] [@media(768px<width<=1024px)]:h-[110px] [@media(0px<width<=768px)]:mr-[0px] [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:py-[16px]`}
            >
              <div className={`bg-[rgba(81,80,82,1)] border border-[rgba(255,49,46,1)] rounded-[10px] w-[93px] h-[93px] flex-shrink-0 [@media(1024px<width<=1440px)]:w-[60px] [@media(1024px<width<=1440px)]:h-[60px] [@media(768px<width<=1024px)]:w-[60px] [@media(768px<width<=1024px)]:h-[60px] [@media(0px<width<=768px)]:w-[48px] [@media(0px<width<=768px)]:h-[48px]`}></div>
              <div className={`w-auto flex flex-col gap-[13px]`}>
                <h2 className={`text-[rgba(255,255,255,1)] text-[24px] font-semibold font-plex w-auto inline-block [@media(1024px<width<=1440px)]:text-[16px] [@media(768px<width<=1024px)]:text-[16px] [@media(0px<width<=768px)]:text-[14px]`}>{item.title}</h2>
                <p className={`text-[rgba(255,255,255,1)] text-[20px] font-normal font-plex w-auto inline-block [@media(1024px<width<=1440px)]:text-[14px] [@media(768px<width<=1024px)]:text-[13px] [@media(0px<width<=768px)]:text-[12px]`}>{item.text}</p>
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
    { logo: "", jenis: "Prestasi", pengelola: "Pemerintah", text: "Apresiasi dana pendidikan yang dikhususkan bagi mahasiswa dengan pencapaian akademik luar biasa (IPK tinggi) atau juara kompetisi bergengsi." },
    { logo: "", jenis: "Reguler", pengelola: "Pemerintah", text: "Bantuan biaya pendidikan secara berkala untuk mahasiswa aktif dari berbagai jurusan yang memenuhi kelengkapan administrasi dan standar IPK minimal." },
    { logo: "", jenis: "Leadership", pengelola: "Pemerintah", text: "Dukungan bagi agen perubahan. Diperuntukkan bagi mahasiswa yang aktif berkontribusi di organisasi kampus, kerelawanan sosial, dan komunitas." },
  ];

  return (
    <div
      id="jenis"
      className={`h-auto bg-[rgba(255,255,250),1] pb-[200px] [@media(0px<width<=768px)]:pb-[80px] [@media(768px<width<=1024px)]:pb-[100px]`}
    >
      <div className={`relative overflow-hidden`}>
        <div className={`relative top-[-170px] mx-auto bg-[linear-gradient(90deg,rgba(81,80,82,1)0%,rgba(182,180,184,0.5)16%,rgba(255,255,255,0)30%,rgba(255,255,255,0)74%,rgba(182,180,184,0.5)87%,rgba(81,80,82,1)100%)] rounded-[50%] w-[98%] h-[281px] [@media(0px<width<=768px)]:w-[99%] [@media(768px<width<=1024px)]:w-[98%]`}></div>
      </div>
      <p className={`text-[32px] text-[rgba(255,49,46,1)] font-plex font-semibold mx-[100px] pl-[20px] [@media(1024px<width<=1440px)]:text-center [@media(1024px<width<=1440px)]:pl-[0px] [@media(768px<width<=1024px)]:text-center [@media(768px<width<=1024px)]:pl-[0px] [@media(768px<width<=1024px)]:mx-[40px] [@media(768px<width<=1024px)]:text-[24px] [@media(0px<width<=768px)]:text-center [@media(0px<width<=768px)]:pl-[0px] [@media(0px<width<=768px)]:mx-[24px] [@media(0px<width<=768px)]:text-[20px]`}>
        Kategori Program
      </p>
      <h1 className={`text-[64px] font-semibold font-plex w-[1085px] mt-[40px] mx-[100px] [@media(1024px<width<=1440px)]:text-center [@media(1024px<width<=1440px)]:w-auto [@media(1024px<width<=1440px)]:text-[48px] [@media(768px<width<=1024px)]:text-[36px] [@media(768px<width<=1024px)]:text-center [@media(768px<width<=1024px)]:text-[40px] [@media(768px<width<=1024px)]:w-auto [@media(768px<width<=1024px)]:mx-[0px] [@media(768px<width<=1024px)]:px-[40px] [@media(768px<width<=1024px)]:mt-[24px] [@media(0px<width<=768px)]:text-center [@media(0px<width<=768px)]:text-[28px] [@media(0px<width<=768px)]:mx-[0px] [@media(0px<width<=768px)]:px-[24px] [@media(0px<width<=768px)]:w-auto [@media(0px<width<=768px)]:mt-[16px]`}>
        Jenis-jenis <span className={`text-[rgba(81,80,82,1)] font-bold`}>beasiswa</span> yang kami kelola
      </h1>
      <div className={`flex flex-col mt-[136px] mx-[100px] gap-[30px] [@media(768px<width<=1024px)]:mt-[60px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mt-[40px] [@media(0px<width<=768px)]:mx-[24px]`}>
        {itemBeasiswa.map((item) => (
          <div
            key={item.jenis}
            className={`bg-[linear-gradient(90deg,rgba(255,49,46,0)40%,rgba(255,49,46,1)100%)] w-full h-[250px] [@media(0px<width<=768px)]:h-auto [@media(768px<width<=1024px)]:h-auto`}
          >
            <div className={`flex bg-[rgba(255,255,250,1)] w-[99%] h-[240px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto [@media(768px<width<=1024px)]:h-auto`}>
              <div className={`w-[250px] h-[250px] bg-[rgba(81,80,82,1)] flex-shrink-0 [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:h-[160px] [@media(768px<width<=1024px)]:w-[160px] [@media(768px<width<=1024px)]:h-auto`}></div>
              <div className={`px-[20px] ml-[70px] w-[calc(100%-250px)] [@media(0px<width<=768px)]:ml-[0px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:px-[16px] [@media(0px<width<=768px)]:pb-[16px] [@media(768px<width<=1024px)]:ml-[24px] [@media(768px<width<=1024px)]:w-auto [@media(768px<width<=1024px)]:py-[16px]`}>
                <div className={`flex justify-between mt-[20px]`}>
                  <div className={`flex items-center`}>
                    <h2 className={`text-[rgba(255,49,46,1)] text-[24px] font-semibold [@media(0px<width<=768px)]:text-[18px] [@media(768px<width<=1024px)]:text-[20px]`}>{item.jenis}</h2>
                  </div>
                  <div className={`flex items-center`}>
                    <div className={`bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] text-[18px] text-center font-semibold font-plex w-[155px] h-[33px] rounded-[20px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:w-[110px] [@media(0px<width<=768px)]:h-[28px]`}>
                      {item.pengelola}
                    </div>
                  </div>
                </div>
                <p className={`text-[16px] font-semibold font-plex w-auto mt-[30px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:mt-[12px] [@media(768px<width<=1024px)]:text-[14px] [@media(768px<width<=1024px)]:mt-[12px]`}>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Pengajuan Beasiswa ───────────────────────────────────
const listItems = [
  { text: "Prestasi Akademik" },
  { text: "Motivasi Kuat" },
  { text: "Keterbatasan Finansial" },
  { text: "Visi ke Depan" },
];

const PengajuanBeasiswa = () => {
  return (
    <div
      id=""
      className="relative min-h-screen bg-[#FCEAE8] overflow-hidden flex items-center [@media(0px<width<=768px)]:min-h-0 [@media(768px<width<=1024px)]:min-h-0"
    >
      <div className="relative z-10 mx-[100px] pt-[80px] pb-[162px] w-full [@media(0px<width<=768px)]:mx-[24px] [@media(0px<width<=768px)]:pt-[48px] [@media(0px<width<=768px)]:pb-[60px] [@media(768px<width<=1024px)]:mx-[40px] [@media(768px<width<=1024px)]:pt-[60px] [@media(768px<width<=1024px)]:pb-[80px]">
        <h1 className="font-['IBM_Plex_Mono'] text-[48px] font-bold text-[rgba(0,0,0,1)] mt-[80px] [@media(0px<width<=768px)]:text-[28px] [@media(0px<width<=768px)]:mt-[0px] [@media(768px<width<=1024px)]:text-[36px] [@media(768px<width<=1024px)]:mt-[40px]">
          Ayo ikut! ajukan dirimu untuk<br />
          <span className="block text-[rgba(153,49,51,1)] font-semibold">mendapatkan beasiswa</span>
        </h1>
      <div className="flex justify-between items-center mt-[97px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:mt-[40px] [@media(0px<width<=768px)]:gap-[32px] [@media(768px<width<=1024px)]:flex-col [@media(768px<width<=1024px)]:mt-[60px] [@media(768px<width<=1024px)]:gap-[40px]">
      <div className="flex flex-col gap-4 [@media(0px<width<=768px)]:w-full [@media(768px<width<=1024px)]:w-full">
        {listItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center bg-[rgba(51,49,56,1)] text-[32px] text-[rgba(255,255,250,1)] font-plex font-semibold w-[856px] h-[120px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:h-[72px] [@media(0px<width<=768px)]:text-[18px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:h-[90px] [@media(768px<width<=1024px)]:text-[24px] [@media(1024px<width<=1440px)]:w-full"
            >
              <p className={`ml-[106px] [@media(0px<width<=768px)]:ml-[24px] [@media(768px<width<=1024px)]:ml-[48px]`}>{item.text}</p>
          </div>
        ))}
      </div>
          <div className="border border-[#FF312E] rounded-[4px] p-8 bg-[rgba(252,234,232,0.6)] backdrop-blur-sm flex flex-col items-center justify-center gap-6 w-[650px] h-[618px] animate-[fadeUp_0.5s_0.35s_ease_both] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:p-[24px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:h-auto [@media(1024px<width<=1440px)]:w-[420px] [@media(1024px<width<=1440px)]:h-[450px]">
            <div></div>
            <p className="font-['IBM_Plex_Mono'] text-[24px] text-[#000000] text-center leading-relaxed w-[560px] [@media(0px<width<=768px)]:text-[15px] [@media(0px<width<=768px)]:w-full [@media(768px<width<=1024px)]:text-[18px] [@media(768px<width<=1024px)]:w-full [@media(1024px<width<=1440px)]:text-[18px] [@media(1024px<width<=1440px)]:w-full">
              Tujuan studi yang jelas dan komitmen<br />
              untuk berkontribusi bagi masyarakat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Footer ───────────────────────────────────────────────
const navLinks = ["Beranda", "Tentang", "Jenis", "Kontak"];

const CTAFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="font-['IBM_Plex_Mono'] bg-[rgba(0,1,3,1)]">
      <section className="relative overflow-hidden mx-[100px] pt-20 pb-[72px] [@media(0px<width<=768px)]:mx-[24px] [@media(0px<width<=768px)]:pt-[48px] [@media(0px<width<=768px)]:pb-[48px] [@media(768px<width<=1024px)]:mx-[40px]">
        <div className="relative z-10 max-w-[500px] [@media(0px<width<=768px)]:max-w-full">
          <h2 className="text-white text-[40px] font-bold leading-[1.2] mb-6 animate-[fadeUp_0.6s_0.1s_ease_both] [@media(0px<width<=768px)]:text-[28px] [@media(768px<width<=1024px)]:text-[32px]">
            Siap Menemukan Beasiswamu?
          </h2>
          <p className="text-white/60 text-[14px] leading-[1.75] mb-10 max-w-[380px] animate-[fadeUp_0.6s_0.2s_ease_both] [@media(0px<width<=768px)]:max-w-full [@media(0px<width<=768px)]:text-[13px]">
            Ratusan peluang beasiswa menunggumu. Mulai pencarian sekarang – gratis, cepat, dan tanpa ribet.
          </p>
          <div className="flex gap-5 flex-wrap animate-[fadeUp_0.6s_0.3s_ease_both] [@media(0px<width<=768px)]:gap-3">
            <button
              onClick={() => navigate("/catalog")}
              className="bg-[#FF312E] text-white text-[15px] font-semibold px-12 py-[18px] rounded-[4px] transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 [@media(0px<width<=768px)]:px-8 [@media(0px<width<=768px)]:py-[14px] [@media(0px<width<=768px)]:text-[14px]"
            >
              Mulai Cari
            </button>
            <a
              href="#"
              className="bg-transparent text-white text-[15px] font-normal px-12 py-[18px] rounded-[4px] border border-white/35 transition-all duration-200 hover:border-white hover:-translate-y-0.5 [@media(0px<width<=768px)]:px-8 [@media(0px<width<=768px)]:py-[14px] [@media(0px<width<=768px)]:text-[14px]"
            >
              Pelajari lebih lanjut
            </a>
          </div>
        </div>
      </section>
      <div className="bg-[#140606] px-16 [@media(0px<width<=768px)]:px-6">
        <hr className="border-none border-t border-[#FF312E] opacity-70" style={{ borderTopWidth: "1px", borderTopStyle: "solid" }} />
      </div>
      <footer className="bg-[#140606] relative px-16 py-6 [@media(0px<width<=768px)]:px-6 [@media(0px<width<=768px)]:py-8">
        <div className="relative z-10 flex items-center justify-between [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:gap-4 [@media(0px<width<=768px)]:items-start [@media(768px<width<=1024px)]:flex-wrap [@media(768px<width<=1024px)]:gap-4">
          <span className="text-white text-[16px] font-bold">Portal Beasiswa</span>
          <nav className="flex gap-8 [@media(0px<width<=768px)]:gap-5 [@media(0px<width<=768px)]:flex-wrap">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-white/50 text-[13px] hover:text-white transition-colors duration-200">
                {link}
              </a>
            ))}
          </nav>
          <span className="text-white/40 text-[13px]">© 2025 Portal Beasiswa Indonesia.</span>
        </div>
      </footer>
    </div>
  );
};

// ─── HALAMAN UTAMA ───────────────────────────────────────
const HalamanUtama = () => (
  <div className="font-sans bg-[#FBF9FF]">
    <Hero />
    <IdentitasPortal />
    <LayananBeasiswa />
    <PengajuanBeasiswa />
    <CTAFooter />
  </div>
);

export default HalamanUtama;