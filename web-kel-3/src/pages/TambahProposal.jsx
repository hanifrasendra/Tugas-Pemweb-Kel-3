import React from 'react';

const TambahProposal = () => {
    const handleSubmit = async () => {
        const fields = ["nama", "deskripsi", "universitas", "prodi", "semester", "ipk", "ukt", "tipe-beasiswa"];
        const values = {};
        
        let isValid = true;
        fields.forEach(field => {
            const val = document.getElementById(field).value;
            if (!val) isValid = false;
            values[field] = val;
        });

        if (!isValid) {
            alert("Harap lengkapi semua field yang tersedia.");
            return;
        }

        try {
            const response = await fetch("https://web-kel-3-backend.vercel.app/api/pengajuan.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });

            const resData = await response.json();

            if (resData.status === "success") {
                alert(resData.message);
                window.location.href = "/catalog";
            } else {
                alert(resData.message);
            }
        } catch {
            alert("Terjadi kesalahan koneksi ke server.");
        }
    };

    const handleCancel = () => {
        if (confirm("Apakah Anda yakin ingin membatalkan pengajuan ini? Semua data yang diisi akan hilang.")) {
            window.location.reload();
        }
    };

    // Style Helper
    const labelStyle = "text-[16px] font-plex font-bold text-[#333] mb-2 block";
    const inputStyle = "w-full border-b-2 border-gray-300 bg-gray-50 px-4 py-3 font-plex focus:border-[#FF312E] focus:bg-white outline-none transition-all duration-300";

    return (
        <div className="min-h-screen bg-[#FBF9FF] pb-20">
            {/* Header Section */}
            <div className="bg-white pt-[120px] pb-[60px] shadow-sm px-[20px] [@media(min-width:1024px)]:px-[100px]">
                <h1 className="font-plex font-bold text-[32px] [@media(min-width:1024px)]:text-[48px] text-[#000103]">
                    Ajukan <span className="text-[#FF312E]">Proposal</span> Beasiswa
                </h1>
                <p className="text-gray-500 mt-2 font-plex max-w-[600px]">
                    Isi data diri dan kebutuhan akademik Anda secara akurat untuk mempermudah proses kurasi beasiswa.
                </p>
            </div>

            {/* Form Card */}
            <div className="mx-[20px] [@media(min-width:1024px)]:mx-[100px] mt-[-30px]">
                <form className="bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)] rounded-[20px] p-6 [@media(min-width:1024px)]:p-12 overflow-hidden">
                    
                    <div className="grid grid-cols-1 [@media(min-width:1024px)]:grid-cols-2 gap-x-12 gap-y-8">
                        
                        {/* Nama */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Nama Lengkap</label>
                            <input id="nama" type="text" placeholder="Masukkan nama sesuai KTP" className={inputStyle} />
                        </div>

                        {/* Tipe Beasiswa */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Tipe Beasiswa</label>
                            <select id="tipe-beasiswa" className={`${inputStyle} cursor-pointer`}>
                                <option value="" disabled selected>Pilih kategori beasiswa</option>
                                <option value="Reguler">Reguler</option>
                                <option value="Prestasi">Prestasi</option>
                                <option value="Leadership">Leadership</option>
                            </select>
                        </div>

                        {/* Universitas */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Universitas</label>
                            <input id="universitas" type="text" placeholder="Contoh: Universitas Gadjah Mada" className={inputStyle} />
                        </div>

                        {/* Prodi */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Program Studi</label>
                            <input id="prodi" type="text" placeholder="Contoh: Teknik Informatika" className={inputStyle} />
                        </div>

                        {/* Detail Akademik Grid */}
                        <div className="col-span-1 grid grid-cols-3 gap-4">
                            <div>
                                <label className={labelStyle}>Semester</label>
                                <input id="semester" type="number" placeholder="1-14" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>IPK</label>
                                <input id="ipk" type="text" placeholder="4.00" className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>UKT</label>
                                <input id="ukt" type="text" placeholder="Jutaan" className={inputStyle} />
                            </div>
                        </div>

                        {/* Deskripsi (Full Width) */}
                        <div className="col-span-1 [@media(min-width:1024px)]:col-span-2">
                            <label className={labelStyle}>Alasan Mengikuti Beasiswa</label>
                            <textarea 
                                id="deskripsi" 
                                placeholder="Ceritakan motivasi dan kondisi ekonomi Anda secara singkat dan jelas..."
                                className={`${inputStyle} h-[150px] rounded-sm resize-none`} 
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col [@media(min-width:768px)]:flex-row gap-4 mt-12 border-t pt-8">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#FF312E] hover:bg-[#D62825] text-white font-bold text-[18px] [@media(min-width:1024px)]:text-[20px] px-12 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-red-200"
                        >
                            Kirim Pengajuan
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-transparent hover:bg-gray-100 text-gray-500 font-bold text-[18px] [@media(min-width:1024px)]:text-[20px] px-12 py-4 rounded-lg transition-all"
                        >
                            Batalkan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TambahProposal;