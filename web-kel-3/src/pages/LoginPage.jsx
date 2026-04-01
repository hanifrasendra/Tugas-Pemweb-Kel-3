

const LoginPage = () => {
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
                                className={`border font-plex block w-[526px] h-[45px]`}
                                />
                            </div>
                            <div className={`mt-[17px]`}>
                                <label htmlFor="password" className={`inline-block font-plex`}>Password</label>
                                <input 
                                type="password" 
                                id="password"
                                className={`border font-plex block w-[526px] h-[45px]`}
                                />
                            </div>
                            <button className={`bg-[rgba(255,49,46,1)] text-[24px] text-white font-semibold font-plex w-[526px] h-[58px] rounded-[10px] mx-auto mt-[30px]`}>Sign Up</button>
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
                                <button className={`bg-[rgba(255,255,255,1)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-[rgba(81,80,82,1)] font-plex w-[526px] h-[48px]`}>Sign up with Google</button>
                                <button className={`bg-[rgba(51,49,56,1)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-[rgba(255,255,250,1)] font-plex w-[526px] h-[48px] mt-[38px]`}>Sign up with Google</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default LoginPage;