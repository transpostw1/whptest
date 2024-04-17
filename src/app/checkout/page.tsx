'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useProductContext } from '@/context/ProductContext';
import {
  baseUrl,
  getProductbyId,
  getCartItems,
  addAddress,
  removeCart,
} from '@/utils/constants';
import {
  AddressBook,
  ShoppingCart,
  Wallet,
  ArrowRight,
  Gift,
  CreditCard,
} from '@phosphor-icons/react';
import StickyNav from '@/components/Header/StickyNav';
import CouponsModal from '@/components/Other/CouponsModal';

interface Props {
  closeModal: (arg: string) => void;
}

const Checkout = () => {
  const { cartItems, updateCart, setCartItems, removeFromCart } = useCart();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState('CartItems');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState } = useUser();
  const { getProductById } = useProductContext();
  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();

  const handleCouponsModal = () => {
    setCouponsModal(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const itemToUpdate = cartItems.find((item) => item.productId === productId);

    if (itemToUpdate) {
      updateCart(productId, newQuantity);
    }
  };

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  let totalCart = 0;
  cartItems.forEach((item) => {
    const price = parseInt(item.price);
    if (!isNaN(price) && typeof item.quantity === 'number') {
      totalCart += price * item.quantity;
    } else {
      console.error('Invalid data:', item);
    }
  });

  const handleOrderComplete = () => {
    setIsOrderPlaced(true);
  };

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
    switch (index) {
      case 0:
        setSelectedComponent('CartItems');
        break;
      case 1:
        setSelectedComponent('DeliveryDetails');
        break;
      case 2:
        setSelectedComponent('Payment');
        break;
      default:
        setSelectedComponent('CartItems');
        break;
    }
  };

  const handleProceed = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (selectedStep === steps.length - 1) {
      // Handle completion logic here
    } else {
      setSelectedStep((prevStep) => prevStep + 1);
      switch (selectedStep) {
        case 0:
          setSelectedComponent('DeliveryDetails');
          break;
        case 1:
          setSelectedComponent('Payment');
          break;
        case 2:
          setSelectedComponent('CartItems');
          break;
        default:
          setSelectedComponent('CartItems');
          break;
      }
    }
  };

  const proceedButtonTitle = () => {
    if (!isLoggedIn) {
      return 'Please Login to Proceed';
    }

    switch (selectedStep) {
      case 0:
        return 'Proceed to Delivery Details';
      case 1:
        return 'Proceed to Payment';
      case 2:
        return 'Place Order';
      default:
        return 'Proceed';
    }
  };

  const AddAddressModal: React.FC<Props> = ({ closeModal }) => {
    // ... AddAddressModal component code ...
  };

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay SDK loaded');
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();

    return () => {
      // Cleanup
    };
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'CartItems':
        return (
          <>
            <div className="list-product-main w-full mt-3">
              {cartItems?.length < 1 ? (
                <p className="text-button pt-3">No products in your cart</p>
              ) : (
                cartItems?.map((product: any) => (
                  <div
                    className="justify-between p-4 border rounded-lg border-gray-400 flex md:flex-row lg:flex-row lg:w-full md:w-full items-center mb-4"
                    key={product?.productId}
                  >
                    <Image
                      src={product?.image}
                      width={100}
                      height={200}
                      alt="image"
                      className="rounded-lg object-cover"
                    />
                    <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3">
                      <div className="py-4">
                        <div className="text-title">{product?.name}</div>
                        <div className="flex">
                          <div
                            className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
                            onClick={() => removeFromCart(product?.productId, product?.quantity)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
                      <div className="text-title text-center">₹{product?.price * product.quantity}</div>
                      <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                        <Icon.Minus
                          onClick={() => {
                            if (product.quantity > 1) {
                              handleQuantityChange(product.productId, product.quantity - 1);
                            }
                          }}
                          className={`text-base max-md:text-sm ${product.quantity === 1 ? 'disabled' : ''}`}
                        />
                        <div className="text-button quantity">{product.quantity}</div>
                        <Icon.Plus
                          onClick={() => handleQuantityChange(product.productId, product.quantity + 1)}
                          className="text-base max-md:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        );
      case 'DeliveryDetails':
        return (
          <>
            <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300 p-8">
              <div className="flex justify-between">
                <div>
                  <h1 className="mb-3 text-xl">Shipping Address</h1>
                  <h2 className="hover:text-red-500 hover:underline cursor-pointer text-gray-600" onClick={openModal}>
                    + Add new address
                  </h2>
                </div>
                <div>
                  <h1 className="mb-3 text-xl">Billing Address</h1>
                  <h2 className="mb-3">Same as shipping address</h2>
                  <h2 className="hover:text-red-500 hover:underline cursor-pointer text-gray-600" onClick={openModal}>
                    + Add new address
                  </h2>
                </div>
              </div>
              {isModalOpen && <AddAddressModal closeModal={closeModal} />}
            </div>
          </>
        );
      case 'Payment':
        return (
          <>
            <div className="flex flex-col lg:w-[50rem] md:w-[30rem] sm:w-[30rem] gap-5">
            <h1 className="text-red-950 font-medium">PAYMENT METHOD</h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
                  <label htmlFor="razorpayPayment" className="flex gap-2 cursor-pointer font-medium">
                    <Image src={'/images/other/upi-icon.png'} alt="upi" width={30} height={30} objectFit="fill" />
                    Razorpay (UPI, Cards)
                  </label>
                  <input
                    type="radio"
                    id="razorpayPayment"
                    name="paymentOption"
                    value="razorpay"
                    className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
                    checked={selectedPaymentOption === 'razorpay'}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  />
                </div>
                <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
                  <label htmlFor="otherPaymentGateway" className="flex gap-2 cursor-pointer font-medium">
                    <CreditCard className="text-2xl text-red-600" />
                    Other Payment Gateway
                  </label>
                  <input
                    type="radio"
                    id="otherPaymentGateway"
                    name="paymentOption"
                    value="otherPaymentGateway"
                    className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
                    checked={selectedPaymentOption === 'otherPaymentGateway'}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  />
                </div>
              </div>
              <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
              <div>
                <div>
                  -10% off on HDFC Bank Credit Card. Use <span className="font-bold">HDFC10</span>
                  <span className="text-red-600 underline">View more Offers</span>
                </div>
                <div>
                  -7% off on SBI Bank Credit Card. Use <span className="font-bold">SBI7</span>{' '}
                  <span className="text-red-600 underline">View more Offers</span>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handlePayment = async () => {
    if (selectedPaymentOption === 'razorpay') {
      try {
        const orderUrl = '/api/order';
        const response = await axios.post(orderUrl, { amount: totalCart * 100 });
        const { amount, id: order_id, currency } = response.data;
        const options = {
          key: 'rzp_test_QZVTreX3fAEZto',
          amount: amount.toString(),
          currency: currency,
          name: 'WHP Jewllers',
          description: 'Transaction',
          order_id: order_id,
          handler: async function (response: any) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            setIsOrderPlaced(true);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#e4587e',
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }
    } else if (selectedPaymentOption === 'otherPaymentGateway') {
      // Handle other payment gateway logic
      alert('Other payment gateway selected');
      setIsOrderPlaced(false);
    }
  };

  const steps = [
    {
      icon: <ShoppingCart className="text-gray-300 text-2xl rounded-full" />,
      label: 'Cart',
    },
    {
      icon: <AddressBook className="text-gray-300 text-2xl" />,
      label: 'Address',
    },
    { icon: <Wallet className="text-gray-300 text-2xl" />, label: 'Payment' },
  ];

  return (
    <>
      <StickyNav />
      <div className="cart-block flex-wrap">
        <div className="content-main flex flex-col justify-between px-14">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-3">
              {isOrderPlaced ? (
                <div className="flex">
                  <Image src={'/images/collection/check.png'} alt="check" width={100} height={10} />
                  <div className="flex flex-col items-start justify-center py-3">
                    <h1 className="text-3xl text-red-700 font-semibold">Order Placed!!</h1>
                    <h1>ID-#32432</h1>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap mt-2 items-center">
                  {steps.map((step, index) => (
                    <div
                      className="flex items-center w-40"
                      key={index}
                      onClick={() => handleStepClick(index)}
                    >
                      <div
                        className={`p-2 rounded-full border border-gray-300 ${
                          selectedStep >= index ? 'bg-rose-400' : 'bg-white'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <h2 className="p-2 rounded-full cursor-pointer">{step.label}</h2>
                      {index < steps.length - 1 && (
                        <ArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <h2>(Review of {cartItems.length} Items)</h2>
            </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-between">
            <div className="w-full md:w-[2000px] sm:mt-7 mt-5 md:pr-5">
              <div className="heading bg-surface bora-4 pt-4 pb-4">
                <h1 className="text-2xl">Your Shopping Bag</h1>
              </div>
              {renderComponent()}
              <h3 className="font-medium">Estimated Delivery Date: 29/2/2024</h3>
            </div>
            <div className="w-full lg:w-3/4 mt-5">
              {selectedComponent === 'CartItems' && (
                <div>
                  <h1 className="my-5 text-2xl font-bold text-rose-600">Coupons</h1>
                  <div className="flex justify-between border border-gray-400 p-3">
                    <div className="flex items-center gap-2 font-medium">
                      <Gift style={{ color: 'red', fontSize: '24px' }} />
                      <h3>Available Coupons</h3>
                    </div>
                    <h3 className="text-red-600 underline cursor-pointer">View</h3>
                    <input className="border border-black" />
                    <button className="bg-black text-white">check</button>
                  </div>
                  {couponsModal && <CouponsModal />}
                  <div className="flex justify-between border border-gray-400 p-3 mt-3">
                    <div className="flex gap-2 items-center font-medium">
                      <Gift style={{ color: 'red', fontSize: '24px' }} />
                      <h3>Gift Message</h3>
                    </div>
                    <h3 className="text-red-600 underline">Add</h3>
                  </div>
                </div>
              )}
              <h1 className="my-5 text-2xl font-bold text-rose-600">ORDER SUMMARY</h1>
              {selectedComponent !== 'CartItems' && (
                <div className="list-product-main w-full">
                  <div className="hidden lg:block mb-2">
                    {cartItems?.length < 1 ? (
                      <p className="text-button">No products in your cart</p>
                    ) : (
                      cartItems?.map((product, index) => (
                        <div
                          className="border border-gray-200 flex w-full items-center mb-2"
                          key={index}
                        >
                          <Image
                            src={product.image}
                            width={100}
                            height={200}
                            alt={product.name}
                            className="rounded-lg object-cover"
                          />
                          <div className="p-4 flex flex-col">
                            <div className="text-title">
                              {product.name} X {product.quantity}
                            </div>
                            <div className="text-title text-start">₹{product?.price}</div>
                            <h3>Estimated Delivery Date</h3>
                          </div>
                          <div className="w-full md:w-1/6 flex flex-col items-center justify-center"></div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              <div className="">
                <div className="bg-gray-100 p-2">
                  <div className="">
                    <div className="flex justify-between font-medium">
                      <h3>Subtotal</h3>
                      <h3>₹{totalCart}</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>Discount</h3>
                      <h3>₹00</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>Shipping Charges</h3>
                      <h3>₹0</h3>
                    </div>
                    <div className="flex justify-between font-medium">
                      <h3>G.S.T</h3>
                      <h3>₹951.27</h3>
                    </div>
                    <div className="flex justify-between font-bold">
                      <h3 className="text-gray-800">Total Price</h3>
                      <h3>₹{totalCart}</h3>
                    </div>
                  </div>
                </div>
                {!isOrderPlaced && (
                  <div className="flex flex-col mt-3 relative">
                    {isMobile ? (
                      <div className="w-full sticky top-0 p-4 flex justify-between">
                        <div>
                          <h3 className="font-semibold">₹24237.59</h3>
                          <h2 className="text-red-500 font-medium">View Order Summary</h2>
                        </div>
                        <button
                          onClick={() => {
                            if (proceedButtonTitle() === 'Place Order') {
                              handlePayment();
                            } else {
                              handleProceed();
                            }
                          }}
                          className="w-52 flex justify-center hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-rose-600"
                        >
                          {proceedButtonTitle()}
                          <ArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (proceedButtonTitle() === 'Place Order') {
                            handlePayment();
                          } else {
                            handleProceed();
                          }
                        }}
                        className="flex justify-center items-center hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
                      >
                        {proceedButtonTitle()}
                        <ArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;