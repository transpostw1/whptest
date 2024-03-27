/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"
import React ,{useState}from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType';

interface Props{
    product:ProductType
}
const Accordian: React.FC<Props> = ({product}) =>{
    const [showAccordian, setShowAccordian] = useState<number>(1);
    const handleToggle = (number: any) => {
        setShowAccordian(number === showAccordian ? null : number);
      };
  return (
    <div className="mt-7 ">
            <div className="p-4 border-t-2 border-[#f7f7f7]">
              <h2>
                <button
                  className="flex w-full justify-between text-xl"
                  onClick={() => handleToggle(1)}
                >
                  The WHP Advantage
                  <span className="right-0">
                    <Icon.CaretDown
                      size={25}
                      className={`${showAccordian === 1 ? "rotate-180" : null}`}
                    />
                  </span>
                </button>
              </h2>
              {showAccordian == 1 ? (
                <div>
                  <div className="mt-5">
                    Discover the WHP advantage: where exquisite craftsmanship
                    meets timeless elegance, ensuring every piece exudes
                    sophistication and allure, setting you apart in style.
                  </div>
                  <div className="grid grid-cols-4 justify-items-center mt-5 gap-10">
                    <div>
                      <span className="text-center">
                        <Icon.SketchLogo size={30} />
                      </span>
                      <span>10000+ Designs</span>
                    </div>
                    <div>
                      <span>
                        <Icon.CrownSimple size={30} />
                      </span>
                      <span>BIS Hallmarked</span>
                    </div>
                    <div>
                      <span>
                        <Icon.Truck size={30} />
                      </span>
                      <span>Pan India Delivery</span>
                    </div>
                    <div>
                      <span>
                        <Icon.ShieldCheck size={30} />
                      </span>
                      <span>Safe & Secure Payment</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 border-t-2 border-[#f7f7f7]">
              <h2>
                <button
                  className="flex w-full justify-between text-xl"
                  onClick={() => handleToggle(2)}
                >
                  Product Details
                  <span className="right-0">
                    <Icon.CaretDown
                      size={25}
                      className={`${showAccordian === 2 ? "rotate-180" : null}`}
                    />
                  </span>
                </button>
              </h2>
              {showAccordian === 2 ? (
                <div>
                  <div className="mt-5 ">
                    Introducing our exquisite Dangling Hoop Earrings-a blend of
                    sophistication and femininity in a high-polish gold finish.
                    These intricately crafted 18Karat Gold Earrings,a part of
                    our Gold Collection, are designed for the modern woman. The
                    pair weighs 4.810 gms of pure gold
                  </div>
                  <div className="grid grid-cols-4 mt-4 lg:w-[70%] sm:w-[100%]">
                    <div className="p-2">
                      <Icon.Scales className="mr-1 mt-1" size={27} />
                      <p>
                        {product.metalWeight}gms,{" "}
                        {product.metalType}
                      </p>
                    </div>
                    <div className="p-2">
                      <Icon.HandCoins className="mr-1 mt-1" size={27} />
                      <p>
                        {product.metalPurity}{" "}
                        {product.metalType}
                      </p>
                    </div>
                    <div className="p-2">
                      <Icon.ArrowsLeftRight className="mr-1 mt-1" size={27} />
                      <p>7 days easy returns</p>
                    </div>
                    <div className="p-2">
                      <Icon.CurrencyInr size={27} />
                      <p className="float-right">COD Available</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 border-t-2 border-[#f7f7f7]">
              <h2>
                <button
                  className="flex w-full justify-between text-xl"
                  onClick={() => handleToggle(3)}
                >
                  Size Guide
                  <span className="right-0">
                    <Icon.CaretDown
                      size={25}
                      className={`${showAccordian === 3 ? "rotate-180" : null}`}
                    />
                  </span>
                </button>
              </h2>
              {showAccordian === 3 ? (
                <div className="text-center rounded-md w-[80%]">
                  <table className="mt-5 bg-[#f7f7f7]">
                    <tr className="">
                      <td className="border-r-2 border-[#F0ECED] border-b-2 p-4">
                        Size
                      </td>
                      <td className="p-4 border-r-2 border-[#F0ECED] border-b-2">
                        Diameter(inch)
                      </td>
                      <td className="p-4 border-r-2 border-[#F0ECED] border-b-2">
                        Diameter(cms)
                      </td>
                      <td className="p-4 border-b-2 border-[#F0ECED]">
                        Circumference(inch)
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-[#F0ECED]">2.2</td>
                      <td className="border-r-2 border-[#F0ECED] p-2">2.125</td>
                      <td className="p-2 border-r-2 border-[#F0ECED]">5.4</td>
                      <td className="">6.67</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r-2 border-[#F0ECED]">2.4</td>
                      <td className="p-2 border-r-2 border-[#F0ECED]">2.25</td>
                      <td className="p-2 border-r-2 border-[#F0ECED]">5.7</td>
                      <td className="p-2">7.06</td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-[#F0ECED] p-2">2.6</td>
                      <td className="p-2 border-r-2 border-[#F0ECED]">2.375</td>
                      <td className="p-2 border-r-2 border-[#F0ECED]">6</td>
                      <td className=" p-2">7.46</td>
                    </tr>
                    <tr>
                      <td className="border-r-2 border-[#F0ECED] p-2">2.8</td>
                      <td className=" border-r-2 border-[#F0ECED] p-2">2.5</td>
                      <td className=" border-r-2 border-[#F0ECED] p-2">6.5</td>
                      <td className=" p-2 rounded-b-lg">7.85</td>
                    </tr>
                  </table>
                </div>
              ) : null}
            </div>
            <div className="p-4 border-t-2 border-[#f7f7f7]">
              <h2>
                <button
                  className="flex w-full justify-between justify-items-center text-xl"
                  onClick={() => handleToggle(4)}
                >
                  Price Breakup
                  <span className="right-0">
                    <Icon.CaretDown
                      size={25}
                      className={`${showAccordian === 4 ? "rotate-180" : null}`}
                    />
                  </span>
                </button>
              </h2>
              {showAccordian === 4 ? (
                <div className="lg:w-[100%] sm:w-[100%] p-4">
                  <div className="flex justify-between border border-[#ebe7e7] p-2">
                    <div>Component</div>
                    <div>Weight</div>
                    <div>Value</div>
                  </div>
                  <div className="flex justify-between p-2 border border-[#ebe7e7]">
                    <div>
                      <p>Gold</p>
                      <p>Diamond</p>
                      <p>Making Charges</p>
                      <p>Discount 10%</p>
                      <p>G.S.T</p>
                    </div>
                    <div>
                      <p>{ product.metalWeight} gms</p>
                      <p>{ product.metalPurity} Carat</p>
                      <p>-</p>
                      <p>-</p>
                      <p>-</p>
                    </div>
                    <div>
                      <p>₹12,548</p>
                      <p>₹13,375</p>
                      <p>₹5,762</p>
                      <p>₹3,263</p>
                      <p>₹950</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 border-t-2 border-[#f7f7f7]">
              <h2>
                <button
                  className="flex w-full justify-between text-xl"
                  onClick={() => handleToggle(5)}
                >
                  Assitance
                  <span className="right-0">
                    <Icon.CaretDown
                      size={25}
                      className={`${showAccordian === 5 ? "rotate-180" : null}`}
                    />
                  </span>
                </button>
              </h2>
              {showAccordian === 5 ? (
                <div className="mt-4">
                  <div>
                    Our team is here to provide you with support. Whether you
                    have questions,need advice,or require support,we're just a
                    message or call away
                  </div>
                  <div className="flex">
                    <div className="mr-5 mt-5 text-center">
                      <Icon.WhatsappLogo className="ml-5" size={30} />
                      <p>Whatsapp</p>
                    </div>
                    <div className="mr-5 mt-5">
                      <Icon.Phone size={30} />
                      <p>Call</p>
                    </div>
                    <div className="mr-5 mt-5">
                      <Icon.ChatDots className="ml-4" size={30} />
                      <p>Message</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
  )
}
export default Accordian;
