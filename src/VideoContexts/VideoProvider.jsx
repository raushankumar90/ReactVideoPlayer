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
  const [height, setHeight] = useState(350);
  const [mute, setMute] = useState(false);
  const [width, setWidth] = useState(300);
  const [poster, setPoster] = useState("");
  const [playing, setPlaying] = useState("");
  const [volume, setVolume] = useState(0.3);
  const [currentVideoDuration,setCurrentVideoDuration] = useState(0);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  
  

  const controlVolume = (volume) => {
    setVolume(volume)
  };


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
    // updateCurrentTime,
    setCurrentTime,
    controlVolume,
    setPlaying,
    setCurrentVideoDuration,
    setMute,
    setVolume,
    setSrc
  };
  return <Provider value={contextobject}>{children}</Provider>;
};
export const useVideoProps = () => {
  let context = useContext(VideoContext);
  return context;
};
