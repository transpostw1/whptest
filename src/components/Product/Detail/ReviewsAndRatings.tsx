"use client";
import { ProductData, ProductType } from "@/type/ProductType";
import Image from "next/image";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { FaStar } from "react-icons/fa6";
import StarRating from "@/components/Other/StarRating";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl, storeReviews } from "@/utils/constants";
import Cookies from "js-cookie"
import FlashAlert from "@/components/Other/FlashAlert";
interface Props {
  product: ProductData;
}
const ReviewsAndRatings: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const [review, setReview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const loggedIn = localStorage.getItem("isLoggedIn");
  // Function to handle file selection
  const handleImageChange = (event: any) => {
    const imageFiles = event.target.files;
    if (imageFiles) {
      const selectedImagesArray = Array.from(imageFiles).map((file: any) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...selectedImagesArray,
      ]);
    }
  };
  const handleLogIn = () => {
    router.push("/login");
  };
  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleReveiwChange = (e: any) => {
    setReview(e.target.value);
  };
  const handleReviews = (e:any) => {
    e?.preventDefault()
    try{
      const cookieToken = Cookies.get("localtoken");
    const response = axios.post(
      `${baseUrl}${storeReviews}`,
      {
        productId: product.productDetails.productId,
        rating: 4.5,
        review: review,
      },
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      }
    );
    }catch(error){
      console.log("Error Ocuuredd",error)
    }finally{
      setReview("")
    }
    
  };
  console.log("dadadadadaa", loggedIn);
  return (
    <div className="mt-7 mb-7">
      <div className="flex bg-[#E1DCDD29] p-2 mx-4 mb-3">
        <div
          className={`px-4 py-2 cursor-pointer text-lg ${
            activeTab === "tab1" ? "underline font-bold" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Reviews
        </div>
        <div
          className={`px-4 py-2 cursor-pointer text-lg ${
            activeTab === "tab2" ? "underline font-bold " : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          FAQs
        </div>
      </div>
      <div>
        {activeTab === "tab1" && (
          <div className="flex flex-wrap justify-between mx-4">
            <div className="lg:w-[40%] max-sm:w-[100%] max-md:w-[60%] h-[55%] ">
              {product?.productDetails?.review?.map((item: any) => (
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
                      />
                    </div>
                    <div className="ml-2">
                      <p className="">{item?.customer?.fullname}</p>
                      <StarRating stars={item.rate} />
                      <p>{item.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 lg:w-[35%] max-sm:w-[100%]">
              <div className="flex justify-between">
                <div className="">
                  <p>Write a Review</p>
                </div>
                <div className="flex">
                  <Icon.Star className="border-[#E1DCDD29]" size={20} />
                  <Icon.Star className="border-[#E1DCDD29]" size={20} />
                  <Icon.Star className="border-[#E1DCDD29]" size={20} />
                  <Icon.Star className="border-[#E1DCDD29]" size={20} />
                  <Icon.Star className="border-[#E1DCDD29]" size={20} />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your text here"
                    id="name"
                    name="name"
                    className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm bg-[#E1DCDD29] h-[150px] rounded-md"
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
                    <div key={index} className="relative mr-4 mb-4">
                      <Image
                        src={image}
                        alt={`Preview ${index}`}
                        className="max-w-xs max-h-48 rounded-md"
                        height={100}
                        width={100}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full -mt-1 -mr-1"
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
                    className="w-[50%] mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => handleLogIn()}
                    className="w-[50%] mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Please LogIn
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab2" && <div>this is second tab</div>}
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
