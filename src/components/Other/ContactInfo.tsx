"use client"
import React from "react";
import Image from "next/image";

const ContactInfo = () => {

  return (
    <div className="absolute top-[100px] w-[343px] p-7 rounded-xl bg-surface box-shadow-small bg-white">
      <p className="text-xl font-semibold">Get in Touch with us</p>
      <p className="mt-3">
        Connect with us and we will assist you with all your needs
      </p>
      <p className="font-semibold mt-5">Contact us on :(10:30AM -7:30PM)</p>
      <div className="mt-1 flex">
        <span className="mr-2">
          <Image
            src="/images/icons/phone.png"
            alt="phone_image"
            width={22}
            height={22}
          />
        </span>
        <span>1800-222-225</span>
      </div>
      <div className="mt-1 flex">
        <span className="mr-2">
          <Image
            src="/images/icons/Email.png"
            alt="Email_image"
            width={22}
            height={22}
          />
        </span>
        <span>care@whpjewellers.in</span>
      </div>
      <div className="flex mt-4">
        <div className="mr-3">
          <Image
            src="/images/icons/faceBook.png"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="mr-3">
          <Image
            src="/images/icons/youtube.png"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="mr-3">
          <Image
            src="/images/icons/Instagram.png"
            alt=""
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
