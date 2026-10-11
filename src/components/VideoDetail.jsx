
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import ReactPlayer from "react-player";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getVideoDetail = async () => {
      setError(false);
      setVideoDetail(null);

      try {
        const data = await fetchFromAPI(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data?.items?.[0] || null);
      } catch (err) {
        console.error("Failed to fetch video details:", err);
        setError(true);
      }
    };

    getVideoDetail();
  }, [id]);

  return (
    <Box
      sx={{
        color: "#fff",
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 1, sm: 2, md: 3 },
        py: 2,
        pb: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: "8px" },
          backgroundColor: "#111",
        }}
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          controls
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Could not load video details. Please try again.
        </Typography>
      )}

      <Typography
        variant="h5"
        fontWeight="bold"
      sx={{
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  backgroundColor: "#000",
  overflow: "hidden",
}}
      >
        {videoDetail?.snippet?.title || (!error ? "Loading video details..." : "")}
      </Typography>
    </Box>
  );
};

export default VideoDetail;
