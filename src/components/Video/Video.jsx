import React, { useState, useRef } from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoOverlayProducts from './VideoOverlayProducts'; // Import the new component

const Video = ({ src, products }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    const currentState = !isMuted;
    setIsMuted(currentState);
    if (videoRef.current) {
      videoRef.current.muted = currentState;
    }
  };
  const handleLike = () => {
    // Logic for liking the video
    console.log('Like button clicked');
  };

  const handleShare = () => {
    // Logic for sharing the video
    console.log('Share button clicked');
  };
  return (
    <div className="relative w-screen h-screen">
      {/* Fullscreen video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />

    <div className="absolute top-[65%] right-5 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-2">
            <div className='w-[60px] text-center bg-white rounded-full p-3'>
              <button onClick={handleShare} className=" focus:outline-none">
                <Icon.ShareNetwork size={25}/>
              </button>
            </div>
            <div className='w-[60px] text-center bg-white rounded-full p-3'>
            <button onClick={handleLike} className="text-[#ff2147] focus:outline-none">
              <Icon.Heart size={25}/>
            </button>
            </div>
    </div>
          
      {/* Mute/unmute button */}
      <button onClick={toggleMute} className="absolute top-5 left-5 z-20">
        {isMuted?<Icon.SpeakerX className="text-white" size={25}/>:<Icon.SpeakerHigh className="text-white" size={25}/>}
      
      </button>
      {/* Overlay products */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <VideoOverlayProducts products={products} />
      </div>
    </div>
  );
};

export default Video;
