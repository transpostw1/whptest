"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplyForm from "./applyForm";
import { useBlog } from "@/context/BlogContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loader from "@/components/Other/Loader";

interface careersData {
  title: string;
  description: string;
  requirements: number;
  locationIcon: string;
  location: string[];
  posted: string;
  image: string;
  url: string;
}
interface FilterButtonsProps {
  jobCategories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  jobCategories,
  activeFilter,
  onFilterChange,
}) => {
  // Remove duplicates and add "All" category
  const uniqueCategories = ["All", ...Array.from(new Set(jobCategories))];

  return (
    <div className="mb-4 px-4">
      {/* <div className="hidden justify-center gap-3 md:flex">
        {uniqueCategories.map((filter) => (
          <button
            key={filter}
            className={`rounded-full border px-4 py-2 transition-colors duration-300 ${
              activeFilter === filter ? "bg-purple-200" : "bg-white"
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div> */}
      <div className="flex">
        <Swiper
          slidesPerView={1.8}
          spaceBetween={160}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
          }}
          loop={true}
          className="w-full"
        >
          {uniqueCategories.map((filter) => (
            <SwiperSlide key={filter}>
              <button
                className={`w-80 rounded-full border px-4 py-2 transition-colors duration-300 md:w-full ${
                  activeFilter === filter ? "bg-purple-200" : "bg-white"
                }`}
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
  const { careersData, jobCategories, setSelectedUrl, loading } = useBlog();
  // const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleJobDetail = (
    url: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      setShowModal(true);
    } else {
      setSelectedUrl(url);
      router.push("careers/CareerDetail");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredcareersData =
    activeFilter === "All"
      ? careersData
      : careersData.filter((job) => job.category.includes(activeFilter));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <div className="my-7 text-center">
          <h1 className="text-2xl font-bold">Job Openings</h1>
          <h3 className="mx-72 hidden text-balance lg:block">
            Discover the newest career opportunities at WHP! Don't let missing a
            few requirements hold you back. Submit your application, and we'll
            take care of the rest!
          </h3>
        </div>

        <FilterButtons
          jobCategories={jobCategories}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="mx-4 my-4 md:mx-14">
          {filteredcareersData.length > 0 ? (
            filteredcareersData.map((data, index) => (
              <div
                className="mx-2 mb-3 rounded-2xl border border-[#bb547d] px-5 py-2 text-gray-600 shadow-xl md:p-7"
                key={index}
                onClick={(event) => handleJobDetail(data.url, event)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg font-semibold md:text-2xl">
                        {data.title}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex flex-wrap justify-end gap-2 text-sm text-gray-400 md:text-lg">
                      {data.location.map((loc, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <span>
                            {loc}
                            {index < data.location.length - 1 && ","}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={openModal}
                      className="mb-2 w-28 rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4d97cb] focus:ring-4 focus:ring-blue-500"
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
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-opacity-50 backdrop-blur-sm">
              <div className="w-full max-w-md overflow-x-hidden rounded-xl bg-gray-300 p-3">
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
