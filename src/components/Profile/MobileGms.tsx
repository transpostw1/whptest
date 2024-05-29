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
       
      </div>
    </div>
  );
};

export default MobileGms;
