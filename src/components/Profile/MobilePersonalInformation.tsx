import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import AddAddressMobile from "@/app/checkout/AddAddressMobile";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import FlashAlert from "../Other/FlashAlert";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Props {
  handleComponent: (args: string) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  gender: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  profilePicture: File | null;
}

const MobilePersonalInformation: React.FC<Props> = ({ handleComponent }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formError, setFormError] = useState("");
  const { logOut, isLoggedIn, userDetails, addUserDetails } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    altPhone: Yup.string().required("Alternate phone number is required"),
    gender: Yup.string().required("Gender is required"),
    dobDay: Yup.string().required("Day is required"),
    dobMonth: Yup.string().required("Month is required"),
    dobYear: Yup.string().required("Year is required"),
    profilePicture: Yup.mixed(),
  });

  const dob = userDetails?.customer?.dob; // Assuming dob is "1998-10-18"
  const [dobYear, dobMonth, dobDay] = dob?.split("-") ?? ["", "", ""];

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsLoading(true);
    setFormError("");

    const formattedValues: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      altPhone: values.altPhone,
      gender: values.gender,
      dob: `${values.dobYear}-${values.dobMonth}-${values.dobDay}`,
      profile_picture: values.profilePicture,
    };

    try {
      await addUserDetails(formattedValues);
      resetForm();
    } catch (error) {
      setFormError(
        "An error occurred while submitting the form. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      console.log("this effecct is running");
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleEditAddress = (addressId: any) => {
    const addressToEdit =
      allAddress &&
      allAddress.find((address) => address.address_id === addressId);

    setSelectedAddress(addressToEdit);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      if (typeof window !== "undefined") {
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
        setMessage(data.DeleteCustomerAddresses.message);
        setType("success");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const cookieTokenn = localStorage.getItem("localtoken");

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
      }
    };
    fetchData();
  }, []);

  const closeEditModal = () => {
    setShowModal(false);
  };
  const handleBackButton = (args: string) => {
    handleComponent(args);
  };
  if (isLoading) {
    return (
      <div className="loading-container flex h-full items-center justify-center">
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
          <p className="text-xl font-bold">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
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
        <div className="mt-4">
          <p className="font-bold">
            Wallet Balance:{userDetails?.wallet_amount}
          </p>
        </div>
      </div>

      <div className="grid w-full items-center justify-center gap-7">
        <div className="w-[289px]">
          <label
            htmlFor="first_name"
            className="text-md mb-1 block font-normal text-black"
          >
            First name 
          </label>
          <div className="w-100 rounded bg-[#E1DCDD29] bg-opacity-5 p-2">
            <span className="text-md font-semibold">
              {userDetails?.firstname}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="text-md mb-1 block font-normal text-black"
          >
            Last name
          </label>
          <div className="w-100 rounded bg-[#E1DCDD29] bg-opacity-5 p-2">
            <span className="text-md font-semibold">
              {userDetails?.lastname}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="text-md mb-1 block font-normal text-black"
          >
            Phone number
          </label>
          <div className="w-100 rounded bg-[#E1DCDD29] bg-opacity-5 p-2">
            <span className="text-md font-semibold">
              {userDetails?.mobile_no}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-md mb-1 block font-normal text-black"
          >
            Email address
          </label>
          <div className="w-100 text-wrap rounded bg-[#E1DCDD29] bg-opacity-5 p-2">
            <span className="text-md font-semibold">{userDetails?.email}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-[17px]">
        <h2 className="mb-3 mt-4 text-xl font-semibold">My Addresses</h2>
        <h2
          className="mb-3 mt-4 cursor-pointer text-xl text-[#e26178]"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap p-4">
        {allAddress &&
          allAddress.map((address: any) => (
            <div key={address.address_id} className="relative w-full">
              <div className="mr-2 mt-3 h-[130px] w-full border bg-white p-4">
                <p>{address.full_address},</p>
                <p>
                  {address.city}, {address.pincode}
                </p>
                <p>Address Type:{address.address_type}</p>
              </div>
              <button className="absolute -top-2 right-0 rounded-full bg-[#e26178] p-2 text-sm text-white">
                <Icon.PencilSimple
                  size={18}
                  onClick={() => handleEditAddress(address.address_id)}
                />
              </button>
              <button className="absolute right-0 top-7 p-2 text-sm text-black hover:text-red-700">
                <Icon.X
                  size={25}
                  onClick={() => handleRemoveAddress(address.address_id)}
                />
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
    </div>
  );
};

export default MobilePersonalInformation;
