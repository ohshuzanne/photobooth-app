'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = ({ photos, setPhotos }) => {
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPhotos([...photos, imageSrc].slice(-4)); 
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white text-white border-[1px] border-black">
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-320 h-180 border-[1px] border-black"
      />
      <button
        onClick={capturePhoto}
        className="mt-4 px-6 py-2 bg-gradient-to-b from-white to-lime-300 text-black font-Ruda font-semibold border-[1px] border-black hover:bg-pink-400 transition-all"
      >
        Capture!
      </button>
      <div className="flex flex-wrap gap-2 mt-4">
        {photos.map((photo, index) => (
          <img key={index} src={photo} className="w-32 h-24 border-[1px] border-black " alt={`photo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CameraComponent;
