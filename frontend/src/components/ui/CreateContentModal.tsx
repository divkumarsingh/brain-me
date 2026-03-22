import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { InputBox } from "./InputBox"

//this is controlled component statevarible
export const CreateContentModal = ({open, onClose}) => {

    return <div>
        {open && <div className="z-10 w-screen h-screen bg-black/55 backdrop-blur-sm fixed top-0 left-0 opacity-80 flex justify-center"> 
            <div className="flex flex-col justify-center items-center ">
                <span className=" bg-white bg-opacity-100 flex  justify-center p-4 rounded items-center gap-4">
                    <div className="flex gap-4">
                        <InputBox placeholder={"Title"}/>
                        <InputBox placeholder={"link"}/>
                    </div>
                    <div className="">
                        <Button variant="primary" text="Add Content" size="md"/>
                    </div>
                    <div className="flex justify-end mb-20">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    
                </span>
            </div>
            </div>}
    </div>
    

}


