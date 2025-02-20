'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { assets, overlayCategories } from '@/assets/assets';

const CATEGORIES = {
  All: overlayCategories.all,
  Boynextdoor: overlayCategories.Boynextdoor,
  Aespa: overlayCategories.Aespa,
  Enhypen: overlayCategories.Enhypen,
  Lesserafim: overlayCategories.Lesserafim,
};

const OVERLAYS_PER_PAGE = 20;

const CameraComponent = ({ photos, setPhotos }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showReady, setShowReady] = useState(false);
  const [overlaysEnabled, setOverlaysEnabled] = useState(false);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOverlays, setSelectedOverlays] = useState([]);
  const [currentOverlayIndex, setCurrentOverlayIndex] = useState(0);

  const availableOverlays = CATEGORIES[category] || [];

  // Pagination logic
  const totalPages = Math.ceil(availableOverlays.length / OVERLAYS_PER_PAGE);
  const paginatedOverlays = availableOverlays.slice(
    currentPage * OVERLAYS_PER_PAGE,
    (currentPage + 1) * OVERLAYS_PER_PAGE
  );

  const startCaptureSequence = async () => {
    setIsCapturing(true);
    setPhotos([]);

    for (let i = 0; i < 4; i++) {
      setCurrentOverlayIndex(i);
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

        {/* Overlay on Webcam Preview (During Capture) */}
        {overlaysEnabled && isCapturing && selectedOverlays[currentOverlayIndex] && (
          <img
            src={selectedOverlays[currentOverlayIndex].src}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
            alt="overlay-preview"
          />
        )}

        {/* Ready Indicator */}
        {showReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-semibold font-Ruda z-20">
            Ready?
          </div>
        )}

        {/* Countdown */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-6xl font-semibold font-Ruda z-20">
            {countdown}
          </div>
        )}
      </div>

      {/* Overlay Selection Toggle */}
      <button
        onClick={() => setOverlaysEnabled(!overlaysEnabled)}
        disabled={isCapturing}
        className={`mt-4 px-6 py-2 font-Ruda font-semibold border-[1px] border-black transition-all 
          ${isCapturing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
      >
        {overlaysEnabled ? "Disable Overlays" : "Enable Overlays"}
      </button>

      {/* Overlay Selection */}
      {overlaysEnabled && (
        <div className="mt-4 w-full flex flex-col items-center">
          {/* Category Dropdown */}
          <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="mb-4 px-3 py-2 border-[1px] border-black bg-white text-black font-Ruda"
            >
              {Object.keys(CATEGORIES).map((cat) => (
                <option key={cat} value={cat} className="font-Ruda">
                  {cat}
                </option>
              ))}
            </select>

          <div className="grid grid-cols-4 gap-2">
            {paginatedOverlays.map((overlay, index) => (
              <img
                key={index}
                src={overlay?.src || ''}
                alt={`overlay-option-${index}`}
                className={`w-20 h-20 cursor-pointer border-[1px] border-black 
                  ${selectedOverlays.includes(overlay) ? 'border-[3px] border-lime-500' : ''}`}
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

          <div className="flex justify-between w-full mt-4">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              className={`px-4 py-2 border-[1px] border-black font-Ruda 
                ${currentPage === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
            >
              Previous
            </button>
            <span className="text-black font-Ruda">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              className={`px-4 py-2 border-[1px] border-black font-Ruda 
                ${currentPage >= totalPages - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

    <button
      onClick={startCaptureSequence}
      disabled={isCapturing || (overlaysEnabled && selectedOverlays.length < 4)}
      className={`mt-4 px-6 py-2 font-Ruda font-semibold border-[1px] border-black transition-all 
        ${isCapturing || (overlaysEnabled && selectedOverlays.length < 4) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-b from-white to-lime-300 text-black hover:bg-pink-400'}`}
    >
      {isCapturing ? 'Capturing...' : 'Capture!'}
    </button>

    </div>
  );
};

export default CameraComponent;