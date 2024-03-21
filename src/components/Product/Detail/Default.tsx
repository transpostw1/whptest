/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageDetails, ProductType } from "@/type/ProductType";
import Products from "@/data/Products.json";
import Rate from "@/components/Other/Rate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from "swiper/core";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import ModalSizeguide from "@/components/Modal/ModalSizeguide";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { parse } from "path";

interface Props {
  productId: string | number | null;
}

const Default: React.FC<Props> = ({ productId }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [metal, setMetal] = useState<string>("Gold");
  const [karat, setKarat] = useState<string>("22k");
  const [size, setSize] = useState<string>("3.0");
  const [data, setData] = useState<ProductType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, updateCart } = useCart();

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
  };

  const settingsThumbnails = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1,
    nextArrow: <Icon.CaretRight size={50} />,
    prevArrow: <Icon.CaretLeft size={40} />,
  };

  async function getData() {
    const res = await fetch(`http://164.92.120.19/api/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function singleProduct() {
    const product = await getData();
    setData(product);
  }

  useEffect(() => {
    singleProduct();
  }, [productId]);

  const product: ProductType = data[0];
  const formattedDiscountedPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat((data && product?.discountPrice) ?? 0))
  );
  const formattedOriginalPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat((data && product?.productPrice) ?? 0))
  );

  const handleToggle = (number: any) => {
    setShowAccordian(number === showAccordian ? null : number);
  };
  const handleBuyNow = () => {
    router.push("/checkout");
  };
  const handleAddToCart=(productItem:ProductType)=>{
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productId
    );
    const currentquantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentquantity + 1;
    productAlreadyExists
      ? updateCart(productItem.productId, updatedQuantity)
      : addToCart({ ...productItem });
  }
  
  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-[50%] sm:w-[100%]">
          <div className="bg-[#fffff]">
            <Slider {...settingsMain} ref={(slider: any) => setNav1(slider)}>
              {product &&
                product.imageDetails
                  .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                  .map((image, index) => (
                    
                    <div key={index}>
                      <InnerImageZoom
                        src={image.image_path}
                        srcSet={image}
                        zoomScale={1.5}
                        zoomType="click"
                        hideCloseButton={true}
                      />
                    </div>
                  ))}
            </Slider>
            <div className="m-auto w-[60%] h-full">
              <Slider
                {...settingsThumbnails}
                ref={(slider: any) => setNav2(slider)}
              >
                {product &&
                  product.imageDetails
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((image, index) => (
                      <div key={index}>
                        <Image
                          src={image?.image_path}
                          alt={product?.title}
                          width={100}
                          height={100}
                          className="lg:mr-1 cursor-pointer"
                        />
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
          <>
            <video
              className=""
              src="/products/GERD23021256.mp4"
              loop
              autoPlay
            />
          </>
        </div>
        <div className="lg:w-[50%] sm:w-[100%] lg:ml-[25px]  p-4">
          <div className="flex justify-between lg:w-[100%] sm:w-[100%]">
            <p className="font-semibold text-3xl">{product?.title}</p>
            <span className="rounded-full bg-[#e26178] px-[7px] py-[7px] mr-2 h-[45px] w-[45px]">
              <Icon.ShareFat size={30} weight="fill" className="text-white" />
            </span>
          </div>
          <p className="mb-2">Gold, 2.6 gms, Pear cut Diamonds - 0.116 Carat</p>
          <div className="flex flex-wrap mb-2">
            <div>
              <span className="underline mr-2 cursor-pointer">12 Review</span>
            </div>
            <div className="rounded-full bg-[#e26178] text-transparent h-2 w-2 mt-3">
              3
            </div>
            <div className="flex">
              <span className="flex mt-1">
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
              </span>
            </div>
          </div>
          <div className="mb-5">
            <span className="font-extrabold text-2xl">
              ₹{formattedDiscountedPrice}
            </span>
            <span className="line-through ml-3 text-[#aa9e9e]">
              ₹{formattedOriginalPrice}
            </span>
            <span className="ml-3 text-[#e26178] underline">
              {product && product?.discountValue}% OFF on {product&& product?.discountCategory}
            </span>
          </div>
          <div>
            <span>
              Upon Price Drop,{" "}
              <span className="underline text-[#e26178]">Notify Me</span>
            </span>
          </div>
          <div className="flex border border-[#f3f3f3] lg:w-[65%] sm:w-[100%] md:w-[65%] p-3">
            <div className="mr-3">
              <p>Metal</p>
              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none lg:w-[7.5rem] sm:w-20 md:w-[7.5rem]"
                  value={metal}
                  onChange={(e) => setMetal(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Rose Gold"
                  >
                    Rose Gold
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Gold"
                  >
                    Gold
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
            <div className="mr-3">
              <p>Karat</p>
              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none sm:w-20 lg:w-20"
                  value={karat}
                  onChange={(e) => setKarat(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Rose Gold"
                  >
                    22k
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Gold"
                  >
                    18k
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
            <div className="mr-3">
              <div className="flex m-auto">
                <p className="mt-1">Size</p>
                <span className="text-white rounded-full bg-[#e26178] w-[18px] h-[18px] ml-1 text-center text-sm font-semibold mt-2">
                  i
                </span>
              </div>

              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none w-20"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="3.0"
                  >
                    3.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="4.0"
                  >
                    4.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="5.0"
                  >
                    5.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="6.0"
                  >
                    6.0
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2">
            Only <span className="text-[#e26178]">3 pieces</span> left!
          </p>
          <div className="mt-4">
            <ul className="list-disc">
              <li>
                10% off on HDFC Bank Credit Card. Use{" "}
                <span className="font-extrabold">HDFC10 </span>
                <span className="text-[#e26178] underline">
                  View more Offers
                </span>
              </li>
              <li>
                7% off on SBI Bank Credit Card. Use{" "}
                <span className="font-extrabold">SBI17 </span>
                <span className="text-[#e26178] underline">
                  View more Offers
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-[#f7f7f7] lg:w-[65%] p-4 mt-4">
            <p className="mb-3">Enter pincode to check delivery</p>
            <div className="flex bg-white justify-between p-2">
              <input className="outline-none" />
              <p className="underline text-[#e26178]">Change</p>
            </div>
            <ul className="mt-3">
              <li>Same day delivery available. Extra Charge- ₹99</li>
              <li>Free delivery in 2 days.</li>
            </ul>
          </div>
          {product && (
            <div className="flex sm:justify-around mt-[25px] ">
              <div className=" cursor-pointer bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white sm:w-[35%] h-[58px] mr-[10px] py-[18px] px-[32px] text-center">
                <Link
                  href={{
                    pathname: "/checkout",
                    query: { id: JSON.stringify(product.productId) },
                  }}
                >
                  Buy Now
                </Link>
              </div>

              <div className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-[#e26178] w-[35%] h-[58px]  text-center mr-[10px]" onClick={()=>handleAddToCart(product)}>
                <div className=" m-[2px] mb-[2px] bg-white">
                  <span className="flex justify-center py-[14px]">
                    <span>Add to Cart</span>
                    <span className="mt-1">
                      <Icon.ShoppingCart />
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex justify-center text-[#e26178] outline outline-[#e26178] outline-1 w-[56px] h-[58px] items-center">
                {" "}
                <Icon.Heart size={27} weight="thin" />
              </div>
            </div>
          )}

          <div className="mt-4 border border-[#f7f7f7] w-[445px] p-2 text-center">
            <span className="underline text-[#e26178] cursor-pointer ">
              Schedule free trial
            </span>
            <span> or </span>
            <span className="underline text-[#e26178] cursor-pointer">
              Try at Home
            </span>
            <span> today!</span>
          </div>
          <div className="flex bg-[#f7f7f7] p-4 lg:w-[90%] mt-7">
            <div>
              <span>
                <span className="text-[#e26178]">Gold 10+1 Monthly Plan </span>
                (Pay 10 Instalments, Get 100% Off on 11th Instalments)
              </span>
            </div>
            <div className="">
              <button className="w-[90%] text-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] p-4 pt-2 pb-2 mr-5 text-white">
                Subscribe
              </button>
            </div>
          </div>
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
                        {product && product.metalWeight}gms,{" "}
                        {product && product.metalType}
                      </p>
                    </div>
                    <div className="p-2">
                      <Icon.HandCoins className="mr-1 mt-1" size={27} />
                      <p>
                        {product && product.metalPurity}{" "}
                        {product && product.metalType}
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
                      <p>{product && product.metalWeight} gms</p>
                      <p>{product && product.metalPurity} Carat</p>
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
        </div>
      </div>
    </>
  );
};

export default Default;
