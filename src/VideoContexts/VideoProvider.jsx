import { VideoContext } from "./VideoContext";
import { useContext, useRef, useState } from "react";
export const VideoProvider = ({ children }) => {
  const Context = VideoContext.Provider;
  const Provider = Context.Provider;
  const [autoplay, setAutoPlay] = useState(false);
  const [controls, setControls] = useState(false);
  const [src, setSrc] = useState(
    "https://youtu.be/wqQ6BF50AT4?si=AP3J9DLwwq0D11GN"
  );
  const [height, setHeight] = useState(390);
  const [mute, setMute] = useState(false);
  const [width, setWidth] = useState(300);
  const [poster, setPoster] = useState("");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentVideoDuration,setCurrentVideoDuration] = useState(0);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [lastWatched, setLastWatched] = useState([]);
  const [currentVideoTitle, setCurrentVideoTitle] = useState([]);
  const [playbackRate, setPlaybackRate] = useState(1); // New state for playback speed
  const [isFullScreen, setFullScreen] = useState(false);

  const containerRef = useRef(null);
  
  // to control the volume of the video
  const controlVolume = (volume) => {
    setVolume(volume)
  };

  // object to pass to the context
  const contextobject = {
    autoplay,
    controls,
    src,
    height,
    width,
    poster,
    videoRef,
    playing,
    currentTime,
    volume,
    currentVideoDuration,
    mute,
    setCurrentTime,
    controlVolume,
    setPlaying,
    setCurrentVideoDuration,
    setMute,
    setVolume,
    setSrc,
    lastWatched,
    setLastWatched,
    currentVideoTitle,
    setCurrentVideoTitle,
    playbackRate, // Include playbackRate in the context
    setPlaybackRate, // Include setPlaybackRate in the context
    containerRef,
    isFullScreen,
    setFullScreen,
    setControls,
  };
  return <Provider value={contextobject}>{children}</Provider>;
};

// custom hook to use the context
export const useVideoProps = () => {
  let context = useContext(VideoContext);
  return context;
};