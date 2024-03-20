"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import { countdownTime } from "@/store/countdownTime";
import CountdownTimeType from "@/type/CountdownType";
import { useProductContext } from "@/context/ProductContext";

const ModalCart = ({
  serverTimeLeft,
}: {
  serverTimeLeft: CountdownTimeType;
}) => {
  const [timeLeft, setTimeLeft] = useState(serverTimeLeft);

  const [dataFetched, setDataFetched] = useState(false);

  const { products, fetchData } = useProductContext();
  // console.log(products, "yesss i keep rendering ");

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(countdownTime());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, []);



  const [activeTab, setActiveTab] = useState<string | undefined>("");
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { cartItems, addToCart, removeFromCart, updateCart } = useCart();

  const handleAddToCart = (productItem: ProductType) => {
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productId
    );
    const currentquantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentquantity + 1;
    productAlreadyExists
      ? updateCart(productItem.productId, updatedQuantity)
      : addToCart({ ...productItem });
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  let moneyForFreeship = 150;
  let [totalCart, setTotalCart] = useState<number>(0);
  let [discountCart, setDiscountCart] = useState<number>(0);

  // cartItems?.map((item) => (totalCart += item.productPrice * item.quantity));

  return (
    <>
      <div className={`modal-cart-block`} onClick={closeModalCart}>
        <div
          className={`modal-cart-main flex ${isModalOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="left w-1/2 border-r border-line py-6 max-md:hidden text-rose-950">
            <div className="heading5 px-6 pb-3">You May Also Like</div>
            <div className="list px-6">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.productId}
                  className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                >
                  <div className="infor flex items-center gap-5">
                    <div className="bg-img">
                      <Image
                        key={""}
                        src={product?.imageDetails[0]?.image_path}
                        width={300}
                        height={300}
                        alt={product?.title}
                        className="w-[100px] aspect-square flex-shrink-0 rounded-lg"
                      /> */}
                    </div>
                    <div className="">
                      <div className="name text-button">
                        {product.displayTitle}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="product-price text-title">
                          ₹{product.discountPrice}
                        </div>
                        <div className="product-origin-price text-title text-secondary2">
                          <del>₹{product.productPrice}</del>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-xl bg-white w-10 h-10 rounded-xl border border-rose-400 flex items-center justify-center duration-300 cursor-pointer hover:bg-rose-500 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <Icon.Handbag alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right cart-block md:w-1/2 w-full py-6 relative overflow-hidden text-rose-950">
            <div className="heading px-6 pb-3 flex items-center justify-between relative">
              <div className="heading5">Shopping Cart</div>
              <div
                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                onClick={closeModalCart}
              >
                <Icon.X size={14} alt="" key={""} />
              </div>
            </div>
            {/* <div className="time px-6">
                <div className=" flex items-center gap-3 px-5 py-3 bg-green rounded-lg">
                  <p className="text-3xl">🔥</p>
                  <div className="caption1">
                    Your cart will expire in{" "}
                    <span className="text-red caption1 font-semibold">
                      {timeLeft.minutes}:
                      {timeLeft.seconds < 10
                        ? `0${timeLeft.seconds}`
                        : timeLeft.seconds}
                    </span>{" "}
                    minutes!
                    <br />
                    Please checkout now before your items sell out!
                  </div>
                </div>
              </div> */}

            <div className="apicart">
              {cartItems?.map((cartItem) => {
                // Find the corresponding product details using product ID
                const productDetails = products.find(
                  (product) => product.productId === cartItem.product_id
                );

                if (!productDetails) return null; // Return null if product details are not found

                return (
                  <div
                    key={cartItem.productId}
                    className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                  >
                    <div className="infor flex items-center gap-3 w-full">
                      <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          key={"s"}
                          src={productDetails.imageDetails[0].image_path} // Use productDetails to access the image path
                          width={300}
                          height={300}
                          alt={productDetails.Title}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex items-center justify-between w-full">
                          <div className="name text-button">
                            {productDetails.displayTitle}
                          </div>
                          <div
                            className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer text-center"
                            onClick={() => removeFromCart(cartItem.productId)}
                          >
                            Remove
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-3 w-full">
                          <div className="product-price text-title">
                            ₹{productDetails.discountPrice}.00{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" bg-white absolute bottom-0 left-0 w-full">
              {/* <div className="flex items-center justify-center lg:gap-14 gap-8 px-6 py-4 border-b border-line">
                  <div
                    className="item flex items-center gap-3 cursor-pointer"
                    onClick={() => handleActiveTab("shipping")}
                  >
                    <Icon.Truck className="text-xl" />
                    <div className="caption1">Shipping</div>
                  </div>
                  <div
                    className="item flex items-center gap-3 cursor-pointer"
                    onClick={() => handleActiveTab("coupon")}
                  >
                    <Icon.Tag className="text-xl" />
                    <div className="caption1">Coupon</div>
                  </div>
                </div> */}
              <div className="flex items-center justify-between pt-6 px-6">
                <div className="heading5">Subtotal</div>
                <div className="heading5"> ₹135.00</div>
              </div>
              <div className="block-button text-center p-6">
                <div className="flex items-center gap-4">
                  <Link
                    href={"/cart"}
                    className="p-3 rounded-xl font-bold  basis-1/2 hover:bg-rose-400 bg-white border border-rose-400 text-red-950 text-center uppercase"
                    onClick={closeModalCart}
                  >
                    View cart
                  </Link>
                  <Link
                    href={"/checkout"}
                    className="p-3 rounded-xl font-bold  hover:bg-rose-400 basis-1/2 text-center uppercase border border-rose-400"
                    onClick={closeModalCart}
                  >
                    CheckOut
                  </Link>
                </div>
                <div
                  onClick={closeModalCart}
                  className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                >
                  Or continue shopping
                </div>
              </div>
            
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
