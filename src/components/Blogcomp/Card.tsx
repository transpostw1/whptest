import React from 'react'

const Card = () => {
  return (
    <div className="rounded-lg shadow-md p-6 mx-4 my-8 flex flex-col items-center md:flex-row md:items-start md:justify-between border bg-[#FDF6F7] max-w-max">
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
          <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#E26178]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card
