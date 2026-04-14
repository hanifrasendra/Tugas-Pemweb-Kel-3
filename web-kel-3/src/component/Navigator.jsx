import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigator = ({ isLogin, setIsLogin, user, setUser }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        alert("Anda telah logout!");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
        setIsLogin(false);
    };

    // Style helper untuk animasi hover link
    const navLinkStyle = "relative text-[rgba(0,1,3,1)] font-plex group whitespace-nowrap transition-colors hover:text-[rgba(255,49,46,1)]";
    const underlineStyle = "absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[rgba(255,49,46,1)] transition-all duration-300 group-hover:w-full";

    return (
        <div className="sticky top-0 w-full bg-white/90 backdrop-blur-sm shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] z-[100]">
            <div className="m-auto">
                <div className="flex items-center h-[100px] mx-[100px] [@media(768px<width<=1024px)]:mx-[40px] [@media(0px<width<=768px)]:mx-[24px] [@media(0px<width<=768px)]:h-[72px]">
                    <nav className="flex justify-between items-center w-full">

                        {/* Logo */}
                        <div
                            onClick={() => navigate("/")}
                            className="cursor-pointer flex-shrink-0"
                        >
                            <h1 className="text-[rgba(0,1,3,1)] text-[32px] font-bold font-plex [@media(1024px<width<=1440px)]:text-[28px] [@media(768px<width<=1024px)]:text-[24px] [@media(0px<width<=768px)]:text-[20px]">
                                ScholarHub
                            </h1>
                        </div>

                        {/* Nav Links - Menggunakan gap dinamis untuk mencegah tabrakan */}
                        <ul className="flex items-center 
                            gap-[70px] 
                            [@media(1280px<width<=1440px)]:gap-[40px] 
                            [@media(1024px<width<=1280px)]:gap-[20px] 
                            [@media(0px<width<=1024px)]:hidden">
                            
                            <li className={`${navLinkStyle} text-[20px] [@media(1024px<width<=1440px)]:text-[18px]`}>
                                <a href="#beranda">Beranda</a>
                                <span className={underlineStyle}></span>
                            </li>
                            <li className={`${navLinkStyle} text-[20px] [@media(1024px<width<=1440px)]:text-[18px]`}>
                                <a href="#profil">Tentang</a>
                                <span className={underlineStyle}></span>
                            </li>
                            <li className={`${navLinkStyle} text-[20px] [@media(1024px<width<=1440px)]:text-[18px]`}>
                                <a href="#jenis">Jenis</a>
                                <span className={underlineStyle}></span>
                            </li>
                            <li className={`${navLinkStyle} text-[20px] [@media(1024px<width<=1440px)]:text-[18px]`}>
                                <a href="#pengajuan">Kontak</a>
                                <span className={underlineStyle}></span>
                            </li>
                        </ul>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-[20px] flex-shrink-0">
                            {isLogin ? (
                                <div className="flex items-center gap-[15px]">
                                    <div className="hidden [@media(1100px<width)]:block">
                                        <p className="text-[14px] font-plex text-right leading-tight">
                                            Halo, <br />
                                            <span className="font-bold font-plex">{user?.nama}</span>
                                        </p>
                                    </div>
                                    <button
                                        className="bg-[rgba(81,80,82,1)] text-[18px] text-white font-semibold h-[44px] w-[120px] font-plex transition-all hover:bg-black hover:scale-105 active:scale-95 [@media(0px<width<=1024px)]:hidden [@media(1024px<width<=1440px)]:w-[100px] [@media(1024px<width<=1440px)]:h-[38px] [@media(1024px<width<=1440px)]:text-[16px]"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-[20px] [@media(1024px<width<=1280px)]:gap-[10px]">
                                    <button
                                        className="border-2 border-[rgba(255,49,46,1)] text-[18px] text-[rgba(255,49,46,1)] font-semibold h-[44px] w-[130px] font-plex transition-all hover:bg-[rgba(255,49,46,1)] hover:text-white [@media(1024px<width<=1440px)]:w-[100px] [@media(1024px<width<=1440px)]:h-[38px] [@media(1024px<width<=1440px)]:text-[16px] [@media(0px<width<=1024px)]:hidden"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </button>
                                    <button
                                        className="bg-[rgba(81,80,82,1)] text-[18px] text-white font-semibold h-[44px] w-[110px] font-plex transition-all hover:bg-black [@media(1024px<width<=1440px)]:w-[90px] [@media(1024px<width<=1440px)]:h-[38px] [@media(1024px<width<=1440px)]:text-[16px] [@media(0px<width<=1024px)]:hidden"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                </div>
                            )}

                            {/* Hamburger Menu Icon */}
                            <button
                                className="hidden [@media(0px<width<=1024px)]:flex flex-col justify-center items-center gap-[6px] w-[40px] h-[40px]"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
                                <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                                <span className={`block w-[26px] h-[2px] bg-[rgba(0,1,3,1)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
                            </button>
                        </div>

                    </nav>
                </div>

                {/* Dropdown Menu Mobile & Tablet */}
                <div className={`hidden [@media(0px<width<=1024px)]:block bg-white shadow-lg overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[500px] py-[24px]" : "max-h-0"}`}>
                    <ul className="flex flex-col gap-[0px] mx-[24px] [@media(768px<width<=1024px)]:mx-[40px]">
                        <li className="text-[18px] font-plex py-[14px] border-b border-gray-100"><a href="#beranda" onClick={() => setMenuOpen(false)}>Beranda</a></li>
                        <li className="text-[18px] font-plex py-[14px] border-b border-gray-100"><a href="#profil" onClick={() => setMenuOpen(false)}>Tentang</a></li>
                        <li className="text-[18px] font-plex py-[14px] border-b border-gray-100"><a href="#jenis" onClick={() => setMenuOpen(false)}>Jenis</a></li>
                        <li className="text-[18px] font-plex py-[14px] border-b border-gray-100"><a href="#pengajuan" onClick={() => setMenuOpen(false)}>Kontak</a></li>
                    </ul>
                    <div className="mx-[24px] mt-[24px] flex flex-col gap-3 [@media(768px<width<=1024px)]:mx-[40px]">
                        {isLogin ? (
                            <button className="bg-gray-700 text-white h-[44px] rounded-md font-semibold" onClick={handleLogout}>Logout ({user?.nama?.split(' ')[0]})</button>
                        ) : (
                            <>
                                <button className="border-2 border-red-500 text-red-500 h-[44px] rounded-md font-semibold" onClick={() => navigate("/register")}>Register</button>
                                <button className="bg-gray-700 text-white h-[44px] rounded-md font-semibold" onClick={() => navigate("/login")}>Login</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigator;