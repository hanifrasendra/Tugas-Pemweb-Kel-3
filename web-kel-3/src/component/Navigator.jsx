

const Navigator = () => {
    return(
        <div className={"m-auto bg-transparent"}>
            <div className={"flex items-center h-[100px] mx-[100px]"}>
                <nav className={"flex justify-between items-center w-full"}>
                    <div>
                        <h1 className={"text-[rgba(0,8,7,1)] text-[40px] font-bold"}>Portal Beasiswa</h1>
                    </div>
                    <ul className="flex gap-[70px]">
                        <li className={"text-[rgba(147,149,211,1)] text-[24px]"}><a href="#">Profil</a></li>
                        <li className={"text-[rgba(147,149,211,1)] text-[24px]"}><a href="#">Cari Beasiswa</a></li>
                        <li className={"text-[rgba(147,149,211,1)] text-[24px]"}><a href="#">Tips & Trik</a></li>
                        <li className={"text-[rgba(147,149,211,1)] text-[24px]"}><a href="#">Bantuan</a></li>
                        <button className={"bg-[rgba(147,149,211,1)] text-[20px] text-[rgba(255,255,255,1)] font-semibold w-[120px] h-[40px]"}>
                            Log In
                        </button>
                    </ul>
                </nav>
            </div>
        </div>
        
    )
}

export default Navigator;