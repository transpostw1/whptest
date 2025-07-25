import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import StickyNav from "../Header/StickyNav";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from 'next/link'
const dummyData = [
  {
    image: (
      <Image
        src={"/images/offers/icon_gold.png"}
        alt={"Gold Icon"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Gold",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_gemstone.png"}
        alt={"Icon Gemstone"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Gemstones",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_coin.png"}
        alt={"Icon Coin"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Coin",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_women.png"}
        alt={"Icon Women"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Women",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_men.png"}
        alt={"Icon Men"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Men",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_festive.png"}
        alt={"Icon Festive"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Festive",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_card.png"}
        alt={"Icon Cards"}
        width={80}
        height={80}
        unoptimized
      />
    ),
    title: "Cards",
  },
];
const OfferBanners = [
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_3_offer.png",
  "/images/offers/banner_4_offer.png",
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_3_offer.png",
];


const Offers = () => {
  const [offerBanners, setOfferBanners] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchSubBanners = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GET_ALLOFFERS = gql`
          query GetAllOffers {
            getAllOffers {
              id
              title
              url
              img
            }
          }
        `;
        const { data } = await client.query({
          query: GET_ALLOFFERS,
        });

        setOfferBanners(data.getAllOffers);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubBanners();
  }, []);

  return (
    <>
      <StickyNav />
      <div className="p-6">
        <div className="md:w-[60%] lg:w-[50%]">
          <p className="text-2xl font-semibold">OFFERS</p>
          <p>
            Indulge in exclusive offers. Unlock savings and special perks that
            make your experience with us even more memorable.
          </p>
        </div>
        <div className="mt-4">
          <Swiper
            slidesPerView={3.5}
            spaceBetween={10}
            breakpoints={{
              768: {
                slidesPerView: 6.5,
                spaceBetween: 20,
              },
            }}
          >
            {dummyData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div>{data.image}</div>
                  <p className="text-center">{data.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-5 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {offerBanners.map((item: any, index: any) => (
            <div key={index}>
              <Link href={{
                pathname:"/products",
                query:{
                  url:item.url
                }
              }}>
                <Image
                  src={item.img}
                  alt={"the offer banner"}
                  width={400}
                  height={400}
                  unoptimized
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offers;
