"use client";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "@/components/Footer/Footer";
import { ProductType } from "@/type/ProductType";
import React, { useState, useEffect, ChangeEvent } from "react";
import { PhoneInput, ParsedCountry } from "react-international-phone";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useProductContext } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import { baseUrl,getProductbyId,getCartItems, addAddress,removeCart } from "@/utils/constants";


import {
  AddressBook,
  ShoppingCart,
  Wallet,
  ArrowRight,
  Gift,
  CreditCard,
} from "@phosphor-icons/react";

interface ProductProps {
  data: ProductType;
}

const Checkout: React.FC<ProductProps> = ({ data }) => {

  const { cartItems, updateCart,setCartItems,removeFromCart} = useCart();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("CartItems");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState } = useUser();
  const { getProductById } = useProductContext();
  

  const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);





 const cookieTokenn = Cookies.get("localtoken");

 
  useEffect(() => {
    if (isLoggedIn) {
      const fetchCartItemsDetails = async () => {
        try {
          const response = await axios.get(`${baseUrl}${getCartItems}`, {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          });
          const cartItemsData = response.data.cart_items.map((item: any) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            name: item.product_details[0].displayTitle,
            price: item.product_details[0].discountPrice,
            image: JSON.parse(item.product_details[0].imageDetails)[0]
              .image_path,
          }));
          setCartItems(cartItemsData);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItemsDetails();
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        const cartItemsFromStorage = JSON.parse(storedCartItems);
        const productIds = cartItemsFromStorage.map(
          (item: any) => item.product_id
        );
        const updatedCartItems= [];
        const fetchProductDetails = async () => {
          for (const productId of productIds) {
            try {
              const response = await axios.get(
                `${baseUrl}${getProductbyId}${productId}`
              );
              const productDetails = response.data[0];

              const updatedCartItem = {
                product_id: productId,
                quantity: 1,
                name: productDetails.displayTitle,
                price: productDetails.discountPrice,
                image: productDetails.imageDetails[0].image_path,
              };
              updatedCartItems.push(updatedCartItem);
            } catch (error) {
              console.error("Error fetching product details:", error);
            }
          }
          setCartItems(updatedCartItems);
        };
        fetchProductDetails();
      }
    }
  }, [isLoggedIn]);


  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const itemToUpdate = cartItems.find((item) => item.product_id === productId);

    if (itemToUpdate) {
      updateCart(productId, newQuantity);
    }
  };
  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const searchParams = useSearchParams();

  let discount = searchParams.get("discount");
  let ship = searchParams.get("ship");

  let totalCart = 0;
  cartItems.forEach((item) => {
    const price = parseFloat(item.price);
    // Check if price is a valid number
    if (!isNaN(price) && typeof item.quantity === "number") {
      // Multiply quantity by price and add to totalCart
      totalCart += price * item.quantity;
    } else {
      console.error("Invalid data:", item);
    }
  });

  let cartDiscount = 0;


  const handlePayment = (item: string) => {
    setActivePayment(item);
  };

  const handleOrderComplete = () => {
    setIsOrderPlaced(true);
  };

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
    switch (index) {
      case 0:
        setSelectedComponent("CartItems");
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
  };
  const handleProceed = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (selectedStep === steps.length - 1) {
      // Handle completion logic here//
    } else {
      setSelectedStep((prevStep) => prevStep + 1);
      switch (selectedStep) {
        case 0:
          setSelectedComponent("DeliveryDetails");
          break;
        case 1:
          setSelectedComponent("Payment");
          break;
        case 2:
          setSelectedComponent("CartItems");
          break;
        default:
          setSelectedComponent("CartItems");
          break;
      }
    }
  };

  const proceedButtonTitle = () => {
    if (!isLoggedIn) {
      return "Please Login to Proceed";
    }

    switch (selectedStep) {
      case 0:
        return "Proceed to Delivery Details";
      case 1:
        return "Proceed to Payment";
      case 2:
        return "Place Order";
      default:
        return "Proceed";
    }
  };
  const AddAddressModal: React.FC = ({ closeModal }) => {
    // const validationSchema = Yup.object().shape({
    //   pincode: Yup.string().required("Pincode is required"),
    //   full_address: Yup.string().required(
    //     "Full Address Company is required"
    //   ),
    //   area: Yup.string().required("Area and Street is required"),
    //   country: Yup.string().required("Please add country"),
    //   state: Yup.string().required("Please add State"),
    //   city: Yup.string().required("Please add City"),
    //   landmark: Yup.string(),
    //   address_type: Yup.string().required("Please select the address type"),
    // });

    const handleSubmit = async (values) => {
      try {
         const cookieTokenn = Cookies.get("localtoken");
         console.log("address",cookieTokenn,values)
      const response = await axios.post<{ data: any }>(
        `${baseUrl}${addAddress}`,
        {
        pincode:values.pincode,
        full_address:values.full_address,
        area:values.area,
        country:values.country,
        state:values.state,
        city:values.city,
        landmark:values.landmark,
        address_type:values.address_type
        },
        {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        }
      );
        console.log("Response from backend:", response.data);
        closeModal();
      } catch (error) {
        console.error("Error posting form data:", error);
      }
    };

    const formik = useFormik({
      initialValues: {
        pincode: "",
        full_address: "",
        area: "",
        country: "",
        state: "",
        city: "",
        landmark: "",
        address_type: "",
      },
      // validationSchema: validationSchema,
      onSubmit: handleSubmit,
    });
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-full">
        <div className="bg-white p-8 flex flex-col justify-between z-50 rounded-xl">
          <button onClick={closeModal}>Close</button>
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-2xl font-semibold">Add Address</h2>
            <div className="my-2 md:col-span-2">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Pincode"
                {...formik.getFieldProps("pincode")}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className=" text-red-700 font-medium">
                  {formik.errors.pincode}
                </div>
              )}
            </div>

            {/* <div className="grid md:grid-cols-2 gap-x-3"> */}
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="full_address/House No/Building Name/Company"
                {...formik.getFieldProps("full_address")}
              />
              {formik.touched.full_address && formik.errors.full_address && (
                <div className=" text-red-700 font-medium">
                  {formik.errors.full_address}
                </div>
              )}
            </div>
            {/* </div> */}
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Area and Street"
                {...formik.getFieldProps("area")}
              />
              {formik.touched.area && formik.errors.area && (
                <div className=" text-red-700 font-medium">
                  {formik.errors.area}
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-x-2">
              <div className="mb-4 md:col-span-1">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Country"
                  {...formik.getFieldProps("country")}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className=" text-red-700 font-medium">
                    {formik.errors.country}
                  </div>
                )}
              </div>

              <div className="mb-4 md:col-span-1">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="State"
                  {...formik.getFieldProps("state")}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className=" text-red-700 font-medium">
                    {formik.errors.state}
                  </div>
                )}
              </div>
              <div className="mb-4 md:col-span-1">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="City"
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className=" text-red-700 font-medium">
                    {formik.errors.city}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Landmark"
                {...formik.getFieldProps("landmark")}
              />
              {formik.touched.landmark && formik.errors.landmark && (
                <div className="text-red-600">{formik.errors.landmark}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="font-medium">Address Type:</label>
              <div className="mt-2 flex">
                <div className="flex items-center mr-4">
                  <input
                    type="radio"
                    id="home"
                    name="address_type"
                    value="home"
                    checked={formik.values.address_type === "home"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <label htmlFor="home" className="ml-2">
                    Home
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    type="radio"
                    id="work"
                    name="address_type"
                    value="work"
                    checked={formik.values.address_type === "work"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <label htmlFor="work" className="ml-2">
                    Work
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="other"
                    name="address_type"
                    value="other"
                    checked={formik.values.address_type === "other"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <label htmlFor="other" className="ml-2">
                    Other
                  </label>
                </div>
              </div>
              {formik.touched.address_type && formik.errors.address_type && (
                <div className="text-red-600 mt-1">
                  {formik.errors.address_type}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-rose-400 border border-transparent rounded-md hover:bg-rose-500"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "CartItems":
        return (
          <>
            <div className="list-product-main w-full mt-3">
              {cartItems?.length < 1 ? (
                <p className="text-button pt-3">No products in your cart</p>
              ) : (
                cartItems?.map((product) => (
                  <div
                    className="justify-between p-4  border rounded-lg border-gray-400 flex  md:flex-row lg:flex-row lg:w-full md:w-full  items-center mb-4"
                    key={product?.product_id}
                  >
                    <Image
                      src={product?.image}
                      width={100}
                      height={200}
                      alt="image"
                      className="rounded-lg object-cover"
                    />
                    <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3 ">
                      <div className="py-4">
                        <div className="text-title">{product?.name}</div>
                        <div className="text-title">
                          {product.metalType}
                          {product.metalPurity}
                        </div>
                        <div className="flex">
                          <div
                            className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
                            onClick={() => removeFromCart(product?.product_id,product?.quantity)}
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
                        ₹{product?.price * product.quantity}
                      </div>
                      <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                        <Icon.Minus
                          onClick={() => {
                            if (product.quantity > 1) {
                              handleQuantityChange(
                                product.product_id,
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
                              product.product_id,
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
      case "DeliveryDetails":
        return (
          <>
            <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300 p-8">
              <div className="flex justify-between">
                <div>
                  <h1 className="mb-3 text-xl">Shipping Address</h1>
                  <h2
                    className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
                    onClick={openModal}
                  >
                    + Add new address
                  </h2>
                </div>
                <div>
                  <h1 className="mb-3 text-xl">Billing Address</h1>
                  <h2 className="mb-3">Same as shipping address</h2>
                  <h2
                    className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
                    onClick={openModal}
                  >
                    + Add new address
                  </h2>
                </div>
              </div>
              {isModalOpen && <AddAddressModal closeModal={closeModal} />}
            </div>
          </>
        );
      case "Payment":
        return (
          <>
            <div className="flex flex-col lg:w-[50rem] md:w-[30rem] sm:w-[30rem] gap-5">
              <h1 className="text-red-950 font-medium">PAYMENT METHOD</h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
                  <label
                    htmlFor="upiPayment"
                    className=" flex gap-2 cursor-pointer font-medium"
                  >
                    <Image
                      src={"/images/other/upi-icon.png"}
                      alt="upi"
                      width={30}
                      height={30}
                      objectFit="fill"
                    />
                    UPI Payment
                  </label>
                  <input
                    type="radio"
                    id="upiPayment"
                    name="paymentMethod"
                    value="upi"
                    className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
                    checked={selectedPaymentMethod === "upi"}
                    onChange={handlePaymentMethodChange}
                  />
                </div>
                <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
                  <label
                    htmlFor="cardPayment"
                    className="flex gap-2 cursor-pointer font-medium"
                  >
                    <CreditCard className="text-2xl text-red-600" />
                    Credit or Debit Card
                  </label>
                  <input
                    type="radio"
                    id="cardPayment"
                    name="paymentMethod"
                    value="card"
                    className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
                    checked={selectedPaymentMethod === "card"}
                    onChange={handlePaymentMethodChange}
                  />
                </div>
              </div>
              <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
              <div>
                <div>
                  -10% off on HDFC Bank Credit Card. Use{" "}
                  <span className="font-bold">HDFC10</span>
                  <span className="text-red-600 underline">
                    View more Offers
                  </span>
                </div>
                <div>
                  -7% off on SBI Bank Credit Card. Use{" "}
                  <span className="font-bold">SBI7</span>
                  {"  "}
                  <span className="text-red-600 underline">
                    View more Offers
                  </span>
                </div>
              </div>
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
    {
      icon: <AddressBook className="text-gray-300 text-2xl" />,
      label: "Address",
    },
    { icon: <Wallet className="text-gray-300 text-2xl" />, label: "Payment" },
  ];

  return (
    <>
      {/* <TopNavOne textColor="text-white" />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="w-full relative">
        <NavHoverMenu props="bg-white" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div> */}
      <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      <div className="cart-block flex-wrap">
        <div className="content-main flex flex-col justify-between px-14">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-3">
              {isOrderPlaced ? (
                <div className="flex">
                  <Image
                    src={"/images/collection/check.png"}
                    alt="check"
                    width={100}
                    height={10}
                  />
                  <div className="flex flex-col items-start justify-center py-3 ">
                    <h1 className="text-3xl text-red-700 font-semibold">
                      Order Placed!!
                    </h1>
                    <h1>ID-#32432</h1>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
            <h2>(Review of {cartItems.length} Items)</h2>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-between">
            <div className="w-full md:w-[2000px] sm:mt-7 mt-5 md:pr-5">
              <div className="heading bg-surface bora-4 pt-4 pb-4">
                <h1 className="text-2xl">Your Shopping Bag</h1>
              </div>
              {renderComponent()}
              <h3 className="font-medium">Estimated Delivery Date:29/2/2024</h3>
            </div>
            <div className="w-full lg:w-3/4 mt-5">
              {selectedComponent === "CartItems" && (
                <div>
                  <h1 className="my-5 text-2xl font-bold text-rose-600">
                    Coupons
                  </h1>
                  <div className="flex justify-between border border-gray-400 p-3">
                    <div className="flex items-center gap-2 font-medium">
                      <Gift style={{ color: "red", fontSize: "24px" }} />
                      <h3>Available Coupons</h3>
                    </div>
                    <h3 className="text-red-600 underline">View</h3>
                  </div>
                  <div className="flex justify-between border border-gray-400 p-3 mt-3">
                    <div className="flex gap-2 items-center font-medium">
                      <Gift style={{ color: "red", fontSize: "24px" }} />
                      <h3>Gift Message</h3>
                    </div>
                    <h3 className="text-red-600 underline">Add</h3>
                  </div>
                </div>
              )}

              <h1 className="my-5 text-2xl font-bold text-rose-600">
                ORDER SUMMARY
              </h1>
              {selectedComponent !== "CartItems" && (
                <div className="list-product-main w-full">
                  <div className="hidden  lg:block mb-2">
                    {cartItems?.length < 1 ? (
                      <p className="text-button">No products in your cart</p>
                    ) : (
                      cartItems?.map((product) => (
                        <div
                          className="border border-gray-200 flex w-full  items-center mb-2 "
                          key={cartItems.productId}
                        >
                          <Image
                            src={product.image}
                            width={100}
                            height={200}
                            alt={product.Title}
                            className="rounded-lg object-cover"
                          />
                          {/* <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3"> */}
                          <div className="p-4 flex flex-col">
                            <div className="text-title">
                              {product.name} X {product.quantity}
                            </div>
                            <div className="text-title text-start">
                              ₹{product?.price}
                            </div>
                            <h3>Estimated Delivery Date</h3>
                          </div>
                          {/* </div> */}
                          <div className="w-full md:w-1/6 flex flex-col items-center justify-center"></div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              <div className="">
                <div className="bg-gray-100 p-2 ">
                  <div className="">
                    <div className="flex justify-between font-medium">
                      <h3>Subtotal</h3>
                      <h3>₹{totalCart}</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>Discount</h3>
                      <h3>₹00</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>Shipping Charges</h3>
                      <h3>₹0</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>G.S.T</h3>
                      <h3>₹951.27</h3>
                    </div>
                    <div className="flex justify-between font-bold">
                      <h3 className="text-gray-800">Total Price</h3>
                      <h3>₹{totalCart}</h3>
                    </div>
                  </div>
                </div>

                {!isOrderPlaced && (
                  <div className="flex flex-col mt-3 relative">
                    {/* Render different buttons based on screen size */}
                    {isMobile ? (
                      <div className="w-full sticky top-0 p-4 flex justify-between">
                        <div>
                          <h3 className="font-semibold">₹24237.59</h3>
                          <h2 className="text-red-500 font-medium">
                            View Order Summary
                          </h2>
                        </div>
                        <button
                          onClick={() => {
                            if (proceedButtonTitle() === "Place Order") {
                              handleOrderComplete();
                            } else {
                              handleProceed();
                            }
                          }}
                          className="w-52 flex justify-center  hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-rose-600 "
                        >
                          {proceedButtonTitle()}
                          <ArrowRight
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (proceedButtonTitle() === "Place Order") {
                            handleOrderComplete();
                          } else {
                            handleProceed();
                          }
                        }}
                        className="flex  justify-center items-center hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
                      >
                        {proceedButtonTitle()}
                        <ArrowRight
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                        />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isMobile && <Footer />}
    </>
  );
};

export default Checkout;
