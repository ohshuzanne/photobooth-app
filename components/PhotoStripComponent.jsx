'use client';
import { use, useRef, useState } from 'react';
import React from "react";
import html2canvas from 'html2canvas';

const PhotoStripComponent = ({ photos }) => {
    const stripRef = useRef(null);
    const timestamp = new Date().toLocaleDateString();

    const [stripColor, setStripColor] = useState('bg-white'); 
    const [textColor, setTextColor] = useState('text-black');

    const saveAsImage = async () => {
        if (!stripRef.current) return;

        const canvas = await html2canvas(stripRef.current, { backgroundColor: null, scale: 4, useCORS: true, imageTimeout: 0 });
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'photostrip.png';
        link.click();
    };

    //function to handle the color changes

    const handleStripColorChange = (color) => {
        if (color=='white'){
            setStripColor('bg-white');
            setTextColor('text-black');
        } else if (color=='black'){
            setStripColor('bg-black');
            setTextColor('text-white');
        } else if (color=='blue'){
            setStripColor('bg-rose-900');
            setTextColor('text-white');
        }
    }

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="mb-4 flex gap-2">
                <button onClick={() => handleStripColorChange('white')} className="px-4 py-1 border border-black bg-white text-black font-Ruda">White</button>
                <button onClick={() => handleStripColorChange('black')} className="px-4 py-1 border border-black bg-black text-white font-Ruda">Black</button>
                <button onClick={() => handleStripColorChange('blue')} className="px-4 py-1 border border-black bg-rose-900 text-white font-Ruda">Red</button>
            </div>

            <div ref={stripRef} className={`relative ${stripColor} border-[1px] border-black p-4 flex flex-col items-center`}>
                <div className="flex flex-col items-center">
                    {photos.slice(0, 4).map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`photo-${index}`}
                            className="w-42 h-32 border-[1px] border-black mb-2"
                        />
                    ))}
                </div>
                <p className={`mt-4 text-lg font-semibold font-Orbitron ${textColor}`}>idealphoto</p>
                <p className={`mt-4 text-xs font-semibold font-Ruda self-end text-right ${textColor}`}>{timestamp}</p>
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