"use client";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { FaStar } from "react-icons/fa6";

interface Props {
  product: ProductType;
}
const ReviewsAndRatings: React.FC<Props> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
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
            <div className="w-[40%] h-[55%] rounded-3xl bg-[#faf9f9] p-6">
              <div className="flex">
                <div className="m-2">
                  <Image
                    className="rounded-full"
                    src="/images/icons/propic.jpg"
                    alt="profile_picture"
                    height={75}
                    width={75}
                  />
                </div>
                <div className="ml-2">
                  <p className="">Joseph Gomes</p>
                  <span className="flex">
                    <FaStar size={20} className="text-[#f4ed25]" />
                    <FaStar size={20} className="text-[#f4ed25]" />
                    <FaStar size={20} className="text-[#f4ed25]" />
                    <FaStar size={20} className="text-[#f4ed25]" />
                    <FaStar size={20} className="text-[#f4ed25]" />
                  </span>
                </div>
              </div>
              <div>
                <p>
                  WHP is a great shop for jewellery purchases not only is this
                  shop located at prime destination but it also has a large
                  premise making it easy for the customers to move across the
                  various options of jewellery.
                </p>
              </div>
              <div className="flex mt-5"></div>
            </div>
            <div>
              <div className="flex justify-around">
                <div className="mr-[100px]">
                  <p>Write a Review</p>
                </div>
                <div className="flex">
                  <Icon.Star className="border-[#E1DCDD29]" />
                  <Icon.Star className="border-[#E1DCDD29]" />
                  <Icon.Star className="border-[#E1DCDD29]" />
                  <Icon.Star className="border-[#E1DCDD29]" />
                  <Icon.Star className="border-[#E1DCDD29]" />
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
                  />
                </div>
                <div className="relative mt-3">
                  <input
                    placeholder="Upload Images"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm bg-[#E1DCDD29] rounded-md"
                    required
                  />
                </div>
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
                <button
                  type="submit"
                  className="w-[50%] mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
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
