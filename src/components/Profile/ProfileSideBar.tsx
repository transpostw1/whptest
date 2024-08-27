"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import AddDetailsModal from "./AddDetailsModal";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

interface Props {
  handleComponent: (args: string) => void;
  componentName: string;
  handleOrder: () => void;
}
const ProfileSidebar: React.FC<Props> = ({
  handleComponent,
  componentName,
  handleOrder,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { userDetails } = useUser();

  return (
    <div className="">
      <div className="my-div hidden h-full bg-[#E26178] bg-opacity-5 p-6 sm:block lg:flex lg:flex-col lg:justify-center">
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#E26178] text-[30px] text-white">
          {userDetails?.profile_picture ? (
            <Image
              src={userDetails?.profile_picture}
              className="h-full w-full rounded-full"
              alt="Profile Picture"
              width={90}
              height={100}
            />
          ) : (
            <Icon.UserCircle size={50} />
          )}
        </div>
        <div>
          <p className="mt-2 text-xl font-semibold">
            {userDetails?.fullname ? userDetails.fullname : 'Add Details'}
          </p><span
            className="mt-2 flex cursor-pointer text-[#e26178]"
            onClick={openModal}
          >
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
        </div>
        <div className="mt-3 flex w-full flex-col gap-4 text-center font-medium">
          <div
            className={`flex text-nowrap cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${componentName === "personalInfo" ? "profile-sidebar" : ""
              }`}
            onClick={() => handleComponent("personalInfo")}
          >
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            <p>Personal Information</p>
          </div>
          <div onClick={() => handleOrder()}>
            <div
              className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${componentName === "orders" ? "profile-sidebar" : ""
                }`}
              onClick={() => handleComponent("orders")}
            >
              <span className="mr-1">
                <Icon.Cube size={22} />
              </span>
              Orders
            </div>
          </div>
          <div
            className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${componentName === "wishlist" ? "profile-sidebar" : ""
              }`}
            onClick={() => handleComponent("wishlist")}
          >
            <span className="mr-1">
              <Icon.Heart size={22} />
            </span>
            Wishlist
          </div>
          <div
            className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${componentName === "gms" ? "profile-sidebar" : ""
              }`}
            onClick={() => handleComponent("gms")}
          >
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            GMS
          </div>
        </div>
      </div>
      <AddDetailsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfileSidebar;
