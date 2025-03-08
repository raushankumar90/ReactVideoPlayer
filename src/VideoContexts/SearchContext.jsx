import { createContext, useContext } from "react";
import youutube_api_key from "../env";
const initialValues = {
  isValidYouTubeUrl: (url) => {},
  getYoutubeTitle: (url) => {},
  getYoutubeId: (url) => {},

};
export const SearchContext = createContext(initialValues);

export const SearchProvider = ({ children }) => {
  function isValidYouTubeUrl(url) {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  }
  function getYoutubeId(url) {
    if (isValidYouTubeUrl(url)) {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      let videoId = url.match(regex);
      let yt_vd_id = videoId[1] ?? ""; // 11 characters youtube video id
      return yt_vd_id
    }else{
      return null
    }
  }

  const getYoutubeTitle = async (url) => {
    let yt_vd_id = getYoutubeId(url)
    let apiKey = youutube_api_key;
    let apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${yt_vd_id}&key=${apiKey}`;
    if(yt_vd_id){
      try {
        const response = await fetch(apiUrl);
        response.json().then((data) => {
          let title = data["items"][0].snippet.title;
          return title
        });
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("Check The URL again");
      
    }
  };

  const addToStorage =(url,title,id,)=>{

  } 
  const Provider = SearchContext.Provider;
  return <Provider value={{isValidYouTubeUrl,getYoutubeId,getYoutubeTitle}}>{children}</Provider>;
};

export const useSearch = () => {
  const searchContext = useContext(SearchContext);
  return searchContext;
};
