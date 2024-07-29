"use client";

import React, { useState,useEffect } from "react";
import ApplyForm from "./applyForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Loader from "@/components/Other/Loader";

interface CareerData {
    title: string;
    description: string;
    requirements: number;
    locationIcon: string;
    location: string;
    posted: string;
    image: string;
  }
  
  interface FilterButtonsProps {
    filters: string[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
  }
  

  const FilterButtons: React.FC<FilterButtonsProps> = ({ filters, activeFilter, onFilterChange }) => {
    return (
      <div className="mb-4">
        <div className="hidden md:flex justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full border ${activeFilter === filter ? "bg-purple-200" : ""}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex md:hidden ">
          <Swiper
            // spaceBetween={2}
            slidesPerView={2.5}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {filters.map((filter) => (
              <SwiperSlide key={filter} className="">
                <button
                  className={`px-4 py-2 rounded-full border w-36 ${activeFilter === filter ? "bg-purple-200" : ""}`}
                  onClick={() => onFilterChange(filter)}
                >
                  {filter}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

const Careers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filters = ["All", "Online Sales", "Technology", "Product"];
  const careerData = [
    {
      title: "Team Leader - Try At Home",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
    {
      title: "Jewellery Consultant",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
    {
      title: "Production Manager-Manufacturing",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
    {
      title: "Executive - Accounts Payable",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
    {
      title: "Executive- Logistics",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
    {
      title: "Assistant Manager",
      description: "Lorem ipsum dolor sit amet consecte turole adipicsing elit semper dalaracc lacus.",
      requirements: 2,
      locationIcon: "/assets/location.png",
      location: "Mumbai",
      posted: "Posted 2 days ago",
      image: "/Images/careerprofile.png",
    },
  ];

  const handleFilterChange = (filter:string) => {
    setActiveFilter(filter);
  };

  const filteredCareerData = activeFilter === "All"
    ? careerData
    : careerData.filter((job) => job.title.includes(activeFilter));

    useEffect(() => {
      // Simulate data fetching
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    if (loading) {
      return <Loader />;
    }
  return (
    <>
      <div>
        <div className="text-center my-7">
          <h1 className="font-bold text-2xl">Job Openings</h1>
          <h3 className="mx-72 text-balance lg:block hidden">
            Discover the newest career opportunities at WHP! Don't let
            missing a few requirements hold you back. Submit your application,
            and we'll take care of the rest!
          </h3>
        </div>

        <FilterButtons
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="mx-4 md:mx-14">
        {filteredCareerData.length > 0 ? (
            filteredCareerData.map((data, index) => (
              <div
                className="mx-2 mb-3 rounded-2xl border border-[#bb547d] px-5 py-2 text-gray-600 shadow-xl md:p-7"
                key={index}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {/* <img src={data.image} className="w-8" alt="" /> */}
                      <h1 className="text-lg font-semibold md:text-2xl">
                        {data.title}
                      </h1>
                    </div>
                    <h3 className="text-sm text-gray-400 md:text-xl">
                      {data.description}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex justify-end gap-2 text-sm text-gray-400 md:text-lg">
                        {/* <img src={data.locationIcon} className="h-6 w-6" alt="" /> */}
                        {data.location}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={openModal}
                      className="mb-2 rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4d97cb] focus:ring-4 focus:ring-blue-500"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              Sorry, no openings in this category at the moment.
            </div>
          )}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm overflow-x-hidden">
              <div className="w-full max-w-md overflow-x-hidden rounded-xl bg-gray-300  p-3">
                <ApplyForm closeModal={closeModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Careers;
