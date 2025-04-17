// Payment.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CreditCard } from "@phosphor-icons/react";
import axios from "axios";
import { Address } from "@/type/AddressType";
import BuyAgain from "@/components/Home1/BuyAgain";
import { useCart } from "@/context/CartContext";
import ReactLoading from "react-loading";
import Loader from "@/components/Other/Loader";
import Cookie from "js-cookie";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { TbTruckDelivery } from "react-icons/tb";
import { SiRazorpay } from "react-icons/si";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Confetti from "@/components/Other/Confetti";
interface PaymentProps {
  wallet: any;
  giftWrap: any;
  orderPlaced: boolean;
  selectedPaymentMethod: string;
  component: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: number;
  onOrderComplete: () => void;
  selectedShippingAddress: Address | null;
  selectedBillingAddress: Address | null;
  handleProceed: () => void;
  mappedCartItems: any[];
  couponCode: string;
  totalDiscount: number; // Add the totalDiscount prop
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const Payment: React.FC<PaymentProps> = ({
  wallet,
  giftWrap,
  orderPlaced,
  selectedPaymentMethod,
  handlePaymentMethodChange,
  totalCart,
  component,
  onOrderComplete,
  selectedShippingAddress,
  selectedBillingAddress,
  handleProceed,
  mappedCartItems,
  couponCode,
  totalDiscount,
  setCartItems,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const cookieToken =
    typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const [offerBanners, setOfferBanners] = useState<any>([]);
  const [walletPayment, setWalletPayment] = useState<any>(null);
  const { logOut, isLoggedIn, userDetails } = useUser();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [orderResponse, setOrderResponse] = useState<any>();
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission
    // You can add any validation or logic here if needed
    console.log("formData from PayU", e.target.value);
    e.target.submit(); // Manually submit the form
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

  const handleWalletPayment = () => {
    setWalletPayment("whp_Wallet");
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleAbandonedCart = async () => {
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
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

      const STORE_ABANDONED_CART = gql`
        mutation StoreAbandonedCart($abandonedCart: abandonedCart!) {
          storeAbandonedCart(abandonedCart: $abandonedCart) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: STORE_ABANDONED_CART,
        variables: {
          abandonedCart: {
            products: mappedCartItems.map((item) => ({
              productId: item.productId.toString(),
              productAmount: item.price,
              quantity: item.quantity,
              productTotal: item.price * item.quantity,
              discountAmount: 0,
              discountedTotal: item.price * item.quantity,
            })),
            couponCode: couponCode,
            productTotal: totalCart,
            discountedTotal: totalCart - totalDiscount,
            shippingCharges: 10,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      console.log(data, "data");
    };
    handleAbandonedCart();
  }, [component == "Payment"]);
  useEffect(() => {
    const fetchSubBanners = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GET_ALLOFFERS = gql`
          query GetAllOffers {
            getAllOffers {
              id
              title
              url
              img
            }
          }
        `;
        const { data } = await client.query({
          query: GET_ALLOFFERS,
        });

        setOfferBanners(data.getAllOffers);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubBanners();
  }, []);
  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay SDK loaded");
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderUrl = "/api/razorpay";
      const response = await axios.post(orderUrl, {
        amount:
          wallet && userDetails?.wallet_amount < totalCart
            ? (totalCart - userDetails?.wallet_amount) * 100
            : totalCart * 100,
      });
      console.log(response);
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "rzp_live_vh97GOv9gE694e",
        amount: amount.toString(),
        currency: currency,
        name: "WHP Jewellers",
        description: "Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          try {
            setLoading(true);
            // Prepare the data to be sent to the API
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            const orderData = {
              isWallet: wallet ? 1 : 0,
              isWrap: giftWrap.wrapOption ? 1 : 0,
              message: giftWrap.wrapOption ? giftWrap.name : "",
              walletAmount:
                wallet == 1
                  ? Number(totalCart) > Number(userDetails?.wallet_amount)
                    ? Number(totalCart) - Number(userDetails?.wallet_amount)
                    : Number(userDetails?.wallet_amount) - Number(totalCart)
                  : 0,
              name: userDetails?.fullname,
              email: userDetails?.email,
              contact: userDetails?.mobile_no,
              customerId: userDetails?.customer_id,
              paymentDetails: {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
              },
              shippingAddress: selectedShippingAddress
                ? {
                    addressId: selectedShippingAddress.address_id || null,
                    addressType: selectedShippingAddress.address_type,
                    fullAddress: selectedShippingAddress.full_address,
                    country: selectedShippingAddress.country,
                    state: selectedShippingAddress.state,
                    city: selectedShippingAddress.city,
                    landmark: selectedShippingAddress.landmark,
                    pincode: selectedShippingAddress.pincode.toString(),
                  }
                : {},
              billingAddress: selectedBillingAddress
                ? {
                    addressId: selectedBillingAddress.address_id || null,
                    addressType: selectedBillingAddress.address_type,
                    fullAddress: selectedBillingAddress.full_address,
                    country: selectedBillingAddress.country,
                    state: selectedBillingAddress.state,
                    city: selectedBillingAddress.city,
                    landmark: selectedBillingAddress.landmark,
                    pincode: selectedBillingAddress.pincode.toString(),
                  }
                : {},
              productDetails: {
                products: mappedCartItems.map((item) => ({
                  productId: item.productId.toString(),
                  productAmount: item.price,
                  quantity: item.quantity.toString(),
                  variants: item.variants,
                  productTotal: (item.price * item.quantity).toString(),
                  discountAmount: "0",
                  discountedTotal: (item.price * item.quantity).toString(),
                })),
                coupons: {
                  couponCode: couponCode,
                  discountPrice: totalDiscount,
                },
                productTotal: totalCart.toString(),
                discountedTotal: (totalCart - totalDiscount).toString(),
                shippingCharges: "10",
              },
            };
            console.log(orderData, "orderDataAAAA");
            const apiResponse = await axios.post(
              `${baseUrl}/orders`,
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                },
              },
            );
            console.log(apiResponse.data);
            // Handle the response as needed
            setOrderResponse(apiResponse.data.data);
            // Call the onOrderComplete function after the API call is successful
            onOrderComplete();
          } catch (error) {
            console.error("Error placing order:", error);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userDetails?.fullname,
          email: userDetails?.email,
          contact: userDetails?.mobile_no,
          customerId: userDetails?.customer_id,
        },
        notes: {
          address: "WHP Jewllers",
        },
        theme: {
          color: "#fb7185",
        },
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtherPaymentGateway = () => {
    // Handle other payment gateway logic
    alert("Other payment gateway selected");
    // Implement the logic for the other payment gateway here
    // Once the payment is successful, call the onOrderComplete function
  };
  const handleCodPayment = async () => {
    setLoading(true);
    try {
      try {
        setLoading(true);
        // Prepare the data to be sent to the API
        const orderData = {
          isWallet: wallet ? 1 : 0,
          isWrap: giftWrap.wrapOption ? 1 : 0,
          message: giftWrap.wrapOption ? giftWrap.name : "",
          walletAmount: wallet
            ? totalCart > wallet
              ? Number(totalCart) - Number(userDetails?.wallet_amount)
              : Number(userDetails?.wallet_amount) - Number(totalCart)
            : 0,
          shippingAddress: selectedShippingAddress
            ? {
                addressId: selectedShippingAddress.address_id || null,
                addressType: selectedShippingAddress.address_type,
                fullAddress: selectedShippingAddress.full_address,
                country: selectedShippingAddress.country,
                state: selectedShippingAddress.state,
                city: selectedShippingAddress.city,
                landmark: selectedShippingAddress.landmark,
                pincode: selectedShippingAddress.pincode.toString(),
              }
            : {},
          billingAddress: selectedBillingAddress
            ? {
                addressId: selectedBillingAddress.address_id || null,
                addressType: selectedBillingAddress.address_type,
                fullAddress: selectedBillingAddress.full_address,
                country: selectedBillingAddress.country,
                state: selectedBillingAddress.state,
                city: selectedBillingAddress.city,
                landmark: selectedBillingAddress.landmark,
                pincode: selectedBillingAddress.pincode.toString(),
              }
            : {},
          productDetails: {
            products: mappedCartItems.map((item) => ({
              productId: item.productId.toString(),
              productAmount: item.price,
              quantity: item.quantity.toString(),
              productTotal: (item.price * item.quantity).toString(),
              discountAmount: "0", // Replace with the actual discount amount if available
              discountedTotal: (item.price * item.quantity).toString(), // Replace with the discounted total if available
            })),
            coupons: {
              couponCode: couponCode, // Replace with the actual coupon code if available
              discountPrice: totalDiscount, // Replace with the actual discount price if available
            },
            productTotal: totalCart.toString(),
            discountedTotal: (totalCart - totalDiscount).toString(),
            shippingCharges: "10",
          },
          paymentDetails: {
            paymentId: "0",
            orderId: "0",
            signature: "0",
          },
        };
        const apiResponse = await axios.post(`${baseUrl}/orders`, orderData, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
        setOrderResponse(apiResponse.data.data);
        onOrderComplete();
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === "razorpay") {
      console.log("razorpay should initiate");
      handleRazorpayPayment();
    } else if (selectedPaymentMethod === "COD") {
      handleCodPayment();
    } else if (selectedPaymentMethod === "otherPaymentGateway") {
      handleOtherPaymentGateway();
    } else {
      handleProceed();
    }
  };

  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;
  if (loading) return <Loader />;
  return (
    <div>
      {!orderPlaced && (
        <div className="flex flex-col gap-5 sm:w-[30rem] md:w-[30rem] lg:w-[41rem]">
          <h1 className="text-2xl">Payment Method</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
              <label
                htmlFor="cashOnDelivery"
                className="flex cursor-pointer items-center gap-2 font-medium"
              >
                <TbTruckDelivery />
                Cash On Delivery (COD)
              </label>
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentOption"
                value="COD"
                className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-transparent checked:bg-[#e26178] focus:bg-[#e26178] focus:outline-none"
                checked={selectedPaymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
              <label
                htmlFor="razorpayPayment"
                className="flex cursor-pointer items-center gap-2 font-medium"
              >
                <SiRazorpay />
                Razorpay (UPI, Cards)
              </label>
              <input
                type="radio"
                id="razorpayPayment"
                name="paymentOption"
                value="razorpay"
                className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-transparent checked:bg-[#e26178] focus:bg-[#e26178] focus:outline-none"
                checked={selectedPaymentMethod === "razorpay"}
                onChange={handlePaymentMethodChange}
              />
            </div>
            {/* <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="otherPaymentGateway"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <CreditCard className="text-2xl text-red-600" />
            Other Payment Gateway
          </label>
          <input
            type="radio"
            id="otherPaymentGateway"
            name="paymentOption"
            value="otherPaymentGateway"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "otherPaymentGateway"}
            onChange={handlePaymentMethodChange}
          />
        </div> */}
            {/* <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="paypalPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/paypal-icon.png"
              alt="PayPal"
              width={30}
              height={30}
              objectFit="fill"
            />
            PayPal
          </label>
          <input
            type="radio"
            id="paypalPayment"
            name="paymentOption"
            value="paypal"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
        </div> */}
            {/* <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="stripePayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/stripe-icon.png"
              alt="Stripe"
              width={30}
              height={30}
              objectFit="fill"
            />
            Stripe (Credit/Debit Cards)
          </label>
          <input
            type="radio"
            id="stripePayment"
            name="paymentOption"
            value="stripe"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "stripe"}
            onChange={handlePaymentMethodChange}
          />
        </div> */}
          </div>
          {/* <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
      <div>
        <div>
          -10% off on HDFC Bank Credit Card. Use{" "}
          <span className="font-bold">HDFC10</span>
          <span className="text-red-600 underline">View more Offers</span>
        </div>
        <div>
          -7% off on SBI Bank Credit Card. Use{" "}
          <span className="font-bold">SBI7</span>{" "}
          <span className="text-red-600 underline">View more Offers</span>
        </div>
      </div> */}
          {!isMobile && (
            <button
              onClick={handlePayment}
              className="cursor-pointer rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
              disabled={
                !selectedShippingAddress ||
                !selectedBillingAddress ||
                !isValidTotalCart ||
                !selectedPaymentMethod
              }
            >
              Place Order
            </button>
          )}
          {/* {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Thank you!</h2>
            <p className="text-gray-700">Thank you for placing your order.</p>
            <button
              onClick={closeModal}
              className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
        </div>
      )}
      {orderPlaced && (
        <>
          <div className="mb-4 w-full rounded-lg border border-gray-200">
            <div className="flex justify-between border-b-2 border-t-0 p-4">
              <div className="">
                <span className="font-semibold">Order Id: </span>
                {orderResponse.order.orderNo}
              </div>
              <div className="">
                <span className="font-semibold">Order Date: </span>
                {new Date(
                  orderResponse.order.created_at || new Date(),
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
            <div>
              {orderResponse.productDetails.products.map(
                (product: any, index: any) => (
                  <div className="flex justify-between p-4" key={index}>
                    <div className="flex">
                      <div className="mr-3">
                        <Image
                          src={
                            product?.productImage || "/images/other/Logo.png"
                          }
                          alt={product?.productTitle || "Product Image"}
                          width={85}
                          height={85}
                          className="bg-[#f7f7f7]"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {product?.productTitle}
                        </p>
                        {/* <p>
                      {product?.metalType}-{product?.metalWeight}
                    </p> */}
                        <p>Quantity: {product?.quantity}</p>
                      </div>
                    </div>
                    <div className="font-semibold">
                      {formatPrice(product?.discountedTotal)}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <p className="text-[1.5rem]">Wait! there's more you'll love</p>
          <div className="mt-5 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {offerBanners.map((item: any, index: any) => (
              <div key={index}>
                <Link
                  href={{
                    pathname: "/products",
                    query: {
                      url: item.url,
                    },
                  }}
                >
                  <Image
                    src={item.img}
                    alt={"the offer banner"}
                    width={400}
                    height={400}
                    unoptimized
                  />
                </Link>
              </div>
            ))}
          </div>
          <Confetti trigger={orderPlaced} />
        </>
      )}
      {!orderPlaced && isMobile && component === "Payment" && (
        <div className="fixed bottom-0 z-50 flex w-full justify-between bg-white p-3">
          <div>
            <p className="text-[18px] font-medium">
              {formatPrice(totalCart - totalDiscount)}
            </p>
            <Link href="#order-summary">
              <p className="cursor-pointer text-[12px] font-medium text-[#e26178]">
                View Order Summary
              </p>
            </Link>
          </div>
          <div
            className="flex h-[58px] w-[170px] cursor-pointer items-center justify-center rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 font-bold text-white"
            onClick={handlePayment}
          >
            <button
              className=""
              disabled={
                !selectedShippingAddress ||
                !selectedBillingAddress ||
                !isValidTotalCart ||
                !selectedPaymentMethod
              }
            >
              Pay Now
            </button>
            <span>
              <ArrowRight style={{ marginLeft: "10px", marginRight: "10px" }} />
            </span>
          </div>
        </div>
      )}
      {/* <form
        action="https://test.payu.in/_payment"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="key" value="BHvL8K" />
        <input type="hidden" name="txnid" value="t6svtqtjRdl4ws" />
        <input type="hidden" name="productinfo" value="iPhone" />
        <input type="hidden" name="amount" value="10" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input
          type="hidden"
          name="surl"
          value="https://apiplayground-response.herokuapp.com/"
        />
        <input
          type="hidden"
          name="furl"
          value="https://apiplayground-response.herokuapp.com/"
        />
        <input type="hidden" name="phone" value="9988776655" />
        <input
          type="hidden"
          name="hash"
          value="eabec285da28fd0e3054d41a4d24fe9f7599c9d0b66646f7a9984303fd6124044b6206daf831e9a8bda28a6200d318293a13d6c193109b60bd4b4f8b09c90972"
        />
        <input type="submit" value="Submit" />
      </form> */}
    </div>
  );
};

export default Payment;
