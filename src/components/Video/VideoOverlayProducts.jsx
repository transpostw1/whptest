import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const VideoOverlayProducts = ({ products }) => {
  const productCardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  console.log("Products", products);
  return (
    <div
      className="absolute bottom-0 flex w-full overflow-x-auto p-4"
      style={{ zIndex: 2 }}
    >
      {Array.isArray(products) &&
        products.map((product, index) => (
          <Link
            href={`/products/${product.productId}/${product.url}`}
            key={index}
          >
            <motion.div
              className="m-2 flex min-w-[350px] max-w-[550px] rounded-lg bg-white p-4 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                maxHeight: "120px",
              }}
              variants={productCardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              
                <Image
                  key={index}
                  src={product.imageDetails.image_path}
                  alt={product?.displayTitle}
                  height={22}
                  width={92}
                  className="rounded-md object-cover"
                  unoptimized
                />
              <div className="ml-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">
                  {product.displayTitle}
                </h3>

                <p className="text-gray-600">{product.productPrice}</p>
                <p className="text-lg text-[#e26178] hover:text-indigo-800">
                  View
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
    </div>
  );
};

export default VideoOverlayProducts;
