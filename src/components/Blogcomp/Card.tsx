import React from 'react'
import Image from 'next/image';

const Card = () => {
  return (
    <div className="rounded-lg shadow-md p-6 mx-4 my-8 flex flex-col items-center md:flex-row md:items-start md:justify-between border bg-[#FDF6F7] ">
      <div className=" w-full">
        <h2 className="md:text-2xl text-lg font-bold mb-4">
          Always Stay in the Sparkling Loop
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and be the first to access exclusive
          jewelry insights, style tips, and dazzling updates.
        </p>
        <div className="flex flex-col md:flex-row md:gap-0 gap-3 ">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            className="bg-[#E26178] text-white px-6 py-2 rounded-r-md hover:bg-[#c5435b] transition-colors duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
        <div className="relative">
          <span className="absolute -top-4 -left-4 text-[#E26178]">+</span>
          <span className="absolute -bottom-4 -right-4 text-[#E26178]">+</span>
          <div className="rounded-full w-28 h-28 flex items-center justify-center">
            <Image
              src="/images/blog/Vector.png"
              alt="abc"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
            {/* <img src="/images/blog/Vector.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
