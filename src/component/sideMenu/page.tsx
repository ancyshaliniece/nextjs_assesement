'use client'
import Image from 'next/image';
import style from './sideMenu.module.css';
import { menuBar } from '@/images';
import { useEffect, useState } from 'react';
import { useSideMenu } from '../sideMenuProvider/page';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


export default function SideMenu() {
    const mode=useSelector((store:any)=>store.modeStore);
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { isSideMenuOpen } = useSideMenu();
    const router=useRouter();

    // Function to handle mouse enter
    const handleMouseEnter = (page: any) => {
        setIsHovered(page);
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
        setIsHovered("");
    };

    // Function to handle click
    const handleClick = (page: any) => {
        localStorage.setItem('page',page);
        setIsHovered(page);
        router.push(`/${page}`);
        
    };
    const [darkMode, setdarkMode] = useState<string | null>(null);

    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])
 
    useEffect(() => {
        const page=localStorage.getItem('page');
        setIsHovered(page);
    }, [isHovered])


    return (
        <div className={`${isSideMenuOpen?style.expandMenu :style.shortMenu} ${style.sideMenu} ${darkMode=="true"?"bg-[#000]":"bg-[#fff]"}`}>
            <div className={style.images}>
                {isHovered === "dashBoard" ? (
                    <>
                    <span className={style.indication}></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`}   >
                    <Image
                        src={menuBar.dashboardPurple}
                        alt="dashboardPurple"
                        className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('dashBoard')}
                    />
                    {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt} `}>Dash Board</span>}
                    </div>
                    </>

                ) : (
                    <>
                    <span></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                    <Image
                        src={menuBar.dashboardGrey}
                        alt="dashboardGrey"
                        className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //  onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('dashBoard')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Dash Board</span>}
                    </div>
                    </>
                   
                )}

            </div>
            <div  className={style.images}>
                {isHovered === "courses" ? (
                    <>
                    <span className={style.indication}></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                     <Image
                        src={menuBar.coursePurple}
                        alt="coursePurple"
                        className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //   onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('courses')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt}`}>Courses</span>}
                     </div>
                    </>
                   


                ) : (
                    <>
                    <span></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                    <Image
                        src={menuBar.coursesGrey}
                        alt="coursesGrey"
                        className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('courses')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Courses</span>}
                     </div>
                    </>
                   
                )}
            </div>

            <div  className={style.images}>
                {isHovered === "marksheet" ? (
                      <>
                      <span className={style.indication}></span>
                      <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                      <Image
                        src={menuBar.marksheetEntry}
                        alt="marksheetEntry"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //   onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('marksheet')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt}`}>Marksheet Entry</span>}
                     </div>
                      </>
                  


                ) : (
                    <>
                    <span></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                    <Image
                        src={menuBar.marksheetEtryGrey}
                        alt="marksheetEtryGrey"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('marksheet')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Marksheet Entry</span>}
                     </div>
                    </>
                    
                )}
            </div>


            <div  className={style.images}>
                {isHovered === "event" ? (
                    <>
                    <span className={style.indication}></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                    <Image
                        src={menuBar.eventPurple}
                        alt="eventPurple"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //   onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('event')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt}`}>Event</span>}
                     </div>
                    </>
                   


                ) : (
                    <>
                    <span></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`}>
                    <Image
                        src={menuBar.eventGrey}
                        alt="eventGrey"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('event')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Event</span>}
                     </div>
                    </>
                   
                )}
            </div>

            <div className={style.images}>
                {isHovered === "student" ? (
                    <>
                    <span className={style.indication}></span>
                    <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`}  >
                    <Image
                        src={menuBar.student}
                        alt="student"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //   onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('student')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt}`}>Student</span>}
                     </div>
                    </>
                   


                ) : (
                   <>
                   <span></span>
                   <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                   <Image
                        src={menuBar.studentGrey}
                        alt="studentGrey"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('student')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Student</span>}
                     </div>
                    </>
                )}
            </div>

            <div className={style.images}>
                {isHovered === "faculty" ? (
                   <>
                   <span className={style.indication}></span>
                   <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                   <Image
                        src={menuBar.facultyPurple}
                        alt="facultyPurple"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        //   onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('faculty')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 ${style.menuTxt}`}>Faculty</span>}
                     </div>
                   </>


                ) : (
                   <>
                   <span></span>
                   <div className={`${isSideMenuOpen?style.textWidth:style.noTextWidth} flex items-center cursor-pointer`} >
                   <Image
                        src={menuBar.facultyGrey}
                        alt="facultyGrey"
                         className={`${isSideMenuOpen?style.expandImage :style.image}`}
                        // onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('faculty')}
                    />
                     {isSideMenuOpen&& <span className={`mr-4 text-[.9rem] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`}>Faculty</span>}
                     </div>
                   </>
                )}
            </div>


        </div>
    )
}