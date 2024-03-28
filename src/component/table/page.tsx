import Image from "next/image";
import style from "./table.module.css";
import {
  commonImg,
  courseCloseIcon,
  markSheetEntry,
} from "@/images";
import { useEffect, useState } from "react";
import more from "../../../public/Assets/Course close icon/more icon.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "@/redux/slices/coursesListSlice";
import { Button, RedButton } from "../button/page";
import { useRouter } from "next/navigation";
import {
  deleteStudentMark,
  updateStudentMark,
} from "@/redux/slices/studentMarkListSlice";
import { deleteStudent } from "@/redux/slices/studentListSlice";
import { deleteFaculty } from "@/redux/slices/facultySlice";

interface tableInfo {
  data?: Record<string, any>[];
  check?: boolean;
  showDescription?: boolean;
  moreIcon?: boolean;
  goToSingleMark?: boolean;
  courseId?: any;
  imgFolder?:any;
  headPading?:any;
  studentDelete?:boolean;
  DeleteInfo?:any;
  facultyDelete?:any;
  selectedTab?:any;
  edit?:any;
}

const Table = ({
  data,
  check,
  showDescription,
  moreIcon,
  goToSingleMark,
}: tableInfo) => {
  const tableHead = data?.length ? Object.keys(data[0]) : [];

  const [openDescriptionRowIndex, setOpenDescriptionRowIndex] = useState<
    number | null
  >(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [clickMore, setClickMore] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPopup, setShowPopup] = useState<{
    open: boolean;
    rowData: Record<string, any> | null;
  }>({ open: false, rowData: null });
  const dispatch = useDispatch();
  const router = useRouter();

  const mode= useSelector((store:any)=>store.modeStore);
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

  const handleDescription = (rowIndex: number) => {
    setOpenDescriptionRowIndex(
      openDescriptionRowIndex === rowIndex ? null : rowIndex
    );
  };

  const formatLabel = (text: any) => {
    // Split the text based on capital letters
    const words = text.split(/(?=[A-Z])/);
    // Join the words with spaces and capitalize the first letter of each word
    const formattedText = words
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formattedText;
  };

  const handleSelectAll = (event: any) => {
    const isChecked = event.target.checked;
    setCheckAll(isChecked);
    if (isChecked) {
      const allIds = data?.map((item: any) => item["#40"]) || [];
      setCheckArr(allIds);
    } else {
      setCheckArr([]);
    }
  };

  const formattedArray = tableHead.map((item) => {
    // Format each item in the array
    if (item.includes("Fee")) {
      // If the item includes "Fee", replace it with " Fee" to add a space before "Fee"
      return item?.replace("Fee", " Fee");
    } else if (
      item.includes("Enrolled") ||
      item.includes("Allotted") ||
      item.includes("Seats") ||
      item.includes("Total")
    ) {
      // If the item includes any of these words, format it using formatLabel function
      return formatLabel(item);
    } else {
      // Otherwise, return the item unchanged
      return item;
    }
  });
  // //console.log("formattedArray", formattedArray);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    if (sortBy) {
      return data?.slice().sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  };

  const handleDelete = (deletedId: any, rowData: Record<string, any>) => {
    setShowPopup({ open: true, rowData });
  };

  const confirmDelete = (deletedId: any) => {
    dispatch(deleteCourse(deletedId));
    setShowPopup({ open: false, rowData: null });
  };

  const [checkArr, setCheckArr] = useState<any[]>([]);
  const handleCheckBox = (data: any, event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckArr((prev) => [...prev, data]);
    } else if (!checked) {
      const test = checkArr.filter((item) => item !== data);
      setCheckArr(test);
    }
  };
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDeleteAllPopup = () => {
    dispatch(deleteCourse(checkArr));
    setCheckArr([]);
    setShowDeletePopup(!showDeletePopup);
    router.push("/courses");
  };

  const handleMarkSheet = (course: any) => {
    // //console.log("course", course);
    const test = course?.split(" ")?.join("");
    router.push(`/marksheet/${test}`);
  };

  useEffect(() => {
    if (tableHead.includes("img")) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [data, tableHead]);

  // //console.log(showImage);

  return (
    <div className={`${style.table} w-[100%] ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
      <div
        className={`${style.tableInfo} w-[100%] mt-4 h-[68vh] overflow-y-auto`}
      >
        {tableHead?.length > 0 ? (
          <table className="w-[100%]">
            <thead className={style.thead}>
              {tableHead.length > 0 && (
                <tr>
                  {check && (
                    <th className={style.th}>
                      <label
                        className="lableContainer cursor-pointer mx-4 "
                        htmlFor="selectAll"
                      >
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          className="mt-[-1rem]"
                          checked={checkAll}
                          onChange={handleSelectAll}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </th>
                  )}

                  {formattedArray?.map((th, i) => (
                    <th
                      key={i}
                      className={`text-left text-[.9rem] font-[600] ${
                        showImage ? "p-4" : "py-1 px-3"
                      } ${
                        th === "#40" ||
                        th === "Students Enrolled" ||
                        th === "Faculty Allotted" ||
                        th === "Total Seats" ||
                        th === "Duration" ||
                        th === "Total Student" ||
                        th === "Total Assesment" ||
                        th === "Overall Percentage"
                          ? "text-center"
                          : th === "Reg Fee"
                          ? style.regFee
                          : ""
                      }`}
                    >
                      <span
                        className={`flex items ${
                          th === "Total Fee"
                            ? "w-[5.5rem]"
                            : th === "Grand Total"
                            ? "w-[7rem]"
                            : ""
                        }`}
                      >
                        {!th.includes("_") && th !== "img" && th}
                        {!th.includes("_") && th !== "img" && (
                          <Image
                            src={commonImg.sort}
                            alt="sort"
                            className="w-[20px] h-[20px] "
                            onClick={() => handleSort(th)}
                          />
                        )}
                      </span>
                    </th>
                  ))}
                  {moreIcon && (
                    <th>
                      {checkArr.length > 1 && (
                        <Image
                          src={commonImg.deleteIcon}
                          alt="deleteIcon"
                          width={15}
                          className="absolute right-6 mt-[-.6rem]"
                          onClick={() => setShowDeletePopup(!showDeletePopup)}
                        />
                      )}
                    </th>
                  )}
                </tr>
              )}
            </thead>

            <tbody className="tableTbody">
              {sortedData()?.map((row: any, rowIndex: number) => (
                <>
                  <tr key={rowIndex} className={style.tr}>
                    {check && (
                      <td>
                        <label
                          className="lableContainer cursor-pointer ml-[1rem]"
                          htmlFor={row["#40"]}
                        >
                          <input
                            type="checkbox"
                            name={row["#40"]}
                            id={row["#40"]}
                            key={row["#40"]}
                            onChange={(e) => handleCheckBox(row["#40"], e)}
                            checked={checkAll || checkArr.includes(row["#40"])}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    )}
                    {tableHead?.map(
                      (columnName: string, columnIndex: number) => (
                        <td
                          key={columnIndex}
                          className={`${
                            columnName === "Name" ? "w-[345px]" : ""
                          } py-3 px-2 text-[.85rem] ${
                            columnName === "Total Student" ||
                            columnName === "Total Assesment" ||
                            columnName === "Overall Percentage" ||
                            columnName === "#40" ||
                            columnName === "StudentsEnrolled" ||
                            columnName === "FacultyAllotted" ||
                            columnName === "TotalSeats" ||
                            columnName === "Duration"
                              ? "text-center"
                              : ""
                          }`}
                          onClick={
                            showDescription
                              ? () => handleDescription(rowIndex)
                              : goToSingleMark
                              ? () => handleMarkSheet(row["Course Name"])
                              : undefined
                          }
                        >
                          {row["courseName_No"] ? (
                            columnName === "Name" ? (
                              <div>
                                <div className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                                  <b className="text-[.75rem] mr-2">
                                    {row["courseName_No"]}
                                  </b>
                                  -
                                  <span className="text-[.8rem] mr-2">
                                    {row["Name"]}
                                  </span>
                                  <span className="bg-[#faa21f] text-[#fff] py-[2px] px-[4px] rounded-[4px] text-[.8rem] mr-2">
                                    {row["shortCourse_No"]}
                                  </span>
                                </div>
                                <div>
                                  <div
                                    className="text-[.75rem] elipse text-[#676767]"
                                    style={{ width: "330px" }}
                                  >
                                    {row["info_No"]}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              !columnName.includes("_") && (
                                <span
                                  className={`${
                                    columnName === "Grand Total"
                                      ? "text-[#000000] font-[600]"
                                      : "text-[#676767]"
                                  }`}
                                >
                                  {row[columnName]}
                                </span>
                              )
                            )
                          ) : (
                            <span className={`text-[#676767]`}>
                              {columnName === "Course Name" ? (
                                <div className="flex gap-2 items-center">
                                  <Image
                                    src={`/Assets/Marksheet Entry/${row["img"]}`}
                                    alt={`${row["img"]}`}
                                    width={30}
                                    height={30}
                                  />
                                  {row[columnName]}
                                </div>
                              ) : (
                                columnName !== "img" && row[columnName]
                              )}
                            </span>
                          )}
                        </td>
                      )
                    )}
                    {moreIcon && (
                      <>
                        <td
                          className={`${style.moreIcon}  mt-5 relative w-[15px]`}
                        >
                          <Image
                            src={more}
                            alt="more"
                            className="w-[4px]"
                            onClick={() => setClickMore(!clickMore)}
                          />
                          {clickMore && (
                            <div className="absolute p-2 rounded-[5px] text-[.85rem] shadow-md bg-white top-8 right-6 w-[100px]">
                              <Link href={`/courses/${row["#40"]}`}>
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={commonImg.editIcon}
                                    alt="editIcon"
                                    width={15}
                                  />
                                  <span>Edit</span>
                                </div>
                              </Link>
                              <div
                                className="flex items-center gap-3 mt-2"
                                onClick={() => handleDelete(row["#40"], row)}
                              >
                                <Image
                                  src={commonImg.deleteIcon}
                                  alt="deleteIcon"
                                  width={15}
                                />
                                <span>Delete</span>
                              </div>
                            </div>
                          )}
                        </td>
                        {showPopup.open && (
                          <div className="popup">
                            <div className="popupInfo relative text-center">
                              <Image
                                src={courseCloseIcon.closeIcon}
                                alt="closeIcon"
                                width={20}
                                className="absolute top-6 right-8"
                                onClick={() =>
                                  setShowPopup({ open: false, rowData: null })
                                }
                              />
                              <div className="popupInfo">
                                <p className="w-[350px] text-[1.2rem] font-[500] mb-4">
                                  Are you sure want to delete these line item
                                  course list?
                                </p>
                                <p className="yellow font-[500] text-[1.1rem]">
                                  Line No&lsquo;s {checkArr}
                                </p>
                              </div>
                              <div className="popupAction flex gap-4 justify-center">
                                <RedButton
                                  buttonType="button"
                                  text="Cancel"
                                  width={130}
                                  handleBtn={() =>
                                    setShowPopup({ open: false, rowData: null })
                                  }
                                />
                                <RedButton
                                  buttonType="button"
                                  text="Delete"
                                  width={130}
                                  active={true}
                                  handleBtn={() =>
                                    confirmDelete(
                                      showPopup.rowData
                                        ? showPopup.rowData["#40"]
                                        : ""
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {showDeletePopup && (
                          <div className="popup">
                            <div className="popupInfo relative text-center">
                              <Image
                                src={courseCloseIcon.closeIcon}
                                alt="closeIcon"
                                width={20}
                                className="absolute top-6 right-8"
                                onClick={() =>
                                  setShowDeletePopup(!showDeletePopup)
                                }
                              />
                              <div className="popupInfo">
                                <p className="w-[350px] text-[1.2rem] font-[500] mb-4">
                                  Are you sure want to delete these line item
                                  course list?
                                </p>
                                <p className="yellow font-[500] text-[1.1rem]">
                                  Line No&lsquo;s
                                  {checkArr?.length > 1 && checkArr.join(",")}
                                </p>
                              </div>
                              <div className="popupAction flex gap-4 justify-center">
                                <RedButton
                                  buttonType="button"
                                  text="Cancel"
                                  width={130}
                                  handleBtn={() =>
                                    setShowDeletePopup(!showDeletePopup)
                                  }
                                />
                                <RedButton
                                  buttonType="button"
                                  text="Delete"
                                  width={130}
                                  active={true}
                                  handleBtn={() => handleDeleteAllPopup()}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </tr>
                  {openDescriptionRowIndex === rowIndex && (
                    <tr className="boxSharow">
                      <td
                        colSpan={tableHead.length}
                        className="py-3 px-2 text-[.85rem]"
                      >
                        <div className="text-[.85rem] text-[#676767] flex gap-4">
                          <div className="w-[200px]">
                            <Image
                              src={courseCloseIcon.courseLineDescription}
                              alt="courseLineDescription"
                            />
                          </div>
                          <div>
                            <p className="font-[500] text-[.75rem] text-[#000] mb-2">
                              Courses Description
                            </p>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Doloribus tempore quaerat minima
                              maiores, sed magni doloremque eos, earum quas, nam
                              illo asperiores debitis dolor beatae possimus?
                              Necessitatibus neque molestiae non error at,
                              sapiente molestias assumenda eaque illo?
                              Accusantium perferendis fuga repellendus enim
                              placeat quia et, nostrum sed veritatis deleniti
                              cumque .
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-[#c030f0] mt-[12rem] font-[600] text-[1.2rem]">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};
export default Table;

const TableWithEdit = ({ data, check, moreIcon, courseId,imgFolder,headPading,studentDelete,DeleteInfo,facultyDelete,selectedTab,edit }: tableInfo) => {
  const tableHead = data?.length ? Object.keys(data[0]) : [];
  const [moreIcons, setMoreIcons] = useState(moreIcon);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [checkAll, setCheckAll] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [clickMore, setClickMore] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [editedData, seteditedData] = useState<any | null>({});
  const [showPopup, setShowPopup] = useState<{
    open: boolean;
    rowData: Record<string, any> | null;
  }>({ open: false, rowData: null });
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

  const dispatch = useDispatch();
  const router = useRouter();

  const formatLabel = (text: any) => {
    // Split the text based on capital letters
    const words = text.split(/(?=[A-Z])/);
    // Join the words with spaces and capitalize the first letter of each word
    const formattedText = words
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formattedText;
  };

  const handleSelectAll = (event: any) => {
    const isChecked = event.target.checked;
    setCheckAll(isChecked);
    if (isChecked) {
      if (data) {
        const allIds =
          Array.from({ length: data.length ?? 0 }, (_, index) =>
            index.toString()
          ) || [];
        setCheckArr(allIds);
      }
    } else {
      setCheckArr([]);
    }
  };

  const formattedArray = tableHead.map((item) => {
    // Format each item in the array
    if (item.includes("Fee")) {
      // If the item includes "Fee", replace it with " Fee" to add a space before "Fee"
      return item?.replace("Fee", " Fee");
    } else if (
      item.includes("Enrolled") ||
      item.includes("Allotted") ||
      item.includes("Seats") ||
      item.includes("Total")
    ) {
      // If the item includes any of these words, format it using formatLabel function
      return formatLabel(item);
    } else {
      // Otherwise, return the item unchanged
      return item;
    }
  });
  // //console.log("formattedArray", formattedArray);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    if (sortBy) {
      return data?.slice().sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  };

  const [checkArr, setCheckArr] = useState<any[]>([]);
  const handleCheckBox = (data: any, event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckArr((prev) => [...prev, data]);
    } else if (!checked) {
      const test = checkArr.filter((item) => item !== data);
      setCheckArr(test);
    }
  };
  const [dispatchDeleteValue, setDispatchDeleteValue] = useState<
    string | [] | any
  >({ name: [], index: "" });
  const handleDelete = (deletedId: any, rowData: Record<string, any>) => {
    setDispatchDeleteValue({ name: rowData, index: deletedId });
    setShowPopup({ open: true, rowData });
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const confirmDelete = (rowData: Record<string, any>, index: any) => {
    dispatch(deleteStudentMark({ index, courseId }));
    setShowPopup({ open: false, rowData });
    setClickMore(false);
  };

  const studentDeleteInfo=(course:any)=>{
    dispatch(deleteStudent(course));
    setShowPopup({ open: false, rowData:course });
    setClickMore(false);
  }



  const handleDeleteAllPopup = () => {
    dispatch(deleteStudentMark({ index: checkArr, courseId }));
    setCheckArr([]);
    setShowDeletePopup(!showDeletePopup);
    setClickMore(false);
    // router.push('/marksheet');
  };
  const facultyDeleteAllPopup =()=>{
    const arr:any []=[];
    data?.map((item:any,index:any)=>{
      const t=checkArr.filter(i=>parseInt(i)===index);
      if(parseInt(t[0])===index){
        arr.push(item);
       }
       //console.log("arr",arr);
    })
    dispatch(deleteFaculty({selectedTab,deleteData:arr}));
    setCheckArr([]);
    setShowDeletePopup(!showDeletePopup);
    setClickMore(false);
  }
  const studentAllDeleteInfo=()=>{
    const arr: any[]=[];
    data?.map((item:any,index:any)=>{  
     const t=checkArr.filter(i=>parseInt(i)===index);
     if(parseInt(t[0])===index){
      // setSDeleteAll((pre:any)=>({...pre,item}))
      arr.push(item);
     }
   

  })
  
  
    dispatch(deleteStudent(arr));
    setCheckArr([]);
    setShowDeletePopup(!showDeletePopup);
    setClickMore(false);
  }
  // //console.log("sDeleteAll",sDeleteAll);
  

  const handleEdit = (rowIndex: any, row: any) => {
    setMoreIcons(false);
    setClickMore(false);
    setEditableRow(rowIndex);
    seteditedData({ ...row });
  };

  const handleChange = (e: any, columnName: any) => {
    const { value } = e.target;

    const calculate={...editedData};

    if(columnName==="Assesement 1"){
      calculate["Assesement 1"]=value;
    }else if(columnName==="Assesement 2"){
      calculate["Assesement 2"]=value;
    }else if(columnName==="Assesement 3"){
      calculate["Assesement 3"]=value;
    }
    seteditedData((pre: any) => ({
      ...pre,
      [columnName]: value,
    }));
    debugger

    const assessment1 = calculate["Assesement 1"]===""?0:parseInt(calculate["Assesement 1"]);
    const assessment2 = calculate["Assesement 2"]===""?0:parseInt(calculate["Assesement 2"]);
    const assessment3 = calculate["Assesement 3"]===""?0:parseInt(calculate["Assesement 3"]);

    const percentage = Math.round(
      ((assessment1 + assessment2 + assessment3) / 150) * 100
    );
    console.log(assessment1 + assessment2 + assessment3);
    
    console.log((assessment1 + assessment2 + assessment3) / 150);
    
    console.log(((assessment1 + assessment2 + assessment3) / 150) * 100);
    

    let grade = "D";
    if (percentage >= 10 && percentage <= 30) {
      grade = "E";
    } else if (percentage >= 41 && percentage <= 60) {
      grade = "D";
    } else if (percentage >= 61 && percentage <= 70) {
      grade = "C";
    } else if (percentage >= 71 && percentage <= 80) {
      grade = "B";
    } else if (percentage >= 81 && percentage <= 90) {
      grade = "A";
    } else if (percentage >= 91 && percentage <= 100) {
      grade = "O";
    }
    seteditedData((pre: any) => ({
      ...pre,
      Percentage: percentage,
      Grade: grade,
    }));
  };

  const handleEditDispatch = (rowIndex: any) => {
   
    //console.log("thththt", editedData);

    dispatch(
      updateStudentMark({ id: rowIndex, updatedStudent: editedData, courseId })
    );
    setEditableRow(null);
    setMoreIcons(true);
    setImage(null);
  };
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: any) => {
    const value = event.target.files[0];
   
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      seteditedData((pre: any) => ({
        ...pre,
        img: value.name,
      }));
    };

    if (value) {
      reader.readAsDataURL(value);
    }
    //console.log("value", reader);
  };

  const facultyDeleteInfo =(data:any)=>{
   dispatch(deleteFaculty({selectedTab,deleteData:data}));
   setShowPopup({ open: false, rowData:data });
   setClickMore(false);
    
  }

  useEffect(() => {
    if (tableHead?.includes("img")) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [data, tableHead]);
  
  //console.log("DeleteInfo",DeleteInfo);
  

  return (
    <div className={`${style.table} w-[100%] ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
      <div
        className={`${style.tableInfo} w-[100%] mt-4 h-[68vh] overflow-y-auto`}
      >
        {tableHead?.length > 0 ? (
          <table className="w-[100%]">
            <thead className={style.thead}>
              {tableHead.length > 0 && (
                <tr>
                  {check && (
                    <th className={`${style.th} w-[1rem]`}>
                      <label
                        className="lableContainer cursor-pointer mx-4 "
                        htmlFor="selectAll"
                      >
                        <input
                          type="checkbox"
                          name="selectAll"
                          id="selectAll"
                          className="mt-[-1rem]"
                          checked={checkAll}
                          onChange={handleSelectAll}
                        />

                        <span className="checkmark"></span>
                      </label>
                    </th>
                  )}

                  {formattedArray?.map(
                    (th, i) =>
                      th !== "img" && (
                        <th
                          key={i}
                          className={`text-center xl:text-[.7rem] text-[.9rem] font-[600] relative ${headPading ? 'p-[12px]' : 'p-1'}`}
                        >
                          <span
                            className={`${
                              th === "Name"
                                ? "flex justify-start items-center gap-2"
                                : "flex justify-center items-center gap-2"
                            }`}
                          >
                            {th !== "img" && th}
                            {th === "Grade" ? (
                              <div className="gradeInfo">
                                <Image
                                  src={markSheetEntry.gradeInfo}
                                  alt="gradeInfo"
                                />
                                <div className="gradeDiv flex gap-3 flex-wrap w-[300px] p-3 bg-white rounded-md absolute right-4 mt-3 shadow-lg text-[.8rem] font-[500] text-[#4e4e4e]">
                                  <div className="field">
                                    <p>E (10 to 30),</p>
                                  </div>
                                  <div className="field">
                                    <p>D (41 to 60),</p>
                                  </div>
                                  <div className="field">
                                    <p>C (61 to 70),</p>
                                  </div>
                                  <div className="field">
                                    <p>B (71 to 80),</p>
                                  </div>
                                  <div className="field">
                                    <p>A (81 to 90),</p>
                                  </div>
                                  <div className="field">
                                    <p>O (91 to 100)</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {th !== "img" && (
                              <Image
                                src={commonImg.sort}
                                alt="sort"
                                className="w-[20px] h-[20px] "
                                onClick={() => handleSort(th)}
                              />
                            )}
                          </span>
                          {th === "Assesement 1" ||
                          th === "Assesement 2" ||
                          th === "Assesement 3" ||
                          th === "Percentage" ? (
                            <span className="text-[.7rem] text-[#969696] font-[500]">
                              {th !== "Percentage"
                                ? "(Out of 50)"
                                : "(Sum/150*100)"}
                            </span>
                          ) : (
                            ""
                          )}
                        </th>
                      )
                  )}
                  {moreIcon && (
                    <th>
                      {checkArr.length > 1 && (
                        <Image
                          src={commonImg.deleteIcon}
                          alt="deleteIcon"
                          width={15}
                          className="absolute right-6 mt-[-.6rem]"
                          onClick={() => setShowDeletePopup(!showDeletePopup)}
                        />
                      )}
                    </th>
                  )}
                </tr>
              )}
            </thead>

            <tbody className="tableTbody">
              {sortedData()?.map((row: any, rowIndex: number) => (
                <>
                  <tr key={rowIndex} className={style.tr}>
                    {check && (
                      <td>
                        <label
                          className="lableContainer cursor-pointer ml-[1rem]"
                          htmlFor={rowIndex.toString()}
                        >
                          <input
                            type="checkbox"
                            name={rowIndex.toString()}
                            id={rowIndex.toString()}
                            key={rowIndex.toString()}
                            onChange={(e) =>
                              handleCheckBox(rowIndex.toString(), e)
                            }
                            checked={
                              checkAll || checkArr.includes(rowIndex.toString())
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    )}
                    {tableHead?.map(
                      (columnName: string, columnIndex: number) =>
                        columnName !== "img" && (
                          <td
                            key={columnIndex}
                            className={`py-3 px-2 text-[.85rem] text-center ${
                              editableRow === rowIndex ? "pb-12" : ""
                            }`}
                          >
                            {editableRow === rowIndex ? (
                              columnName === "Percentage" ||
                              columnName === "Grade" ? (
                                <input
                                  type="text"
                                  value={`${editedData[columnName]}` || ""}
                                  onChange={(e) => handleChange(e, columnName)}
                                  disabled
                                  className={`${
                                    editableRow === rowIndex ? "editableRow" : ""
                                  }`}
                                />
                              ) : columnName === "Name" ? (
                                <div className="flex gap-2 items-center">
                                  <div className="relative w-[40px] h-[40px] mt-1">
                                    <input
                                      type="file"
                                      name="file"
                                      id="file"
                                      onChange={handleImageChange}
                                      className="hidden"
                                    />
                                    <label htmlFor="file">
                                      { image === null ? (
                                        <Image
                                          src={
                                            "/Assets/Marksheet Entry/New folder/Marksheet entry_AI_thumbnail.png"
                                          }
                                          alt={`${row["img"]}`}
                                          width={30}
                                          height={30}
                                        />
                                      ) : (
                                        <div className=" w-[170px] h-[150px]">
                                          <Image
                                            src={image}
                                            alt="Uploaded"
                                            width={30}
                                            height={30}
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                              borderRadius: "2px",
                                            }}
                                          />
                                        </div>
                                      )}
                                    </label>
                                  </div>

                                  <input
                                    type="text"
                                    value={editedData[columnName]}
                                    onChange={(e) =>
                                      handleChange(e, columnName)
                                    }
                                    className={`${
                                      editableRow === rowIndex ? "editableRow" : ""
                                    }`}
                                  />
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={editedData[columnName]}
                                  onChange={(e) => handleChange(e, columnName)}
                                  className={`${
                                    editableRow === rowIndex ? "editableRow" : ""
                                  }`}
                                />
                              )
                            ) : (
                              <span className={`text-[#676767]`}>
                                {columnName === "Name" ? (
                                  <div className="flex gap-2 items-center">
                                    <Image
                                      src={`/Assets/${imgFolder}${row["img"]}`}
                                      alt={`${row["img"]}`}
                                      width={30}
                                      height={30}
                                    />
                                    {row[columnName]}
                                  </div>
                                ) : (
                                  columnName !== "img" && row[columnName]
                                )}
                              </span>
                            )}
                          </td>
                        )
                    )}
                    {moreIcons && (
                      <>
                        <td
                          className={`${style.moreIcon}  mt-5 relative w-[15px]`}
                        >
                          <Image
                            src={more}
                            alt="more"
                            className="w-[4px]"
                            onClick={() => setClickMore(!clickMore)}
                          />
                          {clickMore && (
                            
                              <div className="absolute p-2 rounded-[5px] text-[.85rem] shadow-md bg-white top-8 right-6 w-[100px]">
                            {DeleteInfo==="StudentList" ?  
                              <Link href={`/student/editStudent/${row["Name"]}_${row["Course Name"]?.split(" ")?.join("")}`}> 
                              <div
                                className="flex items-center gap-3"
                              >
                                <Image
                                  src={commonImg.editIcon}
                                  alt="editIcon"
                                  width={15}
                                />
                                <span>Edit</span>
                              </div>
                              </Link>
                              :
                              edit && <div
                                className="flex items-center gap-3"
                                onClick={() => handleEdit(rowIndex, row)}
                              >
                                <Image
                                  src={commonImg.editIcon}
                                  alt="editIcon"
                                  width={15}
                                />
                                <span>Edit</span>
                              </div>}
                             
                            
                              <div
                                className="flex items-center gap-3 mt-2"
                                onClick={() => handleDelete(rowIndex, row)}
                              >
                                <Image
                                  src={commonImg.deleteIcon}
                                  alt="deleteIcon"
                                  width={15}
                                />
                                <span>Delete</span>
                              </div>
                            </div>
                          )}
                        </td>
                        {showPopup.open && (
                          <div className="popup">
                            <div className="popupInfo relative text-center">
                              <Image
                                src={courseCloseIcon.closeIcon}
                                alt="closeIcon"
                                width={20}
                                className="absolute top-6 right-8"
                                onClick={() =>
                                  setShowPopup({ open: false, rowData: null })
                                }
                              />
                              <div className="popupInfo">
                                <p className="w-[350px] text-[1.2rem] font-[500] mb-4">
                                  Are you sure want to delete these {DeleteInfo!==null || DeleteInfo!== undefined?DeleteInfo:"MarkList"} ?
                                </p>
                              </div>
                              <div className="popupAction flex gap-4 justify-center">
                                <RedButton
                                  buttonType="button"
                                  text="Cancel"
                                  width={130}
                                  handleBtn={() =>
                                    setShowPopup({ open: false, rowData: null })
                                  }
                                />
                                <RedButton
                                  buttonType="button"
                                  text="Delete"
                                  width={130}
                                  active={true}
                                  handleBtn={studentDelete ?() => studentDeleteInfo(dispatchDeleteValue.name):
                                    facultyDelete? () => facultyDeleteInfo(dispatchDeleteValue.name):
                                    () => confirmDelete(dispatchDeleteValue.name, dispatchDeleteValue.index) 
                                    
                                }
                                 
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {showDeletePopup && (
                          <div className="popup">
                            <div className="popupInfo relative text-center">
                              <Image
                                src={courseCloseIcon.closeIcon}
                                alt="closeIcon"
                                width={20}
                                className="absolute top-6 right-8"
                                onClick={() =>
                                  setShowDeletePopup(!showDeletePopup)
                                }
                              />
                              <div className="popupInfo">
                                <p className="w-[350px] text-[1.2rem] font-[500] mb-4">
                                  Are you sure want to delete thesess { DeleteInfo!==null || DeleteInfo=== undefined? "MarkList" :DeleteInfo} ?
                                </p>
                              </div>
                              <div className="popupAction flex gap-4 justify-center">
                                <RedButton
                                  buttonType="button"
                                  text="Cancel"
                                  width={130}
                                  handleBtn={() =>
                                    setShowDeletePopup(!showDeletePopup)
                                  }
                                />
                                <RedButton
                                  buttonType="button"
                                  text="Delete"
                                  width={130}
                                  active={true}
                                  handleBtn={studentDelete ? () => studentAllDeleteInfo()
                                    : facultyDelete? () => facultyDeleteAllPopup():() => handleDeleteAllPopup() 
                                    
                                }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {editableRow === rowIndex && (
                      <div className="absolute right-16 mt-14">
                        <Button
                          buttonType="button"
                          text="Update"
                          handleBtn={() => handleEditDispatch(rowIndex)}
                        />
                      </div>
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-[#c030f0] mt-[12rem] font-[600] text-[1.2rem]">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );

};
export { TableWithEdit };
