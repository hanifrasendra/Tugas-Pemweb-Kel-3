import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CatalogPage = () => {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [filter, setFilter] = useState("");
    const [dataProposal, setDataProposal] = useState({
        status: "",
        data: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetch(`https://web-kel-3-backend.vercel.app/api/catalog.php?filter=${filter}`);
                const data = await getData.json();
                console.log(filter);
                console.log(data.data);

                setDataProposal(data)
                console.log(dataProposal);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [filter]);

    const handleClick = (id) => {
        navigate(`/edit/${id}`);
    }



    return(
        <div className={`mx-[100px]`}>
            <div className={`flex justify-between mt-[100px]`}>
                <div className={`flex gap-[28px]`}>
                    <div className={`flex justify-center items-center bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] text-[20px] w-[150px] h-[50px] font-plex font-semibold`}>Semua</div>
                    <div className={`flex justify-center items-center bg-[rgba(255,255,250,1)] shadow text-[rgba(0,0,0,1)] text-[20px] w-[150px] h-[50px] font-plex font-regular`}>Diterima</div>
                    <div className={`flex justify-center items-center bg-[rgba(255,255,250,1)] shadow text-[rgba(0,0,0,1)] text-[20px] w-[150px] h-[50px] font-plex font-regular`}>Pending</div>
                </div>
                <button 
                onClick={() => navigate("/tambah")}
                className={`bg-[rgba(51,49,56,1)] text-[rgba(255,255,250,1)] text-[20px] font-plex font-semibold w-[263px] h-[50px]`}>Ajukan Proposal</button>
            </div>
            <div className={`bg-[rgba(51,49,56,1)] w-[630px] h-[2px] mt-[30px]`}></div>
            <div className={`flex mt-[30px] gap-[20px]`}>
                <div 
                onClick={() => setFilter("")}
                type="button"
                className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer`}>Semua</div>
                <div 
                onClick={() => setFilter("Prestasi")}
                type="button"
                className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer`}>Prestasi</div>
                <div 
                onClick={() => setFilter("Reguler")}
                type="button"
                className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer`}>Reguler</div>
                <div 
                onClick={() => setFilter("Leadership")}
                type="button"
                className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer`}>Leadership</div>
            </div>
            <div className={`grid grid-cols-5 mt-[122px]`}>
                {dataProposal.data.map(proposal => (
                    <div
                    key={proposal.id}
                    className={`py-[20px_23px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]`}
                    >
                        <div className={`flex justify-between px-[23px]`}>
                            <div></div>
                            <div className={`flex justify-center items-center bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] font-plex w-[120px] h-[20px] rounded-[20px]`}>
                                {proposal.tipe_beasiswa}
                            </div>
                        </div>
                        <div className={`mt-[113px] px-[23px]`}>
                            <h1 
                            onClick={() => handleClick(proposal.id)}
                            className={`text-[rgba(0,0,0,1)] text-[16px] font-plex font-bold cursor-pointer`}>{proposal.deskripsi}</h1>
                            <div className={`flex justify-between`}>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[36px]`}>{proposal.nama}</p>
                                <div className={`bg-[]`}>
                                    <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[36px]`}>{proposal.ukt}</p>
                                </div>
                            </div>
                            
                            <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[10px]`}>{proposal.universitas} - {proposal.prodi}</p>
                        </div>
                        <div className={`bg-[rgba(255,49,46,1)] w-[88%] h-[2px] mt-[12px] mb-[8px] mx-auto`}></div>
                        <div className={`flex mt-[8px] px-[23px] gap-[24px]`}>
                            <div>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px]`}>Semester</p>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px]`}>{proposal.semester}</p>
                            </div>
                            <div>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px]`}>IPK</p>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px]`}>{proposal.ipk}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CatalogPage;