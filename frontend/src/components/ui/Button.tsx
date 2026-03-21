import type { ReactElement } from "react";

//defining variant types
type Variants = "primary" | "secondary"

//interface of the genric button
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onclick: () => void;
}

const defaultStyle = "rounded-md flex"

const variantStyles = {
    "primary" :  "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
}

const sizeStlyes = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-8"
}


export const Button = (props: ButtonProps) => {

    return <button className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStlyes[props.size]}`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{props.text}{props.endIcon}</button>
}
