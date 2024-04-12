import React from "react";
import Link from "next/link";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileImage from "@/components/Profile/ProfileImage";
import ProfileDetails from "@/components/Profile/ProfileDetails";


const ProfilePage = () => {
  return (
    <div className="flex">
      <div className="lg:w-96 md:w-56">
        <h1 className="font-sans lg:text-5xl md:text-3xl hidden sm:block p-5">
          My Account
        </h1>
        <ProfileSidebar />
      </div>
      <div className="w-screen ">
        <div className="flex flex-wrap items-center justify-between mt-6">
          <ProfileImage />
          <Link className="lg:mr-24 md:mr-20" href={"#/"}>
            {" "}
            Edit Profile
          </Link>
        </div>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfilePage;