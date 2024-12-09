import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Tab, 
  Tabs, 
  Typography, 
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress
} from '@mui/material';
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
import VideoOutput from './components/VideoOutput';

function App() {
  const [tab, setTab] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setIsProcessing(false);
  };

  const processYouTubeUrl = async (url) => {
    setIsProcessing(true);
    try {
      console.log('Processing YouTube URL:', url);
      // Simulated async processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript('Sample transcript from YouTube video');
      setVideoUrl('/path/to/converted/video.mp4');
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    try {
      console.log('Processing file:', file.name);
      // Simulated async processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript('Sample transcript from uploaded file');
      setVideoUrl('/path/to/converted/video.mp4');
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processText = async (text) => {
    setIsProcessing(true);
    try {
      console.log('Processing text:', text);
      // Simulated async processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript(text);
      setVideoUrl('/path/to/converted/video.mp4');
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Customize tab icons with soft glow
  const tabIcons = [
    <YouTubeIcon 
      fontSize="large" 
      sx={{ 
        color: '#9AA6B2', 
        filter: 'drop-shadow(0 0 3px #BCCCDC)' 
      }} 
    />,
    <CloudUploadIcon 
      fontSize="large" 
      sx={{ 
        color: '#9AA6B2', 
        filter: 'drop-shadow(0 0 3px #BCCCDC)' 
      }} 
    />,
    <TextFieldsIcon 
      fontSize="large" 
      sx={{ 
        color: '#9AA6B2', 
        filter: 'drop-shadow(0 0 3px #BCCCDC)' 
      }} 
    />
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, #F8FAFC 0%, #D9EAFD 100%)`,
        color: '#1E293B',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 4, 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 15px 35px rgba(154, 166, 178, 0.2)'
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#1E293B', 
                mb: 2,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '0 0 10px rgba(154, 166, 178, 0.3)'
              }}
            >
              Unite Through signs
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#475569', 
                opacity: 0.8,
                maxWidth: 600,
                margin: '0 auto'
              }}
            >
              Team-Nooglers
            </Typography>
          </Box>

          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: '#475569',
              },
              '& .Mui-selected': {
                color: '#1E293B',
              },
            }}
          >
            {[
              { label: 'YouTube URL', icon: <YouTubeIcon /> },
              { label: 'File Upload', icon: <CloudUploadIcon /> },
              { label: 'Text Input', icon: <TextFieldsIcon /> }
            ].map((item, index) => (
              <Tab 
                key={item.label}
                icon={React.cloneElement(item.icon, { 
                  sx: { 
                    color: tab === index ? '#1E293B' : '#9AA6B2',
                    filter: tab === index ? 'drop-shadow(0 0 5px #BCCCDC)' : 'none'
                  } 
                })}
                label={item.label} 
                iconPosition="start" 
              />
            ))}
          </Tabs>

          {/* Existing input components */}
          <TabPanel value={tab} index={0}>
            <YouTubeInput 
              onProcess={processYouTubeUrl} 
              isProcessing={isProcessing} 
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <FileUpload 
              onProcess={processFile} 
              isProcessing={isProcessing} 
            />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <TextInput 
              onProcess={processText} 
              isProcessing={isProcessing} 
            />
          </TabPanel>
            
          {/* Video Output */}
          {(transcript || videoUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isProcessing ? (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      my: 4 
                    }}
                  >
                    <CircularProgress 
                      color="primary" 
                      size={60} 
                      sx={{
                        color: '#9AA6B2',
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                          animation: 'glow 1.5s infinite alternate'
                        }
                      }} 
                    />
                  </Box>
                ) : (
                  <VideoOutput 
                    transcript={transcript} 
                    videoUrl={videoUrl} 
                  />
                )}
              </motion.div>
            )}
        </motion.div>
      </Container>

      {/* Enhanced Footer */}
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          color: '#1E293B',
          textAlign: 'center', 
          py: 3,
          borderTop: '1px solid rgba(154, 166, 178, 0.2)'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ mb: 2 }}>
          </Typography>
          
          <Box>
            <IconButton 
              href="https://twitter.com" 
              target="_blank" 
              sx={{ color: '#9AA6B2' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton 
              href="https://linkedin.com" 
              target="_blank" 
              sx={{ color: '#9AA6B2' }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton 
              href="https://github.com" 
              target="_blank" 
              sx={{ color: '#9AA6B2' }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
