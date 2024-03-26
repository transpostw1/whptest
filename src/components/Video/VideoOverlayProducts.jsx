import React from 'react';
import { motion } from 'framer-motion';

const VideoOverlayProducts = ({ products }) => {
  const productCardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="absolute bottom-0 w-full flex overflow-x-auto p-4" style={{ zIndex: 2 }}>
      {products.map((product, index) => (
        <motion.div
          key={index}
          className="flex min-w-[350px] max-w-[550px] bg-white p-4 m-2 rounded-lg shadow-lg"
          style={{
                background: 'rgba(255, 255, 255, 0.8)', // This gives a white background with 80% opacity
                backdropFilter: 'blur(10px)', // Optional: to give a frosted glass effect
                maxHeight: '120px',
            }}
          variants={productCardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <img src={product.imageDetails[0].image_path} alt={product?.title} className="h-22 w-32 object-cover rounded-md" />
          <div className="ml-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.productPrice}</p>
            <a href={product.href} className="text-indigo-600 hover:text-indigo-800">View</a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoOverlayProducts;
