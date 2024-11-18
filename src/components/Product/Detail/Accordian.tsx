/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType, ProductData } from "@/type/ProductType";
import { TbReplace } from "react-icons/tb";
import { GiCargoShip } from "react-icons/gi";
import { VscTools } from "react-icons/vsc";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { TbHomeCheck } from "react-icons/tb";
import MobileSizeGuide from "./MobileSizeGuide";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
interface Props {
  product: ProductData;
}
const Accordian: React.FC<Props> = ({ product }) => {
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const { formatPrice } = useCurrency();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  //function to handle the toggle of the accordian every section is handle by this function
  const handleToggle = (number: any) => {
    setShowAccordian(number === showAccordian ? null : number);
  };
  const makingCharges: any =
    parseFloat(product?.productDetails?.makingCharges) +
    parseFloat(product?.productDetails?.additionalCost);
  return (
    <div className="mt-7">
      <div className="border-t-2 border-[#f7f7f7] p-4">
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
              Discover the WHP advantage: where exquisite craftsmanship meets
              timeless elegance, ensuring every piece exudes sophistication and
              allure, setting you apart in style.
            </div>
            <div className="mt-5 grid grid-cols-4 justify-items-center gap-4 max-sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <span className="text-center">
                  <Icon.SketchLogo size={30} weight="thin" />
                </span>
                <span>10,000+ Designs</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Image
                    src="/images/other/hallmark.png"
                    alt={"Hall Mark Symbol"}
                    width={40}
                    height={40}
                    unoptimized
                  />
                  {/* <Icon.CrownSimple size={30} weight="thin" /> */}
                </span>
                <span>BIS Hallmarked</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Icon.Truck size={30} weight="thin" color="#00000" />
                </span>
                <span>Pan-India Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Icon.ShieldCheck size={30} weight="thin" />
                </span>
                <span>Safe & Secure Payment</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t-2 border-[#f7f7f7] p-4">
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
            <div className="mt-5">{product?.productDetails?.longDesc}</div>
            {/* <div className="mt-5">{product?.productDetails?.shortDesc}</div> */}
            {/* <div className="mt-4 grid grid-cols-4 max-sm:grid-cols-3">
              <div className="flex flex-col items-center p-2 text-center">
                <Icon.Scales className="mr-1 mt-1" size={27} weight="thin" />
                <p>
                  {product?.productDetails?.metalWeight}gms,{" "}
                  {product?.productDetails?.metalType}
                </p>
              </div>
              <div className="flex flex-col items-center p-2 text-center">
                <Icon.HandCoins className="mr-1 mt-1" size={27} weight="thin" />
                <p>
                  {product?.productDetails.metalPurity}{" "}
                  {product?.productDetails.metalType}
                </p>
              </div>
              {product?.productDetails?.isReturnable == 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>7 days easy returns</p>
                </div>
              )}
              {product?.productDetails?.isReplaceable === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <TbReplace className="mr-1 mt-1" size={27} />
                  <p>7 days easy replaceable</p>
                </div>
              )}
              {product?.productDetails?.isInternationalShippingAvailable ===
                1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <GiCargoShip className="mr-1 mt-1" size={27} />
                  <p>Delivered Internationally</p>
                </div>
              )}
              {product?.productDetails?.customizationAvailability === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <VscTools className="mr-1 mt-1" size={27} />
                  <p>Customization Available</p>
                </div>
              )}
              {product?.productDetails?.fastDelivery === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <FaShippingFast className="mr-1 mt-1" size={27} />
                  <p>Fast Delivery</p>
                </div>
              )}
              {product?.productDetails?.tryAtHome === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <TbHomeCheck className="mr-1 mt-1" size={27} />
                  <p>Try At Home</p>
                </div>
              )}
              {product?.productDetails?.diamondDetails[0] && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>
                    Diamond Color:
                    {product?.productDetails?.diamondDetails[0].diamondColor}
                  </p>
                </div>
              )}
              {product.productDetails?.diamondDetails?.length > 0 && (
                <div className="flex">
                  {product.productDetails.diamondDetails.map(
                    (diamond: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-2 text-center"
                      >
                        <Icon.Diamond />
                        <p>
                          Diamond Color:{diamond.diamondColor}(
                          {index === 0
                            ? "Primary"
                            : index === 1
                              ? "Secondary"
                              : index === 2
                                ? "Tertiary"
                                : `Diamond ${index + 1}`}
                          )
                        </p>
                      </div>
                    ),
                  )}
                </div>
              )}

              {product?.productDetails?.diamondDetails[0] && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>
                    Diamond Clarity:
                    {product?.productDetails?.diamondDetails[0].diamondClarity}
                  </p>
                </div>
              )}
              {product?.productDetails?.diamondDetails[0] && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>
                    Diamond Color:
                    {product?.productDetails?.diamondDetails[0].diamondColor}
                  </p>
                </div>
              )}
            </div> */}
            <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
              {parseInt(product?.productDetails?.metalWeight) > 0 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.Scales className="mr-1 mt-1" size={27} weight="thin" />
                  <p>
                    {product?.productDetails?.metalWeight}gms,{" "}
                    {product?.productDetails?.metalType}
                  </p>
                </div>
              )}

              {product?.productDetails?.metalPurity && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.HandCoins
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>
                    {product?.productDetails.metalPurity}{" "}
                    {product?.productDetails.metalType}
                  </p>
                </div>
              )}

              {product?.productDetails?.isReturnable == 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>7 days easy returns</p>
                </div>
              )}

              {product?.productDetails?.isReplaceable === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <TbReplace className="mr-1 mt-1" size={27} />
                  <p>7 days easy replacement</p>
                </div>
              )}

              {product?.productDetails?.isInternationalShippingAvailable ===
                1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <GiCargoShip className="mr-1 mt-1" size={27} />
                  <p>Delivered Internationally</p>
                </div>
              )}

              {product?.productDetails?.customizationAvailability === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <VscTools className="mr-1 mt-1" size={27} />
                  <p>Customization Available</p>
                </div>
              )}

              {product?.productDetails?.fastDelivery === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <FaShippingFast className="mr-1 mt-1" size={27} />
                  <p>Fast Delivery</p>
                </div>
              )}

              {product?.productDetails?.tryAtHome === 1 && (
                <div className="flex flex-col items-center p-2 text-center">
                  <TbHomeCheck className="mr-1 mt-1" size={27} />
                  <p>Try At Home</p>
                </div>
              )}

              {product?.productDetails?.diamondDetails?.length > 0 && (
                <>
                  {product.productDetails.diamondDetails.map(
                    (diamond: any, index: number) => (
                      <div key={index}>
                        <span className="flex flex-col items-center p-2 text-center">
                          <Icon.SketchLogo size={22} weight="thin" />
                          <p>
                            Diamond Color: {diamond.diamondColor} (
                            {index === 0
                              ? "Primary"
                              : index === 1
                                ? "Secondary"
                                : index === 2
                                  ? "Tertiary"
                                  : `Diamond ${index + 1}`}
                            )
                          </p>
                        </span>
                      </div>
                    ),
                  )}
                </>
              )}
              {product?.productDetails?.diamondDetails?.length > 0 && (
                <>
                  {product.productDetails.diamondDetails.map(
                    (diamond: any, index: number) => (
                      <div key={index}>
                        <span className="flex flex-col items-center p-2 text-center">
                          <BiTargetLock size={22} />
                          <p>
                            Diamond Clarity: {diamond.diamondClarity} (
                            {index === 0
                              ? "Primary"
                              : index === 1
                                ? "Secondary"
                                : index === 2
                                  ? "Tertiary"
                                  : `Diamond ${index + 1}`}
                            )
                          </p>
                        </span>
                      </div>
                    ),
                  )}
                </>
              )}
              {/* {product?.productDetails?.diamondDetails?.length > 0 && (
                <>
                  {product.productDetails.diamondDetails.map(
                    (diamond: any, index: number) => (
                      <div key={index}>
                        <span className="flex flex-col items-center p-2 text-center">
                          <Icon.SketchLogo />
                          <p>
                            Diamond Color: {diamond.diamondColor} (
                            {index === 0
                              ? "Primary"
                              : index === 1
                                ? "Secondary"
                                : index === 2
                                  ? "Tertiary"
                                  : `Diamond ${index + 1}`}
                            )
                          </p>
                        </span>
                      </div>
                    ),
                  )}
                </>
              )} */}
            </div>
          </div>
        ) : null}
      </div>
      {(product?.productDetails?.displayTitle
        .toLowerCase()
        .includes("bangles") ||
        product?.productDetails?.displayTitle
          .toLowerCase()
          .includes("bangle") ||
        product?.productDetails?.displayTitle
          .toLowerCase()
          .includes("bracelet") ||
        product?.productDetails?.displayTitle.toLowerCase().includes("chain") ||
        (product?.productDetails?.displayTitle.toLowerCase().includes("ring") &&
          !product?.productDetails?.displayTitle
            .toLowerCase()
            .includes("earring") &&
          !product?.productDetails?.displayTitle
            .toLowerCase()
            .includes("earrings"))) && (
        <div className="border-t-2 border-[#f7f7f7] p-4">
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
            <>
              <div className="w-[100%] rounded-md text-center">
                {product.productDetails.displayTitle
                  .toLowerCase()
                  .includes("ring") ? (
                  <>
                    <h3 className="text-center text-lg">
                      Discover your perfect ring size with our easy-to-follow
                      guide
                    </h3>
                    <p className="mt-2 text-center text-sm">
                      Our guide helps you find the perfect ring size for your
                      unique needs. Simply click on Know More to find the right
                      size for your ring.
                    </p>
                    <Link
                      className="mt-2 cursor-pointer rounded-xl text-start text-sm"
                      href={"/ring-size-guide"}
                    >
                      <button className="mr-5 w-[40%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white">
                        Know More
                      </button>
                    </Link>
                  </>
                ) : product.productDetails.displayTitle
                    .toLowerCase()
                    .includes("chain") ? (
                  <>
                    <h3 className="text-lg">
                      Discover your perfect chain size with our easy-to-follow
                      guide
                    </h3>
                    <p className="mt-2 text-sm">
                      Our guide helps you find the perfect chain size for your
                      unique needs. Simply click on Know More to find the right
                      size for your chain.
                    </p>
                    <Link
                      className="mt-2 cursor-pointer rounded-xl text-start text-sm"
                      href={"/chain-size-guide"}
                    >
                      <button className="mr-5 w-[40%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white">
                        Know More
                      </button>
                    </Link>
                  </>
                ) : product.productDetails.displayTitle
                    .toLowerCase()
                    .includes("bracelet") ||
                  product.productDetails.displayTitle
                    .toLowerCase()
                    .includes("bangle") ? (
                  <>
                    <h3 className="text-lg">
                      Discover your perfect bangle size with our easy-to-follow
                      guide
                    </h3>
                    <p className="mt-2 text-sm">
                      Our guide helps you find the perfect bangle size for your
                      unique needs. Simply click on Know More to find the right
                      size for your bangle.
                    </p>
                    <Link
                      className="mt-2 cursor-pointer rounded-xl text-start text-sm"
                      href={"/bangle-size-guide"}
                    >
                      <button className="mr-5 w-[40%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white">
                        Know More
                      </button>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : null}
        </div>
      )}

      <div className="border-t-2 border-[#f7f7f7] p-4">
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
          <div className="p-2 sm:w-[100%] lg:w-[100%]">
            <div className="flex justify-between border border-[#ebe7e7] p-2">
              <div>Component</div>
              <div>Weight</div>
              <div>Value</div>
            </div>
            <div className="flex justify-between border border-[#ebe7e7] p-2">
              <div>
                <p>{product.productDetails?.metalType}</p>
                {product.productDetails?.diamondDetails?.length > 0 && (
                  <div>
                    {product.productDetails.diamondDetails.map(
                      (diamond: any, index: number) => (
                        <div key={index}>
                          <p>
                            Diamond ({diamond.diamondColor}-
                            {diamond.diamondClarity})
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {product.productDetails?.stoneDetails != null && (
                  <p>Stone Cost</p>
                )}
                <p>Making Charges</p>
                {parseInt(product.productDetails?.discountValue) > 0 && (
                  <p>Discount- {product.productDetails?.discountValue}%</p>
                )}
                <p>G.S.T</p>
              </div>
              <div>
                {parseInt(product.productDetails.metalWeight) > 0 && (
                  <p>{product.productDetails?.metalWeight} gms</p>
                )}

                {product.productDetails?.diamondDetails?.length > 0 && (
                  <div>
                    {product.productDetails.diamondDetails.map(
                      (diamond: any, index: number) => (
                        <div key={index}>
                          <p>
                            {diamond.caratWeight} ct ({diamond.diamondQuantity}{" "}
                            Qty)
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {product.productDetails.stoneDetails && <p>-</p>}
                {product.productDetails?.makingCharges && <p>-</p>}
                {product.productDetails?.discountValue && <p>-</p>}
                {product.productDetails?.gst && <p>-</p>}
              </div>
              <div>
                {parseInt(product.productDetails?.metalRate) > 0 && (
                  <p className="text-right">
                    {formatPrice(parseInt(product.productDetails?.metalRate))}
                  </p>
                )}
                {product.productDetails?.diamondDetails?.length > 0 && (
                  <div>
                    {product.productDetails.diamondDetails.map(
                      (diamond: any, index: number) => (
                        <div key={index}>
                          <p className="text-right">
                            {formatPrice(parseInt(diamond?.diamondCost))}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}
                {product.productDetails.stoneDetails != null && (
                  <p className="text-right">
                    {formatPrice(
                      parseInt(
                        product?.productDetails?.stoneDetails[0]?.stoneCost,
                      ),
                    )}
                  </p>
                )}
                <p className="text-right">
                  {formatPrice(parseInt(makingCharges))}
                </p>
                {parseInt(product?.productDetails?.discountValue) > 0 && (
                  <div>
                    {product?.productDetails &&
                    product?.productDetails?.typeOfDiscount === "Percentage" ? (
                      <p className="text-right">
                        -
                        {formatPrice(
                          parseInt(product?.productDetails?.discountAmount),
                        )}
                      </p>
                    ) : (
                      <p className="text-right">
                        -
                        {formatPrice(
                          parseInt(product?.productDetails?.discountValue),
                        )}
                      </p>
                    )}
                  </div>
                )}
                <p className="text-right">
                  {formatPrice(parseInt(product?.productDetails?.gst))}
                </p>
              </div>
            </div>
            <div className="flex justify-between border border-t-0 border-[#ebe7e7] px-2">
              <div className="text-md font-semibold">
                <p>Total</p>
              </div>
              <div className="text-md font-semibold">
                {product?.productDetails?.discountPrice !== null ? (
                  <p>
                    {formatPrice(
                      parseInt(product?.productDetails?.discountPrice),
                    )}
                  </p>
                ) : (
                  <p>
                    {formatPrice(
                      parseInt(product?.productDetails?.productPrice),
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t-2 border-[#f7f7f7] p-4">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(5)}
          >
            Assistance
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
              Our team is here to provide you with support. Whether you have
              questions,need advice,or require support,we're just a message or
              call away
            </div>
            <div className="flex">
              <Link href="https://wa.me/911800-222-225" target="_blank" rel="noopener noreferrer">
                <div className="mr-5 mt-5 text-center">
                  <IoLogoWhatsapp className="ml-5" size={30} color="#25D366" />
                  <p>Whatsapp</p>
                </div>
              </Link>
              <Link
                href="tel:+91 1800-222-225"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mr-5 mt-5">
                  <Icon.Phone size={30} color="#e26178" weight="fill" />
                  <p>Call</p>
                </div>
              </Link>
              <Link  href="sms:+91 1800-222-225" target="_blank" rel="noopener noreferrer">
                <div className="mr-5 mt-5">
                  <Icon.ChatTeardropDots
                    className="ml-4"
                    size={30}
                    weight="fill"
                    color="#e26178"
                  />
                  <p>Message</p>
                </div>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Accordian;
