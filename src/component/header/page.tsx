'use client'
import { commonImg } from "@/images";
import Image from "next/image";
import style from "./header.module.css";
import { useEffect, useRef, useState } from "react";
import { useSideMenu } from "../sideMenuProvider/page";
import { useDispatch, useSelector } from "react-redux";
import { updateMode } from "@/redux/slices/modeSlice";


export default function Header() {
    const mode=useSelector((store:any)=>store.modeStore);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { toggleSideMenu } = useSideMenu();
    const [darkMode, setdarkMode] = useState<string | null>(null);
    const dispatch=useDispatch();

    const handleMode=()=>{
        if(darkMode==="false"){
                localStorage.setItem('DarkMode','true');
                setdarkMode("true");
                dispatch(updateMode("true"));
        }else if(darkMode==="true"){
                localStorage.setItem('DarkMode','false');
                setdarkMode("false");
                dispatch(updateMode("false"));
        }
        
    }
    console.log("darkMode",darkMode);
    
    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        if(mode){
            setdarkMode(mode);
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setProfileDropDown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

  
    


    return (
        <div className={`flex justify-between items-center font-sans py-3 px-8 header ${style.header} ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`} >

            <div className="flex justify-between items-center w-24">
                <span className="w-11 cursor-pointer">
                    <Image src={commonImg.logoImg} alt="logoImg" priority />
                </span>
                <span className={`${style.headBg}`}>
                    <Image src={commonImg.hamburgerIcon} alt="hamburgerIcon" priority onClick={toggleSideMenu} />
                </span>
            </div>
            <div className="relative w-[400px] cursor-pointer">
                <input type="text" className={`${style.searchInput} input`} placeholder="Search" />
                <Image src={commonImg.search} alt="searchIcon" priority className="absolute left-2 top-2 w-4" />
            </div>
            <div className="profile flex justify-center items-center gap-1">
                <span className={style.headBg}>
                    <Image src={commonImg.darkIcon} alt="darkIcon" priority onClick={handleMode}/>
                </span>
                <span className={`${style.headBg} ${style.notification} mr-2`}>
                    <Image src={commonImg.notificationIcon} alt="notificationIcon" priority />
                </span>

                <div ref={ref}>
                    <div className={`flex justify-between items-center gap-2 cursor-pointer ${style.user}`} onClick={() => setProfileDropDown(!profileDropDown)}>
                        <div className="size-9">
                            <Image src={commonImg.profileImg} alt="Profile Image" className={style.textFieldImage} priority />
                        </div>
                        <div>
                            <p className={style.userName}>Wiliam</p>
                            <p className={style.post}>Super Admin</p>
                        </div>
                        <Image src={commonImg.textFieldDropDown} alt="textFieldDownIcon" priority />

                    </div>
                    {profileDropDown && <div className={style.profileDropDown} >
                        <div className={`${style.pro} filed flex items-center cursor-pointer`}>
                            <span className={style.profileDropDownSpan}>Profile</span>
                        </div>
                        <div className={`${style.logOut} filed flex items-center cursor-pointer`}>
                            <span className={style.profileDropDownSpanLogout}>LogOut</span>
                        </div>
                    </div>}
                </div>

            </div>

        </div>
    )
}