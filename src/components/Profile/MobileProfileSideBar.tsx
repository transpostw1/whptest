import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { setSourceMapsEnabled } from "process";
import UpdateProfile from "./UpdateProfile";


const MobileProfileSideBar = () => {
  const router = useRouter();
  const { logOut, userDetails } = useUser();
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
          <p className="mt-2 text-xl font-semibold">
            {" "}
            {userDetails?.firstname} {userDetails?.lastname}
          </p>
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
          <Link href={"/profile/customerOrders"}>
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
          </Link>
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
    </div>
  );
};

export default MobileProfileSideBar;
