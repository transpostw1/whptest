import React from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  handleComponent: (args: string) => void;
}
const MobileGms: React.FC<Props> = ({ handleComponent }) => {
  const handleBackButton = (args: string) => {
    handleComponent("");
  };
  return (
    <div>
      <div className="flex">
        <div onClick={() => handleBackButton("")} className="mt-2">
          <Icon.CaretLeft size={15} />
        </div>
        <div className="text-[20px] font-bold">Your Gms</div>
      </div>
      <div className="flex">
        <div className="mr-3">
          <Image
            src={"/images/category/earringsjpg.jpg"}
            alt={"image"}
            height={105}
            width={105}
          />
        </div>
        <div>
          <p>Your Gold Scheme</p>
          <p>Total Installment Paid:3</p>
          <p>Remaining Installment:5</p>
          <p>Next Installment:2000</p>
          <button className="border border-[#e26178] p-3 text-[#e26178] hover:bg-[#e26178] hover:text-white">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default MobileGms;
