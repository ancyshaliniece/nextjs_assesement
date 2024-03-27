'use client';
import Image from 'next/image';
import style from './select.module.css';
import { commonImg } from '@/images';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



interface selectProps {
    options: any,
    width: number,
    setValue?: ((value: any) => void);
    name?: any
}

export default function Select({ options, width, setValue, name }: selectProps) {
    const [selectedValue, setSelectedValue] = useState('');
    const [showOption, setShowOption] = useState(false);
    const mode = useSelector((store: any) => store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    // useEffect(() => {
    //     // debugger
    //     const modes=mode[0].mode;
    //     setdarkMode(modes);
    // }, [mode])
    useEffect(() => {
        const mode = localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    const handleSelect = (select: any) => {
        setSelectedValue(select);
        setShowOption(false);
        // if (typeof setValue === 'function') {
        //     setValue(select);
        // }
        if (setValue) {
            setValue(select);
        }

    }

    return (
        <div className="relative z-[100]">
            <p className={`${style.selectedTxt} flex justify-between gap-4 ${darkMode === "true" ? "text-[#e8e8e8]" : "text-[#000]"}`} style={{ width: `${width}px` }} onClick={() => setShowOption(!showOption)}>
                {selectedValue !== '' ? selectedValue : options[0]?.value}
                <span><Image src={commonImg.textFieldDropDown} alt='textFieldDropDown'
                    className={showOption ? style.downArrow : style.upArrow} /></span>
            </p>
            {showOption && options?.length > 0 &&
                <div className={`${style.options}  ${darkMode === "true" ? "bg-[#000] text-[#e8e8e8]" : "bg-[#fff] text-[#000]"}`}>
                    {options.map((item: any, i: any) => (
                        <p key={i} className={style.optionTxt} onClick={() => handleSelect(item.value)}>
                            {item.value}
                        </p>))}
                </div>}
        </div>
    )
}

interface LineValue {
    options: any,
    setLineValue?: ((value: any) => void),
    width?: any;
    name: any;
    value?: any;
    selectInfo?: any;
    ids?: any;
}

export function LineSelect({ options, setLineValue, width, name, value, selectInfo, ids }: LineValue) {
    // console.log("name",ids);

    const [selectValue, setSelectValue] = useState();
    const nameValue = name;
    const mode = useSelector((store: any) => store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    useEffect(() => {
        // debugger
        const modes = mode[0].mode;
        setdarkMode(modes);
    }, [mode])

    const handleSelect = (data: any) => {
        const event = data.target.value;
        setSelectValue(event);

        if (setLineValue) {
            if (ids) {
                setLineValue(data);
            } else {
                setLineValue({ [nameValue]: event });
            }
        }
    }
    // console.log("selectValue",selectValue);

    return (
        <div className='select_box'>
            <select value={value} name={name} id={ids} onChange={handleSelect} className={`${darkMode == "true" ? "text-[#fff]" : "text-[#000]"} w-[100%]`}
            >
                <option value="0" className="selectCommon">Select {selectInfo}</option>
                {options?.map((item: any, index: any) => (
                    <option value={item.value} key={index}>{item.value}</option>
                ))}

            </select>
        </div>
    )
}