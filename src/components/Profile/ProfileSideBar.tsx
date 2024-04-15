import React from "react";

function ProfileSidebar() {
  return (
    <div>
      <div className="hidden sm:block mt-7 p-5 w-56 h-[30rem] lg:ml-10">
        <div className="w-full p-4 text-center flex flex-col  gap-6 font-medium ">
          <a
            href="#/"
            className="flex items-center p-2 text-black  hover:bg-gray-700"
          >
            <span className="flex-1 whitespace-nowrap">My Profile</span>
          </a>
          <a
            href="#/"
            className="flex items-center p-2  text-black hover:bg-gray-700"
          >
            <span className="flex-1 whitespace-nowrap">My Orders</span>
          </a>
          <a
            href="#/"
            className="flex items-center p-2  text-black hover:bg-gray-700"
          >
            <span className="flex-1 whitespace-nowrap">My Wishlist</span>
          </a>
          <a
            href="#/"
            className="flex items-center p-2  text-black hover:bg-gray-700"
          >
            <span className="flex-1 whitespace-nowrap">GMS</span>
          </a>
          <a
            href="#/"
            className="flex items-center p-2  text-black hover:bg-gray-700"
          >
            <span className="flex-1 whitespace-nowrap">GMS</span>
          </a>
        </div>
        <a
          href="#/"
          className="flex items-center p-2  text-black hover:bg-gray-700 text-center mt-48"
        >
          <span className="flex-1 whitespace-nowrap">LogOut</span>
        </a>
      </div>
    </div>
  );
}

export default ProfileSidebar;
