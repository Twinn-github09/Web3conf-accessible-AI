import { useState } from 'react';
import { TextField, Button, Box, Typography, LinearProgress, Card, CardContent, CardMedia, InputAdornment, Dialog } from '@mui/material';
import { MagnifyingGlassIcon as SearchIcon, LinkIcon } from '@heroicons/react/24/outline';
import { searchYouTubeVideos } from '../services/youtube';

const YouTubeInput = ({ onProcess }) => {
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'search'
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [searching, setSearching] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    console.log('URL Submitted:', url); // Debug log
    setProcessing(true);
    try {
      await onProcess(url);
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
    }
    setProcessing(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    console.log('Search Query:', searchQuery); // Debug log
    setSearching(true);
    try {
      const results = await searchYouTubeVideos(searchQuery);
      console.log('Search Results:', results); // Debug log
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
    setSearching(false);
  };

  const handleVideoSelect = async (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('Selected Video ID:', videoId); // Debug log
    console.log('Constructed Video URL:', videoUrl); // Debug log

    setUrl(videoUrl);
    setInputMode('url');
    setSelectedVideoId(videoId);
    setOpenDialog(true);
    setProcessing(true);
    try {
      await onProcess(videoUrl);
    } catch (error) {
      console.error('Error processing selected video:', error);
    }
    setProcessing(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant={inputMode === 'url' ? 'contained' : 'outlined'}
          onClick={() => setInputMode('url')}
          startIcon={<LinkIcon className="w-5 h-5" />}
        >
          URL Input
        </Button>
        <Button
          variant={inputMode === 'search' ? 'contained' : 'outlined'}
          onClick={() => setInputMode('search')}
          startIcon={<SearchIcon className="w-5 h-5" />}
        >
          Search YouTube
        </Button>
      </Box>

      {inputMode === 'url' ? (
        <form onSubmit={handleUrlSubmit}>
          <TextField
            fullWidth
            label="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!url || processing}
            sx={{ mt: 2 }}
          >
            Process Video
          </Button>
        </form>
      ) : (
        <Box>
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              label="Search YouTube"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!searchQuery || searching}
              sx={{ mt: 2 }}
            >
              Search
            </Button>
          </form>

          {searching && <LinearProgress sx={{ mt: 2 }} />}

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {searchResults.map((video) => (
              <Card
                key={video.id.videoId}
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={() => {
                  const videoId = video.id; // Directly use `id` as the video ID
                  if (videoId) {
                    console.log('Selected Video ID:', videoId); // Debug log
                    handleVideoSelect(videoId);
                  } else {
                    console.error('Invalid video data:', video); // Debug log
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 160, height: 90 }}
                  image={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    {video.snippet.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.snippet.channelTitle}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {processing && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Dialog Component for Video Preview */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${selectedVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Dialog>
    </Box>
  );
};

export default YouTubeInput;
