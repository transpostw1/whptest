// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { baseUrl, getSubBanners, graphqlbaseUrl } from "@/utils/constants";
// import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
// import axios from "axios";
// const Explore = () => {
//   const [data, setData] = useState<any>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchSubBanners = async () => {
//       try {
//         setLoading(true);
//         const client = new ApolloClient({
//           uri: graphqlbaseUrl,
//           cache: new InMemoryCache(),
//         });
//         const GET_ALLSUBBANNERS = gql`
//           query GetAllSubBanners {
//             getAllSubBanners {
//               id
//               parentTitle
//               title
//               url
//               image
//             }
//           }
//         `;
//         const { data } = await client.query({
//           query: GET_ALLSUBBANNERS,
//         });

//         setData(data.getAllSubBanners);
//       } catch (error) {
//         console.log("Error in fetching SubBanners", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubBanners();
//   }, []);

//   if (loading) {
//     return (
//       <div>
//         <Skeleton height={300} />
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="banner-block style-one grid sm:grid-cols-2 gap-1">
//         {data &&
//           data?.map((item: any) => (
//             <div key={item.id}>
//               <Link
//                 href={item.url}
//                 className="banner-item relative block overflow-hidden duration-500"
//               >
//                 <div className="banner-img">
//                   <Image
//                     src={item.image}
//                     width={2000}
//                     height={1300}
//                     alt="banner1"
//                     className="duration-1000 mr-1"
//                     unoptimized
//                   />
//                 </div>
//               </Link>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default Explore;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const dummyData = [
  {
    id: 1,
    parentTitle: "Anayra",
    title: "Latest Collection",
    url: "/new-arrivals",
    image: "/images/Newbanner/360x35.jpg",
    imageDesktop: "/images/Newbanner/405x506.jpg",
  },
  {
    id: 2,
    parentTitle: "Swarnak",
    title: "Most Popular",
    url: "/trending",
    image: "/images/Newbanner/360x35anayra.jpg", 
    imageDesktop: "/images/Newbanner/405x506anayra.jpg",
  },
  {
    id: 3,
    parentTitle: "Speciall",
    title: "Limited Edition",
    url: "/special-offers",
    image: "/images/Newbanner/Swarnak_.jpg", 
    imageDesktop: "/images/Newbanner/Swarnak.jpg",
  },
];

const Explore = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="group relative w-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Link href={item.url}>
              <div className="relative aspect-[16/6] md:aspect-[4/5]">
                {/* Mobile image */}
                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="block object-cover transition-transform duration-700 group-hover:scale-110 md:hidden"
                  priority
                />
                {/* Desktop image */}
                <Image
                  src={item.imageDesktop}
                  fill
                  alt={item.title}
                  className="hidden object-contain transition-transform duration-700 group-hover:scale-110 md:block"
                  priority
                />
                {/* <div className="absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/40" /> */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:py-3">
    <h3 className="text-center text-lg font-semibold md:text-xl">
      {item.parentTitle}
    </h3>
  </div> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Explore;
