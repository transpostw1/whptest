import React from 'react';
import Product from '@/components/Product/Productgraphql';
import ProductSkeleton from '@/components/Shop/ProductSkeleton';
import { ProductType } from '@/type/ProductType';
import { IoLogoWhatsapp } from 'react-icons/io';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as Icon from '@phosphor-icons/react/dist/ssr';

interface ProductListProps {
  filteredProducts: ProductType[];
  isLoading: boolean;
  productsListRef: React.RefObject<HTMLDivElement>;
  skuList: string[];
}

const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  isLoading,
  productsListRef,
  skuList,
}) => {
  if (filteredProducts.length > 0) {
    return (
      <div
        className="list-product hide-product-sold mb-5 mt-7 grid grid-cols-2 gap-[40px] max-sm:gap-[20px] md:grid-cols-2 lg:grid-cols-3"
        ref={productsListRef}
      >
        {filteredProducts.map((item: any) => (
          <div key={item.productId}>
            <Product data={item} skuList={skuList} />
          </div>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <div
      className="list-product hide-product-sold mb-5 mt-7 h-[500px] w-full gap-[40px] text-center sm:gap-[30px]"
      ref={productsListRef}
    >
      <h2 className="mb-1 text-2xl font-semibold text-gray-800">
        Can't find what you're looking for?
      </h2>
      <p className="italic">Don't worry — we're here to help!</p>
      <p className="leading-7">
        We'll help you find the perfect piece or even customize one just for you.
      </p>
      <p className="mb-6 text-lg text-gray-600">
        Chat with us on WhatsApp or give us a call.
      </p>

      <div className="flex w-full flex-col justify-center lg:flex-row">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Link href={"https://wa.me/917045613491"} target="_blank">
            <div className="flex p-2 text-center">
              <IoLogoWhatsapp className="mr-1" size={30} color="#25D366" />
              <p className="text-md">+91 7045613491</p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Link href="tel:1800222225" target="_blank" rel="noopener noreferrer">
            <div className="flex p-2">
              <Icon.Phone
                size={30}
                color="#e26178"
                weight="fill"
                className="mr-1"
              />
              <p className="text-md">1800-222-225</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList; 