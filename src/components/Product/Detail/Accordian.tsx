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
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import { useBlog } from "@/context/BlogContext";
import SizeGuideModal from "@/components/Other/SizeGuideModal";
interface Props {
  product: ProductData;
}
const Accordian: React.FC<Props> = ({ product }) => {
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { bangleSizeGuide, chainSizeGuide, ringSizeGuide, loading } = useBlog();
  const [showSizeGuideModal, setShowSizeGuideModal] = useState<boolean>(false);
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

  const handleSizeGuideModal = () => {
    setShowSizeGuideModal(!showSizeGuideModal);
  };
  const makingCharges: any =
    parseFloat(product?.productDetails?.makingCharges) +
    parseFloat(product?.productDetails?.additionalCost);
  return (
    <div className="mt-4">
      <div className="border-t-2 border-[#f7f7f7] p-4">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(1)}
          >
            Assistance
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`transform transition-transform duration-300 ${showAccordian === 1 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>

        <div
          className={`mt-4 grid overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            showAccordian == 1
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div>
            Our team is here to provide you with support. Whether you have
            questions,need advice,or require support,we're just a message or
            call away
          </div>
          <div className="flex w-full flex-col justify-center lg:flex-row">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="mr-3 w-[250px]"
            >
              <Link href={"https://wa.me/918828324464"} target="_blank">
                <div className="mr-5 mt-5 flex p-2 text-center">
                  <IoLogoWhatsapp className="mr-1" size={30} color="#25D366" />
                  <p className="text-md">+91 8828324464</p>
                </div>
              </Link>
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="w-[250px]"
            >
              <Link
                href="tel:1800222225"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mr-5 mt-5 flex p-2">
                  <Icon.Phone
                    size={30}
                    color="#e26178"
                    weight="fill"
                    className="mr-1"
                  />
                  <p className="text-md">1800-222-225</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-[#f7f7f7] p-4">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(2)}
          >
            The WHP Advantage
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`transform transition-transform duration-300 ${showAccordian === 2 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>

        <div
          className={`grid overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            showAccordian == 2
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-5">
            Discover the WHP advantage: where exquisite craftsmanship meets
            timeless elegance, ensuring every piece exudes sophistication and
            allure, setting you apart in style.
          </div>
          <div className="mt-5 grid grid-cols-4 justify-items-center gap-6 max-sm:grid-cols-3">
            {/* Icon and Text Block */}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center justify-center">
                <Icon.SketchLogo size={30} weight="thin" />
              </span>
              <span className="text-sm font-medium">10,000+ Designs</span>
            </div>
            {/* Icon and Text Block */}

            {/* Icon and Text Block */}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center justify-center">
                <Icon.Truck size={30} weight="thin" color="#00000" />
              </span>
              <span className="text-sm font-medium">Pan-India Delivery</span>
            </div>
            {/* Icon and Text Block */}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center justify-center">
                <Icon.ShieldCheck size={30} weight="thin" />
              </span>
              <span className="text-sm font-medium">Safe & Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex items-center justify-center">
                <Image
                  src="/images/other/hallmark.png"
                  alt={"Hall Mark Symbol"}
                  width={40}
                  height={40}
                  unoptimized
                />
              </span>
              <span className="text-sm font-medium md:mt-1">
                BIS Hallmarked
              </span>
            </div>
            {product?.productDetails?.productAttributes?.diamondDetails?.some(
              (diamond: any) => diamond.diamondCertifiedBy !== null,
            ) && (
              <>
                {product?.productDetails?.productAttributes?.diamondDetails?.some(
                  (diamond: any) => diamond.diamondCertifiedBy === "IGI",
                ) && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="flex items-center justify-center">
                      <Image
                        src="/images/other/igi.png"
                        alt={"Diamond Mark Symbol"}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </span>
                    <span className="text-sm font-medium md:mt-1">
                      IGI Certified
                    </span>
                  </div>
                )}

                {product?.productDetails?.productAttributes?.diamondDetails?.some(
                  (diamond: any) => diamond.diamondCertifiedBy === "DGLA",
                ) && (
                  <div className="flex flex-col items-center justify-between gap-2 text-center">
                    <span className="flex items-center justify-center">
                      <Image
                        src="/images/other/dgla.png"
                        alt={"Diamond Mark Symbol"}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </span>
                    <span className="text-sm font-medium md:mt-1">
                      DGLA Certified
                    </span>
                  </div>
                )}

                {product?.productDetails?.productAttributes?.diamondDetails?.some(
                  (diamond: any) => diamond.diamondCertifiedBy === "EGL",
                ) && (
                  <div className="flex flex-col items-center justify-between gap-2 text-center">
                    <span className="flex items-center justify-center">
                      <Image
                        src="/images/other/egl.png"
                        alt={"Diamond Mark Symbol"}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    </span>
                    <span className="text-sm font-medium md:mt-1">
                      EGL Certified
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-[#f7f7f7] p-4">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(3)}
          >
            Product Details
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`transform transition-transform duration-300 ${showAccordian === 3 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>

        <div
          className={`grid overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            showAccordian == 3
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-5">{product?.productDetails?.longDesc}</div>
          <div className="mt-4 grid grid-cols-4 justify-items-center gap-6 max-sm:grid-cols-3">
            {parseInt(product?.productDetails?.metalWeight) > 0 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <Icon.Scales size={27} weight="thin" />
                <p className="text-sm font-medium">
                  {product?.productDetails?.metalWeight}gms,{" "}
                  {product?.productDetails?.metalType}
                </p>
              </div>
            )}

            {product?.productDetails?.metalPurity && (
              <div className="flex flex-col items-center gap-2 text-center">
                <Icon.HandCoins size={27} weight="thin" />
                <p className="text-sm font-medium">
                  {product?.productDetails.metalPurity}{" "}
                  {product?.productDetails.metalType}
                </p>
              </div>
            )}

            {product?.productDetails?.isReturnable == 1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <Icon.ArrowsLeftRight size={27} weight="thin" />
                <p className="text-sm font-medium">7 days easy returns</p>
              </div>
            )}

            {product?.productDetails?.isReplaceable === 1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <TbReplace size={27} />
                <p className="text-sm font-medium">7 days easy replacement</p>
              </div>
            )}

            {product?.productDetails?.isInternationalShippingAvailable ===
              1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <GiCargoShip size={27} />
                <p className="text-sm font-medium">Delivered Internationally</p>
              </div>
            )}

            {product?.productDetails?.customizationAvailability === 1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <VscTools size={27} />
                <p className="text-sm font-medium">Customization Available</p>
              </div>
            )}

            {product?.productDetails?.fastDelivery === 1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <FaShippingFast size={27} />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
            )}

            {product?.productDetails?.tryAtHome === 1 && (
              <div className="flex flex-col items-center gap-2 text-center">
                <TbHomeCheck size={27} />
                <p className="text-sm font-medium">Try At Home</p>
              </div>
            )}

            {product?.productDetails?.diamondDetails?.length > 0 &&
              product.productDetails.diamondDetails.map(
                (diamond: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <Icon.SketchLogo size={22} weight="thin" />
                    <p className="text-sm font-medium">
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
                  </div>
                ),
              )}

            {product?.productDetails?.diamondDetails?.length > 0 &&
              product.productDetails.diamondDetails.map(
                (diamond: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <BiTargetLock size={22} />
                    <p className="text-sm font-medium">
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
                  </div>
                ),
              )}
          </div>
        </div>
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
              onClick={() => handleToggle(4)}
            >
              Size Guide
              <span className="right-0">
                <Icon.CaretDown
                  size={25}
                  className={`transform transition-transform duration-300 ${showAccordian === 4 ? "rotate-180" : null}`}
                />
              </span>
            </button>
          </h2>

          <div
            className={`grid overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              showAccordian == 4
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
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
                  <button
                    className="mt-2 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white"
                    onClick={() => {
                      handleSizeGuideModal();
                    }}
                  >
                    Know More
                  </button>
                  {showSizeGuideModal && (
                    <SizeGuideModal
                      handleSizeGuideModal={handleSizeGuideModal}
                      content={ringSizeGuide}
                    />
                  )}
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
                  <button
                    className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white"
                    onClick={() => {
                      handleSizeGuideModal();
                    }}
                  >
                    Know More
                  </button>
                  {showSizeGuideModal && (
                    <SizeGuideModal
                      handleSizeGuideModal={handleSizeGuideModal}
                      content={chainSizeGuide}
                    />
                  )}
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

                  <button
                    className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-4 pb-2 pt-2 text-center text-white"
                    onClick={() => {
                      handleSizeGuideModal();
                    }}
                  >
                    Know More
                  </button>
                  {showSizeGuideModal && (
                    <SizeGuideModal
                      handleSizeGuideModal={handleSizeGuideModal}
                      content={bangleSizeGuide}
                    />
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}

      {!product?.productDetails?.hidePriceBreakup && (
        <div className="border-t-2 border-[#f7f7f7] p-4">
          <h2>
            <button
              className="flex w-full justify-between justify-items-center text-xl"
              onClick={() => handleToggle(5)}
            >
              Price Breakup
              <span className="right-0">
                <Icon.CaretDown
                  size={25}
                  className={`transform transition-transform duration-300 ${showAccordian === 5 ? "rotate-180" : null}`}
                />
              </span>
            </button>
          </h2>

          <div
            className={`grid overflow-hidden transition-[max-height] duration-500 ease-in-out sm:w-[100%] lg:w-[100%] ${
              showAccordian == 5
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
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
                  <>
                    <p>Discount- {product.productDetails?.discountValue}%</p>
                    <p className="font-thin">{`(${product.productDetails?.discountCategory})`}</p>
                  </>
                )}
                <p>G.S.T</p>
              </div>
              <div>
                {parseInt(product.productDetails?.metalWeight) > 0 && (
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

                {product.productDetails?.stoneDetails && <p>-</p>}
                {product.productDetails?.makingCharges && <p>-</p>}
                {product.productDetails?.discountActive && <p>-</p>}
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
                {product.productDetails?.stoneDetails != null && (
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
                    {product?.productDetails?.typeOfDiscount ===
                    "Percentage" ? (
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
                {product?.productDetails?.discountActive ? (
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
        </div>
      )}
    </div>
  );
};
export default Accordian;
