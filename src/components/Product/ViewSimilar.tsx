import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlUrlnew } from "@/utils/constants";
import DummyProduct from "../Other/DummyProduct";
import Skeleton from "react-loading-skeleton";
import { Autoplay, Navigation } from "swiper/modules";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

interface ViewSimilarProps {
  handleViewSimilarProducts: () => void;
  showComponent: boolean;
  productId: number;
}

const ViewSimilar: React.FC<ViewSimilarProps> = ({
  showComponent,
  handleViewSimilarProducts,
  productId,
}) => {
  const swiperRef = useRef<any>();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!productId) return;

    const getData = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          uri: graphqlUrlnew,
          cache: new InMemoryCache(),
        });

        const GET_SIMILAR_PRODUCTS = gql`
          query SimilarProducts($productId: Int!) {
            similarProducts(productId: $productId) {
              productId
              url
              SKU
              title
              productPrice
              discountPrice
              typeOfDiscount
              discountActive
              discountCategory
              discountValue
              rating
              imageDetails {
                image_path
              }
              videoDetails {
                video_path
              }
            }
          }
        `;

        const { data } = await client.query({
          query: GET_SIMILAR_PRODUCTS,
          variables: { productId },
          fetchPolicy: "no-cache", // Ensures fresh data
        });

        setData(data.similarProducts); // Set only the array
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [productId]);

  if (!showComponent) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end bg-black bg-opacity-50">
      <motion.div
        className="relative bottom-0 w-full bg-white p-3 shadow-lg"
        initial={{
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1,
        }}
        animate={{
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div
          onClick={handleViewSimilarProducts}
          className="flex cursor-pointer justify-end"
        >
          <Icon.X size={25} />
        </div>
        <div className="flex justify-between">
          <p className="text-[1.5rem] font-semibold uppercase">
            Similar Products
          </p>
          <div className="flex">
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <Icon.CaretLeft size={30} />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <Icon.CaretRight size={30} />
            </button>
          </div>
        </div>
        {loading ? (
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: { slidesPerView: 1.3, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {[...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton height={300} width={200} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="list-product mt-6 md:mt-10">
            <Swiper
              spaceBetween={12}
              slidesPerView={1.5}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop
              modules={[Navigation, Autoplay]}
              breakpoints={{
                576: { slidesPerView: 1.5, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
            >
              {data.length > 0 ? (
                data
                  .filter((prd: any) => prd.imageDetails !== null)
                  .map((prd: any) => (
                    <SwiperSlide key={prd.productId}>
                      <DummyProduct data={prd} />
                    </SwiperSlide>
                  ))
              ) : (
                <p className="mt-4 text-center">No similar products found.</p>
              )}
            </Swiper>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewSimilar;
