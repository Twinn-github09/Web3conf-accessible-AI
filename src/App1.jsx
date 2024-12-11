// import React, { useState } from 'react';
// import { 
//   Container, 
//   Box, 
//   Tab, 
//   Tabs, 
//   Typography, 
//   Button,
//   Card,
//   CardContent,
//   IconButton,
//   CircularProgress
// } from '@mui/material';

// import VaraText from "./components/VaraText";

// import { motion } from 'framer-motion';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import TextFieldsIcon from '@mui/icons-material/TextFields';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';

// import Header from './components/toolHeader';
// import TabPanel from './components/TabPanel';
// import YouTubeInput from './components/YouTubeInput';
// import FileUpload from './components/FileUpload';
// import TextInput from './components/TextInput';
// import VideoOutput from './components/VideoOutput';
// import LandingPage from './Landing';

// function App() {
//   const [tab, setTab] = useState(0);
//   const [transcript, setTranscript] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//     setIsProcessing(false);
//   };

//   const processYouTubeUrl = async (url) => {
//     setIsProcessing(true);
//     try {
//       console.log('Processing YouTube URL:', url);
//       // Simulated async processing
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setTranscript('Sample transcript from YouTube video');
//       setVideoUrl('/path/to/converted/video.mp4');
//     } catch (error) {
//       console.error('Processing error:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const processFile = async (file) => {
//     setIsProcessing(true);
//     try {
//       console.log('Processing file:', file.name);
//       // Simulated async processing
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setTranscript('Sample transcript from uploaded file');
//       setVideoUrl('/path/to/converted/video.mp4');
//     } catch (error) {
//       console.error('Processing error:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const processText = async (text) => {
//     setIsProcessing(true);
//     let videoUrl; // Declare videoUrl in the outer scope
//     try {
//       console.log("Processing text:", text);
//       // Simulated async processing
//       await new Promise((resolve) => setTimeout(resolve, 2000));
  
//       setTranscript(text);
  
//       try {
//         const response = await fetch("http://192.168.117.18:5000/convertToSign", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ text: text }),
//         });
  
//         if (!response.ok) {
//           let errorMessage = "Unknown error occurred.";
//           try {
//             const error = await response.json();
//             errorMessage = error.error || errorMessage;
//           } catch (parseError) {
//             console.error("Error parsing response:", parseError);
//           }
//           alert(`Error: ${errorMessage}`);
//           return;
//         }
  
//         // Create a blob URL for the video
//         const videoBlob = await response.blob();
//         videoUrl = URL.createObjectURL(videoBlob);
//       } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred. Please try again.");
//       }
  
//       if (videoUrl) {
//         setVideoUrl(videoUrl); // Set videoUrl only if successfully created
//       }
//     } catch (error) {
//       console.error("Processing error:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };
//   // Customize tab icons with soft glow
//   const tabIcons = [
//     <YouTubeIcon 
//       fontSize="large" 
//       sx={{ 
//         color: '#9AA6B2', 
//         filter: 'drop-shadow(0 0 3px #BCCCDC)' 
//       }} 
//     />,
//     <CloudUploadIcon 
//       fontSize="large" 
//       sx={{ 
//         color: '#9AA6B2', 
//         filter: 'drop-shadow(0 0 3px #BCCCDC)' 
//       }} 
//     />,
//     <TextFieldsIcon 
//       fontSize="large" 
//       sx={{ 
//         color: '#9AA6B2', 
//         filter: 'drop-shadow(0 0 3px #BCCCDC)' 
//       }} 
//     />
//   ];

//   return (
//   <Box 
//   sx={{ 
//     minHeight: '100vh', 
//     background: `linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%)`, // Lighter blue gradient background
//     color: '#1E293B',
//     display: 'flex',
//     flexDirection: 'column'
//   }}
//     >
//       <Header />
      
//       <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Box 
//             sx={{ 
//               height: '90px',
//               textAlign:'center',
//               justifyContent:'center',
//               mb: 10, 
//               p: 3,
//               pl: 50,
//               borderRadius: 3,
//               background: '#F5E2E2',
//               boxShadow: '0 15px 35px rgba(154, 166, 178, 0.2)'
//             }}
//           > 
            
//             <VaraText 
//               text="Unite Through Signs"
//               fontSize={45}
//               strokeWidth={1}
//               sx={{ textAlign: 'center' }}
//             />
        
//           </Box>

//           <Tabs     
//             value={tab}
//             onChange={handleTabChange}
//             variant="fullWidth"
//             sx={{ 
//               mb: 3,
//               '& .MuiTab-root': {
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: '16px',
//                 fontFamily: 'sans-serif',
//                 color: '#475569',
//               },
//               '& .Mui-selected': {
//                 color: '#1E293B',
//               },
//             }}
//           >
//             {[
//               { label: 'YouTube', icon: <YouTubeIcon /> },
//               { label: 'File Upload', icon: <CloudUploadIcon /> },
//               { label: 'Text', icon: <TextFieldsIcon /> }
//             ].map((item, index) => (
//               <Tab 
//                 key={item.label}
//                 icon={React.cloneElement(item.icon, { 
//                   sx: { 
//                     color: tab === index ? '#1E293B' : '#9AA6B2',
//                     filter: tab === index ? 'drop-shadow(0 0 5px #BCCCDC)' : 'none'
//                   } 
//                 })}
//                 label={item.label} 
//                 iconPosition="start" 
//               />
//             ))}
//           </Tabs>

//           {/* Existing input components */}
//           <TabPanel value={tab} index={0}>
//             <YouTubeInput 
//               onProcess={processYouTubeUrl} 
//               isProcessing={isProcessing} 
//             />
//           </TabPanel>
//           <TabPanel value={tab} index={1}>
//             <FileUpload 
//               onProcess={processFile} 
//               isProcessing={isProcessing} 
//             />
//           </TabPanel>
//           <TabPanel value={tab} index={2}>
//             <TextInput 
//               onProcess={processText} 
//               isProcessing={isProcessing} 
//             />
//           </TabPanel>
            
//           {/* Video Output */}
//           {(transcript || videoUrl) && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {isProcessing ? (
//                   <Box 
//                     sx={{ 
//                       display: 'flex', 
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       my: 4 
//                     }}
//                   >
//                     <CircularProgress 
//                       color="primary" 
//                       size={60} 
//                       sx={{
//                         color: '#9AA6B2',
//                         '& .MuiCircularProgress-circle': {
//                           strokeLinecap: 'round',
//                           animation: 'glow 1.5s infinite alternate'
//                         }
//                       }} 
//                     />
//                   </Box>
//                 ) : (
//                   <VideoOutput 
//                     transcript={transcript} 
//                     videoUrl={videoUrl} 
//                   />
//                 )}
//               </motion.div>
//             )}
//         </motion.div>
//       </Container>

//       {/* Enhanced Footer
//       <Box 
//         component="footer" 
//         sx={{ 
//           backgroundColor: 'rgba(255, 255, 255, 0.7)', 
//           color: '#1E293B',
//           textAlign: 'center', 
//           py: 3,
//           borderTop: '1px solid rgba(154, 166, 178, 0.2)'
//         }}
//       >
//         <Container maxWidth="lg">
//           <Typography variant="body2" sx={{ mb: 2 }}>
//           </Typography>
          
//           <Box>
//             <IconButton 
//               href="https://twitter.com" 
//               target="_blank" 
//               sx={{ color: '#9AA6B2' }}
//             >
//               <TwitterIcon />
//             </IconButton>
//             <IconButton 
//               href="https://linkedin.com" 
//               target="_blank" 
//               sx={{ color: '#9AA6B2' }}
//             >
//               <LinkedInIcon />
//             </IconButton>
//             <IconButton 
//               href="https://github.com" 
//               target="_blank" 
//               sx={{ color: '#9AA6B2' }}
//             >
//               <GitHubIcon />
//             </IconButton>
//           </Box>
//         </Container>
//       </Box> */}
//     </Box>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Container, Box, Tab, Tabs, CircularProgress } from '@mui/material';

import VaraText from "./components/VaraText";

import { motion } from 'framer-motion';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import Header from './components/toolHeader';
import TabPanel from './components/TabPanel';
import YouTubeInput from './components/YouTubeInput';
import FileUpload from './components/FileUpload';
import TextInput from './components/TextInput';
import VideoOutput from './components/VideoOutput';
import Particles from './components/ui/particles';

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
    let videoUrl; 
    try {
      console.log("Processing text:", text);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTranscript(text);
  
      try {
        const response = await fetch("http://192.168.117.18:5000/convertToSign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        });
  
        if (!response.ok) {
          let errorMessage = "Unknown error occurred.";
          try {
            const error = await response.json();
            errorMessage = error.error || errorMessage;
          } catch (parseError) {
            console.error("Error parsing response:", parseError);
          }
          alert(`Error: ${errorMessage}`);
          return;
        }
  
        const videoBlob = await response.blob();
        videoUrl = URL.createObjectURL(videoBlob);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
  
      if (videoUrl) {
        setVideoUrl(videoUrl);
      }
    } catch (error) {
      console.error("Processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const tabIcons = [
    <YouTubeIcon 
      fontSize="large" 
      className="text-gray-500 hover:text-gray-800 transition-all duration-300" 
    />,
    <CloudUploadIcon 
      fontSize="large" 
      className="text-gray-500 hover:text-gray-800 transition-all duration-300" 
    />,
    <TextFieldsIcon 
      fontSize="large" 
      className="text-gray-500 hover:text-gray-800 transition-all duration-300" 
    />
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 flex flex-col">
      <Header />
      <Particles className='absolute top-0 left-0 w-full h-full'
      quantity={100}
      ease={80}
      color='blue'
      refresh />
      <Container maxWidth="lg" className="flex-grow py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
           <Box 
            className="h-[90px] text-center justify-center mb-10 p-3 pl-12 rounded-lg bg-pink-100 shadow-xl"
          > 
             <VaraText 
              text="Unite Through Signs"
              fontSize={45}
              strokeWidth={1}
              className="text-center"
            /> 
          </Box> 

          <Tabs     
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            className="mb-3"
          >
            {[
              { label: 'YouTube', icon: <YouTubeIcon /> },
              { label: 'File Upload', icon: <CloudUploadIcon /> },
              { label: 'Text', icon: <TextFieldsIcon /> }
            ].map((item, index) => (
              <Tab 
                key={item.label}
                icon={React.cloneElement(item.icon, { 
                  className: `text-gray-500 ${tab === index ? 'text-gray-900' : ''} transition-all duration-300`
                })}
                label={item.label} 
                iconPosition="start" 
                className="text-gray-700 font-medium"
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
                    className="flex justify-center items-center my-4"
                  >
                    <CircularProgress 
                      color="primary" 
                      size={60} 
                      className="text-gray-400"
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
    </Box>
  );
}

export default App;
