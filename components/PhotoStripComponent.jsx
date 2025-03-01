'use client';
import { useRef, useState } from 'react';
import React from "react";
import { assets } from "@/assets/assets";
import html2canvas from 'html2canvas';

const PhotoStripComponent = ({ photos }) => {
    const stripRef = useRef(null);
    const timestamp = new Date().toLocaleDateString();
    const [stripColor, setStripColor] = useState('white');
    
    const saveAsImage = async () => {
        if (!stripRef.current) return;
    
        const canvas = await html2canvas(stripRef.current, { backgroundColor: null, scale: 4, useCORS: true, imageTimeout: 0 });
        const dataURL = canvas.toDataURL('image/png');
    
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'photostrip.png';
        link.click();
    };
    
    const colorClasses = {
        white: 'bg-white border-white text-black',
        black: 'bg-black border-black text-white',
        red: 'bg-rose-900 border-rose-900 text-white'
    };
    
    return (
        <div className="flex flex-col items-center mt-6">
            <div className="mb-4 flex gap-2">
                <button onClick={() => setStripColor('white')} className="px-4 py-1 border border-black bg-white text-black font-Ruda">White</button>
                <button onClick={() => setStripColor('black')} className="px-4 py-1 border border-black bg-black text-white font-Ruda">Black</button>
                <button onClick={() => setStripColor('red')} className="px-4 py-1 border border-black bg-rose-900 text-white font-Ruda">Red</button>
            </div>
    
            <div ref={stripRef} className={`relative p-4 flex flex-col items-center border-[1px] ${colorClasses[stripColor]}`}>
                {photos.slice(0, 4).map((photo, index) => (
                    <div key={index} className={`relative w-42 h-30 mb-2 border-[1px] ${colorClasses[stripColor]}`}>
                        <img src={photo.src} alt={`photo-${index}`} className="w-full h-full" />
                        {photo.overlay && (
                            <img src={photo.overlay} alt="Overlay" className="absolute inset-0 w-full h-full pointer-events-none z-10" />
                        )}
                    </div>
                ))}
    
                <img src={assets.fullidealphotologo.src} alt="Full logo" className="w-40 h-fit mt-2" />
                <p className={`mt-4 text-xs font-semibold font-Ruda self-end text-right`}>{timestamp}</p>
            </div>
            <button
                onClick={saveAsImage}
                className="mt-4 px-6 py-2 bg-gradient-to-b from-white to-lime-300 text-black font-Ruda font-semibold border-[1px] border-black hover:bg-pink-400 transition-all"
            >
                Save as PNG
            </button>
        </div>
    );
};

export default PhotoStripComponent;
