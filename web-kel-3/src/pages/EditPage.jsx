import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dataProposal, setDataProposal] = useState({
        status: "",
        data: {}
    });

    const handleEdit = async () => {
        const nama = document.getElementById("nama").value;
        const deskripsi = document.getElementById("deskripsi").value;
        const universitas = document.getElementById("universitas").value;
        const prodi = document.getElementById("prodi").value;
        const semester = document.getElementById("semester").value;
        const ipk = document.getElementById("ipk").value;
        const tipeBeasiswa = document.getElementById("tipe-beasiswa").value;

        if(nama === "" || deskripsi === "" || universitas === "" || prodi === "" || semester === "" || ipk === "" || tipeBeasiswa === "") {
            alert("Semua field harus diisi. Silakan periksa kembali.");
            return;
        }

        const dataPengajuan = {
            id: id,
            nama: nama,
            deskripsi: deskripsi,
            universitas: universitas,
            prodi: prodi,
            semester: semester,
            ipk: ipk,
            tipeBeasiswa: tipeBeasiswa
        }

        try {
            console.log(dataPengajuan);
            const konfirmasi = confirm("Apakah Anda yakin ingin mengganti data proposal ini?");
            if(!konfirmasi) return;

            const response = await fetch("https://web-kel-3-backend.vercel.app/api/edit.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataPengajuan)
            })

            const pengajuan = await response.json();
            console.log(pengajuan)

            if(pengajuan.status === "success") {
                alert(pengajuan.message);
                window.location.href = "/catalog";
            } else {
                alert(pengajuan.message);
            }


        } catch(error) {
            console.log(error)
            alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const getData = await fetch(`https://web-kel-3-backend.vercel.app/api/getData.php?id=${id}`);
                const data = await getData.json();

                setDataProposal(data);
                console.log(dataProposal);
            } catch(error) {
                alert("Terjadi kesalahan saat mengambil data. Silakan coba lagi.");
            }
        }
        fetchData();
    }, []);

    const handleCancel = () => {
        const status = confirm("Apakah Anda yakin ingin membatalkan pengajuan? Semua data yang telah diisi akan hilang.");

        if(status) {
            document.getElementById("nama").value = "";
            document.getElementById("deskripsi").value = "";
            document.getElementById("universitas").value = "";
            document.getElementById("prodi").value = "";
            document.getElementById("semester").value = "";
            document.getElementById("ipk").value = "";
            document.getElementById("tipe-beasiswa").selectedIndex = 0;

        } else {
            return false; // user klik Cancel
        }
    }

    const handleDelete = async () => {
        const konfirmasi = confirm("Apakah Anda yakin ingin menghapus proposal ini? Tindakan ini tidak dapat dibatalkan.");

        if(!konfirmasi) return;

        try {
            const response = await fetch("https://web-kel-3-backend.vercel.app/api/delete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            });

            const result = await response.json();

            if (result.status === "success") {
                alert(result.message);
                navigate("/catalog");
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.log(error);
            alert("Terjadi kesalahan saat menghapus data.");
        }

    }

    return(
        <div className={`mx-[20px] md:mx-[50px] lg:mx-[100px]`}>
            <h1 className={`text-[24px] md:text-[28px] lg:text-[32px] mt-[100px] md:mt-[120px] lg:mt-[132px] font-plex font-bold`}>
                Ajukan Proposal Beasiswa
            </h1>

        <div className={`mt-[40px] md:mt-[52px]`}>
            <form className={`flex flex-col gap-[40px] md:gap-[50px] lg:gap-[62px] pt-[40px] md:pt-[60px] lg:pt-[74px] mb-[150px] md:mb-[200px] lg:mb-[247px] px-[20px] md:pl-[40px] lg:pl-[53px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Nama Lengkap
                    </label>
                    <input id="nama" type="text"
                        defaultValue={dataProposal.data.nama}
                        placeholder="Nama Lengkap"
                        className={`block border w-full md:w-[500px] lg:w-[639px] h-[55px] md:h-[60px] lg:h-[69px] mt-[12px] md:mt-[18px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Deskripsi
                    </label>
                    <textarea id="deskripsi"
                        defaultValue={dataProposal.data.deskripsi}
                        placeholder="Deskripsi Proposal Ajuan Mu"
                        className={`block border rounded-[10px] w-full [@media(0px<width<=1440px)]:w-full h-[160px] md:h-[180px] lg:h-[202px] mt-[12px] md:mt-[18px] py-[10px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Universitas
                    </label>
                    <input id="universitas" type="text"
                        defaultValue={dataProposal.data.universitas}
                        placeholder="Universitas"
                        className={`block border w-full md:w-[500px] lg:w-[639px] h-[55px] md:h-[60px] lg:h-[69px] mt-[12px] md:mt-[18px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Prodi
                    </label>
                    <input id="prodi" type="text"
                        defaultValue={dataProposal.data.prodi}
                        placeholder="Prodi"
                        className={`block border w-full md:w-[500px] lg:w-[639px] h-[55px] md:h-[60px] lg:h-[69px] mt-[12px] md:mt-[18px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Semester
                    </label>
                    <input id="semester" type="text"
                        defaultValue={dataProposal.data.semester}
                        placeholder="Semester"
                        className={`block border w-full md:w-[500px] lg:w-[639px] h-[55px] md:h-[60px] lg:h-[69px] mt-[12px] md:mt-[18px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        IPK
                    </label>
                    <input id="ipk" type="text"
                        defaultValue={dataProposal.data.ipk}
                        placeholder="IPK 1.00-4.00"
                        className={`block border w-full md:w-[500px] lg:w-[639px] h-[55px] md:h-[60px] lg:h-[69px] mt-[12px] md:mt-[18px] px-[15px] md:px-[20px] outline-none`}
                    />
                </div>

                <div>
                    <label className={`text-[16px] md:text-[18px] lg:text-[20px] font-plex font-semibold`}>
                        Tipe Beasiswa
                    </label>
                    <select id="tipe-beasiswa"
                        defaultValue={dataProposal.data.tipe_beasiswa}
                        className={`block text-[16px] md:text-[18px] lg:text-[20px] w-full md:w-[200px] lg:w-[240px] h-[40px] md:h-[42px] lg:h-[44px] mt-[10px] outline-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px]`}
                    >
                        <option value="" disabled hidden>Pilih Tipe Beasiswa</option>
                        <option value="Reguler">Reguler</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Leadership">Leadership</option>
                    </select>
                </div>

                <div className={`flex flex-col md:flex-row gap-[20px] md:gap-[60px] lg:gap-[115px] mt-[60px] md:mt-[80px] lg:mt-[93px] mb-[100px] md:mb-[130px] lg:mb-[150px] md:ml-[40px] lg:ml-[92px]`}>
                    
                    <button 
                        type="button"
                        onClick={handleEdit}
                        className={`flex justify-center items-center bg-[rgba(255,49,46,1)] text-white text-[20px] md:text-[26px] lg:text-[32px] font-plex font-semibold w-full md:w-[250px] lg:w-[372px] h-[60px] md:h-[65px] lg:h-[73px] cursor-pointer`}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className={`flex justify-center items-center bg-[rgba(81,80,82,1)] text-white text-[20px] md:text-[26px] lg:text-[32px] font-plex font-semibold w-full md:w-[250px] lg:w-[372px] h-[60px] md:h-[65px] lg:h-[73px] cursor-pointer`}
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDelete}
                        className={`flex justify-center items-center bg-transparent text-[rgba(255,49,46,1)] text-[20px] md:text-[26px] lg:text-[32px] font-plex font-semibold w-full md:w-[250px] lg:w-[372px] h-[60px] md:h-[65px] lg:h-[73px] cursor-pointer`}
                    >
                        Delete
                    </button>

                </div>
            </form>
        </div>
    </div>
    )
}

export default EditPage;