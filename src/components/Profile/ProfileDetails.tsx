import React from "react";
import { AiFillEdit } from "react-icons/ai";

const ProfileDetails = () => {
  return (
    <div className="mt-10 m-24">
      <form>
        <div className="grid gap-7 md:grid-cols-2 items-center justify-center">
          <div>
            <label
              htmlFor="first_name"
              className="block text-md font-normal text-black"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-900 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-md font-normal text-black"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-900 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-md font-normal text-black"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-900 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-normal text-black"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-900 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
              placeholder="john@whp.com"
              required
            />
          </div>
        </div>
      </form>
      <div className="bg-white p-4 rounded-lg shadow-md relative mt-6">
        <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
        <ul>
          <li className="mb-2">123 Main Street, Cityville</li>
          <li className="mb-2">456 Elm Street, Townsville</li>
        </ul>
        <button className="absolute top-0 right-0 p-2 text-sm text-black hover:text-red-700">
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
