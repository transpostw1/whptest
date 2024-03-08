

import React from 'react'
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from '@phosphor-icons/react';

const GoldScheme = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full lg:h-auto text-red-950">
          <div className="flex flex-col justify-start h-full py-10 px-4 gap-32 ">
            <div className="flex flex-wrap w-full justify-between">
              <h3 className="font-semibold text-lg">Gold Schemes</h3>
              <a
                href="/benefits"
                className="text-red-600 underline flex items-center"
              >
                Benefit Calculator
                <Icon.ArrowRight />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-medium">
                Its time to invest in a Golden Future
              </h1>
              <p className="font-medium text-red-950">
                Invest in timeless wealth with our Gold Scheme, catering to a
                wide range of budgets, making gold investment accessible to
                everyone. Watch your savings grow as you accumulate one of the
                most enduring assets
              </p>
              <div className="bg-rose-500 mt-10 w-72 p-2 text-white rounded-3xl flex justify-center items-center">
                <button>Know More</button>
                <Icon.ArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-96 lg:h-auto">
          <div className="banner-img">
            <Image
              src={"/images/other/GoldScheme2.jpg"}
              width={1000}
              height={400}
              alt="gemstones"
              className="object-fill w-full h-full duration-1000"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GoldScheme






  //  <>
  //    <div className="mt-5 mb-12  text-rose-950">
  //      <div className="lg:pl-7 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
  //        <div>
  //          <h2>GOLD SCHEME</h2>
  //          <h1 className="py-4 lg:text-6xl md:text-4xl text-2xl">
  //            It's time to invest <br /> in a Golden Future
  //          </h1>
  //          <p className="text-gray-400">
  //            Invest in timeless wealth with our Gold Scheme, catering to a wide
  //            range of budgets. Making gold investment accessible to everyone.
  //            Watch your savings grow as you accumulate one of the most enduring
  //            assets.
  //          </p>
  //          <a href="/product-page">
  //            <button
  //              type="button"
  //              className="text-white bg-gradient-to-br bg-pink-700 hover:bg-pink-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20"
  //            >
  //              Know More
  //            </button>
  //          </a>
  //          <div className="flex flex-col gap-4 sm:flex-row">
  //            <Image
  //              src={"/images/other/BenefitBangle.jpg"}
  //              alt="Benefit"
  //              width={400}
  //              height={100}
  //              className="w-full sm:w-1/2"
  //            />
  //            <div className="flex flex-col justify-between">
  //              <h1 className="text-xl font-semibold">GOLD ACCOUNT</h1>
  //              <p className="text-sm">
  //                Open a WHP Gold Scheme account with an amount as low as ₹2000.
  //                Make regular installments and get discounts.
  //              </p>
  //              <h1 className="text-red underline">Benefit Calculator</h1>
  //            </div>
  //          </div>
  //        </div>
  //        <Image
  //          src={"/images/other/GoldScheme.jpg"}
  //          width={1000}
  //          height={800}
  //          alt="goldscheme"
  //        />
  //      </div>
  //    </div>
  //  </>;