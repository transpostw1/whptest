'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext'
import { countdownTime } from '@/store/countdownTime'
import { useProductContext } from "@/context/ProductContext";

const Cart = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter()

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const { cartState, updateCart, removeFromCart } = useCart();

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        const itemToUpdate = cartState?.cartArray?.find((item) => item.id === productId);

        if (itemToUpdate) {
            updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
        }
    };

    let moneyForFreeship = 150;
    let [totalCart, setTotalCart] = useState<number>(0)
    let [discountCart, setDiscountCart] = useState<number>(0)
    let [shipCart, setShipCart] = useState<number>(30)
    let [applyCode, setApplyCode] = useState<number>(0)

    const handleApplyCode = (minValue: number, discount: number) => {
        if (totalCart > minValue) {
            setApplyCode(minValue)
            setDiscountCart(discount)
        } else {
            alert(`Minimum order must be ${minValue}$`)
        }
    }

    if (totalCart < applyCode) {
        applyCode = 0
        discountCart = 0
    }

    if (totalCart < moneyForFreeship) {
        shipCart = 30
    }

    if (cartState?.cartArray?.length === 0) {
        shipCart = 0
    }

    const redirectToCheckout = () => {
        router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`)
    }

    return (
      <>
        {/* <TopNavOne textColor="text-white" />
        <div id="header" className="relative w-full">
          <MenuOne props="bg-transparent" />
          <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
        </div> */}
        <div className="cart-block md:py-20 py-10">
          <div className="container">
            <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
              <div className="xl:w-2/3 xl:pr-3 w-full">
                <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
                  <div className="heding5">🔥</div>
                  <div className="caption1 pl-2">
                    Your cart will expire in
                    <span className="min text-red-600 text-button fw-700">
                      {" "}
                      {timeLeft.minutes}:
                      {timeLeft.seconds < 10
                        ? `0${timeLeft.seconds}`
                        : timeLeft.seconds}
                    </span>
                    <span>
                      {" "}
                      minutes! Please checkout now before your items sell out!
                    </span>
                  </div>
                </div>
                <div className="heading banner mt-5">
                  <div className="text">
                    Buy
                    <span className="text-button">
                      {" "}
                      $
                      <span className="more-price">
                        {moneyForFreeship - totalCart > 0 ? (
                          <>{moneyForFreeship - totalCart}</>
                        ) : (
                          0
                        )}
                      </span>
                      .00{" "}
                    </span>
                    <span>more to get </span>
                    <span className="text-button">freeship</span>
                  </div>
                  <div className="tow-bar-block mt-4">
                    <div
                      className="progress-line"
                      style={{
                        width:
                          totalCart <= moneyForFreeship
                            ? `${(totalCart / moneyForFreeship) * 100}%`
                            : `100%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="list-product w-full sm:mt-7 mt-5">
                  <div className="w-full">
                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                      <div className="flex">
                        <div className="w-1/2">
                          <div className="text-button text-center">
                            Products
                          </div>
                        </div>
                        <div className="w-1/12">
                          <div className="text-button text-center">Price</div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">
                            Quantity
                          </div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">
                            Total Price
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-product-main w-full mt-3">
                      {cartState?.cartArray?.length < 1 ? (
                        <p className="text-button pt-3">No product in cart</p>
                      ) : (
                        cartState?.cartArray?.map((product) => (
                          <div
                            className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                            key={product.id}
                          >
                            <div className="w-1/2">
                              <div className="flex items-center gap-6">
                                <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                  <Image
                                    src={product.imageDetails[0]}
                                    width={1000}
                                    height={1000}
                                    alt={product.displayTitle}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                                <div>
                                  <div className="text-title">
                                    {product.name}
                                  </div>
                                  <div className="list-select mt-3"></div>
                                </div>
                              </div>
                            </div>
                            <div className="w-1/12 price flex items-center justify-center">
                              <div className="text-title text-center">
                                ${product.price}.00
                              </div>
                            </div>
                            <div className="w-1/6 flex items-center justify-center">
                              <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                                <Icon.Minus
                                  onClick={() => {
                                    if (product.quantity > 1) {
                                      handleQuantityChange(
                                        product.id,
                                        product.quantity - 1
                                      );
                                    }
                                  }}