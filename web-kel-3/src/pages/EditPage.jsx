import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dataProposal, setDataProposal] = useState({
        status: "",
        data: {}
    });

    // Style Helper yang konsisten dengan TambahProposal
    const labelStyle = "text-[16px] font-plex font-bold text-[#333] mb-2 block";
    const inputStyle = "w-full border-b-2 border-gray-300 bg-gray-50 px-4 py-3 font-plex focus:border-[#FF312E] focus:bg-white outline-none transition-all duration-300";

    const fetchData = async () => {
        try {
            const getData = await fetch(`https://web-kel-3-backend.vercel.app/api/getData.php?id=${id}`);
            const data = await getData.json();
            setDataProposal(data);
        } catch (error) {
            alert("Terjadi kesalahan saat mengambil data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleEdit = async () => {
        const getVal = (id) => document.getElementById(id).value;
        const dataPengajuan = {
            id,
            nama: getVal("nama"),
            deskripsi: getVal("deskripsi"),
            universitas: getVal("universitas"),
            prodi: getVal("prodi"),
            semester: getVal("semester"),
            ipk: getVal("ipk"),
            tipeBeasiswa: getVal("tipe-beasiswa")
        };

        if (Object.values(dataPengajuan).some(val => val === "")) {
            alert("Semua field harus diisi.");
            return;
        }

        if (!confirm("Apakah Anda yakin ingin memperbarui data proposal ini?")) return;

        try {
            const response = await fetch("https://web-kel-3-backend.vercel.app/api/edit.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataPengajuan)
            });
            const result = await response.json();
            if (result.status === "success") {
                alert(result.message);
                navigate("/catalog");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat mengirim data.");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus proposal ini secara permanen?")) return;
        try {
            const response = await fetch("https://web-kel-3-backend.vercel.app/api/delete.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const result = await response.json();
            if (result.status === "success") {
                alert(result.message);
                navigate("/catalog");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("Terjadi kesalahan saat menghapus data.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF9FF] pb-20">
            {/* Header Section */}
            <div className="bg-white pt-[120px] pb-[60px] shadow-sm px-[20px] md:px-[50px] lg:px-[100px]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="font-plex font-bold text-[32px] lg:text-[48px] text-[#000103]">
                            Edit <span className="text-[#FF312E]">Proposal</span>
                        </h1>
                        <p className="text-gray-500 font-plex">Perbarui informasi pengajuan beasiswa Anda di sini.</p>
                    </div>
                    <button 
                        onClick={handleDelete}
                        className="w-fit px-6 py-3 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-all flex items-center gap-2"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        Hapus Proposal
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className="mx-[20px] md:mx-[50px] lg:mx-[100px] mt-[-30px]">
                <form className="bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.08)] rounded-[20px] p-6 lg:p-12 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                        
                        {/* Nama */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Nama Lengkap</label>
                            <input id="nama" defaultValue={dataProposal.data?.nama} className={inputStyle} placeholder="Nama Lengkap" />
                        </div>

                        {/* Tipe Beasiswa */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Tipe Beasiswa</label>
                            <select id="tipe-beasiswa" key={dataProposal.data?.tipe_beasiswa} defaultValue={dataProposal.data?.tipe_beasiswa} className={`${inputStyle} cursor-pointer`}>
                                <option value="" disabled>Pilih Tipe</option>
                                <option value="Reguler">Reguler</option>
                                <option value="Prestasi">Prestasi</option>
                                <option value="Leadership">Leadership</option>
                            </select>
                        </div>

                        {/* Universitas */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Universitas</label>
                            <input id="universitas" defaultValue={dataProposal.data?.universitas} className={inputStyle} placeholder="Universitas" />
                        </div>

                        {/* Prodi */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Program Studi</label>
                            <input id="prodi" defaultValue={dataProposal.data?.prodi} className={inputStyle} placeholder="Prodi" />
                        </div>

                        {/* Akademik Grid */}
                        <div className="col-span-1 grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Semester</label>
                                <input id="semester" defaultValue={dataProposal.data?.semester} className={inputStyle} placeholder="Semester" />
                            </div>
                            <div>
                                <label className={labelStyle}>IPK</label>
                                <input id="ipk" defaultValue={dataProposal.data?.ipk} className={inputStyle} placeholder="Contoh: 3.85" />
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="col-span-1 lg:col-span-2">
                            <label className={labelStyle}>Deskripsi Proposal</label>
                            <textarea id="deskripsi" defaultValue={dataProposal.data?.deskripsi} className={`${inputStyle} h-[180px] rounded-lg resize-none`} placeholder="Jelaskan detail pengajuan Anda..." />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-12 border-t pt-8">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="bg-[#FF312E] hover:bg-[#D62825] text-white font-bold text-[18px] lg:text-[20px] px-12 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-red-200"
                        >
                            Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/catalog")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[18px] lg:text-[20px] px-12 py-4 rounded-lg transition-all"
                        >
                            Kembali ke Katalog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPage;