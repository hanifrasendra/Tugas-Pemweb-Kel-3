import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────
const mockApplicants = [
  { id: 1, nama: "Rizky Pratama", universitas: "Universitas Gadjah Mada", prodi: "Teknik Informatika", semester: 5, ipk: 3.87, tipe: "Prestasi", status: "Pending", date: "2025-05-15", ukt: "5 Jt", hasVideo: true },
  { id: 2, nama: "Siti Rahayu", universitas: "Universitas Indonesia", prodi: "Kedokteran", semester: 4, ipk: 3.92, tipe: "Reguler", status: "Diterima", date: "2025-05-14", ukt: "8 Jt", hasVideo: true },
  { id: 3, nama: "Ahmad Fauzi", universitas: "ITB", prodi: "Teknik Kimia", semester: 6, ipk: 3.65, tipe: "Prestasi", status: "Ditolak", date: "2025-05-13", ukt: "6 Jt", hasVideo: false },
  { id: 4, nama: "Dewi Kusuma", universitas: "Universitas Airlangga", prodi: "Manajemen", semester: 3, ipk: 3.78, tipe: "Leadership", status: "Review", date: "2025-05-12", ukt: "4 Jt", hasVideo: true },
  { id: 5, nama: "Budi Santoso", universitas: "Undip", prodi: "Hukum", semester: 7, ipk: 3.55, tipe: "Reguler", status: "Pending", date: "2025-05-11", ukt: "3 Jt", hasVideo: false },
  { id: 6, nama: "Nina Anggraini", universitas: "UNS", prodi: "Psikologi", semester: 4, ipk: 3.90, tipe: "Prestasi", status: "Diterima", date: "2025-05-10", ukt: "4.5 Jt", hasVideo: true },
  { id: 7, nama: "Hendra Wijaya", universitas: "UNPAD", prodi: "Ekonomi", semester: 5, ipk: 3.45, tipe: "Reguler", status: "Ditolak", date: "2025-05-09", ukt: "3.5 Jt", hasVideo: false },
  { id: 8, nama: "Laila Putri", universitas: "Universitas Brawijaya", prodi: "Pertanian", semester: 6, ipk: 3.72, tipe: "Leadership", status: "Review", date: "2025-05-08", ukt: "2.5 Jt", hasVideo: true },
];

const statsData = [
  { label: "Total Peserta", value: 248, icon: "👥", color: "from-[#993133] to-[#FF312E]", bg: "bg-[#FF312E]/8", text: "text-[#FF312E]", trend: "+12%" },
  { label: "Proposal Masuk", value: 186, icon: "📋", color: "from-blue-500 to-blue-700", bg: "bg-blue-50", text: "text-blue-600", trend: "+8%" },
  { label: "Diterima", value: 42, icon: "✅", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-600", trend: "+5%" },
  { label: "Ditolak", value: 31, icon: "❌", color: "from-red-500 to-rose-600", bg: "bg-red-50", text: "text-red-600", trend: "-2%" },
];

// ─── Stats Card ───────────────────────────────────────────
const StatCard = ({ stat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = stat.value;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] hover:shadow-[0_8px_32px_rgba(255,49,46,0.15)] hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110`}>
          {stat.icon}
        </div>
        <span className={`text-xs font-bold font-plex px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {stat.trend}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 font-plex">{count.toLocaleString()}</p>
      <p className="text-sm text-gray-400 font-plex mt-1">{stat.label}</p>
    </div>
  );
};

// ─── Mini Donut Chart ─────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((a, b) => a + b.value, 0);
  let cumulative = 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="14" />
          {data.map((item, i) => {
            const dashArray = (item.value / total) * circumference;
            const dashOffset = circumference - cumulative;
            cumulative += dashArray;
            return (
              <circle
                key={i}
                cx="50" cy="50" r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="14"
                strokeDasharray={`${dashArray} ${circumference}`}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-bold text-gray-700 font-plex text-center leading-tight">
            {total}<br /><span className="text-[10px] text-gray-400">Total</span>
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <p className="text-xs text-gray-600 font-plex">{item.label}</p>
            <p className="text-xs font-bold text-gray-900 font-plex ml-auto pl-4">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Bar Chart ────────────────────────────────────────────
const BarChart = () => {
  const data = [
    { month: "Jan", value: 18 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 32 },
    { month: "Apr", value: 28 },
    { month: "Mei", value: 45 },
    { month: "Jun", value: 38 },
  ];
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-3 h-24">
      {data.map((d) => (
        <div key={d.month} className="flex flex-col items-center flex-1 gap-1">
          <p className="text-[10px] text-gray-500 font-plex font-bold">{d.value}</p>
          <div className="w-full relative">
            <div
              className="w-full bg-gradient-to-t from-[#993133] to-[#FF312E] rounded-t-lg transition-all duration-1000 hover:from-[#7a2527] hover:to-[#FF312E]"
              style={{ height: `${(d.value / max) * 60}px` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 font-plex">{d.month}</p>
        </div>
      ))}
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    Pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
    Diterima: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", dot: "bg-green-500" },
    Ditolak: { bg: "bg-red-50", text: "text-red-500", border: "border-red-200", dot: "bg-red-500" },
    Review: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", dot: "bg-blue-500" },
  };
  const c = config[status] || config.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-plex border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === "Review" ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
};

// ─── Approval Modal ───────────────────────────────────────
const ApprovalModal = ({ applicant, onClose, onApprove, onReject }) => {
  if (!applicant) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg shadow-[0_24px_64px_rgba(0,0,0,0.2)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#993133] to-[#FF312E] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold font-plex">
                {applicant.nama.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold font-plex">{applicant.nama}</h3>
                <p className="text-white/70 text-sm font-plex">{applicant.universitas}</p>
              </div>
              <button onClick={onClose} className="ml-auto w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Jurusan", value: applicant.prodi },
                { label: "Semester", value: `Semester ${applicant.semester}` },
                { label: "IPK", value: applicant.ipk.toFixed(2) },
                { label: "UKT", value: applicant.ukt },
                { label: "Tipe", value: applicant.tipe },
                { label: "Tanggal", value: applicant.date },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-plex">{label}</p>
                  <p className="text-sm font-bold text-gray-800 font-plex">{value}</p>
                </div>
              ))}
            </div>

            {applicant.hasVideo && (
              <div className="bg-[#FF312E]/8 border border-[#FF312E]/15 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF312E] rounded-xl flex items-center justify-center text-white text-lg">▶</div>
                <div>
                  <p className="text-sm font-bold text-gray-800 font-plex">Video Perkenalan</p>
                  <p className="text-xs text-gray-400 font-plex">Klik untuk preview video peserta</p>
                </div>
                <button className="ml-auto text-[#FF312E] text-xs font-bold font-plex bg-[#FF312E]/15 px-3 py-1.5 rounded-xl hover:bg-[#FF312E]/20 transition-colors">
                  Preview
                </button>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onReject(applicant.id)}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-3.5 rounded-2xl font-plex text-sm border-2 border-red-200 transition-all duration-300 hover:scale-[0.98] active:scale-95"
              >
                ✗ Tolak Proposal
              </button>
              <button
                onClick={() => onApprove(applicant.id)}
                className="flex-[2] bg-gradient-to-r from-[#993133] to-[#FF312E] hover:from-[#7a2527] hover:to-[#993133] text-white font-bold py-3.5 rounded-2xl font-plex text-sm shadow-[0_4px_16px_rgba(255,49,46,0.4)] transition-all duration-300 hover:scale-[1.01] active:scale-95"
              >
                ✓ Terima Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Sidebar ──────────────────────────────────────────────
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "proposals", icon: "📋", label: "Proposal" },
    { id: "peserta", icon: "👥", label: "Peserta" },
    { id: "beasiswa", icon: "🎓", label: "Beasiswa" },
    { id: "notifikasi", icon: "🔔", label: "Notifikasi", badge: 3 },
    { id: "export", icon: "📤", label: "Export Data" },
    { id: "settings", icon: "⚙️", label: "Pengaturan" },
  ];

  return (
    <aside className="hidden [@media(min-width:1024px)]:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold font-plex text-sm">CH</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 font-plex text-base">Compete<span className="text-[#FF312E]">Hub</span></h1>
            <p className="text-[10px] text-gray-400 font-plex">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-plex font-medium transition-all duration-200 ${
              activeMenu === item.id
                ? "bg-gradient-to-r from-[#993133] to-[#FF312E] text-white shadow-[0_4px_12px_rgba(255,49,46,0.3)]"
                : "text-gray-500 hover:bg-[#FF312E]/8 hover:text-[#FF312E]"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeMenu === item.id ? "bg-white/20 text-white" : "bg-red-100 text-red-500"}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-[#FF312E]/8 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          <div>
            <p className="text-xs font-bold text-gray-800 font-plex">Admin Utama</p>
            <p className="text-[10px] text-gray-400 font-plex">Penyelenggara</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────
const AdminPage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicants, setApplicants] = useState(mockApplicants);
  const [showNotif, setShowNotif] = useState(false);

  const statusOptions = ["Semua", "Pending", "Review", "Diterima", "Ditolak"];

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch =
      a.nama.toLowerCase().includes(search.toLowerCase()) ||
      a.universitas.toLowerCase().includes(search.toLowerCase()) ||
      a.prodi.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Semua" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Diterima" } : a)));
    setSelectedApplicant(null);
  };
  const handleReject = (id) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Ditolak" } : a)));
    setSelectedApplicant(null);
  };

  const donutData = [
    { label: "Pending", value: applicants.filter((a) => a.status === "Pending").length, color: "#F59E0B" },
    { label: "Review", value: applicants.filter((a) => a.status === "Review").length, color: "#3B82F6" },
    { label: "Diterima", value: applicants.filter((a) => a.status === "Diterima").length, color: "#10B981" },
    { label: "Ditolak", value: applicants.filter((a) => a.status === "Ditolak").length, color: "#EF4444" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFA] flex">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <main className="flex-1 [@media(min-width:1024px)]:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 [@media(min-width:768px)]:px-8 h-16 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-plex capitalize">{activeMenu}</h2>
            <p className="text-xs text-gray-400 font-plex">CompeteHub Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative w-9 h-9 bg-gray-100 hover:bg-[#FF312E]/15 rounded-xl flex items-center justify-center transition-colors"
            >
              🔔
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <button className="hidden [@media(min-width:640px)]:flex items-center gap-2 bg-gradient-to-r from-[#993133] to-[#FF312E] text-white text-sm font-bold px-4 py-2 rounded-xl font-plex shadow-lg hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" />
              </svg>
              Export
            </button>
          </div>
        </header>

        <div className="p-4 [@media(min-width:768px)]:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 [@media(min-width:768px)]:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 [@media(min-width:768px)]:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900 font-plex text-base">Proposal Masuk</h3>
                  <p className="text-xs text-gray-400 font-plex">Tren 6 bulan terakhir</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full font-plex">↑ 18%</span>
              </div>
              <BarChart />
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)]">
              <div className="mb-5">
                <h3 className="font-bold text-gray-900 font-plex text-base">Status Seleksi</h3>
                <p className="text-xs text-gray-400 font-plex">Distribusi proposal saat ini</p>
              </div>
              <DonutChart data={donutData} />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
            {/* Table Header */}
            <div className="p-5 border-b border-gray-100 flex flex-col [@media(min-width:640px)]:flex-row items-start [@media(min-width:640px)]:items-center gap-4">
              <div>
                <h3 className="font-bold text-gray-900 font-plex">Manajemen Peserta</h3>
                <p className="text-xs text-gray-400 font-plex">{filteredApplicants.length} peserta ditemukan</p>
              </div>
              <div className="flex items-center gap-3 ml-auto w-full [@media(min-width:640px)]:w-auto">
                {/* Search */}
                <div className="relative flex-1 [@media(min-width:640px)]:w-56">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari peserta..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-plex text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent"
                  />
                </div>
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-plex text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 cursor-pointer"
                >
                  {statusOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Peserta", "Universitas / Prodi", "IPK", "Tipe", "Tanggal", "Status", "Aksi"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 font-plex px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((applicant, i) => (
                    <tr
                      key={applicant.id}
                      className={`border-b border-gray-50 hover:bg-[#FF312E]/8/30 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-full flex items-center justify-center text-white text-xs font-bold font-plex flex-shrink-0">
                            {applicant.nama.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 font-plex whitespace-nowrap">{applicant.nama}</p>
                            {applicant.hasVideo && (
                              <span className="text-[10px] text-[#FF312E] font-plex flex items-center gap-0.5">▶ Ada Video</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs font-semibold text-gray-700 font-plex">{applicant.universitas}</p>
                        <p className="text-[11px] text-gray-400 font-plex">{applicant.prodi} · Sem {applicant.semester}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-bold font-plex ${parseFloat(applicant.ipk) >= 3.5 ? "text-green-600" : parseFloat(applicant.ipk) >= 3.0 ? "text-amber-600" : "text-red-500"}`}>
                          {applicant.ipk.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs bg-[#FF312E]/8 text-[#FF312E] px-2 py-1 rounded-lg font-plex font-semibold border border-[#FF312E]/15">{applicant.tipe}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-400 font-plex">{applicant.date}</p>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={applicant.status} />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="bg-gradient-to-r from-[#993133] to-[#FF312E] text-white text-xs font-bold px-3 py-1.5 rounded-lg font-plex shadow-[0_2px_8px_rgba(255,49,46,0.3)] hover:shadow-[0_4px_12px_rgba(255,49,46,0.4)] hover:scale-105 transition-all duration-200 whitespace-nowrap"
                        >
                          Review →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApplicants.length === 0 && (
                <div className="py-16 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-400 font-plex text-sm">Tidak ada peserta yang cocok dengan filter</p>
                </div>
              )}
            </div>

            {/* Table Footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400 font-plex">Menampilkan {filteredApplicants.length} dari {applicants.length} peserta</p>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <button key={p} className={`w-7 h-7 rounded-lg text-xs font-bold font-plex transition-all ${p === 1 ? "bg-[#FF312E] text-white" : "bg-gray-100 text-gray-500 hover:bg-[#FF312E]/8 hover:text-[#FF312E]"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Approval Modal */}
      <ApprovalModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminPage;
