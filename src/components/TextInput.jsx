import { useState } from 'react';
import { TextField, Button, Box, Typography, LinearProgress } from '@mui/material';

const TextInput = ({ onProcess }) => {
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    setProcessing(true);
    try {
      await onProcess(text);
    } catch (error) {
      console.error('Error processing text:', error);
    }
    setProcessing(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Enter Text for Conversion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!text || processing}
          sx={{ mt: 2 }}
        >
          Process Text
        </Button>
      </form>
      {processing && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default TextInput;