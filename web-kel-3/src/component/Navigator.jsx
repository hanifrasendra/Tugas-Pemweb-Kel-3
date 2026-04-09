import { useNavigate } from "react-router-dom";

const Navigator = () => {
    const navigate = useNavigate();


    return(
        <div>
            <div className={"m-auto bg-transparent shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"}>
                <div className={"flex items-center h-[100px] mx-[100px]"}>
                    <nav className={"flex justify-between items-center w-full"}>
                        <div
                        onClick={() => navigate("/")}
                        className={`cursor-pointer`}
                        >
                            <h1 className={"text-[rgba(0,1,3,1)] text-[32px] font-bold font-plex"}>Portal Beasiswa</h1>
                        </div>
                        <ul className="flex gap-[70px]">
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex"}><a href="#">Beranda</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex"}><a href="#profil">Tentang</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex"}><a href="#">Jenis</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex"}><a href="#">Kontak</a></li>
                        </ul>
                        <div className={`flex gap-[44px]`}>
                            <button className={`border-2 border-[rgba(255,49,46,1)] text-[20px] text-[rgba(255,49,46,1)] font-semibold h-[44px] w-[153px] font-plex`}
                            onClick={() => navigate("/login")}
                            >
                                Register
                            </button>
                            <button className={`bg-[rgba(81,80,82,1)] text-[20px] text-[rgba(255,255,255,1)] font-semibold h-[44px] w-[121px] font-plex`}
                            onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        
        
    )
}

export default Navigator;