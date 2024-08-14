import React ,{useState}from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setSourceMapsEnabled } from "process";
import UpdateProfile from "./UpdateProfile";
interface Props {
  handleComponent: (args: string) => void;
  componentName: string;
  handleOrder: () => void;
}

const MobileProfileSideBar: React.FC<Props> = ({
  handleComponent,
  componentName,
  handleOrder,
}) => {
  const router = useRouter();
  const { logOut, userDetails } = useUser();
  const [open,setOpen]=useState<boolean>(false)
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  const closeUpdateProfile =()=>{
    setOpen(false)
  }
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
          <span className="mt-2 flex justify-center text-[#e26178]" onClick={()=>setOpen(true)}>
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
          <UpdateProfile isOpen={open} isClose={closeUpdateProfile}/>
        </div>
      </div>
      <div>
        <div
          className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
          onClick={() => handleComponent("personalInfo")}
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
        <div onClick={() => handleOrder()}>
          <div
            className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
            onClick={() => handleComponent("orders")}
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
        <div
          className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
          onClick={() => handleComponent("wishlist")}
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
        <div
          className={`flex cursor-pointer items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178]`}
          onClick={() => handleComponent("gms")}
        >
          <div className="flex">
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            <p>GMS</p>
          </div>
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
