import { useSearch } from "../VideoContexts/SearchContext";
import { useVideoProps } from "../VideoContexts/VideoProvider";
import { useEffect, useState } from "react";
function SearchVideo({setSeekTime}) {
    const {setSrc,setCurrentVideoTitle} = useVideoProps()
    const {isValidYouTubeUrl,getYoutubeId,getYoutubeTitle,addToStorage,videos} = useSearch()
    const [error,setError] = useState("")
    const [input,setInput] = useState("")
    const handleSearch = async(e) => {
            e.preventDefault()
            const url = input
            const validUrl =  isValidYouTubeUrl(url)
            const checkvideolist = videos.some((video)=>video.id===getYoutubeId(url))
            if(validUrl && !checkvideolist){
                const videoId = getYoutubeId(url)
                const title = await getYoutubeTitle(url)
                setSrc(()=>url)
                setError("")
                setInput("")
                setCurrentVideoTitle(title)
                setSeekTime(0)
                addToStorage(url,title,videoId)
            }else{
                if(checkvideolist){
                    setError("Video already exists")
                    setInput("")
                }else{
                    setError("Invalid Youtube URL ")
                }
            }
    }
    return ( 
        <div className="searchbox grid grid-cols-4 mb-1">
            <div className=" col-span-3">
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Enter Youtube Video URL" className="w-full p-3 border border-solid border-white text-white " />
                <span className="text-red-800">{error}</span>
            </div>
            <div className="col-span-1 w-full justify-self-center ">
                <button onClick={handleSearch} className="p-3 w-full bg-gray-700 border border-solid border-white text-white cursor-pointer">
                <i className="bi bi-search"></i> <span>Search</span>
                </button>
            </div>
        </div>
     );
}

export default SearchVideo;