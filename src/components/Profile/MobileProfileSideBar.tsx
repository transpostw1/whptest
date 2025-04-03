import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { setSourceMapsEnabled } from "process";
import UpdateProfile from "./UpdateProfile";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";

const MobileProfileSideBar = () => {
  const router = useRouter();
  const { logOut, userDetails } = useUser();
    const [testModalOpen, setTestModalOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  const closeUpdateProfile = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col justify-center p-3">
      <div className="flex w-full flex-col items-center justify-center">
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
            <div className="ml-2 mt-2">
              {userDetails?.is_verified == 0 ? (
                <MdVerified size={22} color="#808080" />
              ) : (
                <MdVerified size={22} color="#0099ff" />
              )}
            </div>
          </div>
          <span
            className="mt-2 flex justify-center text-[#e26178]"
            onClick={() => setOpen(true)}
          >
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
          <UpdateProfile isOpen={open} isClose={closeUpdateProfile} />
        </div>
      </div>
      <div>
        <Link href={"/profile/customerInfo"}>
          <div
            className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
          >
            <div className="flex">
              <span className="mr-1">
                <Icon.UserCircle size={22} />
              </span>
              <p>Personal Information</p>
            </div>
            <div>
              <Icon.CaretRight weight="fill" />
            </div>
          </div>
        </Link>
        <div>
          {/* <Link href={"/profile/customerOrders"}>
            <div
              className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
            >
              <div className="flex">
                <span className="mr-1">
                  <Icon.Cube size={22} />
                </span>
                <p>Orders</p>
              </div>
              <div>
                <Icon.CaretRight weight="fill" />
              </div>
            </div>
          </Link> */}

          <div
            onClick={()=>setTestModalOpen(true)}
            className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
          >
            <div className="flex">
              <span className="mr-1">
                <Icon.Cube size={22} />
              </span>
              <p>Orders</p>
            </div>
            <div>
              <Icon.CaretRight weight="fill" />
            </div>
          </div>
        </div>
        <div>
          <Link href={"/profile/customerWishlist"}>
            <div
              className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
            >
              <div className="flex">
                <span className="mr-1">
                  <Icon.Heart size={22} />
                </span>
                <p>Wishlist</p>
              </div>

              <div>
                <Icon.CaretRight weight="fill" />
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
        >
          <Link href={"/profile/customerGMS"}>
            <div className="flex">
              <span className="mr-1">
                <Icon.UserCircle size={22} />
              </span>
              <p>GMS</p>
            </div>
          </Link>
          <div>
            <Icon.CaretRight weight="fill" />
          </div>
        </div>
      </div>
      <div
        className="mt-5 flex justify-center border border-[#e26178] p-2 text-[#e26178]"
        onClick={() => handleLogOut()}
      >
        Logout
      </div>
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-80 rounded-lg bg-white p-6 text-center shadow-lg">
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
    </div>
  );
};

export default MobileProfileSideBar;
