import { useState } from "react";

const RegisterPage = ({isLogin, setIsLogin, user, setUser}) => {
    const [activeTab, setActiveTab] = useState("pengguna");


    const handleSubmit = async () => {
        const namalengkap = document.getElementById("namalengkap").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(!namalengkap || !email || !pass || !confirmPassword) {
            alert("Silakan isi semua field.");
            return;
        }

        if(pass !== confirmPassword) {
            alert("Password dan Konfirmasi Password tidak cocok.");
            return;
        }

        const dataLogin = { namalengkap, email, password: pass };

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataLogin)
            });
            
            const data = await response.json();

            if (data.status === "success") {
                alert("registrasi berhasil!");
                localStorage.setItem("isLogin", data.isLogin);
                localStorage.setItem("user", JSON.stringify(data.data));
                window.location.href = "/home";
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Terjadi kesalahan.");
        }
        
    }

    const handleSubmitPenyelenggara = async () => {
        const nama_lembaga = document.getElementById("nama_lembaga").value;
        const kategori = document.getElementById("kategori").value;
        const email = document.getElementById("email-penyelenggara").value;
        const deskripsi = document.getElementById("deskripsi").value;
        const pass = document.getElementById("password-penyelenggara").value;
        const confirmPassword = document.getElementById("confirmPassword-penyelenggara").value;

        if(!nama_lembaga || !kategori || !email || !pass || !deskripsi || !confirmPassword) {
            alert("Silakan isi semua field.");
            return;
        }

        const dataPenyelenggara = { nama_lembaga, kategori, email, pass, deskripsi };

        try {
            const response = await fetch("http://localhost:8000/api/register-penyelenggara", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataPenyelenggara)
            });
            
            const data = await response.json();

            if (data.status === "success") {
                alert("registrasi berhasil!");
                localStorage.setItem("loginPenyelenggara", data.isLogin);
                localStorage.setItem("penyelenggara", JSON.stringify(data.data));
                window.location.href = "/admin";
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Terjadi kesalahan.");
        }
    }

    return(
        <div className="h-full">
            <div className={`
                flex h-full 
                flex-col 
                [@media(min-width:1024px)]:flex-row
            `}>
                
                {/* LEFT */}
                <div className={`
                    w-full 
                    [@media(min-width:1024px)]:w-[50%]
                    bg-[rgba(51,49,56,1)] 
                    rounded-none 
                    [@media(min-width:1024px)]:rounded-[0px_30px_30px_0px]
                    px-[30px] 
                    [@media(min-width:1024px)]:pl-[100px]
                    py-[60px]
                `}>
                    <h1 className={`
                        font-plex text-white font-semibold 
                        text-[32px] 
                        [@media(min-width:768px)]:text-[48px]
                        [@media(min-width:1024px)]:text-[64px]
                        mt-[50px]
                        [@media(min-width:1024px)]:mt-[227px]
                    `}>
                        <span className="text-[rgba(255,49,46,1)]">Create</span> Your Account
                    </h1>
                </div>

                {/* RIGHT */}
                <div className="flex justify-center items-center flex-1 px-[20px]">
                    
                    <div>
                        <h1 className={`
                            text-center font-semibold font-plex 
                            text-[36px]
                            [@media(min-width:768px)]:text-[48px]
                            [@media(min-width:1024px)]:text-[64px]
                            mt-[60px]
                        `}>
                            Sign Up
                        </h1>
                        {/* TAB */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mt-6">
                            {[
                                { id: "pengguna", label: "Pengguna" },
                                { id: "penyelenggara", label: "Penyelenggara" },
                            ].map((tab) => (
                                <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-plex transition-all duration-200 cursor-pointer ${
                                    activeTab === tab.id
                                    ? "bg-brand-red text-brand-light font-bold"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                                >
                                {tab.label}
                                </button>
                            ))}
                        </div>
                        {/* PENGGUNA FORM */}
                        {activeTab === "pengguna" && (
                            <form className={`
                                flex flex-col items-center 
                                w-full 
                                max-w-[526px]
                                mb-[100px]
                            `}>

                                {/* INPUT */}
                                <div className="mt-[40px] w-full">
                                    <label className="font-plex">Nama Lengkap</label>
                                    <input type="text" id="namalengkap"
                                        className="border w-full h-[45px] px-[20px]" />
                                </div>

                                <div className="mt-[17px] w-full">
                                    <label className="font-plex">Email</label>
                                    <input type="email" id="email"
                                        className="border w-full h-[45px] px-[20px]" />
                                </div>

                                <div className="mt-[17px] w-full">
                                    <label className="font-plex">Password</label>
                                    <input type="password" id="password"
                                        className="border w-full h-[45px] px-[20px]" />
                                </div>

                                <div className="mt-[17px] w-full">
                                    <label className="font-plex">Confirm Password</label>
                                    <input type="password" id="confirmPassword"
                                        className="border w-full h-[45px] px-[20px]" />
                                </div>

                                {/* BUTTON */}
                                <button 
                                    type="button"
                                    onClick={handleSubmit}
                                    className={`
                                        bg-[rgba(255,49,46,1)] text-white font-semibold 
                                        w-full h-[58px] rounded-[10px] mt-[30px]
                                        hover:bg-white hover:text-[rgba(255,49,46,1)] 
                                        hover:border-[2px] hover:border-[rgba(255,49,46,1)]
                                    `}
                                >
                                    Sign Up
                                </button>

                                {/* OR */}
                                <div className="flex my-[30px] w-full items-center">
                                    <div className="flex-1 h-[1px] bg-gray-400"></div>
                                    <p className="mx-[10px] text-gray-500">or</p>
                                    <div className="flex-1 h-[1px] bg-gray-400"></div>
                                </div>

                                {/* GOOGLE */}
                                <button className="bg-white shadow w-full h-[48px] rounded-[10px]">
                                    Sign up with Google
                                </button>

                                <button className="bg-[rgba(51,49,56,1)] text-white shadow w-full h-[48px] rounded-[10px] mt-[20px]">
                                    Sign up with Google
                                </button>

                            </form>
                        )}
                        {/* PENYELENGGARA FORM */}
                        {activeTab === "penyelenggara" && (
                        <form className={`
                            flex flex-col items-center 
                            w-full 
                            max-w-[526px]
                            mb-[100px]
                        `}>

                            <p className="text-xs text-gray-400 font-plex mt-[40px] w-full">
                                <span className="text-[#FF312E]">*</span> wajib diisi
                            </p>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Nama Lembaga <span className="text-[#FF312E]">*</span></label>
                                <input type="text" id="nama_lembaga" className="border w-full h-[45px] px-[20px]" />
                            </div>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Kategori <span className="text-[#FF312E]">*</span></label>
                                <div className="relative">
                                    <select 
                                    id="kategori"
                                    className="border w-full h-[45px] px-[20px] appearance-none cursor-pointer bg-white">
                                    <option value="" disabled>Pilih kategori</option>
                                    {["Pemerintah", "Swasta", "BUMN", "Internasional", "Yayasan"].map((k) => (
                                        <option key={k} value={k}>{k}</option>
                                    ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF312E]">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Email <span className="text-[#FF312E]">*</span></label>
                                <input id="email-penyelenggara" type="email" className="border w-full h-[45px] px-[20px]" />
                            </div>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Deskripsi</label>
                                <textarea id="deskripsi" rows={3} className="border w-full px-[20px] py-3 resize-none" />
                            </div>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Password <span className="text-[#FF312E]">*</span></label>
                                <input id="password-penyelenggara" type="password" className="border w-full h-[45px] px-[20px]" />
                            </div>

                            <div className="mt-[17px] w-full">
                                <label className="font-plex">Konfirmasi Password <span className="text-[#FF312E]">*</span></label>
                                <input id="confirmPassword-penyelenggara" type="password" className="border w-full h-[45px] px-[20px]" />
                            </div>

                            <button
                            type="button"
                            onClick={() => handleSubmitPenyelenggara()}
                            className={`
                                bg-[rgba(255,49,46,1)] text-white font-semibold 
                                w-full h-[58px] rounded-[10px] mt-[30px]
                                hover:bg-white hover:text-[rgba(255,49,46,1)] 
                                hover:border-[2px] hover:border-[rgba(255,49,46,1)]
                            `}
                            >
                            Daftar Lembaga
                            </button>

                        </form>
                        )}

                        <p className="text-center text-xs text-gray-400 font-plex mt-6 mb-10">
                            Sudah punya akun?{" "}
                            <span className="text-[#FF312E] cursor-pointer hover:underline">Masuk di sini</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;