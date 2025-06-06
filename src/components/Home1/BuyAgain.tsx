"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ViewSimilar from "../Product/ViewSimilar";

const BuyAgain = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const swiperRef = useRef<any>();
  const [viewSimilarProducts, setViewSimilarProducts] = useState(false);
  const [similarProductId, setSimilarProductId] = useState<number | null>(null);

  const handleViewSimilarProducts = (productId: number) => {
    setSimilarProductId(productId);
    setViewSimilarProducts(true);
  };

  useEffect(() => {
    const getData = async () => {
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      try {
        setLoading(true);
        const getAuthHeaders = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };
        const link = new HttpLink({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
        });
        const client = new ApolloClient({
          link,
          cache: new InMemoryCache(),
        });
        const Buy_Again = gql`
          query GetBuyAgainProducts {
            getBuyAgainProducts {
              productId
              url
              SKU
              title
              productPrice
              discountPrice
              typeOfDiscount
              discountCategory
              discountActive
              discountValue
              rating
              variants
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
          query: Buy_Again,
        });
        setData(await data.getBuyAgainProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className="tab-features-block pt-10">
          <div className="container">
            {data.length > 0 && (
              <>
                <div className="flex justify-between">
                  <div>
                    <p className="text-[1.5rem] font-medium uppercase">
                      your opinion sparkles too
                    </p>
                  </div>
                  <div className="flex">
                    <button onClick={() => swiperRef.current.slidePrev()}>
                      <Icon.CaretLeft size={30} />
                    </button>
                    <button onClick={() => swiperRef.current.slideNext()}>
                      <Icon.CaretRight size={30} />
                    </button>
                  </div>
                </div>
                <p className="my-1">Share your review on recent purchase</p>
              </>
            )}
            {loading ? (
              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                className="flex"
                modules={[Navigation, Autoplay]}
                zoom
                breakpoints={{
                  576: {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
              >
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="hide-product-sold section-swiper-navigation style-outline style-border mt-6 md:mt-10">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1.5}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  loop={true}
                  modules={[Navigation, Autoplay]}
                  breakpoints={{
                    576: {
                      slidesPerView: 1.5,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {data
                    .filter((prd: any) => prd.imageDetails !== null)
                    .map((prd: any, index: any) => (
                      <SwiperSlide key={index}>
                        <DummyProduct
                          data={prd}
                          onViewSimilar={handleViewSimilarProducts}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      )}
      {viewSimilarProducts && similarProductId && (
        <ViewSimilar
          showComponent={viewSimilarProducts}
          handleViewSimilarProducts={() => setViewSimilarProducts(false)}
          productId={similarProductId}
        />
      )}
    </>
  );
};

export default BuyAgain;
