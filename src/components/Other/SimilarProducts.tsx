"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlProductUrl } from "@/utils/constants";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";


interface Props {
  productId: number;
}

const SimilarProducts: React.FC<Props> = ({ productId }) => {
  const [products, setProducts] = useState<any>([]);
  const swiperRef = useRef<any>();
  const product: number = Number(productId);
  const productIdInt = typeof productId === "string" ? parseInt(productId, 10) : productId;

  useEffect(() => {
    if (!productId) return;

    const getData = async () => {
      try {
        const client = new ApolloClient({
          uri: graphqlProductUrl,
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
          variables: { productId:productIdInt },
          fetchPolicy: "no-cache",
        });

        setProducts(data.similarProducts); 
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    getData();
  }, [productId]);

  const filteredProducts = products;
  return (
    <>
      <div className="tab-features-block pt-10">
        <div className="container">
          <div className="flex justify-between">
            {products.length > 0 && (
              <>
                <div>
                  <p className="text-[1.5rem] font-semibold uppercase">
                    View Similar Products
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
              </>
            )}
          </div>

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
              {filteredProducts.map((prd: any, index: any) => (
                <SwiperSlide key={index}>
                  <DummyProduct data={prd} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
