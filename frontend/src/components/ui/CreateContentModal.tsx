import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { InputBox } from "./InputBox"
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}


export const CreateContentModal = ({open, onClose}) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}` + "/api/v1/content", {
            title,
            link,
            type
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        onClose();
    }


    return <div className="relative">
        {open && 
            <div className="absolute">
                <div className="z-10 w-screen h-screen bg-black/55 backdrop-blur-sm fixed top-0 left-0 opacity-80 flex justify-center"> 
            </div>
            <div className=" z-[999] flex flex-col justify-center items-center absolute m-auto ">
                <span className="  bg-white bg-opacity-100  flex-row justify-center p-4 rounded items-center align gap-4">
                    <div className="flex justify-end mb-2">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>-
                    </div>
                    
                    <div className="flex gap-4">
                        <InputBox ref={titleRef} placeholder={"Title"}/>
                        <InputBox ref={linkRef}  placeholder={"link"}/>
                    </div>
                    <div className="flex gap-2 items-center justify-center pt-4 mb-4">
                        <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} size="md" onClick={ () => {
                            setType(ContentType.Youtube)
                        }}/>
                        <Button text="Twitter" variant={type === ContentType.Youtube ? "secondary" : "primary"} size="md" onClick={ () => {
                            setType(ContentType.Twitter)
                        }}/>
                    </div>
                    <div className="flex justify-center ">
                        <Button onClick={addContent} variant="primary" text="Add Content" size="md"/>
                    </div>
                    
                    
                </span>
            </div>
            </div>}
    </div>
    

}


