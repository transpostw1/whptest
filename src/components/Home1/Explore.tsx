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
    image: "/images/category/Bracelet.jpg" // Place your images in the public folder
  },
  {
    id: 2,
    parentTitle: "Swarnak",
    title: "Most Popular",
    url: "/trending",
    image: "/images/category/RingsCategory.jpg"
  },
  {
    id: 3,
    parentTitle: "Speciall",
    title: "Limited Edition",
    url: "/special-offers",
    image: "/images/category/Chains.jpg"
  }
];

const Explore = () => {
  return (
    <section className="py-12 px-2  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center justify-center">
        {dummyData.map((item) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm"
          >
            <Link href={item.url}>
              <div className="aspect-[4/5] relative">
                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 py-3 text-white">
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.parentTitle}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Explore;


