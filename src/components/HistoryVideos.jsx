import { useVideoProps } from "../VideoContexts/VideoProvider";
import { useSearch } from "../VideoContexts/SearchContext";
import { useEffect, useRef, useState } from "react";

export const PopUp = ({ display, id, handleModel, setShowModel }) => {
  const confirmDelete = () => {
    handleModel(id);
    setShowModel(false);
  };
  const cancelDelete = () => {
    setShowModel(false);
  };
  return (
    <div className={`${display ? "block" : "hidden"}`}>
      <div className="fixed top-1/4  left-1/3  bg-gray-900 rounded ">
        <h2 className="text-center pt-10 text-white text-2xl">WARNING</h2>
        <p className="text-center text-white p-10">
          Are you sure to delete the video from watchlist.
        </p>
        <div className="text-center pt-10 pb-5 text-white ">
          <button
            className="p-3 m-2 bg-red-700 rounded cursor-pointer"
            onClick={confirmDelete}
          >
            Confirm
          </button>
          <button
            className="p-3 m-2 bg-purple-900 rounded cursor-pointer"
            onClick={cancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export function HistoryVideos({ title, url, id, index,watchedTime,setSeekTime }) {
  const [showModel, setShowModel] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(false);
  const { videos, setVideo } = useSearch();
  const { playing, src, setSrc, setPlaying, setCurrentVideoTitle,videoRef} =
    useVideoProps();
  const timeOutRef = useRef(null);
  const handlePlay = async () => {
    if (src === url) {
      setPlaying((prev) => !prev);
      // setCurrentPlaying(true);
      // setCurrentVideoTitle(title);
    } else if (src !== url) {
      setCurrentVideoTitle(title);
      setCurrentPlaying(true);
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      setSrc(() => {
        return url;
      });
      setSeekTime(()=>{
        
        // console.log("Phle mai aagya history se")
        return watchedTime
      });
    }
  };
  const deleteHistoryItem = (id) => {
    let newVideos = videos.filter((video) => video.id !== id);
    localStorage.setItem("videos", JSON.stringify(newVideos));
    setVideo(()=>newVideos);
    const newVideo = newVideos.find((video) =>video.id !== id)
    if(src===url&&newVideo){
      setSrc(()=>newVideo.url);
      setCurrentVideoTitle(newVideo.title);
      setCurrentPlaying(true);
      setSeekTime(newVideo.watchedTime);
      localStorage.removeItem('lastplayed')
    }else{
      let url ="https://youtu.be/83RUhxsfLWs?si=0VE6gLQT0Vdu2Zab"
      setSrc(()=>url);
      setCurrentVideoTitle("Copyright Free Music");
      setSeekTime(0)
    }
  };
  useEffect(() => {
    if (src === url) {
      setCurrentPlaying(true);
    } else {
      setCurrentPlaying(false);
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      setCurrentPlaying(false);
    };
  }, [src]);
  return (
    <div className={`w-auto`}>
      <PopUp
        display={showModel}
        handleModel={deleteHistoryItem}
        setShowModel={setShowModel}
        id={id}
      ></PopUp>
      <div
        className={`grid grid-cols-8 gap-2  rounded mr-2 ml-2 mt-2 ${
          currentPlaying ? "bg-green-800" : "bg-gray-800"
        } `}
      >
        <div className="title col-span-6 m-3 text-white m-1 ">
          {index + 1}. {title.slice(0, 80)}
        </div>
        <div
          className={`play w-full col-span-1 bg-red-600 justify-self-center self-center rounded m-2 text-center`}
        >
          <button className="cursor-pointer p-2 " onClick={handlePlay}>
            <i
              className={`bi ${
                src === url && playing ? "bi-pause " : "bi-play-btn"
              }`}
              style={{ color: "white", fontSize: 25 }}
            ></i>
          </button>
        </div>
        <div className="hover:bg-red-500 play w-full col-span-1 bg-red-600 justify-self-center self-center text-center rounded mr-2 mb-2 mt-2">
          <button
            className="cursor-pointer p-2 "
            onClick={() => setShowModel(true)}
          >
            <i
              className="bi bi-x-circle"
              style={{ color: "white", fontSize: 25 }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
