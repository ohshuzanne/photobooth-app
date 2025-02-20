'use client';
import { useState } from "react";
import CameraComponent from "@/components/CameraComponent";
import PhotoStripComponent from "@/components/PhotoStripComponent";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [overlaysEnabled, setOverlaysEnabled] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-white text-black pb-10">
      <div className="flex items-center gap-4">
        <Image src={assets.idealphotologo} alt="Ideal Photo Logo" className="w-14 h-14" />
        <h1 className="text-4xl font-semibold font-Orbitron text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)' }}>
          idealphoto
        </h1>
      </div>

      <div className="flex flex-row items-center justify-center gap-x-20">
        <CameraComponent setPhotos={setPhotos} photos={photos} overlaysEnabled={overlaysEnabled} setOverlaysEnabled={setOverlaysEnabled} />
        {photos.length > 0 && <PhotoStripComponent photos={photos} />}
      </div>
    </div>
  );
}
