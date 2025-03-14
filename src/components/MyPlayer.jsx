// import { useEffect, useRef } from "react";
import { useVideoProps } from "../VideoContexts/VideoProvider";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import SearchVideo from "./SearchVideo";
const  MyPlayer=({seekTime,setSeekTime})=> {
  const {
    mute,
    videoRef,
    setPlaying,
    src,
    width,
    height,
    playing,
    // currentVideoDuration,
    // updateCurrentTime,
    setCurrentTime,
    // currentTime,
    setCurrentVideoDuration,
    volume,
    controls,
    playbackRate,
    containerRef,
    isFullScreen,
    // setFullScreen
  } = useVideoProps();
  return (
    <div className="p-3 relative">
      <SearchVideo setSeekTime={setSeekTime}></SearchVideo>
      <div ref={containerRef} className="relative">
      <ReactPlayer
        wrapper={'div'}
        controls={controls}
        ref={videoRef}
        width={"100%"}
        onDuration={(total) => {
          setCurrentVideoDuration(() => total);
        }}
        playing={playing}
        height={isFullScreen?"100vh":height}
        url={src}
        muted={mute}
        playsinline={true}
        onProgress={(e) => setCurrentTime(e.playedSeconds)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        volume={volume}
        onSeek={(e) => setCurrentTime(e)}
        onReady={() => { 
          videoRef.current.seekTo(seekTime,"seconds")
          // console.log("Phle mai aagya myplayer se",seekTime);
          if(!playing)setPlaying(true); }}
        playbackRate={playbackRate}
        // pip={true}
        config={
          {
            youtube: {
              playerVars: { modestbranding:1,rel:0,autoplay:1}
            },
          }
        }
      />
      <div className="w-full  controls">
         
      <Controls />
      </div>
      </div>
    </div>
  );
}

export default MyPlayer;
