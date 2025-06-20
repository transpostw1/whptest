"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlProductionUrl, graphqlProductUrl } from "@/utils/constants";
import ViewSimilar from "../Product/ViewSimilar";

const ProductSlider = () => {
  const swiperRef = useRef<any>();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewSimilarProducts, setViewSimilarProducts] = useState(false);
  const [similarProductId, setSimilarProductId] = useState<number | null>(null);

  const handleViewSimilarProducts = (productId: number) => {
    setSimilarProductId(productId);
    setViewSimilarProducts(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          // uri: "http://localhost:8080/",
          uri: graphqlProductUrl,
          cache: new InMemoryCache(),
        });

        const BEST_SELLER = gql`
          query BestSeller {
            bestSeller {
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
              variants
              similarProductIds
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
          query: BEST_SELLER,
        });
        // const response = await axios.get(`${baseUrl}/best-sellers`);
        setData(await data.bestSeller);
        // console.log("BEST SELLer", data.bestSeller);
      } catch (error) {
        console.log();
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  if (!data || data.length == 0) return null;
  return (
    <>
      <div className="tab-features-block pt-10">
        <div className="container">
          <div className="flex justify-between">
            <div>
              <p className="text-[1.5rem] font-medium uppercase">BestSellers</p>
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
                  slidesPerView: 1.3,
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
            <div className="list-product hide-product-sold section-swiper-navigation style-outline style-border mt-6 md:mt-10">
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
                {Array.isArray(data) &&
                  data
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

export default ProductSlider;
