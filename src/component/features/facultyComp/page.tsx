"use client";
import { TableWithEdit } from "@/component/table/page";
import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function FacultyComp() {
    const faculty = useSelector((state: any) => state.facultyStore);
    const [tabHead, setTabHead] = useState([]);
    const [tableDataCount, setTableDataCount] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [getCourseData, setgetCourseData] = useState([]);
    const [selectedTab, setselectedTab] = useState("Artificial Intelligence");
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

    const handleSearch = (event: any) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm.trim() === "") {
            const tabNames = faculty.map((item: any) => item.name);
            const tabHeading = tabNames.filter((value: any, index: any, self: any) => self.indexOf(value) === index);
            const getCount = tabHeading.map((items: any) => {
                const test = faculty.filter((item: any) => item.name === items);
                return test.length;
            })
            setTableDataCount(getCount);
            setTabHead(tabHeading);
            const filteredData = faculty.filter((item: any) => item.name === "Artificial Intelligence");
            const allFilteredCourses = filteredData.map((item: any) => item.facultyDetails);
            const flatingArray = allFilteredCourses.flat();
            setFilteredCourses(flatingArray);
            setgetCourseData(flatingArray);
           
        } else {

            const filteredData = getCourseData.filter((item: any) => {
                if (item.facultyDetails) {
                    return Object.values(item.facultyDetails).some((value: any) =>
                        value.toString().toLowerCase().includes(searchTerm)
                    );
                } else {
                    return Object.values(item).some((value: any) =>
                        value.toString().toLowerCase().includes(searchTerm)
                    );
                }

            });
            const tabNames = faculty.map((item: any) =>  item.name);
            const tabHeading = tabNames.filter((value: any, index: any, self: any) => value!==undefined&&self.indexOf(value) === index);
            const t=faculty.filter((item:any)=>item.name!==selectedTab);
            for (let i = 0; i < filteredData.length; i++) {
                const element = filteredData[i];
                
                t.push({
                    name:selectedTab,
                    facultyDetails:[
                        element
                    ]
                });
            }
            
            const getCount = tabHeading.map((items: any) => {
                const filterFaculty=t.filter((item:any)=>{return item.facultyDetails.length>0});
                const test = filterFaculty.filter((item: any) => item.name === items);
                return test.length;
            })
            setTableDataCount(getCount);

            setFilteredCourses(filteredData);
            setgetCourseData(filteredData);
        }
    }

    const handleTabData = (data: any) => {
        setselectedTab(data);
        const filterData = faculty.filter((item: any) => item.name === data);
        const tabBodyData = filterData.map((item: any) => item.facultyDetails);
        const flatData = tabBodyData.flat();
        setFilteredCourses(flatData);
        setgetCourseData(flatData);
    }

    useEffect(() => {
        const tabNames = faculty.map((item: any) =>  item.name);
        const tabHeading = tabNames.filter((value: any, index: any, self: any) => value!==undefined&&self.indexOf(value) === index);
        const getCount = tabHeading.map((items: any) => {
            const filterFaculty=faculty.filter((item:any)=>{return item.facultyDetails.length>0});
            const test = filterFaculty.filter((item: any) => item.name === items);
            return test.length;
        })
        setTabHead(tabHeading);
        const filteredData = faculty.filter((item: any) => item.name === "Artificial Intelligence");
        const allFilteredCourses = filteredData.map((item: any) => item.facultyDetails);
        const flatingArray = allFilteredCourses.flat();
        setFilteredCourses(flatingArray);
        setgetCourseData(flatingArray);
        // handleTabData(selectedTab);
        setTableDataCount(getCount);
    }, [faculty])

    console.log("filteredCourses", filteredCourses);

    return (
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#fafafa]"} p-8  facultys `}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[2rem]">Faculty</h1>
                <div className="breadCrumbs">
                    <p className="text-[.85rem] text-[#676767]"><Link href="/"><span className="mx-[.2rem]">Home</span></Link> <span>/</span><span className="mx-[.2rem] text-[#c030f0]">Faculty</span></p>
                </div>
            </div>
            <div className={`tableContainer p-4 ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
                <div >
                    <Tabs>
                        <div className="scrollable-container" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <TabList style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            {tabHead?.map((item, index) => (
                                <Tab key={index} onClick={() => handleTabData(item)}>
                                    <span>
                                        <span className="tabSelect text-[.8rem] text-[#676767] font-[600] ">{item}</span>
                                        <span className="bg-[#afabab] pr-[6px] pl-[4px] py-[4px] rounded-[50%] text-[.7rem] text-[#fff] number">
                                            {tableDataCount[index]}
                                        </span>
                                    </span>
                                </Tab>
                            ))}
                        </TabList>
                        </div>
                        <div>
                            <div className={` flex justify-between w-[100%] mt-4`}>
                                <div className="search relative">
                                    <input
                                        type="text"
                                        className={`searchInput input p-[.2rem] pl-8 text-[.8rem] w-[250px] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}
                                        placeholder="Search"
                                        onChange={handleSearch}
                                    />
                                    <Image
                                        src={commonImg.search}
                                        alt="search"
                                        className="absolute top-[5px] left-[7px] w-[17px]"
                                    />
                                </div>
                                <div className={`addDelete flex gap-4 items-center mr-2 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>

                                    <div className="flex gap-1 items-center cursor-pointer">
                                        <Link href={'/faculty/addFaculty'} className="flex items-center gap-1">
                                            <Image src={commonImg.addIcon} alt="addIcon" className="w-[13px]" />
                                            <span className="text-[.85rem]">Add</span>
                                        </Link>
                                    </div>
                                    <span className="lightAsh">|</span>
                                    <div className="flex gap-1 items-center">
                                        <Image
                                            src={commonImg.deleteIcon}
                                            alt="deleteIcon"
                                            className="w-[13px]"
                                        />
                                        <span className="text-[.85rem]">Delete</span>
                                    </div>
                                </div>


                            </div>
                            {/* <TableWithEdit data={filteredCourses} check={true} moreIcon={false} imgFolder={"Faculty/"} headPading={true} />  */}
                        </div>
                        {tabHead?.map((item, index) => (
                            <TabPanel key={index}>
                                <TableWithEdit data={filteredCourses} check={true} moreIcon={true} selectedTab={selectedTab} facultyDelete={true} imgFolder={"Faculty/"} headPading={true} DeleteInfo={"faculty"} edit={false} />
                            </TabPanel>
                       ))}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

