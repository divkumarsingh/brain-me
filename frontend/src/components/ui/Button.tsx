import type { ReactElement } from "react";

//defining variant types
type Variants = "primary" | "secondary"

//interface of the genric button
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const defaultStyle = "rounded-md flex font-normal items-center"

const variantStyles = {
    "primary" :  "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
}

const sizeStlyes = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-8"
}


export const Button = ({variant, text, size ,startIcon, onClick, fullWidth, endIcon, loading}: ButtonProps) => {

    return <button 
    onClick={onClick} 
    className={`${variantStyles[variant]} 
        ${defaultStyle} 
        ${sizeStlyes[size]} 
        ${fullWidth ? " w-full flex justify-center align-center" : "" } 
        ${loading ? "opacity-80" : ""}  
        `} disabled={loading}>
        {startIcon ? <div className="pr-2">{startIcon}</div> : null}
        {text}
        {endIcon}
        </button>
}
