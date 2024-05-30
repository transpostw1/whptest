import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";

import AddAddressMobile from "@/app/checkout/AddAddressMobile";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import FlashAlert from "../Other/FlashAlert";

interface Props {
  handleComponent: (args: string) => void;
}
const MobilePersonalInformation: React.FC<Props> = ({ handleComponent }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const { logOut, isLoggedIn, userDetails } = useUser();
  const [type, setType] = useState<any>("");
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      console.log("this effecct is running");
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleEditAddress = async (id: any) => {
    setId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };
  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      const cookieTokenn = Cookies.get("localtoken");
      const response = await axios.post(
        `${baseUrl}/customer/address/remove`,
        { address_id: id },
        {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        }
      );
      setMessage(response.data.message);
      setType("success");
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
      setMessage(error.data.error);
      setType("error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const cookieTokenn = Cookies.get("localtoken");
        const response = await axios.get<{ customerAddress?: Address[] }>(
          `${baseUrl}/customer/getAddresses`,
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );

        setallAddress(response.data.customerAddress);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);
  const closeEditModal = () => {
    setShowModal(false);
  };
  const handleBackButton = (args: string) => {
    handleComponent(args);
  };
  if (isLoading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex">
        <div onClick={() => handleBackButton("")} className="mt-2">
          <Icon.CaretLeft size={25} />
        </div>
        <div>
          <p className="font-bold text-xl">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="relative w-[80px] h-[80px] mt-4">
          <div className="flex text-[#e26178] bg-[#E26178]  bg-opacity-5 w-[80px] h-[80px] rounded-full text-[30px] items-center justify-center">
            D
          </div>
          <div className="absolute top-2 right-0 w-[20px] h-[20px] rounded-full bg-[#e26178] text-white">
            <Icon.Pen />
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Wallet Balance:500</p>
        </div>
      </div>
      <form>
        <div className="grid gap-7 md:grid-cols-2 items-center p-4">
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
      <div className="flex justify-between px-[17px]">
        <h2 className="text-xl font-semibold mb-3 mt-4">My Addresses</h2>
        <h2
          className="text-xl  text-[#e26178] mb-3 mt-4 cursor-pointer"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap p-4">
        {allAddress &&
          allAddress.map((address: any) => (
            <div key={address.address_id} className="relative">
              <div className=" bg-white p-4  mt-3 w-full h-[130px] mr-2 border">
                <p>{address.full_address},</p>
                <p>
                  {address.city}, {address.pincode}
                </p>
                <p>Address Type:{address.address_type}</p>
              </div>
              <button className="absolute -top-2 bg-[#e26178] rounded-full right-0 p-2 text-sm text-white">
                <Icon.PencilSimple
                  size={18}
                  onClick={() => handleEditAddress(address.address_id)}
                />
              </button>
              <button className="absolute top-7 right-0 p-2 text-sm text-black hover:text-red-700">
                <Icon.X
                  size={25}
                  onClick={() => handleRemoveAddress(address.address_id)}
                />
              </button>
            </div>
          ))}
      </div>
      {showAddressModal && (
        <AddAddressMobile
          isOpen={showAddressModal}
          onClose={closeModal}
          isForBillingAddress={false}
          onAddressAdded={function (address: Address): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {message && <FlashAlert message={message} type={type} />}
      {showModal && <EditAddressModal id={id} closeModal={closeEditModal} />}
    </div>
  );
};

export default MobilePersonalInformation;
