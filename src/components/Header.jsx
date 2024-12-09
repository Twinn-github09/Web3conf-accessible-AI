import React from 'react';
import { AppBar, Toolbar, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import SignLanguageIcon from '@mui/icons-material/SignLanguage'; // Using MUI icon for accessibility
import SparklesText from "./ui/sparkles-text";
import WordRotate from "./ui/word-rotate";


function Header() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: '#add8e6',
        boxShadow: '0 4px 15px rgba(0, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,pl:47}}>
          
          <SparklesText text=" " />
          <center>
          <WordRotate
            className="text-4xl font-bold text-black dark:text-white"
            words={["Sign Language Converter", "Web3conf Hackathon "]}
          />
          </center>
          <SparklesText text=" " />
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
