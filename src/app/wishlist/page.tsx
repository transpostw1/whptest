"use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { useWishlist } from "@/context/WishlistContext";
// import * as Icon from "@phosphor-icons/react/dist/ssr";

// const Wishlist = () => {
//   const [type, setType] = useState<string | undefined>();
//   const [isProductInWishlist, setIsProductInWishlist] = useState(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { wishlistItems, removeFromWishlist } = useWishlist();
//   const handleType = (type: string) => {
//     setType((prevType) => (prevType === type ? undefined : type));
//   };

//   return (
//     <>
//       <div className="shop-product breadcrumb1 ">
//         <div className="container">
//           <div className="list-product-block relative">
//             {/* <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
//               <div className="left flex has-line items-center flex-wrap gap-5"></div>
//               <div className="right flex items-center gap-3">
//                 <div className="select-block filter-type relative">
//                   <select
//                     className="caption1 py-2 pl-3 md:pr-12 pr-8 rounded-lg border border-line capitalize"
//                     name="select-type"
//                     id="select-type"
//                     onChange={(e) => handleType(e.target.value)}
//                     value={type === undefined ? "Type" : type}
//                   >
//                     <option value="Type" disabled>
//                       Type
//                     </option>
//                     {[
//                       "Rings",
//                       "Earrings",
//                       "Pendants",
//                       "Chains",
//                       "Bangles",
//                       "Necklaces",
//                       "NosePin",
//                     ].map((item, index) => (
//                       <option
//                         key={index}
//                         className={`item cursor-pointer ${
//                           type === item ? "active" : ""
//                         }`}
//                       >
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                   <Icon.CaretDown
//                     size={12}
//                     className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
//                   />
//                 </div>
//               </div>
//             </div> */}
//             <div>
//               <div className="list-product hide-product-sold grid md:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7 mb-5">
//                 {wishlistItems.map((product, index) => (
//                   <div key={index} className="relative border border-red-500 w-80 p-4">
//                     <div className="product-card">
//                       <div className="product-image">
//                         {/* Use proper source for the Image component */}
//                         <Image
//                           src={product.image_path}
//                           alt="A Rosica Gold Earrings"
//                           width={300}
//                           height={300}
//                         />
//                       </div>
//                       <div className="product-details">
//                         <h3 className="product-name text-title duration-300 text-xl">
//                           {product.title}
//                         </h3>
//                         <div className="flex items-center gap-2">
//                           <p className="product-price flex flex-col">
//                             <span className="discounted-price text-title text-lg ">
//                               ₹{product.discountPrice}
//                             </span>
//                           </p>
//                           <p>
//                             <span className="original-price line-through text-[#beb3b3]">
//                               ₹{product.productPrice}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="product-actions  absolute right-4 bottom-20">
//                       <Icon.Heart
//                         size={25}
//                         color="#fa0000"
//                         weight="fill"
//                         onClick={() => removeFromWishlist(product.productId)}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Wishlist;

import React, { useState } from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
const router = useRouter();

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };

  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <div className="list-product-block relative">
          <div className="list-product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
            {wishlistItems.map((product, index) => (
              <div
                key={index}
                className="relative"
                onClick={() => router.push(`/products/${product.url}`)}
              >
                <div className="product-card p-4">
                  <div className="product-image">
                    <Image
                      src={product.image_path}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  </div>
                  <div className="product-details mt-4">
                    <h3 className="product-name text-title text-xl truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="product-price flex flex-col">
                        <span className="discounted-price text-title text-lg">
                          ₹{product.discountPrice}
                        </span>
                        <span className="original-price line-through text-[#beb3b3]">
                          ₹{product.productPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E26178] text-center font-semibold text-lg rounded-full">
                    Buy Now
                  </div>
                </div>
                <div className="product-actions absolute top-2 right-2">
                  <button
                    className="heart-icon"
                    onClick={() => removeFromWishlist(product.productId)}
                  >
                    <Icon.Heart size={25} color="#fa0000" weight="fill" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
