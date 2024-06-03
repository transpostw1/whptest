import React from 'react'
import Image from 'next/image';




 const gifts = [
   {
     id: 1,
     image: "/images/blog/Trending1.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
   {
     id: 2,
     image: "/images/blog/Trending2.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
   {
     id: 3,
     image: "/images/blog/Trending3.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
   {
     id: 4,
     image: "/images/blog/Trending4.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
   {
     id: 5,
     image: "/images/blog/Trending5.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
   {
     id: 6,
     image: "/images/blog/Trending6.png",
     title: "5 Mother's Day Gifts you can choose to Make Her Day Special",
   },
 ];

const Trending = () => {
  return (
    <div className="mx-auto px-4">
      <h1 className="text-3xl font-medium mb-4">Trending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={gift.image}
              alt={gift.title}
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{gift.title}</h3>
              <p className='text-sm mb-2'>
                Gold rings have long been cherished as timeless pieces of
                jewellery, adorning the fingers of women for centuries. From
                simple bands to intricate designs embellished..
              </p>
              <div className="flex items-center gap-2 ">
                <span className="inline-block border border-pink-500 text-pink-500 text-xs px-2 py-1 rounded-xl">
                  Fashion
                </span>
                <p className="text-sm text-gray-500">June,21,2050</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending
