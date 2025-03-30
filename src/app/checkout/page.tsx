"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import CartItems from "./CartItems";
import DeliveryDetails from "./DeliveryDetails";
import Payment from "./Payment";
import OrderSummary from "./OrderSummary";
import ProceedButton from "./ProceedButton";
import Link from "next/link";
import CouponsModal from "@/components/Other/CouponsModal";
import { useCurrency } from "@/context/CurrencyContext";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import {
  AddressBook,
  ShoppingCart,
  Wallet,
  ArrowRight,
  Gift,
  CreditCard,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useCouponContext } from "@/context/CouponContext";
import FlashAlert from "../../components/Other/FlashAlert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Address } from "@/type/AddressType";
import GiftWrapModal from "@/components/Modal/GiftWrapModal";

interface CartItems {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    imageDetails: any;
    productPrice: string;
    quantityleft: number;
    discountValue: string;
    url: string;
  };
  gst?: any;
  displayTitle?: string;
  discountPrice?: any;
  imageDetails?: any;
  productId: number;
  quantity?: number;
  name?: string;
  price?: number;
  image?: string;
  isBuyNow?: boolean;
  variants?: { variantType: string; variantName: string }[];
}
const Checkout: React.FC = () => {
  const { cartItems, updateCart, setCartItems, removeFromCart } = useCart();
  const { coupons, totalDiscount, updateDiscount } = useCouponContext();
  const { isLoggedIn, userDetails } = useUser();
  const { formatPrice } = useCurrency();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [cartProductIds, setCartProductIds] = useState<any[]>([]);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("CartItems");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const [shippingAddressSelected, setShippingAddressSelected] = useState(false);
  const [billingAddressSelected, setBillingAddressSelected] = useState(false);
  const [dataAfterCouponCode, setDataAfterCouponCode] = useState<any>([]);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [GiftWrapformData, setGiftWrapformData] = useState({
    name: "",
    wrapOption: false,
  });
  const [flashMessage, setFlashMessage] = useState("");
  const [whpWallet, setWhpWallet] = useState<any>();
  const [flashType, setFlashType] = useState<"success" | "error">("success");
  const [flashKey, setFlashKey] = useState(0);
  const [useSameAsBillingAddress, setUseSameAsBillingAddress] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<Address | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [buyNowItems, setBuyNowItems] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow");
  const [showAllItems, setShowAllItems] = useState(true);

  const handleCouponsModal = () => {
    setCouponsModal(true);
  };
  const onShippingAddressSelected = () => {
    setShippingAddressSelected(true);
  };
  const onBillingAddressSelected = () => {
    setBillingAddressSelected(true);
  };
  const handleGiftWrapFormData = (giftmessage: any, wrapvalue: any) => {
    setGiftWrapformData({ name: giftmessage, wrapOption: wrapvalue });
  };
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

  // useEffect(() => {
  //   if (couponCode) {
  //     handleCouponCheck();
  //   }
  // }, [couponCode]);

  useEffect(() => {
    console.log("Current coupons:", coupons);
  }, [coupons]);

  const handleCouponModalClose = () => {
    setCouponsModal(false);
  };
  const handleCouponCode = (value: string) => {
    setFlashMessage("");
    setFlashType("");
    setCouponCode(value);
    setVoucherCode(value);
  };

  useEffect(() => {
    if (couponCode !== "") {
      handleCouponCheck();
    }
  }, [couponCode]);

  const removeCoupon = () => {
    setCouponCode("");
    setVoucherCode("");
    setDataAfterCouponCode([]);
  };

  const handleCouponCheck = () => {
    const products = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    setCartProductIds(products);
    const fetchCouponData = async () => {
      setLoading(true);
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      try {
        const getAuthHeaders = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };

        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
          cache: new InMemoryCache(),
        });

        const CHECK_COUPON_CODE = gql`
          mutation Coupon($coupon: CouponInput!) {
            Coupon(coupon: $coupon) {
              code
              message
              discountProduct {
                productId
                discountedValue
                additionalDiscountPrice
              }
            }
          }
        `;

        const { data } = await client.mutate({
          mutation: CHECK_COUPON_CODE,
          variables: {
            coupon: { products: products, couponCode: couponCode },
          },
          context: {
            headers: getAuthHeaders(),
          },
          fetchPolicy: "no-cache",
        });
        console.log("DAta", data.Coupon);
        if (data.Coupon.code === 400 || data.Coupon.code === "400") {
          setFlashMessage(data.Coupon.message);
          setFlashType("error");
        } else {
          setDataAfterCouponCode(data.Coupon);
          setFlashMessage("Coupon Successfully applied");
          setFlashType("success");
        }
      } catch (error: any) {
        console.log("Error occurred", error.response.data.message);
        setFlashMessage(error.response.data.message);
        setFlashType("error");
        removeCoupon();
      } finally {
        setLoading(false);
      }
    };
    fetchCouponData();
  };
  const coupon: any = searchParams.get("coupon");
  typeof window !== "undefined" ? localStorage.setItem("coupon", coupon) : null;

  useEffect(() => {
    const fetchCouponData = async () => {
      const products = cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      setCartProductIds(products);
      setLoading(true);
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      try {
        const getAuthHeaders = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };

        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
          cache: new InMemoryCache(),
        });

        const CHECK_COUPON_CODE = gql`
          mutation Coupon($coupon: CouponInput!) {
            Coupon(coupon: $coupon) {
              code
              message
              discountProduct {
                productId
                discountedValue
                additionalDiscountPrice
              }
            }
          }
        `;

        const { data } = await client.mutate({
          mutation: CHECK_COUPON_CODE,
          variables: {
            coupon: { products: products, couponCode: coupon },
          },
          context: {
            headers: getAuthHeaders(),
          },
          fetchPolicy: "no-cache",
        });

        if (data.Coupon.code === 400 || data.Coupon.code === "400") {
          setFlashMessage(data.Coupon.message);
          setFlashType("error");
        } else {
          setDataAfterCouponCode(data.Coupon);
          setFlashMessage("Coupon Successfully applied");
          setFlashType("success");
        }
      } catch (error: any) {
        setFlashMessage(error.response?.data?.message);
        setFlashType("error");
      } finally {
        setVoucherCode(coupon);
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchCouponData();
    }, 1450);
  }, [coupon, isLoggedIn]);

  useEffect(() => {
    let totalCartDiscount: number = 0;
    Array.isArray(dataAfterCouponCode.discountProduct) &&
      dataAfterCouponCode.discountProduct.map((element: any) => {
        const discount = parseInt(element.discountedValue);
        if (!isNaN(discount)) {
          totalCartDiscount += discount;
        }
      });

    updateDiscount(totalCartDiscount);
  }, [dataAfterCouponCode]);

  useEffect(() => {
    if (buyNow) {
      setShowAllItems(false);
    }
  }, [buyNow]);

  useEffect(() => {
    if (buyNow) {
      const buyNowProductId = parseInt(buyNow);
      const buyNowItem = cartItems.find(
        (item) => item.productId === buyNowProductId,
      );
      if (buyNowItem) {
        setBuyNowItems([buyNowItem]);
      }
    }
  }, [buyNow, cartItems]);

  const toggleShowAllItems = () => {
    setShowAllItems((prevState) => !prevState);
  };

  const mappedCartItems = cartItems
    .filter(
      (item: any) =>
        item?.productId ||
        item?.quantity ||
        item?.variants ||
        item?.productDetails?.title ||
        item?.productDetails?.quantity ||
        item?.productDetails?.productPrice ||
        item?.productDetails?.discountPrice ||
        item?.productDetails?.imageDetails ||
        item?.productDetails?.quantity ||
        item?.productDetails?.makeToOrder,
    )
    .map((item: any) => ({
      productId: item?.productId,
      quantity: item?.quantity,
      variants: item?.variants,
      name: item?.productDetails?.title,
      price: item?.productDetails?.discountPrice,
      productPrice: item?.productDetails?.productPrice,
      quantityleft: item?.productDetails?.quantity,
      makeToOrder: item?.productDetails?.makeToOrder,
      discountPrice:
        item?.productDetails?.discountPrice != null
          ? item?.productDetails?.productPrice -
            item?.productDetails?.discountPrice
          : 0,
      url: item?.productDetails?.url,
      image:
        item?.productDetails?.imageDetails &&
        item?.productDetails?.imageDetails.length > 0
          ? item?.productDetails.imageDetails[0].image_path
          : "",
    }));
  const MainCart = isLoggedIn ? cartItems : mappedCartItems;
  console.log(mappedCartItems, "mappedCartItemsssss");

  const finalBuyNowItems = buyNow
    ? MainCart.filter((item: any) => item.productId == parseInt(buyNow))
    : [];

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const itemToUpdate = cartItems.find((item) => item.productId === productId);

    if (itemToUpdate) {
      updateCart(productId, newQuantity);
    }
  };

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const calculateTotalPrice = (items: any[]) => {
    let total = 0;
    items.forEach((item) => {
      const price = isLoggedIn
        ? Number(item.price)
        : Number(item.discountPrice);
      if (!isNaN(price) && typeof item.quantity === "number") {
        total += price * item.quantity;
      }
      console.log("priceee", price);
    });
    console.log("Total pridceee0", total, mappedCartItems);
    return total;
  };

  const calculateTotalProductPrice = (items: any[]) => {
    let total = 0;
    items.forEach((item) => {
      const price = Number(item.productPrice);
      if (!isNaN(price) && typeof item.quantity === "number") {
        total += price * item.quantity;
      }
    });
    return total;
  };
  let totalCart = buyNow
    ? calculateTotalPrice(finalBuyNowItems)
    : calculateTotalPrice(MainCart);

  let totalProductCart = buyNow
    ? calculateTotalProductPrice(finalBuyNowItems)
    : calculateTotalProductPrice(MainCart);

  let formattedPrice: number = isLoggedIn
    ? totalCart
    : totalProductCart - totalCart;
  let formattedProductPrice: number = totalProductCart;
  let discountDifference: any = isLoggedIn
    ? Number(formattedProductPrice) - Number(formattedPrice)
    : Number(totalCart);

  useEffect(() => {
    console.log("DiscountDifference", discountDifference);
    console.log("FormattedPrice", formattedPrice);
    console.log("formattedProductPrie", formattedProductPrice);
  }, [discountDifference, formattedPrice, formattedProductPrice]);

  const handleOrderComplete = async () => {
    try {
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      let cartData;

      if (buyNow) {
        for (const item of finalBuyNowItems) {
          await removeFromCart(item.productId);
        }
      } else {
        cartData = MainCart.map((item) => ({
          productId: item.productId,
          quantity: 0,
        }));

        const getAuthHeaders: any = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };

        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
          cache: new InMemoryCache(),
        });

        const SYNC_CART = gql`
          mutation CartSync($cartItems: [CartItemInput!]!) {
            cartSync(cartItems: $cartItems) {
              message
              details {
                synced {
                  productId
                  productTitle
                  productImage
                  productPrice
                  quantity
                }
                failed {
                  productId
                  message
                }
                deleted {
                  productId
                  message
                }
              }
            }
          }
        `;

        const { data } = await client.mutate({
          mutation: SYNC_CART,
          variables: {
            cartItems: cartData,
          },
          context: {
            headers: getAuthHeaders(),
          },
          fetchPolicy: "no-cache",
        });
        typeof window !== "undefined"
          ? localStorage.removeItem("cartItems")
          : null;
      }
      setCartItems([]);
      setIsOrderPlaced(true);
      setSelectedShippingAddress(null);
      setSelectedBillingAddress(null);
      setSelectedPaymentMethod("");
      setFlashMessage("Your order has been placed successfully!");
      setFlashType("success");
      setFlashKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error completing order:", error);
      setFlashMessage("There was an error placing your order.");
      setFlashType("error");
      setFlashKey((prevKey) => prevKey + 1);
    }
  };

  const validateDeliveryDetails = () => {
    if (!shippingAddressSelected) {
      setFlashMessage("Please select a shipping address before proceeding.");
      setFlashType("error");
      setFlashKey((prevKey) => prevKey + 1);
      return false;
    } else if (!useSameAsBillingAddress && !selectedBillingAddress) {
      setFlashMessage("Please select a billing address before proceeding.");
      setFlashType("error");
      setFlashKey((prevKey) => prevKey + 1);
      return false;
    } else if (useSameAsBillingAddress && !selectedShippingAddress) {
      setFlashMessage("Please select a shipping address before proceeding.");
      setFlashType("error");
      setFlashKey((prevKey) => prevKey + 1);
      return false;
    }
    return true;
  };
  let totalPrice = isLoggedIn ? totalCart - totalDiscount : formattedPrice;

  const handleStepClick = (index: number, useSameAsBillingAddress: boolean) => {
    if (!isLoggedIn) {
      router.push("/register");
      return;
    }

    if (index === 0) {
      setSelectedStep(0);
      setSelectedComponent("CartItems");
    } else if (index === 1) {
      setShippingAddressSelected(false);
      setBillingAddressSelected(false);
      setSelectedShippingAddress(null);
      setSelectedBillingAddress(null);

      // Validate cart items
      if (cartItems.length === 0 && whpWallet !== "whp_Wallet") {
        // Display error message using FlashAlert
        setFlashMessage(
          "Your cart is empty. Please add items to your cart before proceeding.",
        );
        setFlashType("error");
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      setSelectedStep(1);
      setSelectedComponent("DeliveryDetails");
    } else if (index === 2) {
      if (validateDeliveryDetails()) {
        setSelectedStep(2);
        setSelectedComponent("Payment");
      }
    }
  };

  const handleProceed = (useSameAsBillingAddress: boolean) => {
    if (!isLoggedIn) {
      typeof window !== "undefined"
        ? localStorage.setItem("redirectPath", window.location.href)
        : null;
      router.push("/register");
      return;
    }

    if (selectedStep === 0) {
      // Validate cart items
      if (cartItems.length === 0) {
        // Display error message using FlashAlert
        setFlashMessage(
          "Your cart is empty. Please add items to your cart before proceeding.",
        );
        setFlashType("error");
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      setSelectedStep((prevStep) => prevStep + 1);
      setSelectedComponent("DeliveryDetails");
    } else if (selectedStep === 1) {
      if (!validateDeliveryDetails()) {
        return;
      }
      setSelectedStep((prevStep) => prevStep + 1);
      setSelectedComponent("Payment");
    } else if (selectedStep === 2) {
      // Validate payment method
      if (!selectedPaymentMethod) {
        // Display error message using FlashAlert
        setFlashMessage(
          "Please select a payment method before placing the order.",
        );
        setFlashType("error");
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      // placeOrder();
    }
  };

  const proceedButtonTitle = () => {
    if (!isLoggedIn) {
      return "Please Login to Proceed";
    }

    switch (selectedStep) {
      case 0:
        return "Address";
      case 1:
        return "Payment";
      case 2:
        return "Place Order";
      default:
        return "Proceed";
    }
  };

  const steps = [
    {
      icon: (
        <ShoppingCart
          className={`rounded-full text-2xl ${
            selectedStep === 0 ? "text-white" : "text-white"
          }`}
        />
      ),
      label: "Cart",
    },
    {
      icon: (
        <Icon.MapPin
          className={`text-2xl text-black ${
            selectedStep === 1 || selectedStep === 2 ? "text-white" : ""
          }`}
        />
      ),
      label: "Address",
    },
    {
      icon: (
        <Wallet
          className={`text-2xl ${
            selectedStep === 2 ? "text-white" : "text-black"
          }`}
        />
      ),
      label: "Payment",
    },
  ];

  const handleWhpWallet = (e: any) => {
    if (e.target.checked) {
      setWhpWallet("whp_Wallet");
    } else {
      setWhpWallet(null);
    }
  };

  const handleGiftWrapModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {/* <ProtectedRoute> */}
      {/* <head>
        <title>Cart</title>
        <meta name="description" content={"Your WHP Cart."} />
      </head> */}
      <div className="cart-block mb-8 flex-wrap">
        <div className="content-main flex flex-col justify-between px-5 lg:px-14">
          <div className="mt-4 flex w-full items-center justify-between bg-[#F8F3F466]">
            <div className="flex gap-3">
              {isOrderPlaced ? (
                <div className="flex">
                  <Image
                    src="/images/collection/check.png"
                    alt="check"
                    width={65}
                    height={10}
                    unoptimized
                  />
                  <div className="flex flex-col items-start justify-center py-3">
                    <h1 className="text-2xl font-semibold text-red-700">
                      Order Placed Successfully!
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex w-full items-center justify-evenly p-2 sm:mr-1 lg:mr-3">
                  {steps.map((step, index) => (
                    <div
                      className="flex items-center gap-1"
                      key={index}
                      onClick={() =>
                        handleStepClick(index, useSameAsBillingAddress)
                      }
                    >
                      <div
                        className={`rounded-full border border-gray-300 p-2 ${
                          selectedStep >= index ? "bg-[#E26178]" : "bg-white"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <h2 className="cursor-pointer rounded-full text-xs sm:text-lg">
                        {step.label}
                      </h2>
                      {index < steps.length - 1 && (
                        <Icon.CaretRight className="sm:ml-0 sm:mr-0 lg:ml-[10px] lg:mr-[10px]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* {!isOrderPlaced ? (
            <h2>(Review of {cartItems.length} Items)</h2>
          ) : null} */}
          <FlashAlert key={flashKey} message={flashMessage} type={flashType} />

          <div className="flex w-full flex-col justify-between lg:flex-row">
            <div className="mt-5 w-full sm:mt-7 md:pr-5 lg:w-[2000px]">
              <div className="heading bg-surface bora-4 pb-4 pt-4"></div>
              {selectedComponent === "CartItems" && (
                <CartItems
                  cartItems={buyNow ? finalBuyNowItems : MainCart}
                  handleQuantityChange={handleQuantityChange}
                  removeFromCart={removeFromCart}
                  loading={loading}
                />
              )}
              {selectedComponent === "DeliveryDetails" && (
                <DeliveryDetails
                  onShippingAddressSelected={onShippingAddressSelected}
                  onBillingAddressSelected={onBillingAddressSelected}
                  useSameAsBillingAddress={useSameAsBillingAddress}
                  setUseSameAsBillingAddress={setUseSameAsBillingAddress}
                  selectedShippingAddress={selectedShippingAddress}
                  setSelectedShippingAddress={setSelectedShippingAddress}
                  selectedBillingAddress={selectedBillingAddress}
                  setSelectedBillingAddress={setSelectedBillingAddress}
                />
              )}
              {selectedComponent === "Payment" && (
                <Payment
                  orderPlaced={isOrderPlaced}
                  selectedPaymentMethod={selectedPaymentMethod}
                  handlePaymentMethodChange={handlePaymentMethodChange}
                  totalCart={totalCart}
                  onOrderComplete={handleOrderComplete}
                  component={selectedComponent}
                  wallet={whpWallet}
                  giftWrap={GiftWrapformData}
                  selectedShippingAddress={selectedShippingAddress}
                  selectedBillingAddress={selectedBillingAddress}
                  placeOrder={handleProceed}
                  mappedCartItems={buyNow ? finalBuyNowItems : MainCart}
                  couponCode={couponCode}
                  totalDiscount={totalDiscount}
                  setCartItems={setCartItems}
                />
              )}
              {/* <h3 className="font-medium">Estimated Delivery Date:29/2/2024</h3> */}
            </div>
            <div className="mt-14 w-full lg:w-4/6">
              {selectedComponent === "CartItems" && (
                <div className="mt-12">
                  {/* <h1 className=" text-2xl text-[#E26178]">Coupons</h1> */}
                  <div className="w-full border border-gray-400 p-3">
                    <div className="flex w-full items-start justify-between">
                      <>
                        <div className="flex w-full flex-col">
                          <div className="flex items-center justify-between font-medium">
                            <div className="flex gap-2">
                              {/* <Image
                                src={"/images/icons/coupon.png"}
                                alt={"coupons"}
                                height={25}
                                width={25}
                                unoptimized
                              /> */}
                              <h3 className="text-[#E26178]">
                                {couponCode &&
                                dataAfterCouponCode.code === 200 ? (
                                  <span className="flex w-full items-center gap-2 text-green-500">
                                    Coupon Applied:{" "}
                                    <span className="text-green-500">
                                      {couponCode}
                                    </span>
                                  </span>
                                ) : (
                                  "Apply Coupon/Voucher"
                                )}
                              </h3>
                            </div>
                            <h3
                              className="cursor-pointer text-red-600 underline"
                              onClick={() =>
                                voucherCode
                                  ? removeCoupon()
                                  : handleCouponsModal()
                              }
                            >
                              {couponCode && dataAfterCouponCode.code === 200
                                ? couponCode
                                  ? "Remove"
                                  : ""
                                : ""}
                            </h3>
                          </div>
                          <div className="mt-2 flex w-full gap-2">
                            <input
                              type="text"
                              value={voucherCode}
                              onChange={(e) => setVoucherCode(e.target.value)}
                              placeholder="Enter Coupon Code"
                              className="w-full border border-gray-300 px-4 py-2 focus:border-[#bb547d] focus:outline-none"
                            />
                            <button
                              onClick={() => handleCouponCode(voucherCode)}
                              className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </>
                    </div>
                    <div className="relative w-full pt-2">
                      <Swiper
                        spaceBetween={2}
                        slidesPerView="auto"
                        modules={[Navigation]}
                        navigation={{
                          prevEl: ".swiper-button-prev",
                          nextEl: ".swiper-button-next",
                        }}
                        className="py-4"
                      >
                        {coupons.map((coupon, index) => (
                          <SwiperSlide
                            key={index}
                            className="!w-auto max-w-[calc(100vw-48px)] lg:w-full"
                          >
                            <div className="w-full flex-shrink-0 cursor-pointer border border-gray-200 bg-white p-2 shadow-sm transition-all hover:shadow-md">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-red-100 p-2 text-sm text-red-600">
                                    {coupon.discountType === "Amount"
                                      ? `₹${coupon.discountValue}`
                                      : `${coupon.discountValue}%`}{" "}
                                    OFF
                                  </div>
                                  {coupon.isExclusive === true && (
                                    <div className="rounded-full bg-[#E26178] p-1 text-[8px] text-white">
                                      Only for you
                                    </div>
                                  )}
                                </div>
                                {voucherCode &&
                                dataAfterCouponCode.code === 200 &&
                                couponCode === coupon.code ? (
                                  <span className="text-sm font-medium text-green-600">
                                    Applied
                                  </span>
                                ) : (
                                  <button
                                    className="text-sm font-medium text-red-600 hover:text-red-700"
                                    onClick={() => {
                                      handleCouponCode(coupon.code);
                                    }}
                                  >
                                    Apply
                                  </button>
                                )}
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                Get{" "}
                                {coupon.discountType === "Amount"
                                  ? "flat "
                                  : ""}
                                {coupon.discountType === "Amount"
                                  ? `₹${coupon.discountValue}`
                                  : `${coupon.discountValue}%`}{" "}
                                off on minimum purchase of ₹
                                {coupon.discountMinAmount}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  Code: {coupon.code}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Valid till{" "}
                                  {new Date(
                                    coupon.discountEndDate,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    {/* {couponCode && dataAfterCouponCode.code === 200 && (
                      <div className="text-wrap bg-gray-100 p-2">
                        <p>
                       
                          {voucherCode}{" "}
                          <span className="text-red-600"> applied </span>
                        </p>
                       
                      </div>
                    )} */}
                  </div>
                  {/* {couponsModal && (
                    <CouponsModal
                      handleCouponCheck={handleCouponCheck}
                      onClose={handleCouponModalClose}
                      couponCode={handleCouponCode}
                    />
                  )} */}
                  <div className="mt-3 border border-gray-400">
                    <div className="flex justify-between p-3">
                      <div className="flex items-center gap-2 font-medium">
                        <Gift style={{ color: "red", fontSize: "24px" }} />
                        <h3>Gift Message</h3>
                      </div>
                      <h3
                        className="cursor-pointer text-red-600 underline"
                        onClick={() => handleGiftWrapModal()}
                      >
                        Add
                      </h3>
                      {showModal && (
                        <GiftWrapModal
                          closeModal={handleCloseModal}
                          handleGiftWrapData={handleGiftWrapFormData}
                        />
                      )}
                    </div>
                    {GiftWrapformData.name.length !== 0 && (
                      <div className="m-2 text-wrap bg-gray-100 p-2">
                        <div>
                          <b>Gift Message :</b> {GiftWrapformData.name}
                        </div>
                      </div>
                    )}
                  </div>
                  {!isOrderPlaced && isLoggedIn && (
                    <div className="mt-2 flex justify-between border border-gray-400 p-2">
                      <div className="flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          value="whp_Wallet"
                          checked={whpWallet == "whp_Wallet"}
                          onChange={handleWhpWallet}
                        />
                        <h3>WHP Wallet</h3>
                      </div>
                      <div className="font-bold">
                        {whpWallet == "whp_Wallet"
                          ? `${totalPrice >= userDetails?.wallet_amount ? formatPrice(0) : formatPrice(userDetails?.wallet_amount - totalPrice)}`
                          : `${formatPrice(userDetails?.wallet_amount)}`}
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-lg font-bold">ORDER SUMMARY</p>
                  {loading ? (
                    <Skeleton height={150} />
                  ) : (
                    <div className="mt-2 bg-gray-100 p-2">
                      <div className="">
                        <div className="flex justify-between font-medium">
                          <h3>Product Total</h3>
                          <h3>{formatPrice(formattedProductPrice)}</h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Product Discount</h3>
                          <h3>-{formatPrice(discountDifference)}</h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Subtotal</h3>
                          <h3>{formatPrice(Number(formattedPrice))}</h3>
                        </div>
                        {totalDiscount > 0 && dataAfterCouponCode && (
                          <div className="flex justify-between font-medium">
                            <h3>Coupon Discount</h3>
                            <h3>-{formatPrice(totalDiscount)}</h3>
                          </div>
                        )}
                        <div className="flex justify-between font-medium">
                          <h3>Wallet</h3>
                          {whpWallet === "whp_Wallet" ? (
                            userDetails?.wallet_amount < totalPrice ? (
                              <h3>
                                -{formatPrice(userDetails?.wallet_amount)}
                              </h3>
                            ) : (
                              <h3>
                                -
                                {formatPrice(
                                  userDetails?.wallet_amount -
                                    (userDetails?.wallet_amount - totalPrice),
                                )}
                              </h3>
                            )
                          ) : (
                            <h3>{formatPrice(0)}</h3>
                          )}
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Shipping Charges</h3>
                          <h3>{formatPrice(0)}</h3>
                        </div>
                        <div className="flex justify-between border-t-2 border-t-rose-400 p-1 px-0 font-bold">
                          <h3 className="text-gray-800">Total Price</h3>

                          {whpWallet === "whp_Wallet" ? (
                            userDetails?.wallet_amount < totalPrice ? (
                              <h3>
                                {formatPrice(
                                  totalPrice - userDetails?.wallet_amount,
                                )}
                              </h3>
                            ) : (
                              <h3>{formatPrice(0)}</h3>
                            )
                          ) : (
                            <h3>{formatPrice(totalPrice)}</h3>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(selectedComponent === "DeliveryDetails" ||
                (selectedComponent === "Payment" && !isOrderPlaced)) && (
                <div id="order-summary">
                  <h1 className="my-5 text-2xl text-rose-600">ORDER SUMMARY</h1>
                  <OrderSummary
                    wallet={whpWallet}
                    component={selectedComponent}
                    handleWhpWallet={handleWhpWallet}
                    totalProductPrice={formattedProductPrice}
                    discountDifference={discountDifference}
                    price={formattedPrice}
                    totalDiscount={totalDiscount}
                    totalCart={totalCart}
                    cartItems={buyNow ? finalBuyNowItems : MainCart}
                    isBuyNow={false}
                  />
                </div>
              )}
              {selectedStep !== 2 && (
                <ProceedButton
                  totalPrice={totalPrice}
                  isMobile={isMobile}
                  proceedButtonTitle={proceedButtonTitle()}
                  handleProceed={handleProceed}
                  useSameAsBillingAddress={useSameAsBillingAddress}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobile && selectedComponent !== "Payment" && (
        <div className="fixed bottom-0 z-50 flex w-full justify-between bg-white p-3">
          <div>
            {whpWallet === "whp_Wallet" ? (
              userDetails?.wallet_amount < totalPrice ? (
                <h3 className="text-[18px] font-medium">
                  {formatPrice(totalPrice - userDetails?.wallet_amount)}
                </h3>
              ) : (
                <h3 className="text-[18px] font-medium">{formatPrice(0)}</h3>
              )
            ) : (
              <h3 className="text-[18px] font-medium">
                {formatPrice(totalPrice)}
              </h3>
            )}
            <Link href="#order-summary">
              <p className="cursor-pointer text-[12px] font-medium text-[#e26178]">
                View Order Summary
              </p>
            </Link>
          </div>
          <div
            className="flex h-[54px] w-[170px] cursor-pointer items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-sm text-white"
            onClick={() => handleProceed(useSameAsBillingAddress)}
          >
            <button className="">{proceedButtonTitle()}</button>
            {/* <span>
              <ArrowRight style={{ marginLeft: "10px", marginRight: "10px" }} />
            </span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
