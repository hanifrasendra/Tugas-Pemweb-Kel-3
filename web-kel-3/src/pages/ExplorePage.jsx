import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Data Mock ───────────────────────────────────────────
const mockScholarships = [
  {
    id: 1,
    title: "Beasiswa Unggulan Kemendikbud 2025",
    provider: "Kemendikbud RI",
    type: "Prestasi",
    nominal: 24000000,
    quota: 500,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    prodi: "Semua Jurusan",
    financial: "Semua",
    description: "Program beasiswa unggulan bagi mahasiswa berprestasi dengan IPK minimal 3.5",
    tags: ["Prestasi", "Pemerintah", "S1"],
    trending: true,
    color: "from-[#993133] to-[#7a2527]",
    icon: "🏆",
    saved: false,
  },
  {
    id: 2,
    title: "Beasiswa PPA Universitas Nasional",
    provider: "Dikti",
    type: "Reguler",
    nominal: 6000000,
    quota: 200,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    prodi: "Teknik",
    financial: "Kurang Mampu",
    description: "Bantuan biaya pendidikan untuk mahasiswa aktif semester 2–7 berprestasi",
    tags: ["Reguler", "Dikti"],
    trending: false,
    color: "from-blue-500 to-[#993133]",
    icon: "📚",
    saved: true,
  },
  {
    id: 3,
    title: "Beasiswa LPDP Afirmasi 2025",
    provider: "LPDP",
    type: "Prestasi",
    nominal: 80000000,
    quota: 150,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    prodi: "Semua Jurusan",
    financial: "Semua",
    description: "Beasiswa penuh untuk S2/S3 dalam dan luar negeri bagi mahasiswa berprestasi",
    tags: ["LPDP", "S2", "S3", "Penuh"],
    trending: true,
    color: "from-emerald-500 to-teal-700",
    icon: "🌍",
    saved: false,
  },
  {
    id: 4,
    title: "Beasiswa Kepemimpinan Pemuda",
    provider: "Kemenpora",
    type: "Leadership",
    nominal: 12000000,
    quota: 100,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    prodi: "Semua Jurusan",
    financial: "Semua",
    description: "Program untuk mahasiswa aktif organisasi dengan rekam jejak kepemimpinan luar biasa",
    tags: ["Leadership", "Organisasi"],
    trending: false,
    color: "from-orange-500 to-red-600",
    icon: "⚡",
    saved: false,
  },
  {
    id: 5,
    title: "Beasiswa Djarum Plus 2025",
    provider: "Djarum Foundation",
    type: "Prestasi",
    nominal: 18000000,
    quota: 300,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    prodi: "Semua Jurusan",
    financial: "Semua",
    description: "Beasiswa prestasi dengan program pengembangan karakter dan kepemimpinan",
    tags: ["Swasta", "Prestasi", "IPK 3.2+"],
    trending: true,
    color: "from-pink-500 to-rose-600",
    icon: "💡",
    saved: true,
  },
  {
    id: 6,
    title: "Beasiswa Bank Indonesia 2025",
    provider: "Bank Indonesia",
    type: "Reguler",
    nominal: 15000000,
    quota: 250,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    prodi: "Ekonomi",
    financial: "Kurang Mampu",
    description: "Beasiswa khusus ekonomi dan bisnis dari Bank Indonesia untuk mahasiswa berprestasi",
    tags: ["BI", "Ekonomi", "Reguler"],
    trending: false,
    color: "from-cyan-500 to-blue-600",
    icon: "🏦",
    saved: false,
  },
];

// ─── Countdown Component ─────────────────────────────────
const Countdown = ({ isLogin, set, deadline }) => {
  const [timeRange, setTimeRange] = useState(deadline);

  return (
    <div className={`flex items-center gap-1 text-xs font-bold font-plex`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
      {timeRange}
    </div>
  );
};

// ─── Scholarship Card ────────────────────────────────────
const ScholarshipCard = ({ scholarship, onSave, onApply, navigate }) => {
  const formatNominal = (n) => {
    if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(0)} Jt`;
  };



  return (
    <div
      className="group relative bg-white rounded-[10px] overflow-hidden border border-[#FF312E]/8 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Top gradient strip */}
      

      {/* Card Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-icon bg-brand-charcoal border border-brand-red flex items-center justify-center text-xl`}>
            {scholarship.icon}
          </div>
          <div className={`flex items-center justify-center bg-label-cat p-label rounded-label text-(length:--text-label) font-bold font-plex`}>
            <span className={`text-surface`}>{scholarship.type}</span>
          </div>
        </div>

        <h3 className="mt-3 font-plex font-bold text-[15px] text-gray-900 leading-tight group-hover:text-[#993133] transition-colors line-clamp-2">
          {scholarship.nama_beasiswa}
        </h3>
        <p className="text-[12px] text-gray-400 mt-1 font-plex">{scholarship.nama_lembaga}</p>
      </div>

      {/* Stats */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#FF312E]/8 rounded-xl p-3">
            <p className="text-[10px] text-[#FF312E]/70 font-plex">Nominal</p>
            <p className="text-[13px] font-bold text-[#993133] font-plex">{formatNominal(scholarship.nominal)}</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 font-plex">Kuota</p>
            <p className="text-[13px] font-bold text-gray-700 font-plex">{scholarship.kuota} org</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-5 mt-3 flex flex-wrap gap-1">
        
      </div>

      {/* Footer */}
      <div className="px-5 mt-4 pb-5 flex items-center justify-between">
        <Countdown deadline={scholarship.deadline} />
        <button
          onClick={() => navigate(`/post-proposal/${scholarship.id}`, { state: { scholarship } })}
          className="bg-gradient-to-r from-[#993133] to-[#FF312E] hover:from-[#7a2527] hover:to-[#993133] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-[0_4px_12px_rgba(255,49,46,0.35)] hover:shadow-[0_6px_20px_rgba(255,49,46,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 font-plex cursor-pointer"
        >
          Ajukan →
        </button>
      </div>
    </div>
  );
};

// ─── Filter Bottom Sheet ─────────────────────────────────
const FilterSheet = ({ isOpen, onClose, filters, setFilters }) => {
  const jurusanOpts = ["Semua Jurusan", "Teknik", "Ekonomi", "Hukum", "Kedokteran", "FMIPA"];
  const finansialOpts = ["Semua", "Kurang Mampu", "Menengah"];
  const nominalOpts = ["Semua", "< 10 Jt", "10–25 Jt", "25–50 Jt", "> 50 Jt"];
  const tipeOpts = ["Semua", "Prestasi", "Reguler", "Leadership"];

  return (
    <>
      
      {/* Sheet */}
      <div
        className={`bg-white  z-50 transition-transform duration-500 ease-out mb-5 max-h-[85vh] overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 bg-white px-6 pt-4 pb-3 border-b border-gray-100 z-10">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg font-plex">Filter Beasiswa</h3>
            <button
              onClick={() => setFilters({ jurusan: "Semua Jurusan", finansial: "Semua", nominal: "Semua", tipe: "Semua" })}
              className="text-[#FF312E] text-sm font-semibold font-plex"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {[
            { label: "Jurusan", key: "jurusan", opts: jurusanOpts },
            { label: "Keadaan Finansial", key: "finansial", opts: finansialOpts },
            { label: "Nominal Beasiswa", key: "nominal", opts: nominalOpts },
            { label: "Tipe Beasiswa", key: "tipe", opts: tipeOpts },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <p className="text-sm font-bold text-gray-700 mb-3 font-plex">{label}</p>
              <div className="flex flex-wrap gap-2">
                {opts.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilters((prev) => ({ ...prev, [key]: opt }))}
                    className={`px-4 py-2 rounded-full text-sm font-plex font-medium transition-all duration-200 ${
                      filters[key] === opt
                        ? "bg-gradient-to-r from-[#993133] to-[#FF312E] text-white shadow-lg shadow-[#FF312E]/20 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-[#FF312E]/8 hover:text-[#FF312E]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-8 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#993133] to-[#FF312E] text-white font-bold py-4 rounded-2xl text-base font-plex shadow-[0_8px_24px_rgba(255,49,46,0.35)] hover:shadow-[0_12px_32px_rgba(255,49,46,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Skeleton Card ────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#FF312E]/8 animate-pulse">
    <div className="h-[6px] bg-gray-200 w-full" />
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-gray-200" />
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
      <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-100 rounded w-1/2" />
      <div className="mt-4 flex gap-3">
        <div className="flex-1 h-14 bg-gray-100 rounded-xl" />
        <div className="flex-1 h-14 bg-gray-100 rounded-xl" />
      </div>
      <div className="mt-3 flex gap-1">
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
        <div className="h-5 w-20 bg-gray-100 rounded-full" />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="h-4 w-24 bg-gray-100 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Empty State ─────────────────────────────────────────
const EmptyState = ({ onReset }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
    <div className="w-24 h-24 bg-[#FF312E]/8 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-inner">
      🔍
    </div>
    <h3 className="text-xl font-bold text-gray-900 font-plex mb-2">Beasiswa Tidak Ditemukan</h3>
    <p className="text-gray-400 text-sm font-plex max-w-xs mb-6">
      Tidak ada beasiswa yang cocok dengan filter pilihanmu. Coba ubah kriteria pencarian.
    </p>
    <button
      onClick={onReset}
      className="bg-gradient-to-r from-[#993133] to-[#FF312E] text-white font-bold px-8 py-3 rounded-2xl font-plex shadow-lg shadow-[#FF312E]/20 hover:scale-105 transition-transform"
    >
      Reset Filter
    </button>
  </div>
);

// ─── Trending Badge Banner ───────────────────────────────
const TrendingBanner = ({ scholarships, onApply }) => {
  const trending = scholarships.filter((s) => s.trending);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((prev) => (prev + 1) % trending.length), 4000);
    return () => clearInterval(t);
  }, [trending.length]);

  if (!trending.length) return null;
  const s = trending[active];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">🔥</span>
        <h2 className="font-bold text-gray-900 font-plex text-lg">Trending Sekarang</h2>
      </div>
      <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${s.color} p-6 text-white shadow-[0_8px_32px_rgba(255,49,46,0.25)] transition-all duration-500`}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-3xl">{s.icon}</span>
              <p className="text-white/70 text-xs mt-2 font-plex">{s.provider}</p>
              <h3 className="text-lg font-bold font-plex mt-1 leading-tight max-w-[240px]">{s.title}</h3>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs font-plex">Nominal</p>
              <p className="text-xl font-bold font-plex">
                Rp {(s.nominal / 1000000).toFixed(0)} Jt
              </p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-3 font-plex line-clamp-2">{s.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1">
              {trending.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
            <button
              onClick={() => onApply(s.id)}
              className="bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-white/30 transition-all duration-300 font-plex"
            >
              Ajukan Sekarang →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────
const ExplorePage = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ jurusan: "Semua Jurusan", finansial: "Semua", nominal: "Semua", tipe: "Semua" });
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", "Prestasi", "Reguler", "Leadership", "Saved"];

  useEffect(() => {

    const Beasiswa = async () => {
      try{
        setIsLoading(false)
        const getBeasiswa = await fetch("http://localhost:8000/api/beasiswa")
        const dataBeasiswa = await getBeasiswa.json();
        console.log(scholarships)
        setScholarships(dataBeasiswa.data)
        console.log(scholarships)
      } catch (err) {
        console.error(err)
      }
    }

    Beasiswa();
  }, []);

  const handleSave = (id) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s))
    );
  };

  const handleApply = (id) => {
    navigate("/tambah");
  };

  const filtered = scholarships.filter((s) => {
    const matchCategory = activeCategory === "Semua" || (activeCategory === "Saved" ? s.saved : s.type === activeCategory);
    const matchJurusan = filters.jurusan === "Semua Jurusan" || s.prodi === filters.jurusan || s.prodi === "Semua Jurusan";
    const matchFinansial = filters.finansial === "Semua" || s.financial === filters.finansial || s.financial === "Semua";
    const matchTipe = filters.tipe === "Semua" || s.type === filters.tipe;
    let matchNominal = true;
    if (filters.nominal === "< 10 Jt") matchNominal = s.nominal < 10000000;
    else if (filters.nominal === "10–25 Jt") matchNominal = s.nominal >= 10000000 && s.nominal <= 25000000;
    else if (filters.nominal === "25–50 Jt") matchNominal = s.nominal > 25000000 && s.nominal <= 50000000;
    else if (filters.nominal === "> 50 Jt") matchNominal = s.nominal > 50000000;
    return matchCategory && matchJurusan && matchFinansial && matchTipe && matchNominal;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "nominal-tinggi") return b.nominal - a.nominal;
    if (sortBy === "nominal-rendah") return a.nominal - b.nominal;
    if (sortBy === "deadline") return a.deadline - b.deadline;
    return b.id - a.id;
  });

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "Semua Jurusan" && v !== "Semua"
  ).length;

  return (
    <div className="min-h-screen bg-[#FFFFFA] pb-32">
      {/* Decorative BG */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF312E]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#FF312E]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 [@media(min-width:768px)]:px-8 [@media(min-width:1024px)]:px-16">
        {/* Header */}
        <div className="pt-28 pb-6">
          <h1 className="text-3xl [@media(min-width:768px)]:text-4xl font-bold font-plex text-gray-900 leading-tight">
            Temukan <span className="bg-gradient-to-r from-[#993133] to-[#FF312E] bg-clip-text text-transparent">Beasiswamu</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari beasiswa atau penyelenggara..."
            className="w-full bg-white rounded-2xl pl-12 pr-16 py-4 text-gray-800 placeholder-gray-400 font-plex text-sm focus:outline-none focus:border-transparent shadow-[0_4px_24px_rgba(255,49,46,0.08)] transition-all duration-300"
          />
          
        </div>

        {/* Category Chips */}
        <div className="relative flex justify-between">
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 mb-6 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-[10px] text-sm font-bold font-plex transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-brand-red text-white shadow-lg shadow-[#FF312E]/20 scale-105"
                      : "bg-white text-gray-500 hover:bg-[#FF312E]/8 hover:text-[#FF312E] border border-gray-100"
                  }`}
                >
                  {cat === "Saved" ? "💾 Tersimpan" : cat}
                </button>
              ))}
            </div>
            <div className={`bg-[#515052] h-0.5 w-full`}></div>
          </div>
          <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-9 h-9 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
          
        </div>

        {/* Filter Sheet */}
        {isFilterOpen && (
            <FilterSheet
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              setFilters={setFilters}
            />
        )}

        {/* Sort + Count Row */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500 font-plex">
            <span className="font-bold text-gray-900">{sorted.length}</span> hasil ditemukan
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-white border border-gray-100 rounded-xl px-3 py-2 font-plex text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF312E]/50 shadow-sm cursor-pointer"
          >
            <option value="terbaru">Terbaru</option>
            <option value="nominal-tinggi">Nominal Tertinggi</option>
            <option value="nominal-rendah">Nominal Terendah</option>
            <option value="deadline">Deadline Terdekat</option>
          </select>
        </div>

        {/* Trending Banner (only on Semua) */}
        {activeCategory === "Semua" && !search && (
          <TrendingBanner scholarships={scholarships} onApply={handleApply} />
        )}

        {/* Section Label */}
        {activeCategory === "Semua" && (
          <div className="flex items-center gap-3 mb-5">
            <span className="text-base">✨</span>
            <h2 className="font-bold text-gray-900 font-plex">Rekomendasi Untukmu</h2>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 [@media(min-width:768px)]:grid-cols-2 [@media(min-width:1024px)]:grid-cols-3 [@media(min-width:1280px)]:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : sorted.length === 0 ? (
            <EmptyState
              onReset={() => {
                setSearch("");
                setFilters({ jurusan: "Semua Jurusan", finansial: "Semua", nominal: "Semua", tipe: "Semua" });
                setActiveCategory("Semua");
              }}
            />
          ) : (
            sorted.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} onSave={handleSave} onApply={handleApply} navigate={navigate} />
            ))
          )}
        </div>
      </div>

      {/* Floating Filter Button (mobile) */}
      <div className="fixed bottom-24 right-5 z-30 [@media(min-width:768px)]:hidden">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-[#993133] to-[#FF312E] rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(255,49,46,0.5)] hover:scale-110 transition-transform active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Sheet */}
      
    </div>
  );
};

export default ExplorePage;
