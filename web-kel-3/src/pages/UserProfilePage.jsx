import { useState } from "react";
import { useNavigate } from "react-router-dom";



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
        <p className="text-xl font-bold text-[#993133] font-plex leading-none"></p>
        <p className="text-[9px] text-gray-400 font-plex">IPK</p>
      </div>
    </div>
  );
};


// ─── MAIN PAGE ────────────────────────────────────────────
const UserProfilePage = ({ user }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("riwayat");
  const [isEdit, setIsEdit] = useState(null);

  const [userData, setUserData] = useState(user);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const tabs = [
    { id: "riwayat", label: "Riwayat Proposal", icon: "📋" },
    { id: "saved", label: "Tersimpan", icon: "💾" },
    { id: "skill", label: "Skill & Tag", icon: "⚡" },
  ];

  const formatNominal = (n) => `Rp ${(n / 1000000).toFixed(0)} Jt`;

  const updateData = async() => {
  console.log(userData);

    try {
      const update = await fetch("http://localhost:8000/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const res = await update.json();

      if(res.status === 'success') {
        alert("Data berhasil diperbarui!");
        localStorage.setItem("user", JSON.stringify(res.data));
        handleClose();
      }
    } catch {
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  }

  const handleClose = () => {
    setIsEdit(null);
  }
  
  const handleEdit = (field) => {
    setIsEdit(field);
    console.log(isEdit);
  }

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
              className="flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl font-plex hover:bg-white/30 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="absolute bottom-[-50px] left-4 [@media(min-width:768px)]:left-8 [@media(min-width:1024px)]:left-16 z-10">
          <div className="relative">
            <div className="flex w-24 h-24 [@media(min-width:768px)]:w-28 [@media(min-width:768px)]:h-28 bg-gradient-to-br from-[#FF312E] to-[#FF312E] rounded-3xl border-4 border-white shadow-[0_8px_32px_rgba(255,49,46,0.4)] flex items-center justify-center text-4xl [@media(min-width:768px)]:text-5xl font-bold text-white font-plex">
              {user.username.charAt(0)+user.username.charAt(1)}
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
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl [@media(min-width:768px)]:text-3xl font-bold text-gray-900 font-plex leading-tight">
                {user.username}
              </h1>
              <span 
              onClick={() => handleEdit("nama")}
              className="flex items-end w-5 h-5 rounded-edit cursor-pointer
              hover:bg-brand-red/15">
                <svg 
                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5.5l2.5 2.5" stroke="#C0392B" stroke-width="1.6" stroke-linecap="round"/>
                  <path d="M3 17h14" stroke="#C0392B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
              {/* Edit Modal for Name */}
              {isEdit == "nama" && (
                <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">

                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5.5l2.5 2.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
                          <path d="M3 17h14" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Edit Username
                      </div>
                      <button 
                      onClick={() => handleClose()}
                      className={`w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 transition-colors1 cursor-pointer
                      hover:bg-brand-red hover:text-brand-light hover:font-bold`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs text-gray-500 mb-1.5 block tracking-wide">
                        Username
                      </label>
                      <input
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        maxLength={60}
                        className="w-full h-10 px-3 text-sm rounded-lg border border-[#C0392B]/25 focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all"
                      />
                      <div className="text-right text-xs text-gray-400 mt-1">
                        {userData.username.length} / 60
                      </div>
                    </div>

                    <div className="bg-[#FCEBEB] rounded-lg px-3.5 py-2.5 mb-5">
                      <p className="text-[11px] text-[#A32D2D] mb-1">Pratinjau</p>
                      <p className="font-mono text-lg font-bold text-gray-900 tracking-tight">
                        {userData.username || "username"}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                      <button
                        onClick={() => handleClose()}
                        className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => updateData()}
                        className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Simpan
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
            <span className="text-brand-gray text-(length:--text-profile-label)">
              {user.email}
            </span>

            {/* Nama Lengkap + edit */}
            <div className="flex flex-col px-5 py-2 mt-7">
              <label className="text-label-profile text-(length:--text-profile-label) font-semibold">Nama Lengkap :</label>
              <div className="flex gap-4">
                <span className="text-brand-gray text-(length:--text-profile-label)">{user.namalengkap}</span>
                <span 
                onClick={() => handleEdit("namalengkap")}
                className="flex flex-col justify-center cursor-pointer text-brand-gray">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </span>
                {isEdit == "namalengkap" && (
                  <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">

                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 5.5l2.5 2.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
                            <path d="M3 17h14" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Edit nama lengkap
                        </div>
                        <button 
                        onClick={() => handleClose()}
                        className={`w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 transition-colors1 cursor-pointer
                        hover:bg-brand-red hover:text-brand-light hover:font-bold`}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mb-4">
                        <label className="text-xs text-gray-500 mb-1.5 block tracking-wide">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={userData.namalengkap}
                          onChange={(e) => setUserData({ ...userData, namalengkap: e.target.value })}
                          maxLength={60}
                          className="w-full h-10 px-3 text-sm rounded-lg border border-[#C0392B]/25 focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all"
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">
                          {userData.namalengkap.length} / 60
                        </div>
                      </div>

                      <div className="bg-[#FCEBEB] rounded-lg px-3.5 py-2.5 mb-5">
                        <p className="text-[11px] text-[#A32D2D] mb-1">Pratinjau</p>
                        <p className="font-mono text-lg font-bold text-gray-900 tracking-tight">
                          {userData.namalengkap || "Nama Lengkap"}
                        </p>
                      </div>

                      <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleClose()}
                          className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => updateData()}
                          className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Simpan
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Universitas + edit */}
            <div className="flex flex-col px-5 py-2">
              <label className="text-label-profile text-(length:--text-profile-label) font-semibold">Universitas :</label>
              <div className="flex gap-4">
                <span className="text-brand-gray text-(length:--text-profile-label)">{user.universitas}</span>
                <span 
                onClick={() => handleEdit("universitas")}
                className="flex flex-col justify-center cursor-pointer text-brand-gray">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </span>
                {isEdit == "universitas" && (
                  <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">

                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 5.5l2.5 2.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
                            <path d="M3 17h14" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Edit Universitas
                        </div>
                        <button 
                        onClick={() => handleClose()}
                        className={`w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 transition-colors1 cursor-pointer
                        hover:bg-brand-red hover:text-brand-light hover:font-bold`}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mb-4">
                        <label className="text-xs text-gray-500 mb-1.5 block tracking-wide">
                          Universitas
                        </label>
                        <input
                          type="text"
                          value={userData.universitas}
                          onChange={(e) => setUserData({ ...userData, universitas: e.target.value })}
                          maxLength={60}
                          className="w-full h-10 px-3 text-sm rounded-lg border border-[#C0392B]/25 focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all"
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">
                          {userData.universitas?.length} / 60
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleClose()}
                          className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => updateData()}
                          className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Simpan
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span 
              onClick={() => handleEdit("semester")}
              className="text-xs bg-[#FF312E]/8 text-[#FF312E] px-3 py-1 rounded-full font-plex border border-[#FF312E]/15 font-semibold">
                📚 Semester {user.semester}
              </span>
              <span 
              onClick={() => handleEdit("gender")}
              className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-plex border border-gray-100 font-semibold">
                {user.gender === "Laki-laki" ? "👨" : "👩"} {user.gender}
              </span>
              {isEdit == "semester" && (
                <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">

                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5.5l2.5 2.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
                          <path d="M3 17h14" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Edit Semester
                      </div>
                      <button 
                      onClick={() => handleClose()}
                      className={`w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 transition-colors1 cursor-pointer
                      hover:bg-brand-red hover:text-brand-light hover:font-bold`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs text-gray-500 mb-1.5 block tracking-wide">
                        Semester
                      </label>
                      select
                      <select
                        value={userData.semester}
                        onChange={(e) => setUserData({ ...userData, semester: e.target.value })}
                        className="w-full h-10 px-3 pr-10 text-sm rounded-lg border border-[#C0392B]/25 
                      focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 
                        outline-none transition-all"
                      >
                        {Array.from({ length: 14}, (_, i) => i + 1).map((sem) => (
                          <option key={sem} value={sem}>
                            {sem}
                          </option>
                        ))}
                      
                        
                      </select>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                      <button
                        onClick={() => handleClose()}
                        className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => updateData()}
                        className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Simpan
                      </button>
                    </div>

                  </div>
                </div>
              )}
              {isEdit === "gender" && (
                <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M14 3.5l2.5 2.5-10 10L4 17l1-2.5 9-11z" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5.5l2.5 2.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
                          <path d="M3 17h14" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Edit jenis kelamin
                      </div>
                      <button
                        onClick={() => setIsEdit(null)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Pilihan Gender */}
                    <div className="flex flex-col gap-3 mb-5">
                      {[
                        { value: "Laki-laki", icon: "👨", label: "Laki-laki" },
                        { value: "Perempuan", icon: "👩", label: "Perempuan" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setUserData({ ...userData, gender: opt.value })}
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all cursor-pointer ${
                            user.gender === opt.value
                              ? "border-[#C0392B] bg-[#FCEBEB] text-[#C0392B]"
                              : "border-gray-200 bg-white text-gray-600 hover:border-[#C0392B]/30 hover:bg-[#FCEBEB]/40"
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="text-sm font-medium font-plex">{opt.label}</span>
                          {/* Radio indicator */}
                          <div className="ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center
                            border-[#C0392B]">
                            {userData.gender === opt.value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                      <button
                        onClick={() => setIsEdit(null)}
                        className="px-4 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => updateData()}
                        className="px-5 h-9 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:scale-95 text-white text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l5 5 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Simpan
                      </button>
                    </div>

                  </div>
                </div>
              )}
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
            
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          
        </div>

        {/* Achievement Badges */}
        <div className="mt-5">
          <h2 className="text-base font-bold text-gray-900 font-plex mb-3 flex items-center gap-2">
            <span>🏅</span> Pencapaian
          </h2>
          <div className="grid grid-cols-2 [@media(min-width:640px)]:grid-cols-4 gap-3">
            
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
    </div>
  );
};

export default UserProfilePage;
