import type { ReactElement } from "react";

interface SideBarComponentProps{
    text: string;
    icon: ReactElement
}


export const SideBarComponent = ({text, icon}: SideBarComponentProps) => {

    return<div className="flex gap-2 items-center align-middle text-lg pb-2 pl-4 pt-2 text-gray-700 
                            cursor-pointer hover:bg-gray-100 rounded transition duration-200
    ">
        {icon} {text}
    </div>
}