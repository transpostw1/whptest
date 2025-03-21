import React, { useState } from "react";
import Link from "next/link";
import TryAtHomeModal from "@/components/Modal/TryAtHomeModal";

export default function GoldSchemeSmallBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TryAtHomeModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="mt-4 flex items-center justify-between gap-1 bg-[#f7f7f7] p-1 md:p-4 lg:w-[90%]">
        <div>
          <span className="text-xs md:text-base">
            <span className="text-[#e26178]">Try At Home </span>
            (Try up to 5 items a day!)
          </span>
        </div>
        <div>
          <button
            onClick={openModal}
            className="w-28 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 py-3 text-center text-sm text-white transition-all duration-200 hover:from-[#d16991] hover:via-[#ad77c0] hover:to-[#9a83d9] md:w-[150px]"
          >
            Check Availability
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-1 bg-[#f7f7f7] p-1 md:p-4 lg:w-[90%]">
        <div>
          <span className="text-xs md:text-base">
            <span className="text-[#e26178]">WHP 10 + 1 Jewelry Plan </span>
            {/* (Pay 11 Installments, Get up to 100% Off on 12th Installment) */}
          </span>
        </div>
        <div className="">
          <Link href={"/benefit"}>
            <button className="w-28 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 py-3 text-center text-sm text-white transition-all duration-200 hover:from-[#d16991] hover:via-[#ad77c0] hover:to-[#9a83d9] md:w-[150px]">
              Subscribe
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}