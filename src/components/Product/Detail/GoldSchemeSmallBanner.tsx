import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TryAtHomeModal from "@/components/Modal/TryAtHomeModal";

export default function GoldSchemeSmallBanner({ variant }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TryAtHomeModal
        variant={variant}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
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

      <Link href={"/benefit"} className="">
        <motion.div
          initial={{ backgroundPosition: "100% 50%" }}
          animate={{ backgroundPosition: ["100% 50%", "-100% 50%"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="before:animate-shine relative mt-4 flex items-center justify-between gap-1 overflow-hidden border border-[#fed258] bg-[#f7f7f7] p-1 before:absolute before:inset-0 before:h-full before:w-full before:translate-x-[-100%] before:scale-x-[3] before:bg-gradient-to-r before:from-transparent before:via-[#fed258]/40 before:to-transparent md:p-4 lg:w-[90%]"
        >
          <div>
            <span className="text-xs md:text-base">
              <span className="text-[#e26178]">
                Gold Monthly Investment Plan
              </span>
            </span>
          </div>
          <div>
            <button className="w-28 bg-gradient-to-r from-[#c39b59] via-[#f8e1b0] to-[#e8c68a] p-2 py-3 text-center text-sm text-black transition-all duration-200 md:w-[150px]">
              Subscribe
            </button>
          </div>
        </motion.div>
      </Link>
    </>
  );
}
