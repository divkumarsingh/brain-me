const getYoutubeEmbedUrl = (url: string) => {
  let videoId = "";

  if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  } 

  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

interface YoutubePostProps{
    url: string
}

export const YoutubePost = ({url} : YoutubePostProps) => {
    const embedUrl = getYoutubeEmbedUrl(url)

    return(
        <div className="w-full">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-white">
                <iframe 
                width="100%"
                height="100%"
                src={embedUrl}
                title="Youtube Video"
                frameBorder= "0"
                allow="accelerator; autoplay; clipboard-write encrypted-media; gyroscope; picture-in-picture web-share"
                allowFullScreen
                className="rounded-lg"
                >
                </iframe>
            </div>
        </div>
    )

}