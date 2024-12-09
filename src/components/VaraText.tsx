import React, { useEffect, useRef } from "react";
import Vara from 'vara';

interface VaraTextProps {
  text: string;
  fontSize?: number;
  strokeWidth?: number;
  fontPath?: string;
}

const VaraText: React.FC<VaraTextProps> = ({ 
  text, 
  fontSize = 40, 
  strokeWidth = 0.7,
  fontPath = "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const varaInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Ensure the container exists
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = "";

      // Create new Vara instance
      varaInstanceRef.current = new Vara(
        "#vara-container",
        fontPath,
        [
          {
            text: text,
            fontSize: fontSize,
            strokeWidth: strokeWidth,
          },
        ]
      );
    }

    // Cleanup function
    return () => {
      // If you need to do any cleanup, you can add logic here
      // However, Vara doesn't provide a direct destroy method
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [text, fontSize, strokeWidth, fontPath]);

  return <div id="vara-container" style={{ left: '5000px' }} ref={containerRef} className="z-[20]"></div>;
};

export default VaraText;