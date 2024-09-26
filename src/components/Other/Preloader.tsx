import React from "react";
import Image from "next/image";
const Preloader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="">
        <Image
          src={"/dummy/loader-white.gif"}
          alt="loader"
          height={30}
          width={30}
          unoptimized
        />
      </div>
    </div>
  );
};

export default Preloader;
