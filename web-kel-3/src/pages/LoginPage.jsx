import {useState, useEffect} from 'react';

const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(0);

   
    
    const handleSubmit = async () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        
        
        //eksekusi jika tidak ada email dengan nama yang sama di temukan
        const dataLogin = {
            email: email,
            password: pass
        }
        // Kirim data ke backend menggunakan fetch ke laragon dengan method POST
        try {
            console.log(dataLogin);
            // path menuju file register.php di laragon
            const response = await fetch("http://localhost/web-kel-3/backend/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin)
            });
            
            const data = await response.json();
            console.log(data)

            if (data.status === "success") {
                alert("Login berhasil!");
                    window.location.href = "/home";
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error)
            alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi."); 
        }
        

        

        
    }

    

    return(
        <div className={`h-[100vh]`}>
            <div className={`flex h-full`}>
                <div className={`w-[973px] bg-[rgba(51,49,56,1)] rounded-[0px_30px_30px_0px] pl-[100px]`}>
                    <h1 className={`text-[64px] font-plex text-[rgba(255,255,250,1)] font-semibold w-[723px] mt-[227px]`}>
                        <span className={`text-[rgba(255,49,46,1)]`}>Create</span> Your Account
                    </h1>
                </div>
                <div className={`flex justify-center items-center flex-1`}>
                    <div className={``}>
                        <form action="" className={`flex flex-col justify-center items-center w-[526px]`}>
                            <h1 className={`text-[64px] text-center font-semibold font-plex `}>Sign Up</h1>
                            <div className={`mt-[102px]`}>
                                <label htmlFor="email" className={`inline-block font-plex`}>Email</label>
                                <input 
                                type="email" 
                                id="email"
                                className={`border font-plex block w-[526px] h-[45px] px-[20px]`}
                                />
                            </div>
                            <div className={`mt-[17px]`}>
                                <label htmlFor="password" className={`inline-block font-plex`}>Password</label>
                                <input 
                                type="password" 
                                id="password"
                                className={`border font-plex block w-[526px] h-[45px] px-[20px]`}
                                />
                            </div>
                            <button 
                            type="button"
                            onClick={handleSubmit}
                            className={`bg-[rgba(255,49,46,1)] text-[24px] text-white font-semibold font-plex w-[526px] h-[58px] rounded-[10px] mx-auto mt-[30px] cursor-pointer
                                    group hover:bg-[rgba(255,255,250,1)] hover:text-[rgba(255,49,46,1)] hover:border-[rgba(255,49,46,1)] hover:border-[2px]
                                `}>Login</button>
                            <div className={`flex my-[40px]`}>
                                <div className={`flex flex-1 items-center`}>
                                    <div className={`bg-[rgba(81,80,82,1)] w-full h-[1px]`}></div>
                                </div>
                                <p className={`text-[24px] text-[rgba(81,80,82,1)] mx-[10px]`}>or</p>
                                <div className={`flex flex-1 items-center`}>
                                    <div className={`bg-[rgba(81,80,82,1)] w-full h-[1px]`}></div>
                                </div>
                            </div>
                            <div className={`w-full`}>
                                <button className={`bg-[rgba(255,255,255,1)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-[rgba(81,80,82,1)] font-plex w-[526px] h-[48px] rounded-[10px]  cursor-pointer`}>Sign up with Google</button>
                                <button className={`bg-[rgba(51,49,56,1)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-[rgba(255,255,250,1)] font-plex w-[526px] h-[48px] rounded-[10px] mt-[38px] cursor-pointer`}>Sign up with Google</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default LoginPage;