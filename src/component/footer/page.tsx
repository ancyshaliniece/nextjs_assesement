'use client';
import { useSelector } from 'react-redux';
import style from './footer.module.css';
import { useEffect, useState } from 'react';
export default function Footer(){
    const mode=useSelector((store:any)=>store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    // useEffect(() => {
    //     // debugger
    //     const modes=mode[0].mode;
    //     setdarkMode(modes);
    // }, [mode])
    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    return(
        <div className={`${style.footer} ${darkMode==="true"?"bg-[#000]":"bg-[#e8e8e8]"}`}>
        <p>© 2023 education. All rights Reserved</p>
        </div>
    )
}