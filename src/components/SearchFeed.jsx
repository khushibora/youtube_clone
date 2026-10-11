
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const SearchFeed = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchFromAPI(
          `search?part=snippet&q=${encodeURIComponent(id)}`
        );

        setVideos(data.items || []);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError(true);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [id]);

  return (
    <Box sx={{ p: 2, minHeight: '80vh' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        sx={{ mb: 3 }}
      >
        Search results for: {id}
      </Typography>

      {loading && (
        <Typography color="white">
          Loading search results...
        </Typography>
      )}

      {error && (
        <Typography color="error">
          Could not load search results. Please try again.
        </Typography>
      )}

      {!loading && !error && videos.length === 0 && (
        <Typography color="white">
          No results found.
        </Typography>
      )}

      {!loading && !error && videos.length > 0 && (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
