
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id: channelId } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      setError(false);

      try {
        const [channelData, videoData] = await Promise.all([
          fetchFromAPI(
            `channels?part=snippet,statistics&id=${channelId}`
          ),
          fetchFromAPI(
            `search?part=snippet&channelId=${channelId}&order=date&type=video`
          ),
        ]);

        setChannelDetail(channelData?.items?.[0] || null);
        setVideos(videoData?.items || []);
      } catch (err) {
        console.error("Error fetching channel details:", err);
        setError(true);
        setChannelDetail(null);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  return (
    <Box sx={{ minHeight: "95vh", backgroundColor: "#000", pb: 4 }}>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,238,247,1) 0%, rgba(206,3,184,1) 100%)",
          height: { xs: "180px", md: "300px" },
        }}
      />

      {channelDetail && (
        <Box sx={{ mt: "-80px", position: "relative", zIndex: 1 }}>
          <ChannelCard channelDetail={channelDetail} />
        </Box>
      )}

      <Box sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
        {loading && (
          <Typography color="white">
            Loading channel...
          </Typography>
        )}

        {error && (
          <Typography color="error">
            Couldn't load channel information. Please try again.
          </Typography>
        )}

        {!loading && !error && !channelDetail && (
          <Typography color="white">
            Channel not found.
          </Typography>
        )}

        {!loading && !error && videos.length === 0 && channelDetail && (
          <Typography color="white">
            No videos found for this channel.
          </Typography>
        )}

        {!loading && !error && videos.length > 0 && (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
