import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPage = () => {
    const { id } = useParams();
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

            const response = await fetch("http://localhost/web-kel-3/backend/edit.php", {
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
                const getData = await fetch(`http://localhost/web-kel-3/backend/getData.php?id=${id}`);
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

    return(
        <div className={`mx-[100px]`}>
            <h1 className={`text-[32px] mt-[132px] font-plex font-bold`}>Ajukan Proposal Beasiswa</h1>
            <div className={`mt-[52px]`}>
                <form action="" className={`flex flex-col gap-[62px] pt-[74px] mb-[247px] pl-[53px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Nama Lengkap</label>
                        <input id="nama" type="text" defaultValue={dataProposal.data.nama} placeholder="Nama Lengkap" className={`block border w-[639px] h-[69px] mt-[18px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Deskripsi</label>
                        <textarea id="deskripsi" type="text" defaultValue={dataProposal.data.deskripsi} placeholder="Deskripsi Proposal Ajuan Mu" className={`block border rounded-[10px] w-[1144px] h-[202px] mt-[18px] py-[10px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Universitas</label>
                        <input id="universitas" type="text" defaultValue={dataProposal.data.universitas} placeholder="Universitas" className={`border-[0px_0px_0px_1px] block w-[639px] h-[69px] mt-[18px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Prodi</label>
                        <input id="prodi" type="text" defaultValue={dataProposal.data.prodi} placeholder="Prodi" className={`border-[0px_0px_0px_1px] block w-[639px] h-[69px] mt-[18px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Semester</label>
                        <input id="semester" type="text" defaultValue={dataProposal.data.semester} placeholder="Semester" className={`border-[0px_0px_0px_1px] block w-[639px] h-[69px] mt-[18px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>IPK</label>
                        <input id="ipk" type="text" defaultValue={dataProposal.data.ipk} placeholder="IPK 1.00-4.00" className={`border-[0px_0px_0px_1px] block w-[639px] h-[69px] mt-[18px] px-[20px] outline-none`}/>
                    </div>
                    <div>
                        <label htmlFor="" className={`text-[20px] font-plex font-semibold`}>Tipe Beasiswa</label>
                        <select name="" id="tipe-beasiswa" defaultValue={dataProposal.data.tipe_beasiswa} placeholder="tipe" className={`block text-[20px] w-[240px] h-[44px] outline-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px]`}>
                            <option value="" disabled hidden className={`text-gray-400 px-[10px]`}>Pilih Tipe Beasiswa</option>
                            <option value="Reguler">Reguler</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Leadership">Leadership</option>
                        </select>
                    </div>
                    <div className={`flex gap-[115px] mt-[93px] mb-[150px] ml-[92px]`}>
                        <button 
                        type="button"
                        onClick={handleEdit}
                        className={`flex justify-center items-center bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] text-[32px] font-plex font-semibold w-[372px] h-[73px] cursor-pointer`}>Edit</button>
                        <button
                        type="button"
                        onClick={handleCancel}
                        className={`flex justify-center items-center bg-[rgba(81,80,82,1)] text-[rgba(255,255,250,1)] text-[32px] font-plex font-semibold w-[372px] h-[73px] cursor-pointer`}>Batal</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default EditPage;