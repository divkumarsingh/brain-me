import { ShareIcon } from "../../icons/ShareIcon"
import { TweeterPost } from "./TweeterPost"
import { YoutubePost } from "./YoutubePost";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}


export const Card = ({title, link, type}: CardProps) => {

    return<>
    <div className=
    " p-4 bg-white rounded-md  outline-slate-200 border-gray-200 border max-w-72 shadow-sm">
        <div className="flex justify-between">
            <div className="flex justify-center items-center text-md">
                <div className="text-gray-600 pr-2 ">
                    <ShareIcon/>
                </div>
                {title}
            </div>
            <div className="flex items-center ">
                <div className="pr-4 text-gray-600">
                    <a href={link} target="_blank"></a>
                    <ShareIcon/>
                </div>
                <div className="text-gray-600">
                    <ShareIcon/>
                </div>
            </div>
        </div>
        <div className="pt-4">
            {type === "youtube" &&  <YoutubePost url={link}/>}

            {type === "twitter" && <TweeterPost url={link}/>}
           
        </div>

        
    </div>
    
    
    </>
}