import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const NavBar = () => {
  return (
    <>
      <nav className="p-4 w-full fixed top-0 left-0 z-50">
        <div className="flex items-center justify-between">
          <a href="">
            <Image
              src={assets.idealphotologo}
              alt="ideal photo's logo"
              className="w-20 h-20 cursor-pointer ml-4"
            />
          </a>
          <h1
            className="text-white text-center flex-grow text-4xl font-semibold font-Orbitron"
            style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 1)' }}
          >
            idealphoto
          </h1>
        </div>
      </nav>
    </>
  );
};

export default NavBar;