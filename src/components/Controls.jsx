import { useVideoProps } from "../VideoContexts/VideoProvider";
import { useEffect, useRef, useState } from "react";
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
  } = useVideoProps();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pause = () => {
      if (document.hidden) {
        console.log("Paused");
        setPlaying(() => false);
      }
    };
    document.addEventListener("visibilitychange", pause);

    return () => {
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);

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
  return (
    <div className="controls w-full bg-red-700">
      <div className="timeline pb-1 ">
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
      <div className="controls">
        <button
          ref={backwardRef}
          onClick={() => {}}
          className="p-3 bg-red-700 text-white  cursor-pointer"
        >
          <i className="bi bi-skip-backward-btn" style={{ fontSize: 30 }}></i>
        </button>
        <button
          onClick={() => {
            setPlaying((prev) => !prev);
          }}
          className="p-3 bg-red-700 text-white  cursor-pointer"
        >
          <i
            className={`${playing ? "bi-pause" : "bi-play"}`}
            style={{ fontSize: 30 }}
          ></i>
        </button>
        <button
          ref={forwardRef}
          onClick={() => {}}
          className="p-3 bg-red-700 text-white  cursor-pointer"
        >
          <i className="bi bi-fast-forward-btn" style={{ fontSize: 30 }}></i>
        </button>
        <button
          onClick={() => {
            setMute((prev) => !prev);
          }}
          className="p-3 bg-red-700 text-white cursor-pointer"
        >
          <i
            className={`bi ${
              volume === 0 || mute ? "bi-volume-mute" : "bi-volume-down-fill"
            }`}
            style={{ fontSize: 30 }}
          ></i>
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            setVolume(Number(e.currentTarget.value));
          }}
        />
      </div>
    </div>
  );
}

export default Controls;
