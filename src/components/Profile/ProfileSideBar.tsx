import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
interface Props {
  handleComponent: (args: string) => void;
  componentName: string;
}
const ProfileSidebar: React.FC<Props> = ({
  handleComponent,
  componentName,
}) => {
  return (
    <div>
      <div className="hidden sm:block  p-8 w-80 h-[30rem] bg-[#E26178] bg-opacity-5 lg:flex lg:flex-col lg:justify-center">
        <div className="flex text-white bg-[#E26178] w-[80px] h-[80px] rounded-full text-[30px] items-center justify-center">
          D
        </div>
        <div>
          <p className="text-xl font-semibold mt-2">Disha Jain</p>
          <span className="flex text-[#e26178] mt-2">
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
        </div>
        <div className="w-full  text-center flex flex-col  gap-4 font-medium mt-3">
          <div
            className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "personalInfo" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("personalInfo")}
          >
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            Personal Information
          </div>
          <div
            className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "orders" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("orders")}
          >
            <span className="mr-1">
              <Icon.Cube size={22} />
            </span>
            Orders
          </div>
          <div className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "wishlist" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("wishlist")}>
            <span className="mr-1">
              <Icon.Heart size={22} />
            </span>
            Wishlist
          </div>
          <div className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "gms" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("gms")}>
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            GMS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
