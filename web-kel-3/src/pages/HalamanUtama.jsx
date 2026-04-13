import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ─── PORTAL PROFILE PAGE — Portal Beasiswa ──────────────
// Palette: #000807 · #A2A3BB · #9395D3 · #B3B7EE · #FBF9FF

const NAV_LINKS = [
  { label: "Beranda", href: "index.html" },
  { label: "Tentang", href: "about.html" },
  { label: "Profil Portal", href: "profile.html", active: true },
  { label: "Kontak", href: "contact.html" },
];

const LAYANAN = [
  {
    icon: "🎓",
    title: "KIP Kuliah",
    pengelola: "Kemdikbudristek",
    jenjang: "S1 / D4 / D3",
    desc: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi.",
    tag: "Pemerintah",
  },
  {
    icon: "🌏",
    title: "LPDP",
    pengelola: "Kemenkeu RI",
    jenjang: "S2 / S3",
    desc: "Beasiswa penuh untuk studi lanjut dalam dan luar negeri bagi calon pemimpin dan profesional masa depan.",
    tag: "Pemerintah",
  },
  {
    icon: "🏢",
    title: "Beasiswa Swasta",
    pengelola: "Berbagai Perusahaan",
    jenjang: "S1 / S2",
    desc: "Program beasiswa dari perusahaan swasta nasional dan multinasional untuk mahasiswa berprestasi.",
    tag: "Swasta",
  },
  {
    icon: "🌐",
    title: "Beasiswa Internasional",
    pengelola: "Lembaga Global",
    jenjang: "S1 / S2 / S3",
    desc: "Peluang studi di luar negeri dari universitas dan lembaga internasional terkemuka di seluruh dunia.",
    tag: "Internasional",
  },
];

const NILAI = [
  { icon: "🎯", title: "Akurasi", desc: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan." },
  { icon: "⚖️", title: "Inklusivitas", desc: "Kami menjangkau mahasiswa dari semua latar belakang, daerah, dan kondisi ekonomi." },
  { icon: "🔄", title: "Pembaruan Rutin", desc: "Informasi diperbarui secara berkala mengikuti siklus pendaftaran tiap program beasiswa." },
  { icon: "🤝", title: "Pendampingan", desc: "Bukan sekadar info — kami menyediakan panduan dan dukungan di setiap tahap pendaftaran." },
];

const STATS = [
  { value: "580+", label: "Beasiswa Aktif", sub: "dari 40+ lembaga" },
  { value: "12K+", label: "Pengguna Terdaftar", sub: "dan terus bertambah" },
  { value: "34", label: "Provinsi Terjangkau", sub: "seluruh Indonesia" },
  { value: "2022", label: "Tahun Berdiri", sub: "3 tahun beroperasi" },
];

const ALUR = [
  { no: "01", icon: "👤", title: "Buat Akun", desc: "Daftar gratis dan lengkapi profil akademik serta kebutuhan finansialmu." },
  { no: "02", icon: "🔍", title: "Cari & Filter", desc: "Gunakan filter pintar untuk menemukan beasiswa yang paling sesuai profilmu." },
  { no: "03", icon: "📄", title: "Siapkan Berkas", desc: "Ikuti panduan dokumen lengkap dan checklist yang kami sediakan per beasiswa." },
  { no: "04", icon: "📬", title: "Daftar & Pantau", desc: "Submit lamaran dan pantau status penerimaan langsung dari dashboard." },
];

const ALUR_PROPOSAL = [
  { no: "01", icon: "✍️", title: "Isi Profil Diri", desc: "Lengkapi data akademik, IPK, kondisi ekonomi, dan prestasi yang kamu miliki." },
  { no: "02", icon: "📝", title: "Tulis Proposal", desc: "Ceritakan latar belakang, motivasi, dan rencana studi atau karir ke depan." },
  { no: "03", icon: "📎", title: "Lampirkan Dokumen", desc: "Upload KTP, KTM, transkrip nilai, dan surat keterangan yang relevan." },
  { no: "04", icon: "🚀", title: "Kirim & Tunggu", desc: "Proposal ditinjau tim kami dan dicocokkan dengan mitra pemberi beasiswa." },
];

const KRITERIA = [
  { icon: "📚", title: "Prestasi Akademik", desc: "IPK minimal 3.00 atau memiliki prestasi non-akademik yang menonjol." },
  { icon: "💡", title: "Motivasi Kuat", desc: "Tujuan studi yang jelas dan komitmen untuk berkontribusi bagi masyarakat." },
  { icon: "🏠", title: "Keterbatasan Finansial", desc: "Berasal dari keluarga dengan kondisi ekonomi yang membutuhkan dukungan pendidikan." },
  { icon: "🌍", title: "Visi ke Depan", desc: "Rencana konkret bagaimana pendidikan yang didapat akan memberikan dampak positif." },
];

// ── Navbar ───────────────────────────────────────────────


// ── Hero ─────────────────────────────────────────────────
const Hero = () => {
  return(
    <div 
    id="beranda"
    className={`bg-[rgba(255,255,255,1)] h-[999px]`}>
      <div className={`absolute z-0 w-full h-[999px] overflow-hidden`}>
        <div className={`absolute right-[0px] bottom-[0px] bg-[rgba(255,49,46,1)] w-[545.62px] h-[760.81px] rotate-[55.63deg] rounded-[50%] blur-[180px]`}></div>
      </div>
      <div className={`flex flex-col justify-center h-full relative z-1`}>
        <h1 className={`text-[64px] font-plex font-semibold text-center mx-auto`}>Mengenal <span className="text-[rgba(255,49,46,1)] font-bold">Portal Beasiswa</span> <br />Lebih Dekat</h1>
        <p className={`text-[20px] text-center w-[888px] mx-auto font-plex`}>Portal beasiswa digital yang dirancang khusus untuk membantu mahasiswa Indonesia menemukan, memahami, dan mendaftar beasiswa — secara cepat, akurat, dan gratis.</p>
      </div>
    </div>
  )
}

// ── Identitas Portal ─────────────────────────────────────
const IdentitasPortal = () => {

  const itemSedia = [
    {
      icon: "",
      title: "Akurasi", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan."
    },
    {
      icon: "",
      title: "Inklusivitas", 
      text: "Kami menjangkau mahasiswa dari semua latar belakang, daerah, dan kondisi ekonomi."
    },
    {
      icon: "",
      title: "Update", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan."
    },
    {
      icon: "",
      title: "Pendampingan", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan."
    },

  ]
  return(
    <div 
    id="profil"
    className={`flex gap-[48px] bg-[rgba(81,80,82,1)] h-[1080px] w-full rounded-[30px]`}>
      <div className={`bg-[rgba(0,1,3,1)] w-[1030px] h-full rounded-[30px] pl-[100px]`}>
        <h1 className={`text-[rgba(255,255,255,1)] text-[40px] font-plex mt-[118px]`}>Platform Independen yang Berpihak pada Mahasiswa</h1>
        <p className={`text-[24px] text-[rgba(255,255,255,1)] font-plex w-[816px] mt-[157px]`}>Portal Beasiswa adalah portal beasiswa independen yang dibangun dengan satu tujuan: menghapus kesenjangan informasi antara mahasiswa dan peluang beasiswa yang tersedia. </p>
        <p className={`text-[24px] text-[rgba(255,255,255,1)] font-plex w-[816px] mt-[28px]`}>Kami bukan lembaga pemberi beasiswa. Kami adalah agregator dan kurator informasi. Setiap data yang kami sajikan berasal langsung dari sumber resmi seperti Kemdikbudristek, LPDP, universitas, dan lembaga swasta terverifikasi.</p>
        <p className={`text-[24px] text-[rgba(255,255,255,1)] font-plex w-[816px] mt-[28px]`}>Layanan ini sepenuhnya <span className="text-[rgba(255,49,46,1)]">gratis</span> dan dapat diakses oleh seluruh mahasiswa Indonesia tanpa terkecuali.</p>     
      </div>
      <div className={`flex justify-center items-center h-full w-[calc(100%-1030px)]`}>
        <div className={`flex flex-col gap-[62px]`}>
          {itemSedia.map((item) => (
            <div 
            key={item}
            className={`flex items-center gap-[26px] bg-[rgba(51,49,56,1)] h-[145px] mr-[100px] px-[29px]`}>
              <div className={`bg-[rgba(81,80,82,1)] border border-[rgba(255,49,46,1)] rounded-[10px] w-[93px] h-[93px] flex-shrink-0`}>

              </div>
              <div className={`w-auto flex flex-col gap-[13px]`}>
                <h2 className={`text-[rgba(255,255,255,1)] text-[24px] font-semibold font-plex w-auto inline-block`}>{item.title}</h2>
                <p className={`text-[rgba(255,255,255,1)] text-[20px] font-normal font-plex w-auto inline-block`}>{item.text}</p>
              </div>
            </div>  
          ))}
        </div>
      </div>
      
    </div>
  )
};

// ── Layanan / Jenis Beasiswa ─────────────────────────────
const LayananBeasiswa = () => {

  const itemBeasiswa = [
    {
      logo: "",
      jenis: "KIP",
      pengelola: "Pemerintah",
      text: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi."
    },
    {
      logo: "",
      jenis: "LPDP",
      pengelola: "Pemerintah",
      text: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi."
    },
    {
      logo: "",
      jenis: "Beasiswa Swasta",
      pengelola: "Pemerintah",
      text: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi."
    },
    {
      logo: "",
      jenis: "Beasiswa Internasional",
      pengelola: "Pemerintah",
      text: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi."
    },
  ]
  return(
    <div 
    id="jenis"
    className={`h-[1080px] bg-[rgba(255,255,250),1]`}>
      <div className={`relative overflow-hidden`}>
        <div className={`relative top-[-170px] mx-auto bg-[linear-gradient(90deg,rgba(81,80,82,1)0%,rgba(182,180,184,0.5)16%,rgba(255,255,255,0)30%,rgba(255,255,255,0)74%,rgba(182,180,184,0.5)87%,rgba(81,80,82,1)100%)] rounded-[50%] w-[1896px] h-[281px]`}></div>  
      </div>
      <h1 className={`text-[64px] font-semibold font-plex w-[1085px] ml-[100px]`}>Jenis-jenis <span className={`text-[rgba(81,80,82,1)] font-bold`}>beasiswa</span> yang kami kelola</h1>
      <div className={`flex mt-[136px] mx-[100px] grid grid-cols-2 gap-[70px]`}>
        {itemBeasiswa.map((item) => (
          <div
          key={item}
          className={`flex justify-center items-center bg-[linear-gradient(90deg,rgba(255,49,46,0)40%,rgba(255,49,46,1)100%)] w-[685px] h-[170px]`}
          >
            <div className={`grid grid-cols-4 grid-rows-2 bg-[rgba(255,255,250,1)] w-[679px] h-[164px] p-[20px_50px_20px_50px]`}>
              <div className={`w-[53px] h-[53px] bg-[rgba(81,80,82,1)]`}>

              </div>
              <div className={`flex items-center col-[2/4]`}>
                <h2 className={` text-[rgba(255,49,46,1)] text-[24px] font-semibold`}>{item.jenis}</h2>
              </div>
              <div className={`flex items-center col-start-4`}>
                <div className={`bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] text-[18px] text-center font-semibold font-plex w-[155px] h-[33px] rounded-[20px]`}>
                  {item.pengelola}
                </div>
              </div>
              <p className={`col-span-4 text-[16px] font-semibold font-plex`}>Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa dari keluarga kurang mampu yang berprestasi.</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
};

// ── Alur Penggunaan ──────────────────────────────────────
const listItems = [
  { text: "Prestasi Akademik"},
  { text: "Motivasi Kuat"},
  { text: "Keterbatasan Finansial"},
  { text: "Visi ke Depan"},
];


const PengajuanBeasiswa = () => {
  return (
    <div 
    id=""
    className="relative min-h-screen bg-[#FCEAE8] overflow-hidden flex items-center">
      <div className="relative z-10 mx-[100px] pt-[80px] pb-[162px] w-full">
        <h1 className="font-['IBM_Plex_Mono'] text-[48px] font-bold text-[rgba(0,0,0,1)] mt-[80px]">
          Ayo ikut! ajukan dirimu untuk<br />
          <span className="block text-[rgba(153,49,51,1)] font-semibold">
            mendapatkan beasiswa
          </span>
        </h1>
        <div className="flex justify-between items-center mt-[97px]">
          <div className="flex flex-col gap-4">
            {listItems.map((item, i) => (
              <div
                key={item}
                className="flex items-center bg-[rgba(51,49,56,1)] text-[32px] text-[rgba(255,255,250,1)] font-plex font-semibold w-[856px] h-[120px]"
              >
                <p className={`ml-[106px]`}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="border border-[#FF312E] rounded-[4px] p-8 bg-[rgba(252,234,232,0.6)] backdrop-blur-sm flex flex-col items-center justify-center gap-6 w-[650px] h-[618px] animate-[fadeUp_0.5s_0.35s_ease_both]">
            <div></div>
            <p className="font-['IBM_Plex_Mono'] text-[24pxpx] text-[#000000] text-center leading-relaxed w-[560px]">
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
      <section className="relative overflow-hidden mx-[100px] pt-20 pb-[72px]">
        <div className="relative z-10 max-w-[500px]">
          <h2 className="text-white text-[40px] font-bold leading-[1.2] mb-6 animate-[fadeUp_0.6s_0.1s_ease_both]">
            Siap Menemukan Beasiswamu?
          </h2>
          <p className="text-white/60 text-[14px] leading-[1.75] mb-10 max-w-[380px] animate-[fadeUp_0.6s_0.2s_ease_both]">
            Ratusan peluang beasiswa menunggumu. Mulai pencarian sekarang – gratis, cepat, dan tanpa ribet.
          </p>
          <div className="flex gap-5 flex-wrap animate-[fadeUp_0.6s_0.3s_ease_both]">
            <button
            onClick={() => navigate("/catalog")}
              href="#"
              className="bg-[#FF312E] text-white text-[15px] font-semibold px-12 py-[18px] rounded-[4px] transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
            >
              Mulai Cari
            </button>
            <a
              href="#"
              className="bg-transparent text-white text-[15px] font-normal px-12 py-[18px] rounded-[4px] border border-white/35 transition-all duration-200 hover:border-white hover:-translate-y-0.5"
            >
              Pelajari lebih lanjut
            </a>
          </div>
        </div>
      </section>
      <div className="bg-[#140606] px-16">
        <hr className="border-none border-t border-[#FF312E] opacity-70" style={{ borderTopWidth: "1px", borderTopStyle: "solid" }} />
      </div>

      {/* Footer */}
      <footer className="bg-[#140606] relative px-16 py-6">
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-white text-[16px] font-bold">Portal Beasiswa</span>
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/50 text-[13px] hover:text-white transition-colors duration-200"
              >
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


// ─── PORTAL PROFILE PAGE ─────────────────────────────────
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