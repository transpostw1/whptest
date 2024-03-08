/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function DownloadAppBanner() {
  return (
    <div className="flex justify-center bg-[#f7f7f7] relative">
      <div>
        <p className="text-3xl">
          Download the Waman <br />
          Hari Pethe App
        </p>
        <p className="text-sm mt-4">
          Now you can explore the timeless glamour of Waman Hari Pethe whenever{" "}
          <br />
          you want! Shining new app, made just for you! It's Free, Easy & Smart.
        </p>
        <div className="flex gap-4 mt-4">
          <Image
            src={"/products/applestorebanner.png"}
            alt="the applestorebanner.png"
            width={115}
            height={55}
          />
          <Image
            src={"/products/googleplaybanner.png"}
            alt="the googleplaybanner.png"
            width={115}
            height={55}
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-4 right-5">
          <Image
            src={"/products/fakephone.png"}
            alt="fake phone"
            width={250}
            height={250}
          />
        </div>
        <div className="">
          <Image
            src={"/products/fakephone.png"}
            alt="fake phone"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
}
