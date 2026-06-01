import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Step Indicator ──────────────────────────────────────
const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {steps.map((step, i) => (
      <div key={i} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-plex transition-all duration-500 ${
              i < currentStep
                ? "bg-gradient-to-br from-[#993133] to-[#FF312E] text-white shadow-[0_4px_12px_rgba(255,49,46,0.4)]"
                : i === currentStep
                ? "bg-gradient-to-br from-[#993133] to-[#FF312E] text-white shadow-[0_4px_20px_rgba(255,49,46,0.6)] scale-110 ring-4 ring-[#FF312E]/20"
                : "bg-gray-100 text-gray-400 border-2 border-gray-200"
            }`}
          >
            {i < currentStep ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          <p className={`text-[10px] mt-1 font-plex font-semibold whitespace-nowrap hidden [@media(min-width:480px)]:block ${i === currentStep ? "text-[#FF312E]" : i < currentStep ? "text-[#FF312E]/70" : "text-gray-400"}`}>
            {step}
          </p>
        </div>
        {i < steps.length - 1 && (
          <div className={`h-0.5 w-8 [@media(min-width:640px)]:w-16 transition-all duration-500 mx-1 ${i < currentStep ? "bg-gradient-to-r from-[#993133] to-[#FF312E]" : "bg-gray-200"}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── Progress Bar ─────────────────────────────────────────
const ProgressBar = ({ percentage }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500 font-plex font-medium">Kelengkapan Formulir</p>
      <p className="text-sm font-bold text-[#FF312E] font-plex">{percentage}%</p>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#993133] to-[#FF312E] rounded-full transition-all duration-700 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Upload Area ─────────────────────────────────────────
const UploadArea = ({ label, accept, icon, hint, value, onChange, id, maxSize }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">{label}</label>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-[#FF312E]/80 bg-[#FF312E]/8 scale-[1.02]"
            : value
            ? "border-[#FF312E]/40 bg-[#FF312E]/8"
            : "border-gray-200 bg-gray-50 hover:border-[#FF312E]/40 hover:bg-[#FF312E]/8/50"
        }`}
      >
        <input ref={inputRef} id={id} type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files[0])} />
        {value ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-[#FF312E]/15 rounded-xl flex items-center justify-center text-[#FF312E] text-xl">
              {icon}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#993133] font-plex truncate max-w-[200px]">{value.name}</p>
              <p className="text-xs text-gray-400 font-plex">{(value.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="ml-auto w-7 h-7 bg-red-50 text-red-400 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
              {icon}
            </div>
            <p className="text-sm font-semibold text-gray-600 font-plex mb-1">Klik atau drag & drop file disini</p>
            <p className="text-xs text-gray-400 font-plex">{hint}</p>
            {maxSize && <p className="text-xs text-[#FF312E]/70 font-plex mt-1 font-semibold">Maks. {maxSize}</p>}
          </div>
        )}
        {isDragging && (
          <div className="absolute inset-0 bg-[#FF312E]/80/10 rounded-2xl flex items-center justify-center">
            <p className="text-[#FF312E] font-bold font-plex">Lepas untuk Upload!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tag Input ────────────────────────────────────────────
const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const suggestions = ["UI/UX", "Machine Learning", "Web Dev", "Desain Grafis", "Riset", "Organisasi", "Public Speaking", "Data Science"];

  const addTag = (tag) => {
    const clean = tag.trim();
    if (clean && !tags.includes(clean) && tags.length < 8) {
      setTags([...tags, clean]);
      setInput("");
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Skill / Kategori / Tag</label>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 focus-within:border-[#FF312E]/60 focus-within:bg-white transition-all">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-[#FF312E]/15 text-[#993133] text-xs px-3 py-1 rounded-full font-plex font-semibold">
              {tag}
              <button onClick={() => removeTag(tag)} className="text-[#FF312E]/70 hover:text-[#993133] transition-colors ml-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(input); } }}
            placeholder={tags.length === 0 ? "Tambah skill (Enter untuk menambah)" : ""}
            className="flex-1 min-w-[120px] bg-transparent text-sm font-plex text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
        <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
          {suggestions.filter((s) => !tags.includes(s)).slice(0, 5).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-plex hover:border-[#FF312E]/40 hover:text-[#FF312E] transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-400 font-plex mt-1">{8 - tags.length} tag tersisa</p>
    </div>
  );
};

// ─── Checklist Requirements ───────────────────────────────
const Checklist = ({ items, checked, onToggle }) => (
  <div className="bg-[#FF312E]/8/50 border border-[#FF312E]/15 rounded-2xl p-4">
    <p className="text-sm font-bold text-gray-700 mb-3 font-plex flex items-center gap-2">
      <span>📋</span> Checklist Persyaratan
    </p>
    <div className="space-y-2">
      {items.map((item, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => onToggle(i)}
            className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              checked[i]
                ? "bg-gradient-to-br from-[#993133] to-[#FF312E] shadow-[0_2px_8px_rgba(255,49,46,0.4)]"
                : "border-2 border-gray-300 group-hover:border-[#FF312E]/60"
            }`}
          >
            {checked[i] && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </div>
          <span className={`text-sm font-plex transition-colors ${checked[i] ? "text-gray-400 line-through" : "text-gray-700"}`}>
            {item}
          </span>
        </label>
      ))}
    </div>
    <div className="mt-3 flex items-center gap-2">
      <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#993133] to-[#FF312E] rounded-full transition-all duration-500"
          style={{ width: `${(checked.filter(Boolean).length / items.length) * 100}%` }}
        />
      </div>
      <p className="text-xs font-bold text-[#FF312E] font-plex whitespace-nowrap">
        {checked.filter(Boolean).length}/{items.length}
      </p>
    </div>
  </div>
);

// ─── FORM STEPS ───────────────────────────────────────────
const steps = ["Beasiswa", "Data Diri", "Akademik", "Dokumen", "Review"];

const requirements = [
  "Mahasiswa aktif semester 2-7",
  "IPK minimal 3.00",
  "Tidak sedang menerima beasiswa lain",
  "KTM dan KTP valid",
  "Proposal motivasi (maks. 2000 kata)",
  "Video perkenalan (maks. 60 detik)",
];

// ─── MAIN PAGE ────────────────────────────────────────────
const PostProposalPage = ({ isLogin, user }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [selectedScholarship, setSelectedScholarship] = useState("Beasiswa Unggulan Kemendikbud 2025");
  const [tipeBeasiswa, setTipeBeasiswa] = useState("");
  const [nama] = useState(user?.nama || "");
  const [universitas, setUniversitas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [semester, setSemester] = useState("");
  const [ipk, setIpk] = useState("");
  const [ukt, setUkt] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [ktm, setKtm] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [video, setVideo] = useState(null);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState(Array(requirements.length).fill(false));
  const [uploadProgress, setUploadProgress] = useState(0);

  const toggleCheck = (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const handleSubmit = () => {
    const propsalData = new FormData();
    propsalData.append("nama", nama);
    propsalData.append("tipeBeasiswa", tipeBeasiswa);
    propsalData.append("universitas", universitas);
    propsalData.append("jurusan", jurusan);
    propsalData.append("semester", semester);
    propsalData.append("ipk", ipk);
    propsalData.append("ukt", ukt);
    propsalData.append("deskripsi", deskripsi);

    if (video) propsalData.append("video", video);
    if (ktm) propsalData.append("ktm", ktm);
    if (ktp) propsalData.append("ktp", ktp);
    if (proposal) propsalData.append("proposal", proposal);

    const req = new XMLHttpRequest();

    req.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
      }
    }

    req.onload = () => {
      setIsSaving(false);
      if (req.status === 200 || req.status === 201) {
        setShowSuccess(true);
      } else {
        alert("Gagal mengirim proposal. Silakan coba lagi.");
      }
    };

    req.onerror = () => {
      setIsSaving(false);
      alert(`Koneksi gagal.`)
    };

    req.open('POST', 'http://localhost:8000/api/proposals');
    req.send(propsalData);

  }

  // Calculate progress
  const allFields = [selectedScholarship, tipeBeasiswa, universitas, jurusan, semester, ipk, deskripsi, ktm, ktp, proposal];
  const filled = allFields.filter(Boolean).length;
  const percentage = Math.round((filled / allFields.length) * 100);

  const stepContent = [
    // Step 0 – Pilih Beasiswa
    <div key="step0" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Beasiswa yang Dipilih</label>
        <div className="bg-gradient-to-r from-[#993133] to-[#FF312E] rounded-2xl p-5 text-white shadow-[0_8px_24px_rgba(255,49,46,0.35)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-xs font-plex mb-1">Penyelenggara</p>
              <p className="font-semibold text-sm font-plex">Kemendikbud RI</p>
            </div>
            <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-plex font-bold">Prestasi</span>
          </div>
          <h3 className="text-lg font-bold font-plex mt-3 leading-tight">{selectedScholarship}</h3>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-white/60 text-[10px] font-plex">Nominal</p>
              <p className="font-bold font-plex">Rp 24 Jt / Tahun</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px] font-plex">Deadline</p>
              <p className="font-bold font-plex text-amber-300">15 Hari Lagi</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px] font-plex">Kuota</p>
              <p className="font-bold font-plex">500 Orang</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Tipe Beasiswa</label>
        <div className="grid grid-cols-3 gap-3">
          {["Reguler", "Prestasi", "Leadership"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipeBeasiswa(t)}
              className={`py-3 rounded-2xl text-sm font-bold font-plex border-2 transition-all duration-300 ${
                tipeBeasiswa === t
                  ? "border-[#FF312E] bg-[#FF312E] text-white shadow-[0_4px_12px_rgba(255,49,46,0.35)] scale-105"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#FF312E]/40 hover:text-[#FF312E]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Checklist items={requirements} checked={checked} onToggle={toggleCheck} />
    </div>,

    // Step 1 – Data Diri
    <div key="step1" className="space-y-5">
      <div className="grid grid-cols-1 [@media(min-width:640px)]:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Nama Lengkap</label>
          <div className="relative">
            <input
              type="text"
              value={nama}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent transition-all pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF312E]/70 text-sm">🔒</span>
          </div>
          <p className="text-xs text-gray-400 font-plex mt-1">Diambil dari profil akunmu</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Jenis Kelamin</label>
          <div className="flex gap-3">
            {["Laki-laki", "Perempuan"].map((g) => (
              <button
                key={g}
                type="button"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold font-plex border-2 border-gray-200 bg-white text-gray-600 hover:border-[#FF312E]/40 hover:text-[#FF312E] transition-all"
              >
                {g === "Laki-laki" ? "👨" : "👩"} {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Deskripsi Diri</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Ceritakan motivasimu, prestasi, dan alasan mengajukan beasiswa ini secara menarik dan jelas..."
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm h-36 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all"
        />
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-400 font-plex">Ceritakan dirimu dengan autentik dan meyakinkan</p>
          <p className={`text-xs font-bold font-plex ${deskripsi.length > 1800 ? "text-red-500" : "text-gray-400"}`}>
            {deskripsi.length}/2000
          </p>
        </div>
      </div>

      <TagInput tags={tags} setTags={setTags} />
    </div>,

    // Step 2 – Data Akademik
    <div key="step2" className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Universitas</label>
        <input
          type="text"
          value={universitas}
          onChange={(e) => setUniversitas(e.target.value)}
          placeholder="Contoh: Universitas Gadjah Mada"
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Program Studi / Jurusan</label>
        <input
          type="text"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          placeholder="Contoh: Teknik Informatika"
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all cursor-pointer"
          >
            <option value="">Pilih</option>
            {Array.from({ length: 14 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">IPK Terakhir</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={ipk}
            onChange={(e) => setIpk(e.target.value)}
            placeholder="3.85"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-plex">UKT (juta)</label>
          <input
            type="number"
            value={ukt}
            onChange={(e) => setUkt(e.target.value)}
            placeholder="5"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 font-plex text-sm focus:outline-none focus:ring-2 focus:ring-[#FF312E]/60 focus:border-transparent focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* IPK Visual */}
      {ipk && !isNaN(parseFloat(ipk)) && (
        <div className="bg-[#FF312E]/8 rounded-2xl p-4 border border-[#FF312E]/15">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-700 font-plex">IPK Kamu</p>
            <p className={`text-lg font-bold font-plex ${parseFloat(ipk) >= 3.5 ? "text-green-600" : parseFloat(ipk) >= 3.0 ? "text-amber-600" : "text-red-500"}`}>
              {parseFloat(ipk).toFixed(2)} / 4.00
            </p>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ${parseFloat(ipk) >= 3.5 ? "bg-gradient-to-r from-green-400 to-emerald-500" : parseFloat(ipk) >= 3.0 ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-red-400 to-red-500"}`}
              style={{ width: `${(parseFloat(ipk) / 4) * 100}%` }}
            />
          </div>
          <p className={`text-xs mt-2 font-plex font-semibold ${parseFloat(ipk) >= 3.5 ? "text-green-600" : parseFloat(ipk) >= 3.0 ? "text-amber-600" : "text-red-500"}`}>
            {parseFloat(ipk) >= 3.5 ? "✅ Memenuhi syarat beasiswa" : parseFloat(ipk) >= 3.0 ? "⚠️ Minimal beberapa beasiswa" : "❌ IPK kurang dari syarat minimum"}
          </p>
        </div>
      )}
    </div>,

    // Step 3 – Upload Dokumen
    <div key="step3" className="space-y-5">
      <div className="grid grid-cols-1 [@media(min-width:640px)]:grid-cols-2 gap-4">
        <UploadArea
          label="Kartu Tanda Mahasiswa (KTM)"
          accept="image/*,.pdf"
          icon="🎓"
          hint="JPG, PNG, atau PDF"
          value={ktm}
          onChange={setKtm}
          id="ktm"
        />
        <UploadArea
          label="Kartu Tanda Penduduk (KTP)"
          accept="image/*,.pdf"
          icon="🪪"
          hint="JPG, PNG, atau PDF"
          value={ktp}
          onChange={setKtp}
          id="ktp"
        />
      </div>

      <UploadArea
        label="Proposal / Esai Motivasi"
        accept=".pdf,.doc,.docx"
        icon="📄"
        hint="PDF atau Word Document (maks. 2000 kata)"
        value={proposal}
        onChange={setProposal}
        id="proposal"
        maxSize="10 MB"
      />

      <div>
        <UploadArea
          label="Video Perkenalan (Maks. 60 Detik)"
          accept="video/*"
          icon="🎬"
          hint="MP4, MOV — perkenalan diri yang meyakinkan"
          value={video}
          onChange={setVideo}
          id="video"
          maxSize="100 MB"
        />
        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="text-sm mt-0.5">💡</span>
          <p className="text-xs text-amber-700 font-plex">
            <strong>Tips Video:</strong> Ceritakan nama, universitas, jurusan, dan motivasimu dalam 60 detik. Gunakan pencahayaan baik dan bicara dengan percaya diri!
          </p>
        </div>
      </div>

      {(ktm || ktp || proposal || video) && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-green-700 font-plex mb-2">✅ Dokumen Terupload</p>
          <div className="space-y-1">
            {[{ label: "KTM", file: ktm }, { label: "KTP", file: ktp }, { label: "Proposal", file: proposal }, { label: "Video", file: video }].filter(({ file }) => file).map(({ label, file }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-green-600 font-plex">
                <span>✓</span>
                <span className="font-semibold">{label}:</span>
                <span className="text-green-500 truncate">{file?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>,

    // Step 4 – Review
    <div key="step4" className="space-y-5">
      <div className="bg-gradient-to-br from-[#FF312E]/5 to-[#993133]/5 rounded-2xl p-5 border border-[#FF312E]/15">
        <h3 className="font-bold text-gray-900 font-plex mb-4 flex items-center gap-2">
          <span>👤</span> Data Diri
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Nama", value: nama || "—" },
            { label: "Tipe Beasiswa", value: tipeBeasiswa || "—" },
            { label: "Universitas", value: universitas || "—" },
            { label: "Jurusan", value: jurusan || "—" },
            { label: "Semester", value: semester || "—" },
            { label: "IPK", value: ipk || "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-gray-400 font-plex text-xs">{label}</p>
              <p className="font-bold text-gray-800 font-plex">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-gray-900 font-plex mb-3 flex items-center gap-2">
          <span>📎</span> Dokumen
        </h3>
        <div className="space-y-2">
          {[{ label: "KTM", file: ktm }, { label: "KTP", file: ktp }, { label: "Proposal", file: proposal }, { label: "Video", file: video }].map(({ label, file }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <p className="text-gray-500 font-plex">{label}</p>
              {file ? (
                <span className="text-green-600 font-bold font-plex text-xs flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6 9 17l-5-5" /></svg>
                  {file.name.substring(0, 20)}...
                </span>
              ) : (
                <span className="text-red-400 font-plex text-xs">Belum diupload</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FF312E]/8 border border-[#FF312E]/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <input type="checkbox" id="agree" className="mt-1 accent-[#FF312E] w-4 h-4 cursor-pointer" />
          <label htmlFor="agree" className="text-sm text-gray-700 font-plex cursor-pointer leading-relaxed">
            Saya menyatakan bahwa semua data dan dokumen yang saya kirimkan adalah <strong>benar dan valid</strong>. Saya memahami bahwa data palsu akan mengakibatkan <strong>diskualifikasi</strong>.
          </label>
        </div>
      </div>
    </div>,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FFFFFA] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-[0_16px_64px_rgba(255,49,46,0.15)] text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(255,49,46,0.5)] animate-bounce">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-10 h-10">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-plex mb-2">Proposal Terkirim! 🎉</h2>
          <p className="text-gray-400 text-sm font-plex mb-6">
            Proposalmu untuk <strong className="text-gray-700">{selectedScholarship}</strong> telah berhasil dikirimkan. Kami akan menghubungimu dalam 7–14 hari kerja.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="w-full bg-gradient-to-r from-[#993133] to-[#FF312E] text-white font-bold py-4 rounded-2xl font-plex shadow-[0_8px_24px_rgba(255,49,46,0.35)] hover:scale-[1.02] transition-transform"
          >
            Kembali ke Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFA] pb-32">
      {/* Header */}
      <div className="bg-white border-b border-[#FF312E]/8 shadow-sm sticky top-0 z-30 px-4 [@media(min-width:768px)]:px-8 [@media(min-width:1024px)]:px-16 pt-20 pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF312E]/15 flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-600">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 font-plex">Ajukan Proposal</h1>
              <p className="text-xs text-gray-400 font-plex">Langkah {currentStep + 1} dari {steps.length}</p>
            </div>
          </div>
          <StepIndicator currentStep={currentStep} steps={steps} />
          <ProgressBar percentage={percentage} />
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-3xl mx-auto px-4 [@media(min-width:768px)]:px-8 [@media(min-width:1024px)]:px-0 pt-8">
        <div className="bg-white rounded-3xl p-6 [@media(min-width:640px)]:p-8 shadow-[0_4px_32px_rgba(255,49,46,0.08)] border border-[#FF312E]/8">
          <h2 className="text-xl font-bold text-gray-900 font-plex mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-lg flex items-center justify-center text-white text-sm font-bold">
              {currentStep + 1}
            </span>
            {steps[currentStep]}
          </h2>
          {stepContent[currentStep]}
        </div>
      </div>

      {/* Upload Progress Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
            <div className="w-16 h-16 bg-[#FF312E]/15 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
              📤
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-plex mb-2">Mengirim Proposal...</h3>
            <p className="text-gray-400 text-sm font-plex mb-4">Mohon tunggu sebentar</p>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#993133] to-[#FF312E] rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-[#FF312E] font-bold text-sm font-plex">{uploadProgress}%</p>
          </div>
        </div>
      )}

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-[#FF312E]/8 px-4 [@media(min-width:768px)]:px-8 py-4 z-30">
        <div className="max-w-3xl mx-auto flex gap-3">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl font-plex text-sm transition-all duration-300 hover:scale-[0.98] active:scale-95"
            >
              ← Kembali
            </button>
          )}
          <button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="flex-[2] bg-gradient-to-r from-[#993133] to-[#FF312E] hover:from-[#7a2527] hover:to-[#993133] text-white font-bold py-4 rounded-2xl font-plex text-sm shadow-[0_8px_24px_rgba(255,49,46,0.35)] hover:shadow-[0_12px_32px_rgba(255,49,46,0.5)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
          >
            {currentStep === steps.length - 1 ? "🚀 Kirim Proposal" : "Lanjut →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProposalPage;
