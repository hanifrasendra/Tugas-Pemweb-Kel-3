import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const DetailProposal = ({ beasiswa, user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [proposal, setProposal] = useState([]);

  useEffect(() => {
    const Proposal = async () => {
      try{
        const getProposal = await fetch(`http://localhost:8000/api/proposal/${id}`)
        const prop = await getProposal.json();
        console.log(prop.data)
        setProposal(prop.data)
      } catch(err) {

      }
    }
    Proposal();
  }, [])

  // Mock data beasiswa
  const b = beasiswa || {
    judul: "Beasiswa Unggulan Kemendikbud 2025",
    penyelenggara: "Kemendikbud RI",
    nominal: "Rp 24 Jt / Tahun",
    deadline: "15 Hari Lagi",
    kuota: "500 Orang",
    tipe: "Prestasi",
    deskripsi: "Beasiswa unggulan diberikan kepada putra-putri terbaik bangsa yang berprestasi di bidang akademik maupun non-akademik.",
    syarat: [
      "Mahasiswa aktif semester 2-7",
      "IPK minimal 3.00",
      "Tidak sedang menerima beasiswa lain",
      "Warga Negara Indonesia",
      "Usia maksimal 23 tahun",
    ],
    dokumenDiperlukan: [
      "KTP / Kartu Identitas",
      "Kartu Tanda Mahasiswa (KTM)",
      "Transkrip Nilai terbaru",
      "Surat Keterangan Aktif Kuliah",
      "Foto 3x4 terbaru",
      "Essay motivasi (min. 500 kata)",
      "Video perkenalan (maks. 3 menit)",
    ],
  };

  const u = user || {
    namalengkap: "Hanif Rasendra Putra",
    email: "hanif@email.com",
    universitas: "Universitas Gadjah Mada",
    jurusan: "Teknik Informatika",
    semester: 5,
    ipk: 3.87,
    gender: "Laki-laki",
  };

  const inputClass = "border border-gray-200 w-full h-[42px] px-4 text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all bg-gray-50 text-gray-700";
  const labelClass = "text-xs text-gray-500 font-plex mb-1.5 block font-medium";

  return (
    <div className="min-h-screen bg-[#FFFFFA] pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 [@media(min-width:768px)]:px-8 h-14 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-gray-100 hover:bg-[#FF312E]/10 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-600">
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-bold text-gray-900 font-plex">Detail Proposal</h1>
            <p className="text-[11px] text-gray-400 font-plex">Lengkapi semua informasi</p>
          </div>
          {/* Progress */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400 font-plex">Kelengkapan</span>
            <span className="text-xs font-bold text-[#FF312E] font-plex">60%</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-[#993133] to-[#FF312E] transition-all duration-700" style={{ width: "60%" }} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 [@media(min-width:768px)]:px-8 py-8 space-y-6">

        {/* ── 1. Info Beasiswa ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">1</div>
            <h2 className="font-bold text-gray-900 font-plex">Beasiswa yang Dipilih</h2>
          </div>
          <div className="p-6">
            {/* Card beasiswa */}
            <div className="bg-gradient-to-br from-[#7a2527] via-[#FF312E] to-[#993133] rounded-2xl p-5 text-white mb-5 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full translate-x-8 translate-y-8" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white/60 text-[11px] font-plex">Penyelenggara</p>
                    <p className="text-white font-bold text-sm font-plex">{proposal.penyelenggara}</p>
                  </div>
                  <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full font-plex border border-white/20">
                    {b.tipe}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-plex leading-tight mb-3">{proposal.judul}</h3>
                <div className="flex gap-6">
                  <div>
                    <p className="text-white/50 text-[10px] font-plex">Nominal</p>
                    <p className="text-white font-bold text-sm font-plex">{b.nominal}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-plex">Deadline</p>
                    <p className="text-amber-300 font-bold text-sm font-plex">{b.deadline}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-plex">Kuota</p>
                    <p className="text-white font-bold text-sm font-plex">{b.kuota}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 font-plex leading-relaxed">{b.deskripsi}</p>
          </div>
        </section>

        {/* ── 2. Data Diri ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">2</div>
            <h2 className="font-bold text-gray-900 font-plex">Data Diri</h2>
          </div>
          <div className="p-6 grid grid-cols-1 [@media(min-width:640px)]:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nama Lengkap</label>
              <input type="text" defaultValue={proposal.nama_lengkap} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" defaultValue={proposal.email} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jenis Kelamin</label>
              <input type="text" defaultValue={proposal.gender} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>No. WhatsApp</label>
              <input type="text" placeholder="08xxxxxxxxxx" className={inputClass} />
            </div>
            <div className="[@media(min-width:640px)]:col-span-2">
              <label className={labelClass}>Alamat Lengkap</label>
              <textarea rows={2} placeholder="Jl. ..." className="border border-gray-200 w-full px-4 py-2.5 text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all bg-gray-50 resize-none" />
            </div>
          </div>
        </section>

        {/* ── 3. Data Akademik ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">3</div>
            <h2 className="font-bold text-gray-900 font-plex">Data Akademik</h2>
          </div>
          <div className="p-6 grid grid-cols-1 [@media(min-width:640px)]:grid-cols-2 gap-4">
            <div className="[@media(min-width:640px)]:col-span-2">
              <label className={labelClass}>Universitas</label>
              <input type="text" defaultValue={u.universitas} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jurusan / Prodi</label>
              <input type="text" defaultValue={u.jurusan} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Semester</label>
              <input type="number" defaultValue={u.semester} min={1} max={14} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>IPK</label>
              <input type="number" defaultValue={u.ipk} step="0.01" min="0" max="4" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>NIM</label>
              <input type="text" placeholder="Nomor Induk Mahasiswa" className={inputClass} />
            </div>
          </div>
        </section>

        {/* ── 4. Checklist Persyaratan ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">4</div>
            <h2 className="font-bold text-gray-900 font-plex">Checklist Persyaratan</h2>
          </div>
          <div className="p-6 space-y-3">
            {b.syarat.map((s, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-[#C0392B] cursor-pointer" />
                <span className="text-sm text-gray-600 font-plex group-hover:text-gray-900 transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </section>

        {/* ── 5. Upload Dokumen ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">5</div>
            <h2 className="font-bold text-gray-900 font-plex">Upload Dokumen</h2>
          </div>
          <div className="p-6 space-y-3">
            {b.dokumenDiperlukan.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF312E]/10 rounded-lg flex items-center justify-center text-sm">📄</div>
                  <span className="text-sm text-gray-700 font-plex">{doc}</span>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#FF312E] font-plex cursor-pointer hover:bg-[#FF312E]/10 px-3 py-1.5 rounded-lg transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5-5 5 5m-5-5v12" />
                  </svg>
                  Upload
                  <input type="file" className="hidden" />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Essay & Video ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">6</div>
            <h2 className="font-bold text-gray-900 font-plex">Essay & Video</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className={labelClass}>Essay Motivasi <span className="text-[#FF312E]">*</span></label>
              <p className="text-[11px] text-gray-400 font-plex mb-2">Ceritakan motivasi kamu mengikuti beasiswa ini (min. 500 kata)</p>
              <textarea
                rows={6}
                placeholder="Tuliskan essay motivasimu di sini..."
                className="border border-gray-200 w-full px-4 py-3 text-sm rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className={labelClass}>Link Video Perkenalan</label>
              <p className="text-[11px] text-gray-400 font-plex mb-2">Upload video ke YouTube/Drive, lalu paste link-nya (maks. 3 menit)</p>
              <input type="url" placeholder="https://youtube.com/..." className={inputClass} />
            </div>
          </div>
        </section>

        {/* Submit */}
        <button className="w-full bg-gradient-to-r from-[#993133] to-[#FF312E] text-white font-bold py-4 rounded-2xl font-plex text-base shadow-[0_8px_24px_rgba(255,49,46,0.35)] hover:scale-[1.01] hover:shadow-[0_12px_32px_rgba(255,49,46,0.45)] active:scale-95 transition-all duration-300">
          Kirim Proposal →
        </button>

      </div>
    </div>
  );
};

export default DetailProposal;