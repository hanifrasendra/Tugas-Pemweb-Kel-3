import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
const StatusBadge = ({ status, onChange }) => {
  const config = {
    Pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-500" },
    Diterima: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", dot: "bg-green-500" },
    Ditolak: { bg: "bg-red-50", text: "text-red-500", border: "border-red-200", dot: "bg-red-500" },
  };
  const c = config[status] || config.Pending;

  if (onChange) {
    return (
      <select
        value={status || "Pending"}
        onChange={(e) => onChange(e.target.value)}
        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none transition-all ${c.bg} ${c.text} ${c.border}`}
      >
        <option value="Pending">● Pending</option>
        <option value="Diterima">● Diterima</option>
        <option value="Ditolak">● Ditolak</option>
      </select>
    );
  }

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
const Sidebar = ({ activeMenu, setActiveMenu, penyelenggara, setIsLogPenyelenggara, navigate }) => {
  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "beasiswa", icon: "🎓", label: "Beasiswa" },
    { id: "proposals", icon: "📋", label: "Proposal" },
    { id: "notifikasi", icon: "🔔", label: "Notifikasi", badge: 3 },
    { id: "export", icon: "📤", label: "Export Data" },
    { id: "settings", icon: "⚙️", label: "Pengaturan" },
  ];

  const handleLogout = () => {
        alert("Anda telah logout!");
        localStorage.removeItem("loginPenyelenggara");
        localStorage.removeItem("penyelenggara");
        setIsLogPenyelenggara(false);
        navigate('/home');
        window.location.reload();
  };

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
            <p className="text-xs font-bold max-w-[70%] flex-nowrap text-gray-800 font-plex">{penyelenggara.nama_lembaga}</p>
            <p className="text-[10px] text-gray-400 font-plex">{penyelenggara.email}</p>
          </div>
          <button 
          onClick={() => handleLogout()}
          className="ml-auto text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

const DetailBeasiswa = ({ beasiswa, setBeasiswa }) => {
  const navigate = useNavigate();
  const [peserta, setPeserta] = useState([]);
  const [showEdit, isShowEdit] = useState(false)

  useEffect(() => {
    const Peserta = async () => {
      try{
        const getPeserta = await fetch("http://localhost:8000/api/peserta")
        const proposal = await getPeserta.json();
        setPeserta(proposal.data)
        console.log(peserta)
      } catch (err) {
        console.error(err)
      }
    }
    Peserta();
  }, [])

  const formatNominal = (n) => `Rp ${(n / 1000000).toFixed(0)} Jt`;
  const pesertaBeasiswa = peserta.filter((p) => p.id_beasiswa === beasiswa.id)

  return (
    <div className={`ml-80  py-20`}>
      {/* Info Beasiswa */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div 
            onClick={() => setBeasiswa(null)}
            className={`flex items-center justify-center bg-brand-red rounded-[10px] font-semibold w-9 h-9 cursor-pointer transistion-all duration-300
              hover:bg-brand-heavy-red hover:font-bold`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-light">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-plex">{beasiswa.judul}</h2>
            <p className="text-sm text-gray-400 font-plex mt-1">{beasiswa.pendonor}</p>
          </div>
          <span className="text-lg font-bold text-[#FF312E] font-plex">{formatNominal(beasiswa.nominal)}</span>
        </div>

        <div className="grid grid-cols-2 [@media(min-width:640px)]:grid-cols-4 gap-3">
          {[
            { label: "Kuota", value: `${beasiswa.kuota} orang` },
            { label: "Pendaftar", value: `${beasiswa.terdaftar} orang` },
            { label: "Deadline", value: beasiswa.deadline },
            { label: "Jenis", value: beasiswa.type },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-plex">{label}</p>
              <p className="text-sm font-bold text-gray-800 font-plex">{value}</p>
            </div>
          ))} 
        </div>
      </div>

      {/* Tabel Peserta */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] p-6">
        <h3 className="font-bold text-gray-900 font-plex mb-4">Peserta yang Mendaftar</h3>
        <div>
          {pesertaBeasiswa.length > 0 ? (
            <div>
            {pesertaBeasiswa.map((applicant, i) => (
              <div
                key={applicant.id}
                className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-4 py-4 border-b border-gray-50 hover:bg-[#FF312E]/5 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
              >
                {/* Peserta */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-full flex items-center justify-center text-white text-xs font-bold font-plex flex-shrink-0">
                    {applicant.nama_lengkap?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 font-plex whitespace-nowrap">{applicant.nama_lengkap}</p>
                    {applicant.video_url && (
                      <span className="text-[10px] text-[#FF312E] font-plex flex items-center gap-0.5">▶ Ada Video</span>
                    )}
                  </div>
                </div>

                {/* Universitas / Prodi */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 font-plex">{applicant.univ}</p>
                  <p className="text-[11px] text-gray-400 font-plex">{applicant.prodi} · Sem {applicant.semester}</p>
                </div>

                {/* IPK */}
                <span className={`text-sm font-bold font-plex ${
                  parseFloat(applicant.ipk) >= 3.5 ? "text-green-600"
                  : parseFloat(applicant.ipk) >= 3.0 ? "text-amber-600"
                  : "text-red-500"
                }`}>
                  {parseFloat(applicant.ipk).toFixed(2)}
                </span>

                {/* Tipe */}
                <span className="text-xs bg-[#FF312E]/8 text-[#FF312E] px-2 py-1 rounded-lg font-plex font-semibold border border-[#FF312E]/15 w-fit">
                  {applicant.gender || "-"}
                </span>

                {/* Tanggal */}
                <p className="text-xs text-gray-400 font-plex">{applicant.created_at?.split("T")[0]}</p>

                {/* Status */}
                <StatusBadge 
                status={applicant.status || "Pending"} 
                
                onChange={async (newStatus) => {
                  await fetch(`http://localhost:8000/api/peserta/${applicant.id}/status`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus })
                  });
                  setPeserta(prev => prev.map(p =>
                    p.id === applicant.id ? { ...p, status: newStatus } : p
                  ));
                }}
                
                />

                {/* Aksi */}
                <button
                  onClick={() => navigate(`/proposal/${applicant.id}`)}
                  className="bg-gradient-to-r from-[#993133] to-[#FF312E] text-white text-xs font-bold px-3 py-1.5 rounded-lg font-plex shadow-[0_2px_8px_rgba(255,49,46,0.3)] hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  Review →
                </button>
              </div>
            ))}
          </div>
          ) : 
          (
            <p className="text-sm text-gray-400 font-plex text-center py-8">Belum ada peserta yang mendaftar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Event Page ───────────────────────────────────────────
// ─── Mock Beasiswa ────────────────────────────────────────


// ─── Beasiswa Page ────────────────────────────────────────
const BeasiswaPage = ({ onSelect, setBeasiswaTerpilih, peserta, setPeserta, beasiswa, setBeasiswa, penyelenggara }) => {
  const [beasiswaList, setBeasiswaList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { page } = useParams();
  const [form, setForm] = useState({
    nama_beasiswa: "", 
    id_lembaga: penyelenggara.id, 
    nama_lembaga: penyelenggara.nama_lembaga, 
    nominal: "", 
    kuota: "", 
    deadline: "", 
    type: "Reguler", 
    status: "Draft", 
    deskripsi: ""
  });

  useEffect(() => {
    const BeasiswaData = async () => {
      try{
        const getBeasiswa = await fetch(`http://localhost:8000/api/beasiswa_lembaga?nama_lembaga=${penyelenggara.nama_lembaga}`)
        const dataBeasiswa = await getBeasiswa.json();
        setBeasiswaList(dataBeasiswa.data)
        console.log(beasiswaList)
        console.log(form)
      } catch (err) {
        console.error(err)
      }
    }

    BeasiswaData();
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      console.log(form)
      const uploadBeasiswa = await fetch("http://localhost:8000/api/upload_beasiswa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
      });

      const response = await uploadBeasiswa.json();

      if(response.status === "success") {
        alert("Penambahan berhasil!");
      } else {
        alert(response.message)
      }
    } catch (err) {
      console.error(err)
    }
  };

  const statusConfig = {
    Aktif: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", dot: "bg-green-500" },
    Draft: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200", dot: "bg-gray-400" },
    Selesai: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", dot: "bg-blue-500" },
  };

  const formatNominal = (n) => `Rp ${(n / 1000000).toFixed(0)} Jt`;

  return (
    <div className="ml-74 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 font-plex text-lg">Daftar Beasiswa</h3>
          <p className="text-xs text-gray-400 font-plex">{beasiswaList.length} beasiswa terdaftar</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#993133] to-[#FF312E] text-white text-sm font-bold px-4 py-2.5 rounded-xl font-plex shadow-[0_4px_12px_rgba(255,49,46,0.3)] hover:scale-105 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M12 5v14m-7-7h14" />
          </svg>
          Buat Beasiswa
        </button>
      </div>

      {/* Form Buat Beasiswa */}
      {showForm && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-[#FF312E]/15 shadow-[0_4px_20px_rgba(255,49,46,0.08)] p-6 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
            <h4 className="font-bold text-gray-900 font-plex mb-5 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs">+</span>
              Form Beasiswa Baru
            </h4>
            <div className="grid grid-cols-1 [@media(min-width:640px)]:grid-cols-2 gap-4">

              <div className="[@media(min-width:640px)]:col-span-2">
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Judul Beasiswa/Nama Beasiswa *</label>
                <input type="text" name="nama_beasiswa" value={form.nama_beasiswa} onChange={handleChange}
                  placeholder="contoh: Beasiswa Prestasi 2025"
                  className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Nominal (Rp) *</label>
                <input type="number" name="nominal" value={form.nominal} onChange={handleChange}
                  placeholder="15000000"
                  className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Kuota *</label>
                <input type="number" name="kuota" value={form.kuota} onChange={handleChange}
                  placeholder="100"
                  className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Deadline *</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
                  className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all" />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Jenis</label>
                <div className="relative">
                  <select name="type" value={form.type} onChange={handleChange}
                    className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg appearance-none cursor-pointer bg-white focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all">
                    {["Reguler", "Prestasi", "Organisasi"].map((j) => <option key={j}>{j}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF312E]">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Status</label>
                <div className="relative">
                  <select name="status" value={form.status} onChange={handleChange}
                    className="border border-gray-200 w-full h-[45px] px-[20px] text-sm rounded-lg appearance-none cursor-pointer bg-white focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all">
                    {["Draft", "Aktif", "Selesai"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF312E]">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="[@media(min-width:640px)]:col-span-2">
                <label className="text-xs text-gray-500 font-plex mb-1.5 block">Deskripsi</label>
                <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange}
                  rows={3} placeholder="Syarat, ketentuan, dan informasi beasiswa..."
                  className="border border-gray-200 w-full px-[20px] py-3 text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all resize-none" />
              </div>

            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button type="button" 
              onClick={() => setShowForm(false)}
                className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                Batal
              </button>
              <button type="button" 
              onClick={handleSubmit}
                className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Simpan Beasiswa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Beasiswa */}
      <div className="space-y-3">
        {beasiswaList.map((item) => {
          const c = statusConfig[item.status] || statusConfig.Draft;
          const pct = Math.round((item.terdaftar / item.kuota) * 100);
          return (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.04)] p-5 hover:shadow-[0_8px_24px_rgba(255,49,46,0.1)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 bg-[#FF312E]/8 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🎓
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 font-plex text-sm">{item.nama_beasiswa}</h4>
                    <div className="flex flex-wrap gap-3 mt-1.5">
                      <span className="text-xs text-[#FF312E] font-bold font-plex">{formatNominal(item.nominal)}</span>
                      <span className="text-xs text-gray-400 font-plex">📅 Deadline: {item.deadline}</span>
                      <span className="text-xs bg-[#FF312E]/8 text-[#FF312E] px-2 py-0.5 rounded-lg font-plex font-semibold border border-[#FF312E]/15">{item.type}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] text-gray-400 font-plex">{item.terdaftar} / {item.kuota} pendaftar</span>
                        <span className="text-[11px] font-bold text-[#FF312E] font-plex">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#993133] to-[#FF312E] rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-plex border ${c.bg} ${c.text} ${c.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    {item.status}
                  </span>
                  <button className="text-xs text-gray-400 hover:text-[#FF312E] font-plex transition-colors">
                    Edit →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────
const AdminPage = ({ isLogPenyelenggara, setIsLogPenyelenggara, penyelenggara }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [peserta, setPeserta] = useState([]);
  const [beasiswaTerpilih, setBeasiswaTerpilih] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const statusOptions = ["Semua", "Pending", "Review", "Diterima", "Ditolak"];


  const donutData = [
    
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFA] flex">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} penyelenggara={penyelenggara} setIsLogPenyelenggara={setIsLogPenyelenggara} beasiswaTerpilih={beasiswaTerpilih} setBeasiswaTerpilih={setBeasiswaTerpilih} navigate={navigate}/>
      
      {/* Main Content */}
      {activeMenu === "dashboard" && (
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
          </div>
        </main>
      )}

      {activeMenu === "beasiswa" && (
        <>
          {beasiswaTerpilih ? (
            <DetailBeasiswa beasiswa={beasiswaTerpilih} setBeasiswa={setBeasiswaTerpilih} peserta={peserta} setPeserta={setPeserta}/>
          ) : (
            <BeasiswaPage onSelect={(item) => setBeasiswaTerpilih(item)} beasiswa={beasiswaTerpilih} setBeasiswa={setBeasiswaTerpilih} penyelenggara={penyelenggara}/>
          )}
        </>
      )}

      {/* Approval Modal */}
      <ApprovalModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </div>
  );
};

export default AdminPage;
