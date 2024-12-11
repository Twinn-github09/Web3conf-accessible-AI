import React from 'react';
import HeroVideoProps from './hero-video-dialog';
import { Widgets } from '@mui/icons-material';
import BoxReveal from "./box-reveal";
import ShineBorder from "../ui/shine-border";
const AboutSection = () => {
  return (
    <>
    <div className="py-10 px-6 bg-gray-100" style={{ display: 'flex', alignItems: 'center' }}>
      
      <div style={{width: '60%',marginRight: '50px'}}>
      <BoxReveal boxColor='white' duration={0.3}>
      <h3 className="text-left text-2xl md:text-4xl mb-4" delay={0.30}>About</h3>
      
      <p className="text-lg leading-relaxed text-gray-600 text-justify">
      This website is a tool that helps people communicate more easily with individuals who have hearing disabilities. Users can upload videos, enter text, or share YouTube links to convert content into simple sign language. It also allows anyone to add their own sign languages, using Web3 technology to securely manage these contributions. The goal is to make communication and understanding easier and more inclusive for everyone.
        </p>
        </BoxReveal>
      </div>
      {/* To be changed to sign language video */}
      <video src='/src/assets/NutrinO-RAG.mp4' autoPlay loop muted className='w-[40%]'></video>

    </div>
    <div className="py-10 px-6 bg-gray-100" style={{ display: 'flex', alignItems: 'center' }}>
      <BoxReveal boxColor='white' duration={0.5}>
        <h3 className="text-left text-2xl md:text-4xl mb-4" delay={0.30}>Tech Stack</h3>
      
        
      </BoxReveal>
    </div>
    <div className="py-10 px-6 bg-gray-100 flex gap-4">
      
    </div>
  

    </>
    
  );
};

export default AboutSection;
