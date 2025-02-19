'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = ({ photos, setPhotos }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const startCaptureSequence = async () => {
    setIsCapturing(true);
    setPhotos([]); 

    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 1; j--) {
        setCountdown(j);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }

      setCountdown(null); 

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos(prevPhotos => [...prevPhotos, imageSrc]);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsCapturing(false);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white text-white border-[1px] border-black relative">
      <div className="relative">
        <Webcam
          audio={false}
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-320 h-180 border-[1px] border-black"
        />
        
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-6xl font-semibold font-Ruda">
            {countdown}
          </div>
        )}
      </div>

      <button
        onClick={startCaptureSequence}
        disabled={isCapturing}
        className={`mt-4 px-6 py-2 font-Ruda font-semibold border-[1px] border-black transition-all 
          ${isCapturing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
      >
        {isCapturing ? 'Capturing...' : 'Capture!'}
      </button>

      <div className="flex flex-wrap gap-2 mt-4 relative">
        {photos.map((photo, index) => (
          <img key={index} src={photo} className="w-32 h-24 border-[1px] border-black" alt={`photo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CameraComponent;
