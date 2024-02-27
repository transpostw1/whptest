"use client";

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import Link from "next/link";
// import { PhoneInput } from "react-international-phone";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
// import { ProductType } from "@/type/ProductType";
// import productData from "@/data/Product.json";
// import Product from "@/components/Product/Product";

import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import {
  AddressBook,
  ShoppingCart,
  SignIn,
  Wallet,
  ArrowRight,
  Gift,
} from "@phosphor-icons/react";

const Checkout: React.FC = () => {
  // const router = useRouter();
  const { cartState, removeFromCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("CartItems");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const searchParams = useSearchParams();
  let discount = searchParams.get("discount");
  let ship = searchParams.get("ship");

  let totalCart = 0;
  cartState.cartArray.forEach(
    (item) => (totalCart += item.price * item.quantity)
  );

  const handlePayment = (item: string) => {
    setActivePayment(item);
  };

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
    switch (index) {
      case 0:
        setSelectedComponent("CartItems");
        break;
      case 1:
        setSelectedComponent("Login");
        break;
      case 2:
        setSelectedComponent("DeliveryDetails");
        break;
      case 3:
        setSelectedComponent("Payment");
        break;
      default:
        setSelectedComponent("CartItems");
        break;
    }
  };
  const handleProceed = () => {
    if (selectedStep === steps.length - 1) {
      // Handle completion logic here
    } else {
      setSelectedStep((prevStep) => prevStep + 1);
      switch (selectedStep) {
        case 0:
          setSelectedComponent("Login");
          break;
        case 1:
          setSelectedComponent("DeliveryDetails");
          break;
        case 2:
          setSelectedComponent("Payment");
          break;
        default:
          setSelectedComponent("CartItems");
          break;
      }
    }
  };

  const proceedButtonTitle = () => {
    switch (selectedStep) {
      case 0:
        return "Proceed to Login";
      case 1:
        return "Proceed to Delivery Details";
      case 2:
        return "Proceed to Payment";
      case 3:
        return "Complete";
      default:
        return "Proceed";
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "CartItems":
        return (
          <>
            <div className="list-product-main w-full mt-3">
              {cartState.cartArray.length < 1 ? (
                <p className="text-button pt-3">No products in your cart</p>
              ) : (
                cartState.cartArray.map((product) => (
                  <div
                    className="justify-between p-4 border rounded-lg border-gray-400 flex flex-col md:flex-row lg:flex-row lg:w-full md:w-full w-48 items-center mb-4"
                    key={product.id}
                  >
                    <Image
                      src={product.thumbImage[0]}
                      width={100}
                      height={200}
                      alt={product.name}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3">
                      <div className="py-4">
                        <div className="text-title">{product.name}</div>
                        <div className="text-title">Gold 21gms</div>
                        <div className="flex">
                          <div
                            className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
                            onClick={() => removeFromCart(product.id)}
                          >
                            Remove
                          </div>
                          <div className="text-sm max-md:text-base">
                            *Save for later
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
                      <div className="text-title text-center">
                        ${product.quantity * product.price}.00
                      </div>
                      <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                        <Icon.Minus
                          onClick={() => {
                            if (product.quantity > 1) {
                              handleQuantityChange(
                                product.id,
                                product.quantity - 1
                              );
                            }
                          }}
                          className={`text-base max-md:text-sm ${
                            product.quantity === 1 ? "disabled" : ""
                          }`}
                        />
                        <div className="text-button quantity">
                          {product.quantity}
                        </div>
                        <Icon.Plus
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity + 1
                            )
                          }
                          className="text-base max-md:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        );
      case "Login":
        return (
          <>
            <div className=" border w-full border-gray-300 p-8 items-center">
              {/* <div className="flex flex-col justify-center"> */}
              <h3>Enter Phone Number</h3>
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                placeholder="Number Here !"
                inputStyle={{ width: "100%" }}
              />
              <OTPField />
              <button className="p-1 mt-2 rounded-lg bg-rose-400">
                Submit
              </button>
              {/* </div> */}
            </div>
          </>
        );
      case "DeliveryDetails":
        return (
          <>
            <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300 p-8">
              <div className="flex justify-between">
                <div>
                  <h1 className="mb-3 text-xl">Shipping Address</h1>
                  <h2
                    className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
                    // onClick={openModal}
                  >
                    + Add new address
                  </h2>
                </div>
                <div>
                  <h1 className="mb-3 text-xl">Billing Address</h1>
                  <h2 className="mb-3">Same as shipping address</h2>
                  <h2
                    className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
                    // onClick={openModal}
                  >
                    + Add new address
                  </h2>
                </div>
              </div>
              {/* {isModalOpen && <AddAddressModal closeModal={closeModal} />} */}
            </div>
          </>
        );
      case "Payment":
        return (
          <>
            <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300">
              <h1>Add a payment method</h1>
              <div>card 1 card2 card 3</div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const OTPField: React.FC = () => {
    const [otp, setOTP] = useState("");

    return (
      <div className="">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter OTP"
          className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  };

  const steps = [
    {
      icon: <ShoppingCart className="text-gray-300 text-2xl rounded-full" />,
      label: "Cart",
    },
    { icon: <SignIn className="text-gray-300 text-2xl" />, label: "Login" },
    {
      icon: <AddressBook className="text-gray-300 text-2xl" />,
      label: "Address",
    },
    { icon: <Wallet className="text-gray-300 text-2xl" />, label: "Payment" },
  ];

  return (
    <>
      <TopNavOne textColor="text-white" />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="w-full relative">
        <NavHoverMenu props="bg-white" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>
      <div className="cart-block flex-wrap">
        <div className="content-main flex flex-col justify-between px-14">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-3">
              <div className="flex flex-wrap mt-2 items-center">
                {steps.map((step, index) => (
                  <div
                    className="flex items-center w-40"
                    key={index}
                    onClick={() => handleStepClick(index)}
                  >
                    <div
                      className={`p-2 rounded-full border border-gray-300 ${
                        selectedStep >= index ? "bg-rose-400" : "bg-white"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <h2 className="p-2 rounded-full cursor-pointer">
                      {step.label}
                    </h2>
                    {index < steps.length - 1 && (
                      <ArrowRight
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <h2>(Review of 3 Items)</h2>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-between">
            <div className="w-full md:w-[2000px] sm:mt-7 mt-5 md:pr-5">
              <div className="heading bg-surface bora-4 pt-4 pb-4">
                <h1 className="text-2xl">Your Shopping Bag</h1>
              </div>
              {renderComponent()}
            </div>
            <div className="w-full lg:w-3/4 mt-5">
              <h1 className="my-5 text-2xl text-rose-600">Coupons</h1>
              <div className="flex justify-between border border-gray-400 p-3">
                <div className="flex items-center gap-2">
                  <Gift style={{ color: "red", fontSize: "24px" }} />
                  <h3>Available Coupons</h3>
                </div>
                <h3 className="text-red-600 underline">View</h3>
              </div>
              <div className="flex justify-between border border-gray-400 p-3 mt-3">
                <div className="flex gap-2 items-center">
                  <Gift style={{ color: "red", fontSize: "24px" }} />
                  <h3>Gift Message</h3>
                </div>
                <h3 className="text-red-600 underline">Add</h3>
              </div>
              <h1 className="my-5 text-2xl text-rose-600">ORDER SUMMARY</h1>
              <div className="px-1">
                <div className="border border-gray-200 rounded-xl">
                  <div>
                    <h3 className="text-gray-800">sdf</h3>
                    <h3 className="text-gray-800">sdf</h3>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <button
                    onClick={() => handleProceed()}
                    className="hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {proceedButtonTitle()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
