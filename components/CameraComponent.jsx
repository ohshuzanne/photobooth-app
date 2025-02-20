'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { assets } from '@/assets/assets';

const CameraComponent = ({ photos, setPhotos }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showReady, setShowReady] = useState(false);
  const [overlaysEnabled, setOverlaysEnabled] = useState(false);
  const [availableOverlays] = useState([
    assets.overlay, assets.overlay2, assets.overlay3, assets.overlay4]); 
  const [selectedOverlays, setSelectedOverlays] = useState([]);

  const startCaptureSequence = async () => {
    setIsCapturing(true);
    setPhotos([]); 

    for (let i = 0; i < 4; i++) {
      setShowReady(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowReady(false);

      for (let j = 3; j >= 1; j--) {
        setCountdown(j);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setCountdown(null);
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos(prevPhotos => [
          ...prevPhotos, 
          { src: imageSrc, overlay: overlaysEnabled && selectedOverlays[i] ? selectedOverlays[i].src : null }
        ]);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsCapturing(false);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white text-white border-[1px] border-black relative">
      <div className="relative w-80 h-60 border-[1px] border-black">
      <Webcam 
        audio={false} 
        mirrored={true} 
        ref={webcamRef} 
        screenshotFormat="image/jpeg" 
        className="w-full h-full"
      />

      {showReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-semibold font-Ruda z-20">
          Ready?
        </div>
      )}

      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-6xl font-semibold font-Ruda z-20">
          {countdown}
        </div>
      )}
    </div>

      {/* Overlay Selection Button */}
      <button
        onClick={() => setOverlaysEnabled(!overlaysEnabled)}
        disabled={isCapturing}
        className={`mt-4 px-6 py-2 font-Ruda font-semibold border-[1px] border-black transition-all 
          ${isCapturing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
      >
        {overlaysEnabled ? "Disable Overlays" : "Enable Overlays"}
      </button>

      {/* Overlay Selection Dropdown */}
      {overlaysEnabled && (
        <div className="mt-4">
          <h3 className="text-black font-semibold font-Ruda">Select 4 Overlays:</h3>
          <div className="grid grid-cols-4 gap-2">
            {availableOverlays.map((overlay, index) => (
              <img 
                key={index} 
                src={overlay?.src || ''} 
                alt={`overlay-option-${index}`} 
                className={`w-20 h-20 cursor-pointer border-[1px] border-black ${selectedOverlays.includes(overlay) ? 'border-[3px] border-lime-500' : ''}`}
                onClick={() => {
                  if (selectedOverlays.includes(overlay)) {
                    setSelectedOverlays(selectedOverlays.filter(o => o !== overlay));
                  } else if (selectedOverlays.length < 4) {
                    setSelectedOverlays([...selectedOverlays, overlay]);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={startCaptureSequence}
        disabled={isCapturing || selectedOverlays.length < 4}
        className={`mt-4 px-6 py-2 font-Ruda font-semibold border-[1px] border-black transition-all 
          ${isCapturing || selectedOverlays.length < 4 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
      >
        {isCapturing ? 'Capturing...' : 'Capture!'}
      </button>

      <div className="flex flex-wrap gap-2 mt-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img src={photo.src} className="w-32 h-24 border-[1px] border-black" alt={`photo-${index}`} />
            {photo.overlay && (
              <img src={photo.overlay} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" alt={`overlay-${index}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraComponent;
