import { useEffect, useState } from "react";
import MyPlayer from "./components/MyPlayer";
import NavBar from "./components/NavBar";
import { HistoryVideos } from "./components/HistoryVideos";
import { useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useVideoProps } from "./VideoContexts/VideoProvider";
import { useSearch } from "./VideoContexts/SearchContext";
import "animate.css";
function App() {
  const [seekTime, setSeekTime] = useState(0);
  const [isOnline,setIsOnline] =useState(navigator.onLine)
  const {
    playing,
    setSrc,
    currentTime,
    currentVideoTitle,
    setCurrentVideoTitle,
    src,
    videoRef,
  } = useVideoProps();
  const watchedRef = useRef(currentTime);
  const { videos, getYoutubeTitle, getYoutubeId,setVideo } = useSearch();

  //to check if the user is offline
  useEffect(() => {
     const onLineHandler = () => {
      setIsOnline(true)
     }
     const offlineHandler = () => {
      setIsOnline(false)
     }
    window.addEventListener('online',onLineHandler)
    window.addEventListener('offline',offlineHandler)
    return ()=>{
      removeEventListener('online',onLineHandler)
      removeEventListener('offline',offlineHandler)
    }
  }, []);

// to get the last played video and set it to the videos state
useEffect(() => {
    const store = localStorage.getItem("videos");
    if(store){
      console.log("store",store);
      setVideo(() => JSON.parse(store));
      // console.log("videos ar set now",videos); //empty as the setVideo is async
    }
  }, []);

  // to set the last played video
  useEffect(() => {
    const lastplayedvideo = localStorage.getItem("lastplayed");
    if (lastplayedvideo) {
      const details = JSON.parse(lastplayedvideo);
      setSrc(details[0].url);
      setCurrentVideoTitle(details[0].title);
      setSeekTime(()=>{return details[0].watchedTime})
      // console.log("url", details[0].watchedTime,videoRef.current);
    }else if(videos.length>0){
      console.log("videos",videos);
      
      setSrc(videos[0].url);
      setCurrentVideoTitle(videos[0].title);
      setSeekTime(()=>{
        log("New seeked time",videos[0].watchedTime)
        return videos[0].watchedTime
      })
    } else {
      let title;
      let url = "https://youtu.be/eM8Mjuq4MwQ?si=Gcwi9QFdR0b2ZYpt";
      const videoTitle = async () => {
        title = await getYoutubeTitle(url);
        setCurrentVideoTitle(title);
        setSrc(url);
        let watchedTime = 0;
        let id = getYoutubeId(url);
        localStorage.setItem(
          "lastplayed",
          JSON.stringify([{ title, url, watchedTime, id }])
        );
      };
      videoTitle();
    }
  }, []);

  //new useEffect
  // useEffect(() => {
  //   watchedRef.current = currentTime;
  // }, [currentTime]);

  //to save the last played video in the local storage
  useEffect(() => {
    let mySetInterval;
    if (playing&&src) {
      let savedVideos = videos;
      
      mySetInterval = setInterval(() => {
        localStorage.setItem(
          "lastplayed",
          JSON.stringify([
            {
              title: currentVideoTitle,
              url: src,
              watchedTime: videoRef.current.getCurrentTime(),
              id: getYoutubeId(src),
            },
          ])
        );
        let modifiedVideos = savedVideos?.map((video) => { 
          console.log("I am inside the map function")
          return (video.id === getYoutubeId(src))?{...video,watchedTime:videoRef.current.getCurrentTime()}:video
        })
        
        localStorage.setItem(
          "videos",
          JSON.stringify(
            modifiedVideos
          )
        )
        console.log("videos",modifiedVideos);
        setVideo(modifiedVideos)
      }, 2000);
    }
    return () => {
      if (mySetInterval) {
        clearInterval(mySetInterval);
      }
    };
  }, [playing, currentVideoTitle, src]);
  if(isOnline){
    return (
      <div className="bg-gray-950">
      <div className="">
        <NavBar />
      </div>
      <div className="lg:grid grid-cols-2">
        <div className="">
          <MyPlayer seekTime={seekTime} setSeekTime={setSeekTime} />
        </div>
        <div className="history w-auto">
          <div className="head text-center text-white p-3 bg-gray-900 m-2 rounded">
            <h1>Previously Watched Video</h1>
          </div>
          {videos.length>0?videos?.map((video, index) => {
            return (
              <HistoryVideos
                index={index}
                id={video?.id}
                key={video?.id}
                title={video?.title}
                url={video?.url}
                watchedTime = {video.watchedTime}
                setSeekTime={setSeekTime}
              />
            );
          }):''}
        </div>
      </div>
    </div>
    )
  }else{
    return (
     <div className="bg-gray-700 w-screen text-white h-screen text-center">
      <div className="text-center pt-40 align-self-center ">Please Check Your Internet Connection</div>
  
     </div>
    )
  }
}

export default App;