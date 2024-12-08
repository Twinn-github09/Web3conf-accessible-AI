import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const VideoOutput = ({ transcript, videoUrl }) => {
  if (!transcript && !videoUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper 
        sx={{ 
          mt: 4, 
          p: 3,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
        }}
      >
        {transcript && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ color: '#00FFB2' }}
            >
              Transcript:
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                background: 'rgba(0, 0, 0, 0.2)',
                p: 2,
                borderRadius: 2,
                fontFamily: 'monospace',
              }}
            >
              {transcript}
            </Typography>
          </Box>
        )}
        {videoUrl && (
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ color: '#00FFB2' }}
            >
              Converted Sign Language Video:
            </Typography>
            <Box 
              sx={{ 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(0, 255, 178, 0.2)',
                },
              }}
            >
              <video controls width="100%">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default VideoOutput;