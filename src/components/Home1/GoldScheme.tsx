

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
              <h3 className="font-semibold text-lg">Precious Gemstones</h3>
              <a href="/benefits" className="text-red-600 underline">
                Benefit Calculator
              </a>
            </div>
            <div className='flex flex-col gap-4'>
              <h1 className="text-5xl font-medium">
                Its time to invest in a Golden Future
              </h1>
              <p className="font-medium text-red-950">
                Invest in timeless wealth with our Gold Scheme, catering to a
                wide range of budgets, making gold investment accessible to
                everyone. Watch your savings grow as you accumulate one of the
                most enduring assets
              </p>
              <div className="bg-rose-500 w-72 p-2 text-white rounded-3xl flex justify-center items-center">
                <button>Know More</button>
                <Icon.ArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-96 lg:h-auto">
          <Image
            src={"/images/other/GoldScheme2.jpg"}
            width={1000}
            height={400}
            alt="gemstones"
            className="object-fill w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default GoldScheme
