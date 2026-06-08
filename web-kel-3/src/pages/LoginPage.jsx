import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({isLogin, setIsLogin, user, setUser, penyelenggara, setPenyelenggara, isLogPenyelenggara, setIsLogPenyelenggara}) => {
    const [activeTab, setActiveTab] = useState("pengguna");
    
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {navigate('/')}
        if (isLogPenyelenggara) {navigate('/admin')}
    }, [])

    

    const handleSubmit = async () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        const dataLogin = { email, password: pass };

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin)
            });
            
            const data = await response.json();

            if (data.status === "success") {
                console.log("RAW RESPONSE:", data);  // lihat isi aslinya
                console.log(data.isLogin)
                alert("Login berhasil!");
                localStorage.setItem("isLogin", data.isLogin);
                localStorage.setItem("user", JSON.stringify(data.data));

                setIsLogin(true);
                setUser(data.user);
                console.log(isLogin);
                console.log(user);
                navigate("/home");
                window.location.reload();
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Terjadi kesalahan.");
        }
    }

    const handleSubmitPenyelenggara = async () => {
        const emailPenyelenggara = document.getElementById("email-penyelenggara").value;
        const passwordPenyelenggara = document.getElementById("password-penyelenggara").value;

        const dataLogin = { email: emailPenyelenggara, password: passwordPenyelenggara };

        try {
            const response = await fetch("http://localhost:8000/api/login-penyelenggara", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin)
            });
            
            const data = await response.json();

            if (data.status === "success") {
                console.log("RAW RESPONSE:", data);  // lihat isi aslinya
                console.log(data.isLogin)
                alert("Login berhasil!");
                localStorage.setItem("loginPenyelenggara", data.isLogin);
                localStorage.setItem("penyelenggara", JSON.stringify(data.data));

                setIsLogin(true);
                setUser(data.user);
                console.log(isLogPenyelenggara);
                console.log(penyelenggara);
                navigate("/admin");
                window.location.reload();
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Terjadi kesalahan.");
        }
    }

    return(
        <div className="h-[100vh]">
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
                    <form className={`
                        flex flex-col items-center 
                        w-full 
                        max-w-[526px]
                    `}>
                        <h1 className={`
                            text-center font-semibold font-plex 
                            text-[36px]
                            [@media(min-width:768px)]:text-[48px]
                            [@media(min-width:1024px)]:text-[64px]
                        `}>
                            Login
                        </h1>

                        {/* Regis session */}
                        <div className="w-full mt-[10px]">
                            <p className="text-gray-500 text-left">
                                Don't have an account?{" "}
                                <a
                                onClick={() => navigate("/register")} 
                                className="text-[rgba(255,49,46,1)] cursor-pointer hover:underline">
                                    Register here
                                </a>
                            </p>
                        </div>

                        {/* TAB */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mt-6 w-full">
                            {[
                                { id: "pengguna", label: "Pengguna" },
                                { id: "penyelenggara", label: "Penyelenggara" },
                            ].map((tab) => (
                                <button
                                key={tab.id}
                                type="button"
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

                        {activeTab === "pengguna" && (
                            <>
                                {/* INPUT */}
                                <div className="mt-[40px] w-full">
                                    <label className="font-plex">Email</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        placeholder="masukkan email"
                                        className="border w-full h-[45px] px-[20px]"
                                    />
                                </div>

                                <div className="mt-[17px] w-full">
                                    <label className="font-plex">Password</label>
                                    <input 
                                        type="password" 
                                        id="password"
                                        placeholder="masukkan password"
                                        className="border w-full h-[45px] px-[20px]"
                                    />
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
                                    Login
                                </button>
                            </>
                        )}


                        {/* FORM PENYELENGGARA */}
                        {activeTab === "penyelenggara" && (
                            <>  
                                {/* INPUT */}
                                <div className="mt-[40px] w-full">
                                    <label className="font-plex">Email</label>
                                    <input 
                                        type="email" 
                                        id="email-penyelenggara"
                                        placeholder="masukkan email perusahaan"
                                        className="border w-full h-[45px] px-[20px]"
                                    />
                                </div>

                                <div className="mt-[17px] w-full">
                                    <label className="font-plex">Password</label>
                                    <input 
                                        type="password" 
                                        id="password-penyelenggara"
                                        placeholder="masukkan password"
                                        className="border w-full h-[45px] px-[20px]"
                                    />
                                </div>

                                {/* BUTTON */}
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
                                    Login
                                </button>
                            </>
                        )}

                        {/* forgot session */}
                        <div className="flex w-full mt-[10px] justify-end">
                            <a 
                            
                            className="text-[rgba(255,49,46,1)] hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        {/* OR */}
                        <div className="flex my-[30px] w-full items-center">
                            <div className="flex-1 h-[1px] bg-gray-400"></div>
                            <p className="mx-[10px] text-gray-500">or</p>
                            <div className="flex-1 h-[1px] bg-gray-400"></div>
                        </div>

                        {/* GOOGLE */}
                        <div className="w-full">
                            <button className="bg-white shadow w-full h-[48px] rounded-[10px]">
                                Sign up with Google
                            </button>
                            <button className="bg-[rgba(51,49,56,1)] text-white shadow w-full h-[48px] rounded-[10px] mt-[20px]">
                                Sign up with Google
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;