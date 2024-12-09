import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';

function Header() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #BCCCDC, #9AA6B2)',
        boxShadow: '0 4px 15px rgba(154, 166, 178, 0.3)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SignLanguageIcon 
            sx={{ 
              color: '#1E293B', 
              fontSize: '2rem',
              filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))'
            }} 
          />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              color: '#1E293B',
              textShadow: '0 0 5px rgba(255, 255, 255, 0.2)'
            }}
          >
            Sign Language Converter
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
