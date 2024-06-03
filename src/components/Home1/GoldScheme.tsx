import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "@phosphor-icons/react";

const GoldScheme = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
      const handleNavigation = (href: string) => {
        setLoading(true);
        router.push(href);
      };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Image
            src="/dummy/loader.gif"
            alt="Loading..."
            height={50}
            width={50}
          />
        </div>
      )}
      <div className="mt-5 mb-12  text-rose-950">
        <div className="lg:pl-7 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
          <div className="px-2">
            <h2 className="font-semibold">GOLD SCHEME</h2>
            <h1 className="py-4 lg:text-6xl md:text-4xl text-2xl">
              It is time to invest <br /> in a Golden Future
            </h1>
            <p className="text-gray-400">
              Invest in timeless wealth with our Gold Scheme, catering to a wide
              range of budgets. Making gold investment accessible to everyone.
              Watch your savings grow as you accumulate one of the most enduring
              assets.
            </p>
            <Link href="/benefit">
              <button
                type="button"
                className="text-white bg-gradient-to-br bg-pink-700 hover:bg-pink-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20"
              >
                Know More
              </button>
            </Link>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Image
                src={"/images/other/BenefitBangle.jpg"}
                alt="Benefit"
                width={400}
                height={100}
                className="w-full sm:w-1/2"
              />
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h1 className="text-xl font-semibold">GOLD ACCOUNT</h1>
                  <p className="text-sm font-medium">
                    Open a WHP Gold Scheme account with an amount as low as
                    ₹2000. Make regular installments and get discounts.
                  </p>
                </div>

                <button
                  // href="#"
                  onClick={() => handleNavigation("/benefit")}
                  className="text-red text-start font-semibold underline"
                >
                  Benefit Calculator
                </button>
              </div>
            </div>
          </div>
          <Image
            src={"/images/other/GoldScheme.jpg"}
            width={1000}
            height={800}
            alt="goldscheme"
          />
        </div>
      </div>
    </>
  );
};

export default GoldScheme;
