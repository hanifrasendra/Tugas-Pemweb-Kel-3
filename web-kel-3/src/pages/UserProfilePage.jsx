import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock User Data ───────────────────────────────────────
const mockUser = {
  nama: "Rizky Pratama Nugroho",
  kategori: "Mahasiswa",
  universitas: "Universitas Gadjah Mada",
  jurusan: "Teknik Informatika",
  semester: 5,
  jenisKelamin: "Laki-laki",
  ipk: 3.87,
  deskripsi: "Mahasiswa aktif dengan passion di bidang UI/UX Design dan Machine Learning. Tergabung dalam berbagai organisasi kampus dan memiliki rekam jejak prestasi akademik yang konsisten.",
  tags: ["UI/UX Design", "Machine Learning", "Web Development", "Organisasi", "Public Speaking", "Data Science"],
  socialLinks: {
    linkedin: "linkedin.com/in/rizkypratama",
    github: "github.com/rizkypratama",
    instagram: "@rizky.pratama",
  },
  achievements: [
    { icon: "🏆", title: "Beasiswa Prestasi", desc: "Penerima 2024/2025" },
    { icon: "⚡", title: "Hackathon Winner", desc: "2nd Place — Dicoding 2024" },
    { icon: "🎯", title: "Top 10% IPK", desc: "Teknik Informatika UGM" },
    { icon: "📱", title: "App Published", desc: "Play Store — 5K+ downloads" },
  ],
  proposals: [
    { id: 1, title: "Beasiswa Unggulan Kemendikbud", date: "2025-05-01", status: "Review", nominal: 24000000 },
    { id: 2, title: "Beasiswa Djarum Plus 2025", date: "2025-03-15", status: "Diterima", nominal: 18000000 },
    { id: 3, title: "Beasiswa PPA Dikti", date: "2025-01-20", status: "Ditolak", nominal: 6000000 },
  ],
  savedScholarships: [
    { id: 1, title: "Beasiswa LPDP Afirmasi 2025", provider: "LPDP", nominal: 80000000, deadline: "30 hari lagi" },
    { id: 2, title: "Beasiswa Bank Indonesia", provider: "Bank Indonesia", nominal: 15000000, deadline: "45 hari lagi" },
  ],
  stats: {
    total: 5,
    diterima: 2,
    pending: 1,
    ditolak: 2,
  },
};

// ─── Status Badge ─────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    Pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
    Diterima: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", dot: "bg-green-500" },
    Ditolak: { bg: "bg-red-50", text: "text-red-500", border: "border-red-200", dot: "bg-red-500" },
    Review: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", dot: "bg-blue-500 animate-pulse" },
  };
  const c = config[status] || config.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-plex border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
};

// ─── IPK Radial ───────────────────────────────────────────
const IPKRadial = ({ ipk }) => {
  const pct = (ipk / 4) * 100;
  const radius = 34;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 90 90" className="-rotate-90 w-full h-full">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#f3f0ff" strokeWidth="10" />
        <circle
          cx="45" cy="45" r={radius}
          fill="none"
          stroke="url(#ipkGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="ipkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#993133" />
            <stop offset="100%" stopColor="#FF312E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-[#993133] font-plex leading-none">{ipk.toFixed(2)}</p>
        <p className="text-[9px] text-gray-400 font-plex">IPK</p>
      </div>
    </div>
  );
};

// ─── Edit Modal ───────────────────────────────────────────
const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ ...user });

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#993133] to-[#FF312E] p-6 text-white sticky top-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-plex">Edit Profil</h3>
                <p className="text-white/70 text-sm font-plex">Perbarui informasi profilmu</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Nama Lengkap", key: "nama", type: "text" },
                { label: "Universitas", key: "universitas", type: "text" },
                { label: "Program Studi", key: "jurusan", type: "text" },
                { label: "Semester", key: "semester", type: "number" },
                { label: "IPK", key: "ipk", type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key} className="col-span-2 [@media(min-width:480px)]:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent transition-all"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Deskripsi Diri</label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-plex text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl font-plex text-sm transition-all">
                Batal
              </button>
              <button
                onClick={() => { onSave(form); onClose(); }}
                className="flex-[2] bg-gradient-to-r from-[#993133] to-[#FF312E] text-white font-bold py-3.5 rounded-2xl font-plex text-sm shadow-[0_4px_16px_rgba(255,49,46,0.4)] hover:scale-[1.01] transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────
const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("riwayat");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const tabs = [
    { id: "riwayat", label: "Riwayat Proposal", icon: "📋" },
    { id: "saved", label: "Tersimpan", icon: "💾" },
    { id: "skill", label: "Skill & Tag", icon: "⚡" },
  ];

  const formatNominal = (n) => `Rp ${(n / 1000000).toFixed(0)} Jt`;

  return (
    <div className="min-h-screen bg-[#FFFFFA] pb-24">
      {/* Hero Header */}
      <div className="relative h-[280px] [@media(min-width:768px)]:h-[320px] overflow-hidden">
        {/* Gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a2527] via-[#FF312E] to-[#993133]">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full translate-x-1/4 translate-y-1/4" />
        </div>

        {/* Back + Action Buttons */}
        <div className="absolute top-16 left-4 [@media(min-width:768px)]:left-8 [@media(min-width:1024px)]:left-16 right-4 [@media(min-width:768px)]:right-8 [@media(min-width:1024px)]:right-16 flex items-center justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl font-plex hover:bg-white/30 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profil
            </button>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="absolute bottom-[-50px] left-4 [@media(min-width:768px)]:left-8 [@media(min-width:1024px)]:left-16 z-10">
          <div className="relative">
            <div className="w-24 h-24 [@media(min-width:768px)]:w-28 [@media(min-width:768px)]:h-28 bg-gradient-to-br from-[#FF312E] to-[#FF312E] rounded-3xl border-4 border-white shadow-[0_8px_32px_rgba(255,49,46,0.4)] flex items-center justify-center text-4xl [@media(min-width:768px)]:text-5xl font-bold text-white font-plex">
              {user.nama.charAt(0)}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
            {/* Category badge */}
            <div className="absolute -top-2 -right-2 bg-[#FF312E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-plex border border-[#FF312E]/60">
              {user.kategori}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 [@media(min-width:768px)]:px-8 [@media(min-width:1024px)]:px-16 pt-16">
        <div className="flex flex-col [@media(min-width:640px)]:flex-row [@media(min-width:640px)]:items-end gap-4 [@media(min-width:640px)]:gap-8">
          {/* Name & Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl [@media(min-width:768px)]:text-3xl font-bold text-gray-900 font-plex leading-tight">
              {user.nama}
            </h1>
            <p className="text-gray-500 text-sm font-plex mt-1">
              {user.jurusan} · {user.universitas}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs bg-[#FF312E]/8 text-[#FF312E] px-3 py-1 rounded-full font-plex border border-[#FF312E]/15 font-semibold">
                📚 Semester {user.semester}
              </span>
              <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-plex border border-gray-100 font-semibold">
                {user.jenisKelamin === "Laki-laki" ? "👨" : "👩"} {user.jenisKelamin}
              </span>
            </div>
          </div>
          {/* IPK Widget */}
          <IPKRadial ipk={user.ipk} />
        </div>

        {/* Description */}
        <div className="mt-5 bg-white rounded-2xl p-5 border border-[#FF312E]/8 shadow-[0_4px_20px_rgba(255,49,46,0.06)]">
          <p className="text-sm text-gray-600 font-plex leading-relaxed">{user.deskripsi}</p>
          {/* Social Links */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { icon: "💼", label: "LinkedIn", url: user.socialLinks.linkedin, color: "text-blue-600 bg-blue-50 border-blue-100" },
              { icon: "💻", label: "GitHub", url: user.socialLinks.github, color: "text-gray-700 bg-gray-50 border-gray-100" },
              { icon: "📸", label: "Instagram", url: user.socialLinks.instagram, color: "text-pink-600 bg-pink-50 border-pink-100" },
            ].map(({ icon, label, url, color }) => (
              <a
                key={label}
                href={`https://${url}`}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border font-plex hover:scale-105 transition-transform ${color}`}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          {[
            { label: "Total Ajuan", value: user.stats.total, icon: "📬", color: "text-[#FF312E] bg-[#FF312E]/8" },
            { label: "Diterima", value: user.stats.diterima, icon: "✅", color: "text-green-600 bg-green-50" },
            { label: "Pending", value: user.stats.pending, icon: "⏳", color: "text-amber-600 bg-amber-50" },
            { label: "Ditolak", value: user.stats.ditolak, icon: "❌", color: "text-red-500 bg-red-50" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 ${color.split(" ")[1]} rounded-xl flex items-center justify-center text-sm mx-auto mb-2`}>
                {icon}
              </div>
              <p className={`text-xl font-bold font-plex ${color.split(" ")[0]}`}>{value}</p>
              <p className="text-[10px] text-gray-400 font-plex mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        <div className="mt-5">
          <h2 className="text-base font-bold text-gray-900 font-plex mb-3 flex items-center gap-2">
            <span>🏅</span> Pencapaian
          </h2>
          <div className="grid grid-cols-2 [@media(min-width:640px)]:grid-cols-4 gap-3">
            {user.achievements.map((ach, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-[0_4px_16px_rgba(255,49,46,0.06)] hover:shadow-[0_8px_24px_rgba(255,49,46,0.15)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{ach.icon}</div>
                <p className="text-xs font-bold text-gray-800 font-plex leading-tight">{ach.title}</p>
                <p className="text-[10px] text-gray-400 font-plex mt-1">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Profile */}
        <div className="mt-5">
          <h2 className="text-base font-bold text-gray-900 font-plex mb-3 flex items-center gap-2">
            <span>🎬</span> Video Profil
          </h2>
          <div
            className="relative bg-gradient-to-br from-[#1a0505] to-[#7a2527] rounded-2xl overflow-hidden h-48 [@media(min-width:640px)]:h-56 cursor-pointer shadow-[0_8px_32px_rgba(255,49,46,0.3)] hover:shadow-[0_12px_40px_rgba(255,49,46,0.45)] transition-all duration-300 group"
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          >
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform duration-300 ${isVideoPlaying ? "hidden" : "flex"}`}>
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              {isVideoPlaying && (
                <div className="text-white font-plex text-sm font-bold animate-pulse">▶ Sedang memutar...</div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold font-plex text-sm">Video Perkenalan</p>
              <p className="text-white/60 font-plex text-xs">58 detik · Resolusi HD</p>
            </div>
            {/* Duration badge */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full font-plex font-bold">
              0:58
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold font-plex transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#993133] to-[#FF312E] text-white shadow-[0_4px_12px_rgba(255,49,46,0.35)]"
                    : "text-gray-500 hover:text-[#FF312E]"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden [@media(min-width:380px)]:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "riwayat" && (
              <div className="space-y-3">
                {user.proposals.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-[0_4px_20px_rgba(255,49,46,0.1)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 font-plex text-sm leading-tight">{p.title}</p>
                        <p className="text-xs text-gray-400 font-plex mt-1">{p.date}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                      <p className="text-sm font-bold text-[#FF312E] font-plex">{formatNominal(p.nominal)}</p>
                      <button className="text-xs text-[#FF312E] font-bold font-plex hover:text-[#993133] transition-colors">
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-3">
                {user.savedScholarships.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-[0_4px_20px_rgba(255,49,46,0.1)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 font-plex text-sm leading-tight">{s.title}</p>
                        <p className="text-xs text-gray-400 font-plex mt-1">{s.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#FF312E] font-plex">{formatNominal(s.nominal)}</p>
                        <p className="text-[11px] text-amber-500 font-plex font-bold mt-0.5">⏰ {s.deadline}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => navigate("/explore")}
                        className="flex-1 bg-gradient-to-r from-[#993133] to-[#FF312E] text-white text-xs font-bold py-2.5 rounded-xl font-plex shadow-[0_4px_12px_rgba(255,49,46,0.3)] hover:scale-[1.01] transition-transform"
                      >
                        Ajukan Sekarang
                      </button>
                      <button className="w-9 h-9 bg-red-50 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {user.savedScholarships.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">💾</div>
                    <p className="text-gray-400 font-plex text-sm">Belum ada beasiswa tersimpan</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "skill" && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 font-plex mb-4 text-sm">Skill & Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF312E]/5 to-[#993133]/5 text-[#993133] text-sm px-4 py-2 rounded-full font-plex font-semibold border border-[#FF312E]/15 hover:from-[#FF312E]/10 hover:to-[#993133]/10 transition-colors cursor-pointer hover:scale-105 transition-transform"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      ⚡ {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="mt-5 w-full border-2 border-dashed border-[#FF312E]/20 text-[#FF312E]/70 text-sm font-bold py-3 rounded-2xl font-plex hover:border-[#FF312E]/60 hover:text-[#FF312E] transition-colors"
                >
                  + Tambah Skill / Tag
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-6 right-5 z-30">
          <button
            onClick={() => navigate("/explore")}
            className="w-14 h-14 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(255,49,46,0.5)] hover:scale-110 hover:shadow-[0_12px_32px_rgba(255,49,46,0.65)] transition-all duration-300 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <EditModal
          user={user}
          onClose={() => setIsEditOpen(false)}
          onSave={(updated) => setUser({ ...user, ...updated })}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
