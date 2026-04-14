import { useNavigate } from "react-router-dom";
import { useState } from "react";


// ── Hero ─────────────────────────────────────────────────
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      id="beranda"
      className={`bg-[rgba(255,255,255,1)] h-[999px] [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px]`}
    >
      {/* Background Glow */}
      <div className={`absolute z-0 w-full h-[999px] overflow-hidden [@media(0px<width<=768px)]:h-[600px] [@media(768px<width<=1024px)]:h-[700px]`}>
        <div className={`absolute right-[0px] bottom-[0px] bg-[rgba(255,49,46,1)] w-[545.62px] h-[760.81px] rotate-[55.63deg] rounded-[50%] blur-[180px] [@media(0px<width<=768px)]:w-[300px] [@media(0px<width<=768px)]:h-[400px] [@media(768px<width<=1024px)]:w-[200px] [@media(768px<width<=1024px)]:h-[350px]`}></div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center items-center h-full relative z-1 py-[80px] [@media(0px<width<=768px)]:py-[120px] [@media(768px<width<=1024px)]:py-[140px]`}>
        <h1 className={`text-[64px] font-plex font-semibold text-center mx-auto [@media(0px<width<=768px)]:text-[32px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:text-[48px] [@media(768px<width<=1024px)]:px-[40px] [@media(1024px<width<=1440px)]:text-[48px]`}>
          Akses <span className="text-[rgba(255,49,46,1)] font-bold font-plex">Beasiswa</span> Terpercaya<br /> dalam Genggaman
        </h1>
        
        <p className={`text-[20px] text-center w-[888px] mx-auto font-plex mt-6 [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:text-[14px] [@media(0px<width<=768px)]:px-[24px] [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:text-[16px] [@media(768px<width<=1024px)]:px-[60px] [@media(1024px<width<=1440px)]:w-[700px] [@media(1024px<width<=1440px)]:text-[18px]`}>
          Portal beasiswa digital yang dirancang khusus untuk membantu mahasiswa Indonesia menemukan, memahami, dan mendaftar beasiswa — secara cepat, akurat, dan gratis.
        </p>

        {/* Tombol ke Catalog */}
        <button
          onClick={() => navigate("/catalog")}
          className={`mt-12 bg-[rgba(255,49,46,1)] text-white font-plex font-bold text-[18px] px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[rgba(220,40,38,1)] active:scale-95 [@media(0px<width<=768px)]:text-[15px] [@media(0px<width<=768px)]:px-8 [@media(0px<width<=768px)]:mt-8`}
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
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    { 
      title: "Inklusivitas", 
      text: "Kami menjangkau mahasiswa dari semua latar belakang, daerah, dan kondisi ekonomi.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    { 
      title: "Pendampingan", 
      text: "Setiap data beasiswa diverifikasi langsung dari sumber resmi sebelum dipublikasikan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
          <circle cx="12" cy="12" r="10" />
          <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>
      )
    },
  ];

  return (
    <div
      id="profil"
      className={`flex items-stretch gap-[48px] bg-[rgba(81,80,82,1)] min-h-[1080px] w-full rounded-[30px] 
        [@media(1024px<width<=1440px)]:min-h-[950px] 
        [@media(768px<width<=1024px)]:flex-col [@media(768px<width<=1024px)]:h-auto [@media(768px<width<=1024px)]:rounded-[20px] 
        [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:rounded-[20px]`}
    >
      {/* SEKSI KIRI */}
      <div className={`bg-[rgba(0,1,3,1)] w-[55%] h-auto rounded-[30px] pl-[100px] pr-[50px] pb-[80px]
        [@media(1550px<width<=1650px)]:pl-[60px] 
        [@media(1440px<width<=1550px)]:pl-[50px] 
        [@media(1024px<width<=1440px)]:pl-[60px] 
        [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:rounded-[20px] [@media(768px<width<=1024px)]:px-[40px] [@media(768px<width<=1024px)]:pb-[60px] 
        [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:rounded-[20px] [@media(0px<width<=768px)]:px-[24px] [@media(0px<width<=768px)]:pb-[40px]`}>
        
        <h1 className={`text-[56px] text-white font-plex font-semibold mt-[118px] 
          [@media(1650px<width)]:text-[52px] 
          [@media(1550px<width<=1650px)]:text-[48px] 
          [@media(1440px<width<=1550px)]:text-[42px] 
          [@media(1024px<width<=1440px)]:text-[32px] [@media(1024px<width<=1440px)]:mt-[60px] 
          [@media(768px<width<=1024px)]:text-[36px] [@media(0px<width<=768px)]:text-[26px]`}>
          <span className="bg-[linear-gradient(90deg,rgba(131,130,133,1),rgba(182,180,184,1),rgba(81,80,82,1))] bg-clip-text text-transparent">Platform Independen</span> yang Berpihak pada Mahasiswa
        </h1>

        <p className={`text-[24px] text-white font-plex mt-[157px] 
          [@media(1650px<width)]:text-[22px] 
          [@media(1550px<width<=1650px)]:text-[20px] 
          [@media(1440px<width<=1550px)]:text-[18px] 
          [@media(1024px<width<=1440px)]:text-[16px] [@media(1024px<width<=1440px)]:mt-[60px] 
          [@media(768px<width<=1024px)]:text-[18px] [@media(0px<width<=768px)]:text-[15px]`}>
          ScholarHub dibangun dengan satu tujuan: menghapus kesenjangan informasi antara mahasiswa dan peluang beasiswa yang tersedia.
        </p>

        <div className="bg-[linear-gradient(90deg,rgba(255,49,46,1),rgba(255,255,255,0))] w-[300px] h-[5px] mt-[30px] [@media(0px<width<=768px)]:w-[200px]"></div>

        <p className={`text-[24px] text-white font-plex mt-[28px] 
          [@media(1650px<width)]:text-[22px] 
          [@media(1550px<width<=1650px)]:text-[20px] 
          [@media(1440px<width<=1550px)]:text-[18px] 
          [@media(1024px<width<=1440px)]:text-[16px] 
          [@media(768px<width<=1024px)]:text-[18px] [@media(0px<width<=768px)]:text-[15px]`}>
          Kami bukan lembaga pemberi beasiswa. Kami adalah agregator dan kurator informasi. Setiap data yang kami sajikan berasal langsung dari sumber resmi.
        </p>

        <div className={`flex justify-center items-center bg-[rgba(51,49,56,1)] text-white font-plex h-[150px] mt-[70px] mr-[40px] border border-[rgba(255,49,46,1)] text-center px-6 
          [@media(1440px<width<=1650px)]:h-[100px] [@media(1440px<width<=1650px)]:text-[16px] 
          [@media(1024px<width<=1440px)]:h-[80px] [@media(1024px<width<=1440px)]:text-[14px] 
          [@media(768px<width<=1024px)]:h-[100px] [@media(768px<width<=1024px)]:mr-0 [@media(0px<width<=768px)]:h-[80px]`}>
          Layanan 100% Gratis untuk seluruh mahasiswa Indonesia.
        </div>
      </div>

      {/* SEKSI KANAN */}
      <div className={`flex flex-col justify-center w-[45%] pr-[100px] py-[80px]
        [@media(768px<width<=1024px)]:w-full [@media(768px<width<=1024px)]:pb-[60px] [@media(768px<width<=1024px)]:px-[40px]
        [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:pb-[40px] [@media(0px<width<=768px)]:px-[24px]`}>
        
        <div className={`flex flex-col gap-[62px] w-full 
          [@media(1550px<width<=1650px)]:gap-[45px] 
          [@media(1440px<width<=1550px)]:gap-[35px] 
          [@media(1024px<width<=1440px)]:gap-[30px] 
          [@media(768px<width<=1024px)]:gap-[24px] [@media(0px<width<=768px)]:gap-[16px]`}>
          
          {itemSedia.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-[26px] bg-[rgba(51,49,56,1)] h-[145px] mr-[100px] px-[29px] 
                [@media(1550px<width<=1650px)]:mr-[0px] [@media(1550px<width<=1650px)]:h-[135px] 
                [@media(1440px<width<=1550px)]:mr-[0px] [@media(1440px<width<=1550px)]:h-[125px] 
                [@media(1024px<width<=1440px)]:mr-[0px] [@media(1024px<width<=1440px)]:h-[110px] 
                [@media(768px<width<=1024px)]:mr-[0px] [@media(768px<width<=1024px)]:h-auto [@media(768px<width<=1024px)]:py-[24px] 
                [@media(0px<width<=768px)]:mr-[0px] [@media(0px<width<=768px)]:h-auto [@media(0px<width<=768px)]:py-[16px]`}
            >
              <div className={`bg-[rgba(81,80,82,1)] border border-[rgba(255,49,46,1)] rounded-[10px] w-[93px] h-[93px] flex-shrink-0 flex items-center justify-center 
                [@media(1440px<width<=1650px)]:w-[75px] [@media(1440px<width<=1650px)]:h-[75px] 
                [@media(1024px<width<=1440px)]:w-[60px] [@media(1024px<width<=1440px)]:h-[60px] 
                [@media(768px<width<=1024px)]:w-[60px] [@media(768px<width<=1024px)]:h-[60px] 
                [@media(0px<width<=768px)]:w-[48px] [@media(0px<width<=768px)]:h-[48px]`}>
                {item.icon}
              </div>
              
              <div className="flex-1 flex flex-col justify-center overflow-hidden">
                <h2 className={`text-white font-semibold font-plex text-[24px] 
                  [@media(1550px<width<=1650px)]:text-[20px] 
                  [@media(1440px<width<=1550px)]:text-[18px] 
                  [@media(1024px<width<=1440px)]:text-[16px] 
                  [@media(768px<width<=1024px)]:text-[18px] [@media(0px<width<=768px)]:text-[14px]`}>
                  {item.title}
                </h2>
                <p className={`text-white font-normal font-plex text-[20px] leading-tight 
                  [@media(1550px<width<=1650px)]:text-[16px] 
                  [@media(1440px<width<=1550px)]:text-[14px] 
                  [@media(1024px<width<=1440px)]:text-[12px] 
                  [@media(768px<width<=1024px)]:text-[14px] [@media(0px<width<=768px)]:text-[12px]`}>
                  {item.text}
                </p>
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
      text: "Apresiasi dana pendidikan yang dikhususkan bagi mahasiswa dengan pencapaian akademik luar biasa (IPK tinggi) atau juara kompetisi bergengsi.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%]">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      )
    },
    { 
      jenis: "Reguler", 
      pengelola: "Pemerintah", 
      text: "Bantuan biaya pendidikan secara berkala untuk mahasiswa aktif dari berbagai jurusan yang memenuhi kelengkapan administrasi dan standar IPK minimal.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%]">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 7h6" />
          <path d="M8 11h8" />
        </svg>
      )
    },
    { 
      jenis: "Leadership", 
      pengelola: "Pemerintah", 
      text: "Dukungan bagi agen perubahan. Diperuntukkan bagi mahasiswa yang aktif berkontribusi di organisasi kampus, kerelawanan sosial, dan komunitas.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF312E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40%] h-[40%]">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="m14.5 12.5 3 3 4.5-4.5" />
        </svg>
      )
    },
  ];

  return (
    <div
      id="jenis"
      className={`h-auto bg-[rgba(255,255,250),1] pb-[200px] [@media(0px<width<=768px)]:pb-[80px] [@media(768px<width<=1024px)]:pb-[100px]`}
    >
      {/* ... bagian header tetap sama ... */}
      
      <div className={`flex flex-col mt-[136px] mx-[100px] gap-[30px] [@media(768px<width<=1024px)]:mt-[60px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mt-[40px] [@media(0px<width<=768px)]:mx-[24px]`}>
        {itemBeasiswa.map((item) => (
          <div
            key={item.jenis}
            className={`bg-[linear-gradient(90deg,rgba(255,49,46,0)40%,rgba(255,49,46,1)100%)] w-full h-[250px] [@media(0px<width<=768px)]:h-auto [@media(768px<width<=1024px)]:h-auto`}
          >
            <div className={`flex bg-[rgba(255,255,250,1)] w-[99%] h-[240px] [@media(0px<width<=768px)]:flex-col [@media(0px<width<=768px)]:h-auto [@media(768px<width<=1024px)]:h-auto`}>
              {/* KOTAK IKON */}
              <div className={`w-[250px] h-[250px] bg-[rgba(81,80,82,1)] flex-shrink-0 flex items-center justify-center [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:h-[160px] [@media(768px<width<=1024px)]:w-[160px] [@media(768px<width<=1024px)]:h-auto`}>
                {item.icon}
              </div>
              
              <div className={`px-[20px] ml-[70px] w-[calc(100%-250px)] [@media(0px<width<=768px)]:ml-[0px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:px-[16px] [@media(0px<width<=768px)]:pb-[16px] [@media(768px<width<=1024px)]:ml-[24px] [@media(768px<width<=1024px)]:w-auto [@media(768px<width<=1024px)]:py-[16px]`}>
                <div className={`flex justify-between mt-[20px]`}>
                  <div className={`flex items-center`}>
                    <h2 className={`text-[rgba(255,49,46,1)] text-[24px] font-semibold [@media(0px<width<=768px)]:text-[18px] [@media(768px<width<=1024px)]:text-[20px]`}>{item.jenis}</h2>
                  </div>
                  <div className={`flex items-center`}>
                    <div className={`bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] text-[18px] flex items-center justify-center font-semibold font-plex w-[155px] h-[33px] rounded-[20px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:w-[110px] [@media(0px<width<=768px)]:h-[28px]`}>
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
  { 
    text: "Prestasi Akademik", 
    icon: <svg className="w-8 h-8 [@media(0px<width<=768px)]:w-6 [@media(0px<width<=768px)]:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> 
  },
  { 
    text: "Motivasi Kuat", 
    icon: <svg className="w-8 h-8 [@media(0px<width<=768px)]:w-6 [@media(0px<width<=768px)]:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 
  },
  { 
    text: "Keterbatasan Finansial", 
    icon: <svg className="w-8 h-8 [@media(0px<width<=768px)]:w-6 [@media(0px<width<=768px)]:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 12h.01M16 12h.01M8 12h.01"/></svg> 
  },
  { 
    text: "Visi ke Depan", 
    icon: <svg className="w-8 h-8 [@media(0px<width<=768px)]:w-6 [@media(0px<width<=768px)]:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg> 
  },
];

const PengajuanBeasiswa = () => {
  return (
    <div
      id="pengajuan"
      className="relative min-h-screen bg-[#FCEAE8] overflow-hidden flex items-center py-20 [@media(0px<width<=1024px)]:py-10"
    >
      <div className="relative z-10 mx-[100px] w-full [@media(0px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mx-[24px]">
        
        <h1 className="font-['IBM_Plex_Mono'] text-[48px] font-bold text-[rgba(0,0,0,1)] [@media(0px<width<=1024px)]:text-[36px] [@media(0px<width<=768px)]:text-[28px] [@media(0px<width<=768px)]:text-center">
          Ayo ikut! ajukan dirimu untuk<br />
          <span className="block text-[rgba(153,49,51,1)] font-semibold">mendapatkan beasiswa</span>
        </h1>

        <div className="flex flex-row justify-between items-stretch mt-[80px] gap-8 [@media(0px<width<=1024px)]:flex-col [@media(0px<width<=768px)]:mt-[40px]">
          
          {/* List Section */}
          <div className="flex flex-col gap-4 flex-[1.2] [@media(0px<width<=1024px)]:w-full">
            {listItems.map((item) => (
              <div
                key={item.text}
                className="group flex items-center bg-[rgba(51,49,56,1)] text-[32px] text-[rgba(255,255,250,1)] font-plex font-semibold h-[120px] transition-all duration-300 hover:bg-[#993133] hover:translate-x-4 [@media(0px<width<=1440px)]:text-[24px] [@media(0px<width<=1440px)]:h-[100px] [@media(0px<width<=1024px)]:h-[90px] [@media(0px<width<=768px)]:h-[72px] [@media(0px<width<=768px)]:text-[18px] [@media(0px<width<=768px)]:hover:translate-x-2"
              >
                <div className="ml-[40px] text-[#FF312E] group-hover:text-white transition-colors [@media(0px<width<=768px)]:ml-[16px]">
                  {item.icon}
                </div>
                <p className="ml-[40px] [@media(0px<width<=1024px)]:ml-[24px] [@media(0px<width<=768px)]:ml-[16px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Info Card Section */}
          <div className="group border-2 border-[#FF312E] rounded-[4px] p-8 bg-[rgba(252,234,232,0.6)] backdrop-blur-sm flex flex-col items-center justify-center gap-8 flex-1 transition-all duration-500 hover:shadow-[15px_15px_0px_0px_#FF312E] [@media(0px<width<=1024px)]:w-full [@media(0px<width<=1024px)]:py-12 [@media(0px<width<=768px)]:p-6">
            
            <div className="w-20 h-20 bg-[#FF312E] rounded-full flex items-center justify-center text-white mb-4 animate-bounce [@media(0px<width<=768px)]:w-16 [@media(0px<width<=768px)]:h-16">
              <svg className="w-10 h-10 [@media(0px<width<=768px)]:w-8 [@media(0px<width<=768px)]:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>

            <p className="font-['IBM_Plex_Mono'] text-[24px] text-[#000000] text-center font-bold leading-relaxed max-w-[500px] [@media(0px<width<=1440px)]:text-[20px] [@media(0px<width<=1024px)]:text-[22px] [@media(0px<width<=768px)]:text-[16px]">
              "Tujuan studi yang jelas dan komitmen untuk berkontribusi bagi masyarakat adalah kunci utama lolos seleksi."
            </p>
            
            <div className="h-1 w-20 bg-[#FF312E]"></div>
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