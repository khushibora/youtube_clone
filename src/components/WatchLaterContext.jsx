
import { createContext, useContext, useEffect, useState } from "react";

const WatchLaterContext = createContext();

export const WatchLaterProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState(() => {
    try {
      const storedVideos = localStorage.getItem("watchLater");
      return storedVideos ? JSON.parse(storedVideos) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(savedVideos));
  }, [savedVideos]);

  const toggleWatchLater = (video) => {
    const videoId =
      typeof video.id === "string" ? video.id : video.id?.videoId;

    if (!videoId || !video.snippet) return;

    setSavedVideos((currentVideos) => {
      const alreadySaved = currentVideos.some(
        (item) => item.id === videoId
      );

      if (alreadySaved) {
        return currentVideos.filter((item) => item.id !== videoId);
      }

      return [
        ...currentVideos,
        {
          id: videoId,
          snippet: video.snippet,
        },
      ];
    });
  };

  const isSaved = (videoId) =>
    savedVideos.some((video) => video.id === videoId);

  return (
    <WatchLaterContext.Provider
      value={{ savedVideos, toggleWatchLater, isSaved }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

export const useWatchLater = () => useContext(WatchLaterContext);
