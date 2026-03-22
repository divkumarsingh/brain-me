import { Tweet } from "react-tweet";

function getTweetId(url: string){
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/");
    return parts[parts.length-1]; 
}

interface TwitterPostProps{
    url: string;
}


export const TweeterPost = ({url}: TwitterPostProps) => {
        const id = getTweetId(url);
    return(
        <>        
            <div className="flex justify-center p-5" data-theme="light">
            <Tweet id = {id}/>
            </div>
        </>

    )
}