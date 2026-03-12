import Navigator from "../component/Navigator.jsx"


const HalamanUtama = () => {
  return (
    <div>
        <main>
            <section>
            <h2>Temukan Beasiswa Impianmu</h2>
            <p>
                Selamat datang di platform informasi beasiswa terlengkap.
                Kami menyediakan akses informasi untuk jenjang S1, S2,
                hingga S3, baik di dalam maupun luar negeri.
            </p>

            <img
                src="/assets/images/scholarship-banner.jpg"
                alt="Ilustrasi Mahasiswa Berprestasi"
            />
            </section>

            <section>
            <h2>Kategori Beasiswa Terpopuler</h2>

            <p>
                Pilih kategori yang sesuai dengan profil dan kebutuhan akademik Anda:
            </p>

            <ul>
                <li>
                <strong>Beasiswa Pemerintah (LPDP, KIP-Kuliah)</strong>:
                Dukungan penuh dari negara untuk putra-putri terbaik bangsa.
                </li>

                <li>
                <strong>Beasiswa Luar Negeri (Full Bright, Chevening)</strong>:
                Kesempatan emas belajar di universitas top dunia.
                </li>

                <li>
                <strong>Beasiswa Prestasi & Non-Akademik</strong>:
                Penghargaan bagi Anda yang unggul di bidang olahraga,
                seni, dan organisasi.
                </li>
            </ul>
            </section>

            <section>
            <h2>Visi Kami</h2>

            <p>
                Menjadi jembatan informasi yang transparan untuk memutus rantai
                keterbatasan ekonomi dalam menempuh pendidikan tinggi di Indonesia.
            </p>
            </section>
        </main>

        <footer>
            <p>
            © 2025 Portal Beasiswa Indonesia - Gerbang Menuju Masa Depan Cerah
            </p>
        </footer>
    </div>
  )
}

export default HalamanUtama