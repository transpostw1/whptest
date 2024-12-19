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
    title: "Can I order by phone?",
    content:
      "Yes, call us on 1800 222 225 between 10am to 8pm. Our customer representative will assist to book your order.",
  },
  {
    id: 2,
    title: "Do I have to bear the shippping cost?",
    content:
      "We don't charge any cost to ship and deliver product in India. However, for international shippment please read our delivery policy.",
  },
  {
    id: 3,
    title: "Diamonds/gemstones are original?",
    content:
      "Yes, The diamonds/gemstones are original. You will get diamond/gemstone authetification certificate with every diamond/gemstone jewellery product.",
  },
  {
    id: 4,
    title: "Is the Gold Jewellery hallmarked?",
    content: "Yes, all gold jewellery is hallmaked.",
  },
  {
    id: 5,
    title: "What are different payment options?",
    content:
      "Yes, The diamonds/gemstones are original. You will get diamond/gemstone authetification certificate with every diamond/gemstone jewellery product.",
  },
  {
    id: 6,
    title: "When will I get the product?",
    content:
      "If the product is ready to ship, we ship product very next day we received the order. If product is not in stock and need to manufacture, in this case shippment happened after 2 weeks we received the order.",
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
  const [activeIndex, setActiveIndex] = useState(null);

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
                    className="mt-3 w-[50%] rounded-md border border-transparent bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-sm font-medium text-white hover:bg-[#e26178] "
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => handleLogIn()}
                    className="mt-3 w-[50%] rounded-md border border-transparent bg-[#e26178] px-4 py-2 text-sm font-medium text-white hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Please LogIn
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="m-5 lg:w-[50%] border border-[#e26178]">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="border border-[#e26178]"
                onClick={() => toggleAccordion(index)}
              >
                <div
                  className={`flex cursor-pointer justify-between p-3 ${activeIndex == index ? "bg-[#f3dbdf]" : "#fffff"}`}
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
                  <div className="accordion-content p-3">
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
