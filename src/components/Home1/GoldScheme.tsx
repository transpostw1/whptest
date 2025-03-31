import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Loader from "@/components/Other/Loader";
import { useRouter } from "next/navigation";

const GoldScheme = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-5 bg-[#FFFAF9] text-rose-950">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:pl-7">
          <div className="px-8 lg:px-0">
            <h2 className="pt-4 text-center font-medium sm:text-[14px] md:text-center lg:text-start lg:text-[16px]">
              GOLD SCHEME
            </h2>
            <h1 className="py-4 text-center text-2xl md:text-center md:text-3xl lg:text-left lg:text-[50px] lg:leading-[74px]">
              It's time to invest in a Golden Future
            </h1>
            <p className="text-center font-normal text-rose-950 sm:w-[100%] md:text-center lg:w-[70%] lg:text-left">
              Invest in timeless wealth with our Gold Scheme, catering to a wide
              range of budgets. Making gold investment accessible to everyone.
              Watch your savings grow as you accumulate one of the most enduring
              assets.
            </p>

            <Link
              className="inline-flex w-full justify-center text-center sm:justify-center md:justify-center lg:justify-start lg:text-left"
              href="/benefit"
            >
              <button
                type="button"
                className="my-4 flex justify-center bg-gradient-to-r from-[#c39b59] via-[#f8e1b0] to-[#e8c68a] px-6 py-3 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
              >
                Benefit Calculator
                <span className="ml-2 mt-1">
                  <Icon.ArrowRight />
                </span>
              </button>
            </Link>
            {/* {!isMobile && (
              <div className="p-0">
                <div className="mx-auto flex items-center gap-3 p-0 sm:flex-row md:py-5">
                  <Image
                    src={"/images/other/BenefitBangle.jpg"}
                    alt="Benefit"
                    width={400}
                    height={100}
                    unoptimized
                    className="h-auto w-full sm:w-auto"
                  />
                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <h1 className="pb-2 text-xl font-semibold">
                        GOLD ACCOUNT
                      </h1>
                      <p className="pe-2 text-sm">
                        Open a WHP Gold Scheme account with an amount as low as
                        ₹2000. Make regular installments and get discounts.
                      </p>
                    </div>
                    <div className="mt-5 flex w-full">
                      <button
                        onClick={() => handleNavigation("/benefit")}
                        className="flex justify-center text-start font-semibold text-[#E26178] underline"
                      >
                        Benefit Calculator
                        <span className="ml-2 mt-1">
                          <Icon.ArrowRight />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={"/images/other/Gold_Monthly_revised.jpg"}
              width={900}
              height={900}
              alt="goldscheme"
              unoptimized
              className="h-auto w-full lg:w-auto"
            />
          </div>
          {/* {isMobile && (
            <div className="bg-[#FFFAF9] p-0">
              <div className="flex items-center gap-3 p-0 sm:flex-row md:py-5 md:ps-5">
                <Image
                  src={"/images/other/BenefitBangle.jpg"}
                  alt="Benefit"
                  width={299}
                  height={139}
                  className="h-auto w-full sm:w-auto"
                />
                <div className="flex flex-col justify-between gap-2 pt-3 md:pt-0 sm:mx-0 w-full">
                  <div>
                    <h1 className="pb-2 text-xl font-semibold">GOLD ACCOUNT</h1>
                    <p className="pe-2 text-sm">
                      Open a WHP Gold Scheme account with an amount as low as
                      ₹500. Make regular installments and get discounts.
                    </p>
                  </div>
                  <div className="flex w-full">
                    <button
                      onClick={() => handleNavigation("/benefit")}
                      className="flex justify-center text-start font-semibold text-[#E26178] underline"
                    >
                      Benefit Calculator
                      <span className="ml-2 mt-1">
                        <Icon.ArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default GoldScheme;
