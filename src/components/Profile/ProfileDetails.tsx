import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import AddAddressModal from "@/app/checkout/AddAddressModal";

const ProfileDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();
  const { logOut, isLoggedIn, userDetails } = useUser();

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      Cookies.remove("localtoken");
      localStorage.clear();
      logOut();
      router.push("/");
    }
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };
  const handleEditAddress = async (id: any) => {
    setId(id);
    setShowModal(true);
  };
  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      const cookieTokenn = Cookies.get("localtoken");
      const response = await axios.post<{ data: any }>(
        `${baseUrl}/customer/address/remove`,
        { address_id: id },
        {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching addresses:", error);
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
  if (isLoading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
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
      <div className="flex justify-end">
        <p className="font-bold">
          Wallet Balance:{userDetails?.customer?.wallet_amount}
        </p>
      </div>
      <form>
        <div className="grid gap-7 md:grid-cols-2 items-center justify-center">
          <div>
            <label
              htmlFor="first_name"
              className="block text-md font-medium text-black"
            >
              First name
            </label>
            {userDetails?.customer?.firstname}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-md font-medium text-black"
            >
              Last name
            </label>
            {userDetails?.customer?.lastname}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-md font-medium text-black"
            >
              Phone number
            </label>
            {userDetails?.customer?.mobile_no}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-black"
            >
              Email address
            </label>
            {userDetails?.customer?.email}
          </div>
        </div>
      </form>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-3 mt-4">My Addresses</h2>
        <h2
          className="text-xl  text-[#e26178] mb-3 mt-4 cursor-pointer"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap">
        {allAddress &&
          allAddress.map((address: any) => (
            <div key={address.address_id} className="relative">
              <div className=" bg-white p-4 rounded-lg shadow-md mt-6 w-[250px] h-[130px] mr-2">
                <p>
                  {address.full_address}, {address.city}, {address.pincode},{" "}
                  {address.address_type}
                </p>
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
        <AddAddressModal
          closeModal={closeModal}
          isForBillingAddress={false}
          onAddressAdded={function (isBillingAddress: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {showModal && <EditAddressModal id={id} closeModal={closeEditModal} />}
    </div>
  );
};

export default ProfileDetails;
