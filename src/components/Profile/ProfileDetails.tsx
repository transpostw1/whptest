import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";

const ProfileDetails = () => {
  const router = useRouter();
  const { logOut, isLoggedIn } = useUser();

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      console.log("this effecct is running")
     router.replace("/")
    }
  }, [isLoggedIn, router]);
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  return (
    <div className="mt-10 m-24">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-xl">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
        <div className="flex">
          <Icon.SignOut className="mt-1" />
          <p className="cursor-pointer" onClick={() => handleLogOut()}>
            Logout
          </p>
        </div>
      </div>
      <div className="relative w-[80px] h-[80px] mt-4">
        <div className="flex text-[#e26178] bg-[#E26178]  bg-opacity-5 w-[80px] h-[80px] rounded-full text-[30px] items-center justify-center">
          D
        </div>
        <div className="absolute top-2 right-0 w-[20px] h-[20px] rounded-full bg-[#e26178] text-white">
          <Icon.Pen />
        </div>
      </div>
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
              className="bg-gray-50  text-black text-md focus:ring-blue-500 block w-full p-2.5 "
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
              className="bg-gray-50 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
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
              className="bg-gray-50 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
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
              className="bg-gray-50 text-black text-md focus:ring-blue-500 block w-full p-2.5 "
              placeholder="john@whp.com"
              required
            />
          </div>
        </div>
      </form>
      <h2 className="text-xl font-semibold mb-3 mt-4">My Addresses</h2>
      <div className="flex bg-white p-4 rounded-lg shadow-md relative mt-6">
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
