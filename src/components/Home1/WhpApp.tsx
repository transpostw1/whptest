import React from "react";
import Image from "next/image";

const WhpApp = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:mb-16 mt-28 pl-8 text-red-950 ">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-3">
          <h2 className="font-normal text-5xl ">
            Download the Waman Hari Pethe App
          </h2>
          <p>
            Now you can explore timeless glamour of Waman Hari Pether whenever
            you want! Shining new app, made just for you! it's Free, Easy &
            Smart.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Image
              src={"/images/other/GooglePlay.png"}
              height={200}
              width={180}
              alt="playstore"
              className="object-fill"
            />
            <Image
              src={"/images/other/AppleStore.png"}
              height={200}
              width={180}
              alt="playstore"
              className=""
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 items-center h-full bg-red-600"></div>
      </div>
    </>
  );
};

export default WhpApp;
