import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import{ fetchFromAPI } from '../utils/fetchFromAPI';
import ReactPlayer from 'react-player';

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))
  }, [id]);
  console.log(videoDetail);

 return (
  <Box sx={{ color: "#fff" }}>
    <Box sx={{ width: "100%", height: "500px" }}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        controls
        width="100%"
        height="100%"
      />
    </Box>

    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ mt: 2 }}
    >
      {videoDetail?.snippet?.title}
    </Typography>
  </Box>
);
};

export default VideoDetail