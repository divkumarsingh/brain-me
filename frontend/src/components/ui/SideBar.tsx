import { BrainlyIcon } from "../../icons/BrainlyIcon"
import { TwitterIcons } from "../../icons/TwitterIcons"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SideBarComponent } from "../../SideBarComponent"

export const SideBar = () => {

    return<div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="flex items-center align-middle border p-4 ">
           <BrainlyIcon/>
            <div className="font-bold pl-4 text-3xl text-purple-600">
                Brain-me
            </div> 
            <p className="pt-4"></p>
        </div>

        <div>
            <SideBarComponent text="X.com" icon= {<TwitterIcons/>} />
            <SideBarComponent text="Youtube" icon= {<YoutubeIcon/>} />

        </div>
    </div>
}