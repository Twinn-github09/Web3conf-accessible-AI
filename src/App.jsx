import React, { useState, useRef } from 'react';
import { 
  Container, 
  Box, 
  Tab, 
  Tabs, 
  Typography, 
  CircularProgress, 
  IconButton
} from '@mui/material';

import VaraText from "./components/VaraText";
import { motion } from 'framer-motion';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import Header from './components/Header';
import TabPanel from './components/TabPanel';
import YouTubeInput from './components/YouTubeInput';
import FileUpload from './components/FileUpload';
import TextInput from './components/TextInput';

function App() {
  const [tab, setTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [translatedVideoUrl, setTranslatedVideoUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const translatedVideoRef = useRef(null);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setIsProcessing(false);
    // Reset states
    setTranscript([]);
    setTranslatedVideoUrl(null);
    setErrorMessage(null);
    setYoutubeEmbedUrl(null);
    setShowOutput(false);
  };

  const extractYouTubeId = (url) => {
    try {
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(youtubeRegex);
      
      return match ? match[1] : null;
    } catch (error) {
      console.error("Error extracting YouTube ID:", error);
      return null;
    }
  };

  const processYouTubeUrl = async (videoUrl) => {
    const yt_id = extractYouTubeId(videoUrl);
    
    if (!yt_id) {
      setErrorMessage("Invalid YouTube URL. Please provide a valid YouTube video link.");
      return;
    }

    setYoutubeEmbedUrl(`https://www.youtube.com/embed/${yt_id}`);
    setIsProcessing(true);
    setTranscript([]);
    setErrorMessage(null);
    setShowOutput(true);

    try {
      const response = await fetch("http://localhost:5001/getTranscript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: yt_id }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(`Error: ${error.error}`);
        return;
      }

      const transcriptData = await response.json();
      setTranscript(transcriptData);

      let prev_time = 0;
      for (const segment of transcriptData) {
        const { text, start, duration } = segment;
        
        let waitTime = prev_time === 0 ? (start - prev_time) * 1000 : (start - prev_time) * 1000;
        
        if (waitTime > 0) {
          await sleep(waitTime);
        }
        prev_time = start + duration;

        const signResponse = await fetch("http://192.168.0.198:5000/convertToSign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: text, duration:duration }),
        });

        if (!signResponse.ok) {
          setErrorMessage("Error converting to sign language.");
          return;
        }

        const videoBlob = await signResponse.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setTranslatedVideoUrl(videoUrl);

        if (translatedVideoRef.current) {
          translatedVideoRef.current.src = videoUrl;
          translatedVideoRef.current.play();
        }
      }

      // Start playing YouTube video when transcription process is completed
      if (youtubeEmbedUrl) {
        document.getElementById("youtubeEmbed").src += "?autoplay=1";
      }

    } catch (error) {
      console.error("Error processing YouTube URL:", error);
      setErrorMessage("An error occurred while processing the YouTube video.");
    } finally {
      setIsProcessing(false);
    }
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setShowOutput(true);
    try {
      // Implement file processing logic similar to YouTube processing
      // This might involve sending the file to a backend service
      console.log('Processing file:', file.name);
      
      // Placeholder for file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript([{ text: 'Sample transcript from uploaded file', start: 0, duration: 5 }]);
      
      // Convert file text to sign language
      const signResponse = await fetch("http://192.168.0.198:5000/convertToSign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: 'Sample transcript from uploaded file', duration: '' }),
      });

      if (!signResponse.ok) {
        setErrorMessage("Error converting file to sign language.");
        return;
      }

      const videoBlob = await signResponse.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setTranslatedVideoUrl(videoUrl);

      // Ensure the video plays
      if (translatedVideoRef.current) {
        translatedVideoRef.current.src = videoUrl;
        translatedVideoRef.current.play();
      }

    } catch (error) {
      console.error('Processing error:', error);
      setErrorMessage("An error occurred while processing the file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const processText = async (text) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setShowOutput(true);
    try {
      setTranscript([{ text, start: 0, duration: 5 }]);

      const signResponse = await fetch("http://192.168.0.198:5000/convertToSign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, duration: '' }),
      });

      if (!signResponse.ok) {
        setErrorMessage("Error converting text to sign language.");
        return;
      }

      const videoBlob = await signResponse.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setTranslatedVideoUrl(videoUrl);

      // Ensure the video plays
      if (translatedVideoRef.current) {
        translatedVideoRef.current.src = videoUrl;
        translatedVideoRef.current.play();
      }

    } catch (error) {
      console.error("Processing error:", error);
      setErrorMessage("An error occurred while converting text to sign language.");
    } finally {
      setIsProcessing(false);
    }
  };

  const tabIcons = [
    <YouTubeIcon fontSize="large" sx={{ color: '#9AA6B2' }} />,
    <CloudUploadIcon fontSize="large" sx={{ color: '#9AA6B2' }} />,
    <TextFieldsIcon fontSize="large" sx={{ color: '#9AA6B2' }} />
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #D9EAFD 100%)',
        color: '#1E293B',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 10,
              p: 3,
              pl:49,
              pb:0.5,
              borderRadius: 3,
              background: '#F5E2E2',
              boxShadow: '0 15px 35px rgba(154, 166, 178, 0.2)',
            }}
          >
            <VaraText text="Unite Through Signs" fontSize={45} />
          </Box>

          <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
            {["YouTube URL", "File Upload", "Text Input"].map((label, index) => (
              <Tab key={label} icon={tabIcons[index]} label={label} />
            ))}
          </Tabs>

          <TabPanel value={tab} index={0}>
            <YouTubeInput onProcess={processYouTubeUrl} isProcessing={isProcessing} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <FileUpload onProcess={processFile} isProcessing={isProcessing} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <TextInput onProcess={processText} isProcessing={isProcessing} />
          </TabPanel>

          {showOutput && (
            <>
              <Box display="flex" justifyContent="space-between" mt={4}>
                {youtubeEmbedUrl && (
                  <iframe
                    id="youtubeEmbed"
                    src={youtubeEmbedUrl}
                    title="YouTube Video"
                    style={{ width: '45%', height: '315px', border: 'none' }}
                    allow="autoplay; encrypted-media"
                  ></iframe>
                )}
                <video
                  ref={translatedVideoRef}
                  controls
                  style={{ width: '45%', border: '1px solid #ccc' }}
                />
              </Box>

              {isProcessing && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
                </Box>
              )}

              {errorMessage && (
                <Typography color="error" align="center" mt={4}>
                  {errorMessage}
                </Typography>
              )}

              <Box mt={4}>
                <Typography variant="h6">Transcript:</Typography>
                <Box
                  sx={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    background: '#fff',
                  }}
                >
                  {transcript.map((segment, index) => (
                    <Typography key={index} variant="body2" gutterBottom>
                      {segment.start ? `${segment.start.toFixed(2)}s - ` : ''}{segment.text}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </motion.div>
      </Container>

      <Box
        component="footer"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          color: '#1E293B',
          textAlign: 'center',
          py: 3,
          borderTop: '1px solid rgba(154, 166, 178, 0.2)',
        }}
      >
        <Container maxWidth="lg">
          <Box>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#9AA6B2' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#9AA6B2' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://github.com" target="_blank" sx={{ color: '#9AA6B2' }}>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;