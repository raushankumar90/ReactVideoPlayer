import { createContext, useContext, useEffect, useState } from "react";
import { useVideoProps } from "./VideoProvider";
import youutube_api_key from "../env";
const initialValues = {
  isValidYouTubeUrl: (url) => {},
  getYoutubeTitle: (url) => {},
  getYoutubeId: (url) => {},
  videos: [],
  setVideo: () => {},
  addToStorage: () => {},
};
export const SearchContext = createContext(initialValues);

export const SearchProvider = ({ children }) => {
  const [videos, setVideo] = useState([]);

  // to check if the url is a valid youtube url
  function isValidYouTubeUrl(url) {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  }
  // to get the youtube video id
  function getYoutubeId(url) {
    if (isValidYouTubeUrl(url)) {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      let videoId = url.match(regex);
      let yt_vd_id = videoId[1] ?? ""; // 11 characters youtube video id
      return yt_vd_id;
    } else {
      return null;
    }
  }
  // to get the youtube video title
  const getYoutubeTitle = async (url) => {
    let yt_vd_id = getYoutubeId(url);
    let apiKey = youutube_api_key;
    console.log(import.meta.env);
    let apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${yt_vd_id}&key=${apiKey}`;
    if (yt_vd_id) {
      try {
        const response = await fetch(apiUrl);
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        const data = await response.json();
        let title = data?.items?.[0]?.snippet?.title || "Title NOT FOUND";
        return title;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Check The URL again");
    }
  };

  // to add the video to the local storage
  const addToStorage = (url, title, id) => {
    const params = { id, title, url ,watchedTime:0};
    const localstore = localStorage.getItem("videos");
    if (!localstore) {
      localStorage.setItem("videos", JSON.stringify([params]));
      setVideo(() => [params]);
    }
    setVideo(() => [params]);
    if (localstore) {
      const jsonStore = JSON.parse(localstore);
      setVideo((prev) => {
        let newvideos = [params, ...jsonStore];
        localStorage.setItem("videos", JSON.stringify(newvideos));
        localStorage.setItem("lastplayed", JSON.stringify([params]));
        console.log(newvideos)
        return newvideos;
      });
    }
  };
  
  const Provider = SearchContext.Provider;
  return (
    <Provider
      value={{
        isValidYouTubeUrl,
        getYoutubeId,
        getYoutubeTitle,
        addToStorage,
        videos,
        setVideo
      }}
    >
      {children}
    </Provider>
  );
};

// custom hook to use the context
export const useSearch = () => {
  const searchContext = useContext(SearchContext);
  return searchContext;
};