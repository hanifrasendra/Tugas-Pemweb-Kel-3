const RegisterPage = () => {

    const handleSubmit = async () => {
        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(!nama || !email || !pass || !confirmPassword) {
            alert("Silakan isi semua field.");
            return;
        }

        const getUser = await fetch("https://web-kel-3-backend.vercel.app/api/getUsers.php")
        const user = await getUser.json();

        const existingUser = user.data.find(u => u.email === email);
        
        if(existingUser) {
            alert("Email sudah terdaftar. Silakan gunakan email lain.");
        } else {
            if(pass !== confirmPassword) {
                alert("Password tidak cocok.");
                return;
            }
            
            const dataLogin = { nama, email, password: pass };

            try {
                const response = await fetch("https://web-kel-3-backend.vercel.app/api/register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataLogin)
                });
            
                const data = await response.json();

                if (data.status === "success") {
                    alert("registrasi berhasil!");
                    window.location.href = "/home";
                } else {
                    alert(data.message);
                }

            } catch (error) {
                alert("Terjadi kesalahan.");
            }
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
                    <form className={`
                        flex flex-col items-center 
                        w-full 
                        max-w-[526px]
                        mb-[100px]
                    `}>
                        <h1 className={`
                            text-center font-semibold font-plex 
                            text-[36px]
                            [@media(min-width:768px)]:text-[48px]
                            [@media(min-width:1024px)]:text-[64px]
                            mt-[60px]
                        `}>
                            Sign Up
                        </h1>

                        {/* INPUT */}
                        <div className="mt-[40px] w-full">
                            <label className="font-plex">Nama Lengkap</label>
                            <input type="text" id="nama"
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
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;