"use client";
import { ProductData, ProductType } from "@/type/ProductType";
import Image from "next/image";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { FaStar } from "react-icons/fa6";
import StarRating from "@/components/Other/StarRating";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl, storeReviews, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import FlashAlert from "@/components/Other/FlashAlert";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
interface Props {
  product: ProductData;
}
const data = [
  {
    id: 1,
    title: "What types of jewellery do you offer?",
    content:
      "We offer a wide range of gold and diamond fashion jewellery, including earrings, necklaces,bangles, pendants, bracelets, and more—for men, women, and kids.",
  },
  {
    id: 2,
    title: "Are your products made of real gold and diamonds?",
    content:
      "Yes, all our jewellery is crafted with certified real gold and natural diamonds, as specified in each product listing.",
  },
  {
    id: 3,
    title: "Are your products BIS Hallmarked?",
    content:
      "Yes, all our gold jewellery is BIS Hallmarked to ensure purity and authenticity.",
  },
  {
    id: 4,
    title: "How can I contact customer support?",
    content:
      "You can reach us via WhatsApp, phone, or email mentioned on our Contact Us page. Our team is available 6 days a week to assist you. (Morning 10:00 AM to Evening 07:30 PM)",
  },
  {
    id: 5,
    title: "How do I place an order?",
    content:
      "Just select the jewellery you like, choose your specifications (size, variant, etc.), and proceed to checkout with your delivery and payment details.",
  },
  {
    id: 6,
    title: "What payment methods do you accept?",
    content:
      "We accept all major debit/credit cards, UPI, Net Banking, Wallets, and EMI options.",
  },
  {
    id: 7,
    title: "Is Cash on Delivery (COD) available?",
    content:
      "Yes, COD is available for orders up to ₹50,000 and select pin codes. For higher-value orders, we recommend using secure prepaid options like debit/credit cards, UPI, Net Banking, or EMI.",
  },
  {
    id: 8,
    title: "Is it safe to shop online on your website?",
    content:
      "Absolutely. Our website uses secure SSL encryption and trusted payment gateways to ensure your data is protected.",
  },
  {
    id: 9,
    title: "Do you offer free shipping?",
    content:
      "Ready-to-ship products are usually delivered on the same day or within 12 to 48 hours, depending on your location. Made-to-order products may take anywhere from 5 to 12 days for crafting anddelivery.We’ll keep you updated at every stage, and you’ll receive a tracking link once your order is dispatched.",
  },
  {
    id: 10,
    title: "How do I track my order?",
    content:
      "Once your order is shipped, we’ll send you a tracking link via email, SMS &amp; WhatsApp.",
  },
  {
    id: 11,
    title: "What is your return policy?",
    content:
      "We offer a 7-day return or exchange policy for unused and unworn products. Please refer to our Returns &amp; Exchanges page for full details.",
  },
  {
    id: 12,
    title: "Can I cancel or modify my order after placing it?",
    content:
      "Orders can be cancelled or modified within 24 hours of placement. After that, the product may already be under processing.",
  },
  {
    id: 13,
    title: "Do you offer jewellery customization?",
    content:
      "Yes, we offer name engraving, design changes, and size customization. Please contact our team for custom orders.",
  },
  {
    id: 14,
    title: "How do I know my ring/bangle size?",
    content:
      "We have a size guide to help you find the perfect fit. You can also contact us for assistance.",
  },
  {
    id: 15,
    title: "Do you offer gift wrapping or personalised gift messages?",
    content:
      "Yes, we offer premium gift packaging and handwritten messages on request.",
  },
  {
    id: 16,
    title: "Are there any discounts or festive offers?",
    content:
      "Yes! Keep an eye on our website or follow us on Instagram for ongoing deals. We also offer free gold coins or special discounts on gold and diamond jewellery during the festive season with every purchase.",
  },
  {
    id: 15,
    title: "Do you provide a bill/invoice with the purchase?",
    content: "Yes, every order comes with a valid invoice for your records.",
  },
];
const CustomStar: React.FC<{
  index: number;
  rating: number;
  hoverRating: number | null;
  onMouseMove: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number,
  ) => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => void;
}> = ({ index, rating, hoverRating, onMouseMove, onMouseLeave, onClick }) => {
  const getFillPercentage = () => {
    let roundedRating;
    if (hoverRating !== null) {
      roundedRating = Math.round(hoverRating * 2) / 2;
      if (roundedRating >= index + 1) {
        return 100;
      } else if (roundedRating > index && roundedRating < index + 1) {
        return (roundedRating - index) * 100;
      }
    } else {
      roundedRating = Math.round(rating * 2) / 2;
      if (roundedRating >= index + 1) {
        return 100;
      } else if (roundedRating > index && roundedRating < index + 1) {
        return (roundedRating - index) * 100;
      }
    }
    return 0;
  };
  return (
    <svg
      key={index}
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
      onClick={(e) => onClick(e, index)}
      onMouseMove={(e) => onMouseMove(e, index)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <defs>
        <linearGradient id={`gradient-${index}`}>
          <stop offset={`${getFillPercentage()}%`} stopColor="gold" />
          <stop offset={`${getFillPercentage()}%`} stopColor="white" />
        </linearGradient>
      </defs>
      <polygon
        points="12 2 15 8 21 8 16 12 18 18 12 14 6 18 8 12 3 8 9 8 12 2"
        fill={`url(#gradient-${index})`}
        stroke="gold"
      />
    </svg>
  );
};
const ReviewsAndRatings: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const [review, setReview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("tab2");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  let loggedIn = null;
  if (typeof window != "undefined") {
    loggedIn = localStorage.getItem("isLoggedIn");
  }
  // Function to handle file selection
  const handleImageChange = (event: any) => {
    const imageFiles = event.target.files;
    if (imageFiles) {
      const selectedImagesArray = Array.from(imageFiles).map((file: any) =>
        URL.createObjectURL(file),
      );
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...selectedImagesArray,
      ]);
    }
  };

  const handleLogIn = () => {
    router.push("/register");
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleReveiwChange = (e: any) => {
    console.log("Reveiwes Change", e.target.value);
    setReview(e.target.value);
  };
  const handleMouseMove = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number,
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const hoveredRating = index + x / width;
    setHoverRating(hoveredRating);
  };

  const handleReviews = async (e: any) => {
    e?.preventDefault();
    if (!review.trim()) {
      setType("error");
      setMessage("Review cannot be empty");
      return;
    }
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

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const ADD_CUSTOMER_REVIEWS = gql`
        mutation StoreProductReview($productReview: ProductReviewInput!) {
          StoreProductReview(productReview: $productReview) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: ADD_CUSTOMER_REVIEWS,
        variables: {
          productReview: {
            productId: product.productDetails.productId,
            rating: rating,
            review: review,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      if (data.StoreProductReview.code == 200) {
        setType("success");
        setMessage(data.StoreProductReview.message);
      } else {
        setType("error");
        setMessage(data.StoreProductReview.message);
      }
      setRating(0);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "An error occurred");
      setType("error");
      console.log("Error Occurred", error);
    } finally {
      setReview("");
    }
  };

  const handleClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number,
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const calculatedRating = index + x / width;
    const roundedRating = Math.round(calculatedRating * 2) / 2; // Round to nearest 0.5
    setRating(roundedRating);
    console.log(`Selected rating: ${roundedRating}`);
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const [showAll, setShowAll] = useState(false);
  const reviews = product?.productDetails?.review || [];
  const reviewsToShow = showAll ? reviews : reviews.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mb-7 mt-7">
      <div className="mx-4 mb-3 flex bg-[#E1DCDD29] p-2">
        <div
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "tab1" ? "font-bold underline" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Reviews
        </div>
        <div
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "tab2" ? "font-bold underline" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          FAQs
        </div>
      </div>
      <div>
        {activeTab === "tab1" && (
          <div className="mx-4 flex flex-wrap justify-between">
            <div className="h-[55%] max-md:w-[60%] max-sm:w-[100%] lg:w-[40%]">
              {reviewsToShow.map((item: any) => (
                <div
                  className="mt-4 rounded-3xl bg-[#faf9f9] p-6"
                  key={item.id}
                >
                  <div className="flex">
                    <div className="m-2">
                      <Image
                        className="rounded-full"
                        src={item.customer?.profile_picture}
                        alt="profile_picture"
                        height={75}
                        width={75}
                        unoptimized
                      />
                    </div>
                    <div className="ml-2">
                      <p>{item?.customer?.fullname}</p>
                      <StarRating stars={item.rate} />
                      <p>{item.review}</p>
                    </div>
                  </div>
                </div>
              ))}
              {product?.productDetails?.review.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 border border-[#e26178] p-3 text-[#e26178]"
                >
                  {showAll ? "View Less" : "View More"}
                </button>
              )}
            </div>
            <div className="mt-4 max-sm:w-[100%] lg:w-[35%]">
              <div className="flex items-center justify-between">
                <div className="">
                  <p>Write a Review</p>
                </div>
                <div style={{ display: "flex" }}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <CustomStar
                      key={index}
                      index={index}
                      rating={rating}
                      hoverRating={hoverRating}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={handleClick}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Write here"
                    id="name"
                    name="name"
                    value={review}
                    className="mt-1 block h-[150px] w-full rounded-md bg-[#E1DCDD29] p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
                    required
                    onChange={(e) => handleReveiwChange(e)}
                  />
                </div>
                {/* <div className="relative mt-3">
                  <input
                    placeholder="Upload Images"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm bg-[#E1DCDD29] rounded-md"
                    required
                  />
                </div> */}
                <div className="flex flex-wrap">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative mb-4 mr-4">
                      <Image
                        src={image}
                        alt={`Preview ${index}`}
                        className="max-h-48 max-w-xs rounded-md"
                        height={100}
                        width={100}
                        unoptimized
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute right-0 top-0 -mr-1 -mt-1 rounded-full bg-red-500 p-1 text-white"
                      >
                        <Icon.X />
                      </button>
                    </div>
                  ))}
                </div>
                {loggedIn === "true" ? (
                  <button
                    type="submit"
                    onClick={(e) => handleReviews(e)}
                    className="mt-3 w-[50%] rounded-md border border-transparent bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-sm font-medium text-white hover:bg-[#e26178]"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => handleLogIn()}
                    className="mt-3 w-[50%] rounded-md border border-transparent bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Please LogIn
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="m-5 border-x border-[#e26178]">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`border-b border-[#e26178] ${index === 0 ? "border-t" : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                <div
                  className={`flex cursor-pointer justify-between p-3 ${activeIndex == index ? "bg-[#f3dbdf]" : "#e26178"}`}
                >
                  <div>{item.title}</div>
                  <div className="icon">
                    {activeIndex === index ? (
                      <>
                        <Icon.CaretUp scale={23} />
                      </>
                    ) : (
                      <>
                        <Icon.CaretDown scale={23} />
                      </>
                    )}
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="accordion-content bg-[#E1DCDD29] p-3">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {message && <FlashAlert message={message} type={type} />}
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
