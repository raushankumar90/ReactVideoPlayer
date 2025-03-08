import { createContext } from "react";
const videoProps = {
    autoplay:false,
    contros:true,
    src:"string",
    height:400,
    width:300,
    muted:true,
    poster:"",
    preload:'none',
    videoRef:null,
    playing:false,
    currentTime:0,
    volume:0,
    currentVideoDuration:0,
    mute:false,
    setCurrentTime:()=>{console.log("ok")},
    // updateCurrentTime:()=>{},
    // controlVolume:()=>{},
    setVolume:20,
    setPlaying:()=>{},
    setMute:()=>{},
    setCurrentVideoDuration:()=>{},
    setSrc:()=>{}
}
export const VideoContext = createContext(videoProps)