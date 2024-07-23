"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import StickyNav from "@/components/Header/StickyNav";
import CartItems from "./CartItems";
import DeliveryDetails from "./DeliveryDetails";
import Payment from "./Payment";
import OrderSummary from "./OrderSummary";
import ProceedButton from "./ProceedButton";
import Link from "next/link";
import CouponsModal from "@/components/Other/CouponsModal";
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
import { baseUrl, syncCart, coupon } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Address } from "@/type/AddressType";
import GiftWrapModal from "@/components/Modal/GiftWrapModal";
import ProtectedRoute from "../ProtectedRoute";

const Checkout: React.FC = () => {
  const { cartItems, updateCart, setCartItems, removeFromCart } = useCart();
  const { totalDiscount, updateDiscount } = useCouponContext();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [cartProductIds, setCartProductIds] = useState<any[]>([]);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("CartItems");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState, isLoggedIn } = useUser();
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

  // const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow");
  const pathname = usePathname();

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

  const handleCouponModalClose = () => {
    setCouponsModal(false);
  };
  const handleCouponCode = (value: string) => {
    console.log("value", value);
    setCouponCode(value);
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
        if (data.Coupon.code == 400) {
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
      } finally {
        setLoading(false);
      }
    };
    fetchCouponData();
  };

  useEffect(() => {
    console.log("Coupon code info", dataAfterCouponCode);
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
        item?.productDetails?.title ||
        item?.productDetails?.discountPrice ||
        item?.productDetails?.imageDetails,
    )
    .map((item: any) => ({
      productId: item?.productId,
      quantity: item?.quantity,
      name: item?.productDetails?.title,
      price: item?.productDetails?.discountPrice,
      productPrice: item?.productDetails?.productPrice,
      image:
        item?.productDetails?.imageDetails &&
        item?.productDetails?.imageDetails.length > 0
          ? item?.productDetails.imageDetails[0].image_path
          : "",
    }));

  const MainCart = isLoggedIn ? cartItems : mappedCartItems;

  const finalBuyNowItems = buyNow
    ? MainCart.filter((item) => item.productId == parseInt(buyNow))
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
      const price = parseInt(item.price?.toString());
      if (!isNaN(price) && typeof item.quantity === "number") {
        total += price * item.quantity;
      }
    });
    return total;
  };

  const calculateTotalProductPrice = (items: any[]) => {
    let total = 0;
    items.forEach((item) => {
      const price = parseInt(item.productPrice?.toString());
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

  let formattedPrice: string = totalCart.toString();
  let formattedProductPrice: string = totalProductCart.toString();
  let discountDifference: string =
    parseFloat(formattedProductPrice) - parseFloat(formattedPrice);

  const handleOrderComplete = async (items: any, items2: any) => {
    try {
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      let cartData;

      if (buyNow) {
        console.log("Removing buy now items from cart:", finalBuyNowItems);
        for (const item of finalBuyNowItems) {
          await removeFromCart(item.productId);
        }
      } else {
        console.log("Removing all items from cart:", MainCart);
        cartData = MainCart.map((item) => ({
          productId: item.productId,
          quantity: 0,
        }));
      }

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

      const SYNC_CART = gql`mutation CartSync($cartItems: [CartItemInput!]!) {
        cartSync(cartItems: $cartItems) {
          message
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
      console.log("API response:", data);

      setCartItems([]);
      setIsOrderPlaced(true);
      setSelectedShippingAddress(null);
      setSelectedBillingAddress(null);
      setSelectedPaymentMethod("");
      setFlashMessage("Your order has been placed successfully!");
      setFlashType("success");
      setFlashKey((prevKey) => prevKey + 1);

      console.log("Order placed, cart cleared, flash message set");
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
  let totalPrice = totalCart - totalDiscount;

  const handleStepClick = (index: number, useSameAsBillingAddress: boolean) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (index === 0) {
      setSelectedStep(0);
      setSelectedComponent("CartItems");
    } else if (index === 1) {
      // Reset the address selection states when returning to the delivery details step
      setShippingAddressSelected(false);
      setBillingAddressSelected(false);
      setSelectedShippingAddress(null);
      setSelectedBillingAddress(null);

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

      router.push("/login");
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

  const handleGiftWrapModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {/* <ProtectedRoute> */}
      <div className="cart-block mb-8 flex-wrap">
        <div className="content-main flex flex-col justify-between px-5 lg:px-14">
          <div className="mt-4 flex w-full items-center justify-between bg-[#F8F3F466]">
            <div className="flex gap-3">
              {isOrderPlaced ? (
                <div className="flex">
                  <Image
                    src="/images/collection/check.png"
                    alt="check"
                    width={100}
                    height={10}
                  />
                  <div className="flex flex-col items-start justify-center py-3">
                    <h1 className="text-3xl font-semibold text-red-700">
                      Order Placed!!
                    </h1>
                    <h1>ID-#32432</h1>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex w-full items-center p-2 sm:mr-1 lg:mr-3">
                  {steps.map((step, index) => (
                    <div
                      className="max-sm:w-25 max-md:w-25 flex items-center lg:w-40"
                      key={index}
                      onClick={() =>
                        handleStepClick(index, useSameAsBillingAddress)
                      }
                    >
                      <div
                        className={`rounded-full border border-gray-300 p-2 ${
                          selectedStep >= index ? "bg-rose-400" : "bg-white"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <h2 className="cursor-pointer rounded-full">
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
          {!isOrderPlaced ? (
            <h2>(Review of {cartItems.length} Items)</h2>
          ) : null}
          <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
          <div className="flex flex-col justify-between md:flex-row lg:flex-row">
            <div className="mt-5 w-full sm:mt-7 md:w-[2000px] md:pr-5">
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
                  // onOrderComplete={handleOrderComplete}
                  onOrderComplete={(setCartItems) =>
                    handleOrderComplete(setCartItems, removeFromCart)
                  }
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
            <div className="mt-5 w-full lg:w-3/4">
              {selectedComponent === "CartItems" && (
                <div>
                  <h1 className="my-5 text-2xl text-rose-600">Coupons</h1>
                  <div className="border border-gray-400 p-3">
                    <div className="flex justify-between">
                      <>
                        <div className="flex items-center gap-2 font-medium">
                          <Image
                            src={"/images/icons/coupon.png"}
                            alt={"coupons"}
                            height={25}
                            width={25}
                          />
                          <h3>Coupon Code</h3>
                        </div>
                        <h3
                          className="cursor-pointer text-red-600 underline"
                          onClick={() => handleCouponsModal()}
                        >
                          Check
                        </h3>
                      </>
                    </div>
                    {couponCode && dataAfterCouponCode.code === 200 && (
                      <div className="m-2 text-wrap bg-gray-100 p-2">
                        <p>
                          <span className="font-bold">Coupon Code:</span>
                          {couponCode}
                        </p>
                      </div>
                    )}
                  </div>
                  {couponsModal && (
                    <CouponsModal
                      handleCouponCheck={handleCouponCheck}
                      onClose={handleCouponModalClose}
                      couponCode={handleCouponCode}
                    />
                  )}
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
                  <p className="mt-2 text-lg font-bold">ORDER SUMMARY</p>
                  {loading ? (
                    <Skeleton height={150} />
                  ) : (
                    <div className="mt-2 bg-gray-100 p-2">
                      <div className="">
                        <div className="flex justify-between font-medium">
                          <h3>Product Total</h3>
                          <h3>
                            ₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(
                              Math.round(parseInt(formattedProductPrice)),
                            )}
                          </h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Product Discount</h3>
                          <h3>
                            -₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(Math.round(parseInt(discountDifference)))}
                          </h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Subtotal</h3>
                          <h3>
                            ₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(Math.round(parseInt(formattedPrice)))}
                          </h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Discount</h3>
                          <h3>
                            ₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(Math.round(parseInt(totalDiscount)))}
                          </h3>
                        </div>
                        <div className="flex justify-between font-medium">
                          <h3>Shipping Charges</h3>
                          <h3>
                            ₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(Math.round(0))}
                          </h3>
                        </div>
                        <div className="flex justify-between font-bold">
                          <h3 className="text-gray-800">Total Price</h3>
                          <h3>
                            ₹
                            {Intl.NumberFormat("en-IN", {
                              minimumFractionDigits: 2,
                            }).format(
                              Math.round(parseInt(totalPrice.toString())),
                            )}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(selectedComponent === "DeliveryDetails" ||
                selectedComponent === "Payment") && (
                <div id="order-summary">
                  <h1 className="my-5 text-2xl text-rose-600">ORDER SUMMARY</h1>
                  <OrderSummary
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
      {/* </ProtectedRoute> */}

      {isMobile && (
        <div className="fixed bottom-0 z-50 flex w-full justify-between bg-white p-3">
          <div>
            <p className="text-[20px] font-bold">
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalPrice.toString())))}
            </p>
            <Link href="#order-summary">
              <p className="cursor-pointer text-[#e26178]">
                {" "}
                View Order Summary
              </p>
            </Link>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 font-bold text-white"
            onClick={() => handleProceed(useSameAsBillingAddress)}
          >
            <button className="">{proceedButtonTitle()}</button>
            <span>
              <ArrowRight style={{ marginLeft: "10px", marginRight: "10px" }} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
