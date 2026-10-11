
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";
import { WatchLaterProvider } from "./components/WatchLaterContext";
import WatchLater from "./components/WatchLater";

const App = () => (
  <WatchLaterProvider>
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:id" element={<SearchFeed />} />
          <Route path="/watch-later" element={<WatchLater />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </WatchLaterProvider>
);

export default App;
