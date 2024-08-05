"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import FlashAlert from "../Other/FlashAlert";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import AddAddressModal from "@/app/checkout/AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import { IoMdLogOut } from "react-icons/io";
import { useCurrency } from "@/context/CurrencyContext";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const ProfileDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const { logOut, isLoggedIn, userDetails } = useUser();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      // localStorage.remove("localtoken");
      logOut();
      router.push("/");
    }
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      const cookieTokenn =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;

      const getAuthHeaders: any = () => {
        if (!cookieTokenn) return null;
        return {
          authorization: `Bearer ${cookieTokenn}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });
      const DELETE_CUSTOMER_ADDRESS = gql`
        mutation DeleteCustomerAddresses(
          $customerAddresses: [CustomerAddressesInput!]!
        ) {
          DeleteCustomerAddresses(customerAddresses: $customerAddresses) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: DELETE_CUSTOMER_ADDRESS,
        variables: {
          customerAddresses: [
            {
              address_id: id,
            },
          ],
        },
        fetchPolicy: "no-cache",
      });
      // if(data.DeletCustomerAddress.code==200){

      //   setMessage(data.DeleteCustomerAddresses.message);
      //   setType("success");
      // }else{
      //   setMessage(data.DeletCustomerAddresses.message);
      //   setType("error");
      // }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const cookieTokenn =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;

      const getAuthHeaders = () => {
        if (!cookieTokenn) return null;
        return {
          authorization: `Bearer ${cookieTokenn}`,
        };
      };
      const link = new HttpLink({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
      });

      const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
      });

      const GET_ADDRESS = gql`
        query GetCustomerAddresses($token: String!) {
          getCustomerAddresses(token: $token) {
            address_id
            address_type
            city
            country
            customer_id
            full_address
            landmark
            pincode
            state
          }
        }
      `;
      const variables = { token: cookieTokenn };
      const { data } = await client.query({
        query: GET_ADDRESS,
        variables,
      });
      setallAddress(data.getCustomerAddresses);
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     setIsLoading(true);
  // const cookieTokenn = localStorage.getItem("localtoken");
  //     try {

  //       const response = await axios.get<{ customerAddress?: Address[] }>(
  //         `${baseUrl}/customer/getAddresses`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookieTokenn}`,
  //           },
  //         }
  //       );

  //       setallAddress(response.data.customerAddress);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAddresses();
  // }, []);
  const handleEditAddress = (addressId: any) => {
    const addressToEdit =
      allAddress &&
      allAddress.find((address) => address.address_id === addressId);

    setSelectedAddress(addressToEdit);
    setShowModal(true);
    console.log("EditAddress", selectedAddress);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };
  if (isLoading) {
    return (
      <div className="loading-container flex h-full items-center justify-center">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }

  const formattedWalletAmount = Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(
    Math.round(parseFloat((userDetails && userDetails?.wallet_amount) ?? 0)),
  );
  return (
    <div className="m-24 mt-10">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-semibold">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
        <div className="flex">
          <IoMdLogOut size={20} className="me-1 mt-1" />
          <p className="cursor-pointer" onClick={() => handleLogOut()}>
            Logout
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="font-semibold">
          Wallet Balance:{formatPrice(userDetails?.wallet_amount)}
        </p>
      </div>
      <form>
        <div className="grid items-center justify-center gap-7 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="text-md mb-3 block font-medium text-black"
            >
              First name
            </label>
            <div className="w-100 rounded bg-[#E26178] bg-opacity-5 p-2">
              <span className="text-md font-semibold">
                {userDetails?.firstname}
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="text-md mb-3 block font-medium text-black"
            >
              Last name
            </label>
            <div className="w-100 rounded bg-[#E26178] bg-opacity-5 p-2">
              <span className="text-md font-semibold">
                {userDetails?.lastname}
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-md mb-3 block font-medium text-black"
            >
              Phone number
            </label>
            <div className="w-100 rounded bg-[#E26178] bg-opacity-5 p-2">
              <span className="text-md font-semibold">
                {userDetails?.mobile_no}
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-md mb-3 block font-medium text-black"
            >
              Email address
            </label>
            <div className="w-100 text-wrap rounded bg-[#E26178] bg-opacity-5 p-2">
              <span className="text-md font-semibold">
                {userDetails?.email}
              </span>
            </div>
          </div>
        </div>
      </form>
      <hr className="mt-3" />
      <div className="flex justify-between">
        <h2 className="mb-3 mt-4 text-xl font-semibold">My Addresses</h2>
        <h2
          className="mb-3 mt-4 cursor-pointer text-xl text-[#e26178]"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap">
        {allAddress &&
          allAddress.map((address: any) => (
            <div
              key={address.address_id}
              className="relative mr-2 flex rounded-lg border bg-white"
            >
              <div className="h-[130px] w-[250px] p-4">
                <p>
                  {address.full_address}, {address.city}, {address.pincode},{" "}
                  {address.address_type}
                </p>
              </div>
              <button
                className="absolute -right-4 -top-4 inline-flex items-center justify-center rounded-full bg-[#E26178] p-2"
                onClick={() => handleEditAddress(address.address_id)}
              >
                <Icon.PencilSimple size={15} className="text-white" />
              </button>
              <button
                className="absolute -right-4 top-4 inline-flex items-center justify-center rounded-full bg-[#E26178] p-2"
                onClick={() => handleRemoveAddress(address.address_id)}
              >
                <Icon.X size={15} className="text-white" />
              </button>
              {showModal &&
                selectedAddress?.address_id === address.address_id && (
                  <EditAddressModal
                    closeModal={closeEditModal}
                    singleAddress={selectedAddress}
                  />
                )}
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
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default ProfileDetails;
