import React from "react";
import Link from "next/link";

export default function GoldSchemeSmallBanner() {
  return (
    <div className="mt-7 flex bg-[#f7f7f7] p-4 lg:w-[90%]">
      <div>
        <span>
          <span className="text-[#e26178]">Gold 10+1 Monthly Plan </span>
          (Pay 11 Instalments, Get up to 100% Off on 12th Installment)
        </span>
      </div>
      <Link href={"/benefit"}>
        <button className="mr-5 w-[90%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white">
          Subscribe
        </button>
      </Link>
    </div>
  );
}
