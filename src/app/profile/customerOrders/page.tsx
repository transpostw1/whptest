"use client";
import React, { useEffect, useState } from "react";
import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import ProtectedRoute from "@/app/ProtectedRoute";
import StickyNav from "@/components/Header/StickyNav";
import MobileOrders from "@/components/Profile/MobileOrders";

const CustomerOrders = () => {
  const [orderData, setOrderData] = useState<any>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  useEffect(() => {
    const handleOrders = async () => {
      try {
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
        const link = new HttpLink({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
        });

        const client = new ApolloClient({
          link,
          cache: new InMemoryCache(),
        });

        const GET_ORDER = gql`
          query GetCustomerOrder($token: String!) {
            getCustomerOrder(token: $token) {
              id
              productDetails {
                productId
                productAmount
                quantity
                url
                SKU
                makeToOrder
                variantId
                productTotal
                metalType
                metalWeight
                discountAmount
                discountValue
                typeOfDiscount
                discountedTotal
                displayTitle
                productPrice
                discountPrice
                variants
                mediaId
                imageDetails {
                  image_path
                  order
                  alt_text
                }
                videoDetails {
                  video_path
                  order
                  alt_text
                }
                rating
              }
              customerId
              billingAddressId {
                address_id
                customer_id
                address_type
                full_address
                country
                state
                city
                landmark
                pincode
              }
              shippingAddressId {
                address_id
                customer_id
                address_type
                full_address
                country
                state
                city
                landmark
                pincode
              }
              trackingNo
              ETD
              couponId
              orderNo
              razorpayOrderNo
              productTotal
              discountedTotal
              balanceAmount
              paymentStatus
              orderStatus
              isWrap
              message
              payments {
                paymentId
                orderId
                date
                paymentMethod
                transactionNo
                amount
              }
              created_at
              orderTracking {
                id
                orderId
                customerId
                orderStatus
                created_at
                updated_at
                trackingOrderStatusName
              }
              eshipTracking {
                id
                orderId
                trackingId
                trackingNumber
                deliveryDate
                expectedDeliveryDate
                shipmentStatus
                tag
                checkpoints
              }
            }
          }
        `;
        const variables = { token: cookieToken };
        const { data } = await client.query({
          query: GET_ORDER,
          variables,
        });
        setOrderData(data.getCustomerOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    handleOrders();
  }, []);

  if (isMobile) {
    return (
      <ProtectedRoute>
        <div>
          <StickyNav />
          <MobileOrders orders={orderData} />
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <head>
        <title>Your Orders</title>
        <meta name="description" content={"profile details"} />
      </head>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>
        <div className="w-screen">
          <ProfileOrders orders={orderData} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CustomerOrders;
