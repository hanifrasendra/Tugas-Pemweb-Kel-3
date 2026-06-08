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
                    {proposal.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-plex leading-tight mb-3">{proposal.judul}</h3>
                <div className="flex gap-6">
                  <div>
                    <p className="text-white/50 text-[10px] font-plex">Nominal</p>
                    <p className="text-white font-bold text-sm font-plex">{proposal.nominal}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-plex">Deadline</p>
                    <p className="text-amber-300 font-bold text-sm font-plex">{proposal.deadline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 font-plex leading-relaxed">{proposal.deskripsi}</p>
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
              <input type="text" defaultValue={proposal.univ} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jurusan / Prodi</label>
              <input type="text" defaultValue={proposal.prodi} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Semester</label>
              <input type="number" defaultValue={proposal.semester} min={1} max={14} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>IPK</label>
              <input type="number" defaultValue={proposal.ipk} step="0.01" min="0" max="4" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>NIM</label>
              <input type="text" placeholder="Nomor Induk Mahasiswa" className={inputClass} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(255,49,46,0.06)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#FF312E] rounded-lg flex items-center justify-center text-white text-xs font-bold">4</div>
            <h2 className="font-bold text-gray-900 font-plex">Berkas Dokumen</h2>
          </div>
          <div className="p-6 space-y-3">
            {[
              { name: "Kartu Tanda Mahasiswa (KTM)", url: proposal.ktm_url },
              { name: "Kartu Tanda Penduduk (KTP)", url: proposal.ktp_url },
              { name: "Dokumen Proposal / Esai", url: proposal.proposal_url } // 💡 FIX: Sekarang mengambil langsung dari proposal_url sesuai DB
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF312E]/10 rounded-lg flex items-center justify-center text-sm">📄</div>
                  <span className="text-sm text-gray-700 font-plex font-medium">{doc.name}</span>
                </div>
                {doc.url ? (
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-bold text-[#FF312E] font-plex bg-[#FF312E]/8 px-3 py-1.5 rounded-lg hover:bg-[#FF312E]/15 transition-colors"
                  >
                    Lihat Berkas ↗
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 font-plex">Tidak ada berkas</span>
                )}
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
          <div className="p-6 space-y-6">
            
            {/* Kolom Essay / Deskripsi */}
            <div>
              <label className={labelClass}>Essay Motivasi / Deskripsi Diri</label>
              <textarea
                rows={6}
                readOnly
                /* Mengantisipasi jika nama kolom di DB kamu menggunakan 'deskirpsi' atau 'deskripsi' */
                value={proposal.deskirpsi || proposal.deskripsi || "Tidak ada essay motivasi."}
                className="border border-gray-200 w-full px-4 py-3 text-sm rounded-lg outline-none bg-gray-50 text-gray-700 font-plex leading-relaxed resize-none focus:ring-0 cursor-default"
              />
            </div>

            {/* Kolom Video Player ala YouTube */}
            <div>
              <label className={labelClass}>Video Perkenalan Mahasiswa</label>
              
              {proposal.video_url ? (
                <div className="space-y-3">
                  {/* Container Video Player dengan Aspect Ratio Sinematik 16:9 */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 group">
                    <video
                      src={proposal.video_url}
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain"
                      /* Optional: Kamu bisa menambahkan link gambar kustom untuk thumbnail sebelum di-klik play */
                      poster="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000" 
                    >
                      Browser kamu tidak mendukung pemutar video HTML5.
                    </video>
                  </div>
                  
                  {/* Footer Informasi Video */}
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[11px] text-gray-400 font-plex">
                      Video dimuat dengan aman melalui Cloudinary Storage.
                    </p>
                    <a
                      href={proposal.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-gray-500 hover:text-[#FF312E] font-plex transition-colors"
                    >
                      Buka di Tab Baru ↗
                    </a>
                  </div>
                </div>
              ) : (
                /* Tampilan placeholder jika data video kosong / NULL */
                <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50">
                  <span className="text-2xl block mb-1">🎬</span>
                  <p className="text-sm text-gray-400 font-plex">Pelamar tidak melampirkan video perkenalan.</p>
                </div>
              )}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DetailProposal;