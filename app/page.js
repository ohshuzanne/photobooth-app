'use client';
import { useState } from "react";
import CameraComponent from "@/components/CameraComponent";
import PhotoStripComponent from "@/components/PhotoStripComponent";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [overlaysEnabled, setOverlaysEnabled] = useState(true);
  const [selectedOverlays, setSelectedOverlays] = useState([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-white text-black pb-10">
      
      {/* Logo & Title */}
      <div className="flex items-center gap-4 mb-6">
        <Image src={assets.idealphotologo} alt="Ideal Photo Logo" className="w-14 h-14" />
        <h1 className="text-4xl font-semibold font-Orbitron text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)' }}>
          idealphoto
        </h1>
      </div>

      <div className="flex flex-row items-start justify-center gap-10 w-full max-w-5xl">
        
        {/* Camera Component */}
        <div className="flex-1 flex justify-center mt-10">
          <CameraComponent 
            setPhotos={setPhotos} 
            photos={photos} 
            overlaysEnabled={overlaysEnabled} 
            setOverlaysEnabled={setOverlaysEnabled} 
            selectedOverlays={selectedOverlays} 
            setSelectedOverlays={setSelectedOverlays} 
          />
        </div>

        {/* Photo Strip Component */}
        <div className="flex-1 flex justify-center">
          {photos.length > 0 && <PhotoStripComponent photos={photos} />}
        </div>

      </div>
    </div>
  );
}
