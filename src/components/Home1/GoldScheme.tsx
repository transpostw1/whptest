import React from 'react'
import Image from 'next/image';

const GoldScheme = () => {
  return (
    <>
      <div className="mt-5 mb-12">
        <div className="lg:pl-7 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
          <div>
            <h2>GOLD SCHEME</h2>
            <h1 className="py-4 lg:text-6xl md:text-4xl text-2xl">
              It's time to invest <br /> in a Golden Future
            </h1>
            <p className="text-gray-400">
              Invest in timeless wealth with our Gold Scheme, catering to a wide
              range of budgets. Making gold investment accessible to everyone.
              Watch your savings grow as you accumulate one of the most enduring
              assets.
            </p>
            <a href="/product-page">
              <button
                type="button"
                className="text-white bg-gradient-to-br bg-red hover:bg-pink-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20"
              >
                Know More
              </button>
            </a>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Image src={"/images/other/BenefitBangle.jpg"} alt='Benefit' width={400} height={100} className="w-full sm:w-1/2" />
              <div className="flex flex-col justify-between">
                <h1 className="text-xl font-semibold">GOLD ACCOUNT</h1>
                <p className="text-sm">
                  Open a WHP Gold Scheme account with an amount as low as ₹2000.
                  Make regular installments and get discounts.
                </p>
                <h1 className="text-red underline">Benefit Calculator</h1>
              </div>
            </div>
          </div>
          <Image src={"/images/other/GoldScheme.jpg"} width={1000} height={800} alt='goldscheme' />
        </div>
      </div>
    </>
  );
};
export default GoldScheme
