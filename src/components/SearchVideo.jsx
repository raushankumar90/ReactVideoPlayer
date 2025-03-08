import { useSearch } from "../VideoContexts/SearchContext";
import { useVideoProps } from "../VideoContexts/VideoProvider";
import { useEffect, useState } from "react";
function SearchVideo() {
    const {setSrc} = useVideoProps()
    const {isValidYouTubeUrl,getYoutubeId,getYoutubeTitle} = useSearch()
    const [error,setError] = useState("")
    const [input,setInput] = useState("")
    const handleSearch = (e) => {
            e.preventDefault()
            const url = input
            const validUrl =  isValidYouTubeUrl(url)
            if(validUrl){
                const videoId = getYoutubeId(url)
                const title = getYoutubeTitle(url)
                setSrc(url)
                setError("")
                setInput("")
            }else{
                setError("Please Check The Url")
            }
    }
    useEffect(()=>{
        console.log("Mai Kaal Hu")
    },[])
    return ( 
        <div className="searchbox grid grid-cols-4">
            <div className=" col-span-3">
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Enter Youtube Video URL" className="w-full p-3 border border-solid " />
                <span className="text-red-800">{error}</span>
            </div>
            <div className="col-span-1 w-full justify-self-center ">
                <button onClick={handleSearch} className="p-3 w-full bg-gray-700 text-white cursor-pointer">Play</button>
            </div>
        </div>
     );
}

export default SearchVideo;