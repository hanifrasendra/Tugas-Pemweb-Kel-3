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
                setDataProposal(data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [filter]);

    const handleClick = (id) => {
        navigate(`/edit/${id}`);
    }

    return (
        <div className={`mx-[100px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mx-[24px]`}>

            {/* Filter */}
            <div className={`flex justify-between mt-[30px] gap-[20px] mt-[100px] [@media(0px<width<=768px)]:gap-[10px] [@media(0px<width<=768px)]:flex-wrap`}>
                <div className={`flex [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:justify-between`}>
                    <div
                        onClick={() => setFilter("")}
                        className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer [@media(0px<width<=768px)]:px-[8px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:h-[36px] [@media(0px<width<=768px)]:w-auto`}>
                        Semua
                    </div>
                    <div
                        onClick={() => setFilter("Prestasi")}
                        className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer [@media(0px<width<=768px)]:px-[18px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:h-[36px] [@media(0px<width<=768px)]:w-auto`}>
                        Prestasi
                    </div>
                    <div
                        onClick={() => setFilter("Reguler")}
                        className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer [@media(0px<width<=768px)]:px-[18px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:h-[36px] [@media(0px<width<=768px)]:w-auto`}>
                        Reguler
                    </div>
                    <div
                        onClick={() => setFilter("Leadership")}
                        className={`flex justify-center items-center bg-[rgba(255,255,250,1)] font-plex shadow h-[40px] px-[30px] cursor-pointer [@media(0px<width<=768px)]:px-[18px] [@media(0px<width<=768px)]:text-[13px] [@media(0px<width<=768px)]:h-[36px] [@media(0px<width<=768px)]:w-auto`}>
                        Leadership
                    </div>
                </div>
                
                <button
                    onClick={() => navigate("/tambah")}
                    className={`bg-[rgba(51,49,56,1)] text-[rgba(255,255,250,1)] text-[20px] font-plex font-semibold w-[263px] h-[50px] [@media(0px<width<=768px)]:w-full [@media(0px<width<=768px)]:text-[15px] [@media(0px<width<=768px)]:h-[44px] [@media(768px<width<=1024px)]:text-[16px] [@media(768px<width<=1024px)]:w-[200px]`}>
                    Ajukan Proposal
                </button>
            </div>

            {/* Divider */}
            <div className={`bg-[rgba(51,49,56,1)] w-[630px] h-[2px] mt-[30px] [@media(0px<width<=768px)]:w-full [@media(768px<width<=1024px)]:w-full`}></div>


            {/* Grid Proposal Card */}
            <div className={`grid grid-cols-5 mt-[122px] gap-[20px] [@media(1024px<width<=1440px)]:grid-cols-4 [@media(768px<width<=1024px)]:grid-cols-3 [@media(768px<width<=1024px)]:mt-[60px] [@media(425px<width<=768px)]:grid-cols-2 [@media(0px<width<=425px)]:grid-cols-1 [@media(0px<width<=768px)]:mt-[40px] [@media(0px<width<=400px)]:grid-cols-1`}>
                {dataProposal.data.map(proposal => (
                    <div
                        key={proposal.id}
                        className={`py-[20px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]`}
                    >
                        {/* Badge tipe */}
                        <div className={`flex justify-between px-[23px] [@media(0px<width<=768px)]:px-[14px]`}>
                            <div></div>
                            <div className={`flex justify-center items-center bg-[rgba(255,49,46,1)] text-[rgba(255,255,250,1)] font-plex w-[120px] h-[20px] rounded-[20px] text-[12px] [@media(0px<width<=768px)]:w-[90px] [@media(0px<width<=768px)]:text-[10px]`}>
                                {proposal.tipe_beasiswa}
                            </div>
                        </div>

                        {/* Isi Card */}
                        <div className={`mt-[113px] px-[23px] [@media(0px<width<=768px)]:mt-[40px] [@media(0px<width<=768px)]:px-[14px] [@media(768px<width<=1024px)]:mt-[60px]`}>
                            <h1
                                onClick={() => handleClick(proposal.id)}
                                className={`text-[rgba(0,0,0,1)] text-[16px] font-plex font-bold cursor-pointer [@media(0px<width<=768px)]:text-[13px]`}>
                                {proposal.deskripsi}
                            </h1>
                            <div className={`flex justify-between`}>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[36px] [@media(0px<width<=768px)]:text-[12px] [@media(0px<width<=768px)]:mt-[20px]`}>{proposal.nama}</p>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[36px] [@media(0px<width<=768px)]:text-[12px] [@media(0px<width<=768px)]:mt-[20px]`}>{proposal.ukt}</p>
                            </div>
                            <p className={`text-[rgba(141,133,133,1)] text-[14px] mt-[10px] [@media(0px<width<=768px)]:text-[11px] [@media(0px<width<=768px)]:mt-[6px]`}>
                                {proposal.universitas} - {proposal.prodi}
                            </p>
                        </div>

                        {/* Divider merah */}
                        <div className={`bg-[rgba(255,49,46,1)] w-[88%] h-[2px] mt-[12px] mb-[8px] mx-auto`}></div>

                        {/* Footer Card */}
                        <div className={`flex mt-[8px] px-[23px] gap-[24px] [@media(0px<width<=768px)]:px-[14px] [@media(0px<width<=768px)]:gap-[16px]`}>
                            <div>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] [@media(0px<width<=768px)]:text-[11px]`}>Semester</p>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] [@media(0px<width<=768px)]:text-[11px]`}>{proposal.semester}</p>
                            </div>
                            <div>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] [@media(0px<width<=768px)]:text-[11px]`}>IPK</p>
                                <p className={`text-[rgba(141,133,133,1)] text-[14px] [@media(0px<width<=768px)]:text-[11px]`}>{proposal.ipk}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom padding */}
            <div className={`pb-[100px] [@media(0px<width<=768px)]:pb-[60px]`}></div>
        </div>
    );
}

export default CatalogPage;