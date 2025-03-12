import { useVideoProps } from "../VideoContexts/VideoProvider";
import { useCallback, useEffect, useRef, useState } from "react";
function Controls() {
  const forwardRef = useRef(null);
  const backwardRef = useRef(null);
  const {
    currentTime,
    currentVideoDuration,
    playing,
    setPlaying,
    volume,
    mute,
    setMute,
    setVolume,
    videoRef,
    setCurrentTime,
    playbackRate,
    setPlaybackRate,
    isFullScreen,
    setFullScreen,
    // setControls,
    containerRef,
    src
  } = useVideoProps(); 
  const checkFullScreen = useCallback(() => {
    setFullScreen(!!document.fullscreenElement);
  },[])
  const handleFullScreen = useCallback(() => {
    if(isFullScreen){
      document.exitFullscreen()
    }else{
      containerRef.current.requestFullscreen()
    }
  },[isFullScreen,containerRef])

  // const handlePip = () => {
  //   if(videoRef.current){
  //     console.log(videoRef.current.getInternalPlayer());
      
  //     // videoRef.current.getInternalPlayer().requestPictureInPicture()
  //     window.open(src,"_blank","width=500,height=350")
  //     setPlaying(false)
  //   }
  // }
  useEffect(()=>{
    document.addEventListener("fullscreenchange",checkFullScreen)
    return ()=>{ document.removeEventListener("fullscreenchange",checkFullScreen)}
  },[])

  // to pause the video when the tab is not in focus
  useEffect(() => {
    const pause = () => {
      if (document.hidden) {
        // console.log("Paused");
        setPlaying(() => false);
      }
    };
    document.addEventListener("visibilitychange", pause);

    return () => {
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);

  // to seek the video forward and backward
  useEffect(() => {
    const seekForward = () => {
      setCurrentTime((prev) => {
        let newtime = prev + 5;
        videoRef.current.seekTo(newtime, "seconds");
        return newtime;
      });
    };
    const seekBack = () => {
      setCurrentTime((prev) => {
        let newtime = prev - 5;
        videoRef.current.seekTo(newtime, "seconds");
        return newtime;
      });
    };
    forwardRef.current.addEventListener("dblclick", seekForward);
    backwardRef.current.addEventListener("dblclick", seekBack);

    return () => {
      removeEventListener("dblclick", seekForward);
      removeEventListener("dblclick", seekBack);
    };
  }, []);

  let hours = Math.floor(currentTime / 3600)??0;
  let minutes = Math.floor((currentTime % 3600) / 60)??0;
  let seconds = Math.floor(currentTime % 60)??0;
  let totalHours = Math.floor(currentVideoDuration / 3600)??0;
  let totalMinutes = Math.floor((currentVideoDuration % 3600) / 60)??0;
  let totalSeconds = Math.floor(currentVideoDuration % 60)??0;
  return (
    <div className="  bg-gray-900">
      <div className="w-auto absolute bottom-15 left-0 w-full timelinecontrol ">
        
        <div className="settings  w-full grid grid-cols-3">
      <div className=" col-span-1 pt-2 pl-5 justify-self-center text-white">
        <span className="">
        {`${(hours<1)?'':hours+':'}`}
        {`${(minutes<10)?'0'+minutes:minutes}`}:{(seconds<10)?'0'+seconds:seconds}/
        </span>
        <span>
        {`${(totalHours<1)?'':totalHours+':'}`}{totalMinutes<10?'0'+totalMinutes:totalMinutes}:{totalSeconds<10?'0'+totalSeconds:totalSeconds}
        </span>
      </div>
      {/* <div className="pip"><button onClick={handlePip}>PiP Mode</button></div> */}
      <div className="playratecontrol w-auto justify-self-end col-span-1 pt-1">
          <select className="p-1 outline-none bg-white rounded" value={playbackRate} onChange={(e)=>setPlaybackRate(Number(e.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
        <div className="fullscreen w-auto col-span-1 justify-self-end pr-10">
          <button onClick={handleFullScreen} className="p-1 text-white cursor-pointer">
                <i className="bi bi-fullscreen" style={{ fontSize: 20 }}></i>
          </button>
        </div>
      </div>
      <input
          className="w-full"
          min={0}
          max={currentVideoDuration || 100}
          step={1}
          type="range"
          value={currentTime}
          onChange={(e) => {
            videoRef.current.seekTo(e.target.value);
            setCurrentTime(e.target.value);
          }}
        />
      </div>
      
      <div className="play-controls grid grid-cols-5">
        <div className="playcontrol justify-center col-span-3 flex gap-2 flex-nowarp overflow-x-none ">
        <button
          ref={backwardRef}
          onClick={() => {}}
          className="p-3 text-white col-span-1  cursor-pointer"
        >
          <i className="bi bi-skip-backward-btn" style={{ fontSize: 30 }}></i>
        </button>
        <button
          onClick={() => {
            setPlaying((prev) => !prev);
          }}
          className="p-3 text-white col-span-1  cursor-pointer"
        >
          <i
            className={`${playing ? "bi-pause" : "bi-play"}`}
            style={{ fontSize: 30 }}
          ></i>
        </button>
        <button
          ref={forwardRef}
          onClick={() => {}}
          className="p-3  text-white col-span-1  cursor-pointer"
        >
          <i className="bi bi-fast-forward-btn" style={{ fontSize: 30 }}></i>
        </button>
        </div>
        <div className=" group audioControl col-span-2 grid grid-cols-4">
          <button
          onClick={() => {
            setMute((prev) => !prev);
          }}
          className="p-1 text-white cursor-pointer col-span-1"
        >
          <i
            className={`bi ${
              volume === 0 || mute ? "bi-volume-mute" : "bi-volume-down-fill"
            }`}
            style={{ fontSize: 30 }}
          ></i>
          </button>
          <input
          className="w-0 opacity-0 transition-all duration-500 col-span-1 group-hover:w-30 group-hover:opacity-100"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            setVolume(Number(e.currentTarget.value));
            localStorage.setItem('volume',e.currentTarget.value)
          }}
          />
        </div>
        
        
      </div>
    </div>
  );
}

export default Controls;
