import style from './button.module.css';

interface ButtonProps {
    buttonType: "submit" | "reset" | "button" | undefined;
    text: string;
    icon?: boolean;
    handleBtn?:((value:any)=>void);
    width?:any,
    active?:boolean,
}
export const Button= ({ buttonType, text, icon,handleBtn,width,active }:ButtonProps) =>{
    console.log("width",width);
    
    const clickBtn=()=>{
        if(handleBtn){
            handleBtn(true);
        }
    }

    return (
        <button type={buttonType} style={width!==undefined || width!==null?{width:`${width}px`}:undefined} className={`${style.btn} ${active?style.active: ''}  `} onClick={()=>clickBtn()}>
            {icon} {text}
        </button>
    );
}



export const RedButton =({ buttonType, text, icon,handleBtn,width,active }:ButtonProps)=> {
    const clickBtn=()=>{
        if(handleBtn){
            handleBtn(true);
        }
    }
    return(
        <button type={buttonType} style={width!==undefined || width!==null?{width:`${width}px`}:undefined} className={`${style.reBbtn} ${active?style.redActive: ''}  `} onClick={()=>clickBtn()}>
        {icon} {text}
    </button>
    )
}