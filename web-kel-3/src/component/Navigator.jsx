import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigator = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <div className={"m-auto bg-transparent shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] relative z-50"}>
                <div className={"flex items-center h-[100px] mx-[100px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mx-[24px] [@media(0px<width<=768px)]:h-[72px]"}>
                    <nav className={"flex justify-between items-center w-full"}>

                        {/* Logo */}
                        <div
                            onClick={() => navigate("/")}
                            className={"cursor-pointer"}
                        >
                            <h1 className={"text-[rgba(0,1,3,1)] text-[32px] font-bold font-plex [@media(1024px<width<=1440px)]:text-[28px] [@media(768px<width<=1024px)]:text-[24px] [@media(0px<width<=768px)]:text-[20px]"}>
                                Portal Beasiswa
                            </h1>
                        </div>

                        {/* Nav Links — hidden di mobile & tablet */}
                        <ul className="flex gap-[70px] [@media(1024px<width<=1440px)]:gap-[40px] [@media(0px<width<=1024px)]:hidden">
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex [@media(1024px<width<=1440px)]:text-[18px]"}><a href="#">Beranda</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex [@media(1024px<width<=1440px)]:text-[18px]"}><a href="#profil">Tentang</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex [@media(1024px<width<=1440px)]:text-[18px]"}><a href="#">Jenis</a></li>
                            <li className={"text-[rgba(0,1,3,1)] text-[20px] font-plex [@media(1024px<width<=1440px)]:text-[18px]"}><a href="#">Kontak</a></li>
                        </ul>

                        {/* Buttons — hidden di mobile & tablet */}
                        <div className={"flex gap-[44px] [@media(1024px<width<=1440px)]:gap-[20px] [@media(0px<width<=1024px)]:hidden"}>
                            <button
                                className={"border-2 border-[rgba(255,49,46,1)] text-[20px] text-[rgba(255,49,46,1)] font-semibold h-[44px] w-[153px] font-plex [@media(1024px<width<=1440px)]:w-[125px] [@media(1024px<width<=1440px)]:h-[38px] [@media(1024px<width<=1440px)]:text-[18px]"}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                            <button
                                className={"bg-[rgba(81,80,82,1)] text-[20px] text-[rgba(255,255,255,1)] font-semibold h-[44px] w-[121px] font-plex [@media(1024px<width<=1440px)]:w-[125px] [@media(1024px<width<=1440px)]:h-[38px] [@media(1024px<width<=1440px)]:text-[18px]"}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        </div>

                        {/* Hamburger Button — hanya tampil di mobile & tablet */}
                        <button
                            className={"hidden [@media(0px<width<=1024px)]:flex flex-col justify-center items-center gap-[6px] w-[40px] h-[40px]"}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
                            <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                            <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
                        </button>

                    </nav>
                </div>

                {/* Dropdown Menu Mobile & Tablet */}
                <div className={`hidden [@media(0px<width<=1024px)]:block bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px] py-[24px]" : "max-h-0"}`}>
                    <ul className="flex flex-col gap-[0px] mx-[24px] [@media(768px<width<=1024px)]:mx-[40px]">
                        <li className={"text-[rgba(0,1,3,1)] text-[18px] font-plex py-[14px] border-b border-[rgba(0,0,0,0.08)]"}>
                            <a href="#" onClick={() => setMenuOpen(false)}>Beranda</a>
                        </li>
                        <li className={"text-[rgba(0,1,3,1)] text-[18px] font-plex py-[14px] border-b border-[rgba(0,0,0,0.08)]"}>
                            <a href="#profil" onClick={() => setMenuOpen(false)}>Tentang</a>
                        </li>
                        <li className={"text-[rgba(0,1,3,1)] text-[18px] font-plex py-[14px] border-b border-[rgba(0,0,0,0.08)]"}>
                            <a href="#" onClick={() => setMenuOpen(false)}>Jenis</a>
                        </li>
                        <li className={"text-[rgba(0,1,3,1)] text-[18px] font-plex py-[14px] border-b border-[rgba(0,0,0,0.08)]"}>
                            <a href="#" onClick={() => setMenuOpen(false)}>Kontak</a>
                        </li>
                    </ul>
                    <div className="flex gap-[16px] mx-[24px] mt-[24px] [@media(768px<width<=1024px)]:mx-[40px]">
                        <button
                            className={"border-2 border-[rgba(255,49,46,1)] text-[16px] text-[rgba(255,49,46,1)] font-semibold h-[44px] w-full font-plex"}
                            onClick={() => { navigate("/register"); setMenuOpen(false); }}
                        >
                            Register
                        </button>
                        <button
                            className={"bg-[rgba(81,80,82,1)] text-[16px] text-[rgba(255,255,255,1)] font-semibold h-[44px] w-full font-plex"}
                            onClick={() => { navigate("/login"); setMenuOpen(false); }}
                        >
                            Login
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navigator;