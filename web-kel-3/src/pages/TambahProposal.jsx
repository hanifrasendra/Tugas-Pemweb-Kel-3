const TambahProposal = () => {
    
    const handleSubmit = async () => {
        const nama = document.getElementById("nama").value;
        const deskripsi = document.getElementById("deskripsi").value;
        const universitas = document.getElementById("universitas").value;
        const prodi = document.getElementById("prodi").value;
        const semester = document.getElementById("semester").value;
        const ipk = document.getElementById("ipk").value;
        const tipeBeasiswa = document.getElementById("tipe-beasiswa").value;

        if(!nama || !deskripsi || !universitas || !prodi || !semester || !ipk || !tipeBeasiswa) {
            alert("Semua field harus diisi.");
            return;
        }

        const dataPengajuan = { nama, deskripsi, universitas, prodi, semester, ipk, tipeBeasiswa };

        try {
            const response = await fetch("https://web-kel-3-backend.vercel.app/api/pengajuan.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dataPengajuan)
            });

            const pengajuan = await response.json();

            if(pengajuan.status === "success") {
                alert(pengajuan.message);
                window.location.href = "/catalog";
            } else {
                alert(pengajuan.message);
            }

        } catch {
            alert("Terjadi kesalahan.");
        }
    }

    const handleCancel = () => {
        const status = confirm("Batalkan pengajuan?");
        if(status) {
            document.getElementById("nama").value = "";
            document.getElementById("deskripsi").value = "";
            document.getElementById("universitas").value = "";
            document.getElementById("prodi").value = "";
            document.getElementById("semester").value = "";
            document.getElementById("ipk").value = "";
            document.getElementById("tipe-beasiswa").selectedIndex = 0;
        }
    }

    return(
        <div className={`
            mx-[20px]
            [@media(min-width:768px)]:mx-[50px]
            [@media(min-width:1024px)]:mx-[100px]
        `}>
            <h1 className={`
                font-plex font-bold 
                text-[24px]
                [@media(min-width:768px)]:text-[28px]
                [@media(min-width:1024px)]:text-[32px]
                mt-[80px]
                [@media(min-width:1024px)]:mt-[132px]
            `}>
                Ajukan Proposal Beasiswa
            </h1>

            <div className="mt-[40px] [@media(min-width:1024px)]:mt-[52px]">
                <form className={`
                    flex flex-col 
                    gap-[40px]
                    [@media(min-width:1024px)]:gap-[62px]
                    pt-[40px]
                    [@media(min-width:1024px)]:pt-[74px]
                    mb-[150px]
                    [@media(min-width:1024px)]:mb-[247px]
                    px-[20px]
                    [@media(min-width:1024px)]:pl-[53px]
                    shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                `}>

                    {/* Nama */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Nama Lengkap</label>
                        <input id="nama"
                            className="block border w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Deskripsi</label>
                        <textarea id="deskripsi"
                            className="block border rounded-[10px] w-full max-w-[1144px] h-[160px] [@media(min-width:1024px)]:h-[202px] mt-[18px] px-[20px]" />
                    </div>

                    {/* Universitas */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Universitas</label>
                        <input id="universitas"
                            className="border-[0px_0px_0px_1px] block w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* Prodi */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Prodi</label>
                        <input id="prodi"
                            className="border-[0px_0px_0px_1px] block w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* Semester */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Semester</label>
                        <input id="semester"
                            className="border-[0px_0px_0px_1px] block w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* UKT */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">UKT</label>
                        <input id="ukt"
                            className="border-[0px_0px_0px_1px] block w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* IPK */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">IPK</label>
                        <input id="ipk"
                            className="border-[0px_0px_0px_1px] block w-full max-w-[639px] h-[60px] [@media(min-width:1024px)]:h-[69px] mt-[18px] px-[20px]" />
                    </div>

                    {/* Select */}
                    <div>
                        <label className="text-[20px] font-plex font-semibold">Tipe Beasiswa</label>
                        <select id="tipe-beasiswa"
                            className="block text-[20px] w-full max-w-[240px] h-[44px] mt-[18px] shadow rounded-[10px]">
                            <option value="" disabled hidden>Pilih Tipe</option>
                            <option value="Reguler">Reguler</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Leadership">Leadership</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <div className={`
                        flex flex-col gap-[20px]
                        [@media(min-width:768px)]:flex-row
                        [@media(min-width:768px)]:gap-[40px]
                        [@media(min-width:1024px)]:gap-[115px]
                        mt-[60px]
                        [@media(min-width:1024px)]:mt-[93px]
                        mb-[100px]
                        [@media(min-width:1024px)]:mb-[150px]
                    `}>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[rgba(255,49,46,1)] text-white text-[20px] [@media(min-width:1024px)]:text-[32px] w-full max-w-[372px] h-[60px] [@media(min-width:1024px)]:h-[73px]">
                            Ajukan
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-[rgba(81,80,82,1)] text-white text-[20px] [@media(min-width:1024px)]:text-[32px] w-full max-w-[372px] h-[60px] [@media(min-width:1024px)]:h-[73px]">
                            Batal
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default TambahProposal;