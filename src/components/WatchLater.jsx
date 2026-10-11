import { Box, Typography } from "@mui/material";
import {useWatchLater} from "./WatchLaterContext";
import Videos  from "./Videos";

const WatchLater = () => {
    const {savedVideos} = useWatchLater();
    const videos = savedVideos.map((item) => ({
        id: { videoId: item.id },
        snippet: item.snippet,
    }));
    return (
<Box sx={{ backgroundColor: "#000", minHeight: "100vh", p: 3 }}>
    <Typography variant="h4" sx={{ color: "#fff", fontWeight:"bold"}}>
      Watch Later
    </Typography>
    {videos.length === 0 ? (
        <Typography color="gray" sx={{ mt: 2 }}>
          No videos saved yet.
        </Typography>
    ) : (
        <Videos videos={videos} />
    )}
</Box>
    );
};

export default WatchLater;