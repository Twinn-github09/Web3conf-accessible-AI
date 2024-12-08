import React from 'react';
import { AppBar, Toolbar, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import SignLanguageIcon from '@mui/icons-material/SignLanguage'; // Using MUI icon for accessibility

function Header() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #1E1E2F, #121212)',
        boxShadow: '0 4px 15px rgba(0, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SignLanguageIcon 
            sx={{ 
              color: 'var(--neon-blue)', 
              fontSize: '2rem',
              filter: 'drop-shadow(0 0 5px var(--neon-blue))'
            }} 
          />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              color: 'var(--neon-blue)',
              textShadow: '0 0 10px var(--accent-glow)'
            }}
          >
            Sign Language Converter
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch 
                color="primary"
                sx={{
                  '& .MuiSwitch-thumb': {
                    color: 'var(--neon-blue)'
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: 'var(--secondary-dark)'
                  }
                }}
              />
            }
            label="Dark Mode"
            sx={{ color: 'var(--text-light)' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;