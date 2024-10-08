import React, { useState, useEffect, useRef } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoOverlayProducts from "./VideoOverlayProducts";

const Video = ({ src, id, playList }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [products, setProducts] = useState([]);

  const toggleMute = () => {
    const currentState = !isMuted;
    setIsMuted(currentState);
    if (videoRef.current) {
      videoRef.current.muted = currentState;
    }
  };

  const handleLike = () => {
    console.log("Like button clicked");
  };

  const handleShare = () => {
    console.log("Share button clicked");
  };

  useEffect(() => {
    const product = playList
      .filter((item) => item.id === id)
      .map((item) => item.productDetails);

    setProducts(product.flat());
  }, [playList, id]);
  useEffect(() => {
    console.log("Reels Id", id);
  }, [id]);
  return (
    <div className="relative h-screen w-screen">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        className="absolute left-0 top-0 z-10 h-full w-full object-cover"
      />

      <div className="absolute right-5 top-[65%] z-20 flex -translate-y-1/2 transform flex-col items-center space-y-2">
        <div className="h-[50px] w-[50px] rounded-full bg-white p-3 text-center">
          <button
            onClick={handleShare}
            className="text-center focus:outline-none"
          >
            <Icon.ShareNetwork size={30} />
          </button>
        </div>
        {/* <div className="w-[50px] h-[50px] text-center bg-white rounded-full p-3">
          <button
            onClick={handleLike}
            className="text-[#ff2147] focus:outline-none text-center"
          >
            <Icon.Heart size={30} />
          </button>
        </div> */}
      </div>

      <button onClick={toggleMute} className="absolute left-5 top-5 z-20">
        {isMuted ? (
          <Icon.SpeakerX className="text-white" size={30} />
        ) : (
          <Icon.SpeakerHigh className="text-white" size={30} />
        )}
      </button>
      <div className="absolute bottom-0 z-20 w-full">
        <VideoOverlayProducts products={products} />
      </div>
    </div>
  );
};

export default Video;
