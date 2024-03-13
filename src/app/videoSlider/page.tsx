"use client";
import React, { useState, useEffect } from 'react';
import VideoFeed from"@/components/Video/Video"
import { useProductContext } from "@/context/ProductContext";
// import { Products } from '@/data/products';

const VideoSlider = () => {
  const [showModal, setShowModal] = useState(false);
  const { products, fetchData } = useProductContext();

  const videos = [
    { src: "/products/GERD23021256.mp4" },
    { src: "/products/GERD23021256.mp4" },
    { src: "/products/GERD23021256.mp4" },
    { src: "/products/GERD23021256.mp4" },
    // more videos...
  ];
  const video="/products/GERD23021256.mp4"

  useEffect(() => {
    if (showModal) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling on body
      document.body.style.overflow = 'auto';
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <button onClick={handleOpenModal}><img src={"/dummy/Group_38486.png"} alt='this is video slider'/></button>
      {showModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button onClick={handleCloseModal} className="fixed top-5 right-5 bg-white text-black p-2 rounded-full z-50">Close</button>
          <VideoFeed src={video} products={products} />
        </div>
      )}
    </div>
  );
};

export default VideoSlider;