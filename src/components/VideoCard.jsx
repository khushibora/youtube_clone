
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";

import {
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

import { useWatchLater } from "./WatchLaterContext";

const VideoCard = ({ video }) => {
  const videoId =
    typeof video.id === "string" ? video.id : video.id?.videoId;

  const { toggleWatchLater, isSaved } = useWatchLater();
  const saved = videoId ? isSaved(videoId) : false;

  return (
    <Card
      sx={{
        width: { md: "320px", xs: "100%" },
        boxShadow: "none",
        borderRadius: "8px",
        backgroundColor: "#1e1e1e",
        position: "relative",
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          image={video.snippet?.thumbnails?.high?.url}
          alt={video.snippet?.title || "Video thumbnail"}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
        />
      </Link>

      <IconButton
        onClick={() => toggleWatchLater(video)}
        aria-label={saved ? "Remove from Watch Later" : "Save to Watch Later"}
        title={saved ? "Remove from Watch Later" : "Save to Watch Later"}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: saved ? "#ff3333" : "#fff",
          backgroundColor: "rgba(0,0,0,0.75)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.95)",
          },
        }}
      >
        {saved ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>

      <CardContent sx={{ minHeight: "106px" }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            color: "#fff",
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.snippet?.title || demoVideoTitle}
        </Typography>

        <Link
          to={
            video.snippet?.channelId
              ? `/channel/${video.snippet.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {video.snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
