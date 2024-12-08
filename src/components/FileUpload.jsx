import { useState } from 'react';
import { Button, Box, Typography, LinearProgress } from '@mui/material';

const FileUpload = ({ onProcess }) => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setProcessing(true);
    try {
      await onProcess(file);
    } catch (error) {
      console.error('Error processing file:', error);
    }
    setProcessing(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Local Video/Audio File
      </Typography>
      <input
        accept="video/*,audio/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="outlined" component="span" sx={{ mr: 2 }}>
          Choose File
        </Button>
      </label>
      {file && (
        <>
          <Typography variant="body1" component="span">
            {file.name}
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={processing}
            sx={{ ml: 2 }}
          >
            Process File
          </Button>
        </>
      )}
      {processing && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;