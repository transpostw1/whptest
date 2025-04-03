"use client";
import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import AddDetailsModal from "./AddDetailsModal";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";

const ProfileSidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const pathname = usePathname();
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
              unoptimized
            />
          ) : (
            <Icon.UserCircle size={50} />
          )}
        </div>
        <div>
          <div className="flex">
            <div>
              <p className="mt-2 text-xl font-semibold">
                {userDetails?.fullname ? userDetails.fullname : "Add Details"}
              </p>
            </div>
            <div className="ml-2 mt-3">
              {userDetails?.is_verified == 0 ? (
                <MdVerified size={23} color="#808080" />
              ) : (
                <MdVerified size={23} color="#0099ff" />
              )}
            </div>
          </div>
          <span
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
          <Link href={"/profile"}>
            <div
              className={`flex cursor-pointer items-center text-nowrap p-2 text-black hover:bg-[white] hover:text-[#e26178] ${
                pathname.endsWith("profile") ? "profile-sidebar" : ""
              }`}
            >
              <span className="mr-1">
                <Icon.UserCircle size={22} />
              </span>
              <p>Personal Information</p>
            </div>
          </Link>
          <div>
            {/* <Link href={"/profile/customerOrders"}>
              <div
                className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${
                  pathname.endsWith("customerOrders") ? "profile-sidebar" : ""
                }`}
              >
                <span className="mr-1">
                  <Icon.Cube size={22} />
                </span>
                Orders
              </div>
            </Link> */}

            <div
              className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${
                pathname.endsWith("customerOrders") ? "profile-sidebar" : ""
              }`}
              onClick={() => setTestModalOpen(true)}
            >
              <span className="mr-1">
                <Icon.Cube size={22} />
              </span>
              Orders
            </div>
          </div>
          <Link href={"/profile/customerWishlist"}>
            <div
              className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${
                pathname.endsWith("customerWishlist") ? "profile-sidebar" : ""
              }`}
            >
              <span className="mr-1">
                <Icon.Heart size={22} />
              </span>
              Wishlist
            </div>
          </Link>
          <Link href={"/profile/customerGMS"}>
            <div
              className={`flex cursor-pointer items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] ${
                pathname.endsWith("customerGMS") ? "profile-sidebar" : ""
              }`}
            >
              <span className="mr-1">
                <Icon.UserCircle size={22} />
              </span>
              GMS
            </div>
          </Link>
        </div>
      </div>
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="text-xl font-semibold">We Are Currently Down</h2>
            <p className="mt-2 text-gray-600">
              Our website is undergoing maintenance. We’ll be back shortly.
              Thank you for your patience!
            </p>
            <p className="mt-2 text-gray-600">For further updates contact Us</p>
            <div className="flex w-full flex-col justify-center lg:flex-row">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className=""
              >
                <Link href={"https://wa.me/918828324464"} target="_blank">
                  <div className="flex p-2 text-center">
                    <IoLogoWhatsapp
                      className="mr-1"
                      size={30}
                      color="#25D366"
                    />
                    <p className="text-md">+91 8828324464</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className=""
              >
                <Link
                  href="tel:1800222225"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex p-2">
                    <Icon.Phone
                      size={30}
                      color="#e26178"
                      weight="fill"
                      className="mr-1"
                    />
                    <p className="text-md">1800-222-225</p>
                  </div>
                </Link>
              </motion.div>
            </div>
            <button
              onClick={() => setTestModalOpen(false)}
              className="mt-4 rounded bg-[#e26178] px-4 py-2 text-white hover:bg-[#e74a67]"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <AddDetailsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfileSidebar;
