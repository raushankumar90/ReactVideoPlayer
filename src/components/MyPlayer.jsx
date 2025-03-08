import { useEffect, useRef } from "react";
import { useVideoProps } from "../VideoContexts/VideoProvider";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import SearchVideo from "./SearchVideo";
function MyPlayer() {
  const {
    mute,
    videoRef,
    setPlaying,
    src,
    width,
    height,
    playing,
    currentVideoDuration,
    // updateCurrentTime,
    setCurrentTime,
    currentTime,
    setCurrentVideoDuration,
    volume
  } = useVideoProps();


  return (
    <div className="p-3 w-120">
      <SearchVideo></SearchVideo>
      <ReactPlayer
        ref={videoRef}
        width={"auto"}
        onDuration={(total) => {
          setCurrentVideoDuration(() => total);
        }}
        playing={playing}
        height={height}
        url={src}
        muted={mute}
        onProgress={(e)=>setCurrentTime(e.playedSeconds)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={()=>setPlaying(false)}
        volume={volume}
      />
      <Controls />
      <div>
        Total-{currentVideoDuration} Current
        {currentTime}
      </div>
      <button onClick={() => setPlaying((prev) => !prev)}>PlayPause</button>
      {playing ? "playing" : "stop"}
    </div>
  );
}

export default MyPlayer;
