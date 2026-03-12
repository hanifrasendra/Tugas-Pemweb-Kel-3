// ─── DATA ───────────────────────────────────────────────
const members = [
  {
    initials: "HR",
    name: "Hanif Rasendra Putra",
    nim: "24082010166",
    prodi: "Sistem Informasi",
    universitas: "Universitas Pembangunan Nasional Veteran Jawa Timur",
    role: "Front End Developer",
    semester: "4",
    angkatan: "2024",
    email: "24082010166@student.upnjatim.ac.id",
    bio: 'Mahasiswa semester 4 yang passionate di bidang desain antarmuka dan pengalaman pengguna. Suka eksplorasi design system, typography, dan bikin prototype yang bikin orang bilang "wah ini enak dipakainya".',
    skills: ["HTML", "CSS", "Javascript", "React JS", "Tailwind"],
    interests: ["UI/UX Design", "Prototyping", "Design System", "Frontend Architecture"],
  },
  {
    initials: "AT",
    name: "Ahmad Taufik Hayaza",
    nim: "24082010136",
    prodi: "Sistem Informasi",
    universitas: "Universitas Pembangunan Nasional Veteran Jawa Timur",
    role: "Design System Engineer",
    semester: "4",
    angkatan: "2024",
    email: "24082010136@student.upnjatim.ac.id",
    bio: "Mahasiswa semester 4 yang fokus pada pengembangan design system dan komponen UI yang konsisten. Gemar mengkombinasikan prinsip desain dengan teknis implementasi untuk menciptakan pengalaman pengguna yang seamless.",
    skills: ["Figma", "Storybook", "Design Tokens", "Tailwind", "Accessibility"],
    interests: ["Design Systems", "Component Architecture", "Accessibility", "UX Research"],
  },
  {
    initials: "KD",
    name: "Kaka Dimas Soehendra",
    nim: "24082010171",
    prodi: "Sistem Informasi",
    universitas: "Universitas Pembangunan Nasional Veteran Jawa Timur",
    role: "Back End Developer",
    semester: "4",
    angkatan: "2024",
    email: "24082010171@student.upnjatim.ac.id",
    bio: "Mahasiswa semester 4 yang gemar ngulik API, database, dan arsitektur sistem. Percaya bahwa kode yang bersih adalah bentuk seni tersendiri. Aktif dalam proyek-proyek pengembangan aplikasi kampus.",
    skills: ["MySQL", "Laravel", "REST API", "PHP"],
    interests: ["Backend Architecture", "Database Design", "API Development", "DevOps"],
  },
];

// ─── SUB-COMPONENTS ───
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[0.6rem] font-bold tracking-widest uppercase text-[#A2A3BB]">{label}</span>
    <span className="text-[0.85rem] font-semibold text-[#000807]">{value}</span>
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button
    title={label}
    className="w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all duration-200 hover:scale-110 bg-[#FBF9FF] border border-[#B3B7EE] hover:bg-[#9395D3]"
  >
    {icon}
  </button>
);

// ─── PROFILE CARD ───
const ProfileCard = ({ member, index }) => (
  <div
    className="w-full rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 bg-[#FBF9FF] border border-[#B3B7EE] shadow-[0_4px_24px_rgba(147,149,211,0.10)]"
    style={{ opacity: 0, animation: "fadeUp 0.6s ease forwards", animationDelay: `${index * 0.18}s` }}
  >
    {/* Top bar */}
    <div className="h-1.5 w-full bg-gradient-to-r from-[#B3B7EE] to-[#9395D3]" />

    <div className="grid grid-cols-[280px_1fr]">
      {/* ── LEFT ── */}
      <div className="flex flex-col items-center gap-5 px-7 py-9 border-r border-[#B3B7EE] bg-gradient-to-b from-[#B3B7EE]/10 to-transparent">

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-black border-4 border-[#FBF9FF] select-none bg-gradient-to-br from-[#B3B7EE] to-[#9395D3] shadow-[0_8px_32px_rgba(147,149,211,0.35)]">
          {member.initials}
        </div>

        {/* Name & role */}
        <div className="text-center">
          <span className="inline-block rounded-full px-3 py-1 text-[0.6rem] font-black tracking-widest uppercase mb-2 bg-[#9395D3]/10 border border-[#9395D3]/35 text-[#9395D3]">
            {member.role}
          </span>
          <h2 className="font-black text-[1.05rem] leading-tight text-[#000807]">{member.name}</h2>
        </div>

        <div className="w-full h-px bg-[#B3B7EE]" />

        {/* Info */}
        <div className="w-full flex flex-col gap-3.5">
          <InfoRow label="NIM" value={member.nim} />
          <InfoRow label="Program Studi" value={member.prodi} />
          <InfoRow label="Semester / Angkatan" value={`Sem. ${member.semester} · ${member.angkatan}`} />
          <InfoRow label="Email" value={member.email} />
        </div>

        <div className="w-full h-px bg-[#B3B7EE]" />

        {/* Socials */}
        <div className="flex gap-2">
          <SocialButton icon="🐙" label="GitHub" />
          <SocialButton icon="💼" label="LinkedIn" />
          <SocialButton icon="📸" label="Instagram" />
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="flex flex-col gap-6 px-10 py-9">

        {/* Universitas */}
        <div className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-[#B3B7EE]/15 border border-[#B3B7EE]/50">
          <span className="text-xl">🏛️</span>
          <div>
            <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-0.5 text-[#9395D3]">Universitas</p>
            <p className="text-[0.87rem] font-bold text-[#000807]">{member.universitas}</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-2 text-[#A2A3BB]">Tentang Saya</p>
          <p className="text-[0.88rem] leading-relaxed text-[#000807]/55">{member.bio}</p>
        </div>

        {/* Minat */}
        <div>
          <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-2 text-[#A2A3BB]">Minat & Fokus</p>
          <div className="flex flex-wrap gap-2">
            {member.interests.map(i => (
              <span key={i} className="rounded-full px-3 py-1 text-[0.72rem] font-semibold bg-[#9395D3]/10 border border-[#9395D3]/35 text-[#9395D3]">
                {i}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-2 text-[#A2A3BB]">Keahlian</p>
          <div className="flex flex-wrap gap-2">
            {member.skills.map(skill => (
              <span key={skill} className="rounded-full px-4 py-1 text-[0.72rem] font-semibold text-[#FBF9FF] bg-[#000807]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── PROFILE PAGE ───
const ProfilePage = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#FBF9FF] font-sans">
    <div className="fixed pointer-events-none top-[-25vh] right-[-15vw] w-[65vw] h-[65vw] max-w-[800px] rounded-full bg-[radial-gradient(circle,rgba(179,183,238,0.22)_0%,transparent_65%)] z-0" />
    <div className="fixed pointer-events-none bottom-[-20vh] left-[-12vw] w-[45vw] h-[45vw] max-w-[550px] rounded-full bg-[radial-gradient(circle,rgba(147,149,211,0.10)_0%,transparent_70%)] z-0" />

    {/* Header */}
    <header className="relative z-10 text-center px-6 pt-20 pb-12">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.6rem] font-black tracking-widest uppercase mb-6 bg-[#9395D3]/10 border border-[#9395D3]/30 text-[#9395D3]">
        <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse bg-[#9395D3]" />
        Tim Developer — Portal Mahasiswa
      </div>

      <h1 className="font-black text-4xl tracking-tight leading-tight mb-3 text-[#000807]">
        Profil <span className="text-[#9395D3]">Anggota</span> Tim
      </h1>

      <p className="text-sm max-w-sm mx-auto leading-relaxed mb-6 text-[#A2A3BB]">
        Kenali lebih dekat para pengembang di balik Portal Beasiswa Indonesia.
      </p>

      <div className="w-10 h-0.5 rounded-full mx-auto bg-gradient-to-r from-[#9395D3] to-[#B3B7EE]" />
    </header>

    {/* Cards */}
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-20 flex flex-col gap-6">
      {members.map((m, i) => <ProfileCard key={m.nim} member={m} index={i} />)}
    </div>

    {/* Footer */}
    <footer className="relative z-10 text-center pb-14 px-6 text-xs leading-relaxed text-[#A2A3BB]">
      Bagian dari studi kasus <span className="font-semibold text-[#9395D3]">Portal Beasiswa</span> — Indonesia.
      <br />Pemrograman Web · Semester Genap 2025/2026
      <br /><span className="text-[#B3B7EE]">Hanif (Front End) · Ahmad (Design System) · Kaka (Back End)</span>
    </footer>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default ProfilePage;