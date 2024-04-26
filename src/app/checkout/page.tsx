"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useProductContext } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import StickyNav from '@/components/Header/StickyNav';
import CartItems from './CartItems';
import DeliveryDetails from './DeliveryDetails';
import Payment from './Payment';
import OrderSummary from './OrderSummary';
import ProceedButton from './ProceedButton';
import CouponsModal from '@/components/Other/CouponsModal';
import { AddressBook, ShoppingCart, Wallet, ArrowRight, Gift, CreditCard } from "@phosphor-icons/react";
import Image from 'next/image';
import FlashAlert from "../../components/other/FlashAlert";

const Checkout: React.FC = () => {
  const { cartItems, updateCart, setCartItems, removeFromCart } = useCart();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState('CartItems');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState } = useUser();
  const { getProductById } = useProductContext();
  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const [shippingAddressSelected, setShippingAddressSelected] = useState(false);
  const [billingAddressSelected, setBillingAddressSelected] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [flashKey, setFlashKey] = useState(0);
  const [useSameAsBillingAddress, setUseSameAsBillingAddress] = useState(true);

  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);

  const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow");

  const [showAllItems, setShowAllItems] = useState(false);


  const handleCouponsModal = () => {
    setCouponsModal(true);
  };
  const onShippingAddressSelected = () => {
    setShippingAddressSelected(true);
  };
  const onBillingAddressSelected = () => { // Add this function
    setBillingAddressSelected(true);
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

  useEffect(() => {
    if (buyNow) {
      setShowAllItems(false);
    }
  }, [buyNow]);

  const toggleShowAllItems = () => {
    setShowAllItems((prevState) => !prevState);
  };


  // const mappedCartItems = cartItems
  // .filter((item) => item.productId && item.quantity && item.displayTitle && item.productPrice && item.imageDetails)
  // .map((item) => ({
  //   productId: item.productId,
  //   quantity: item.quantity,
  //   name: item.displayTitle,
  //   price: item.productPrice,
  //   image: item.imageDetails && item.imageDetails.length > 0 ? item.imageDetails[0].image_path : '',
  // }));

  const mappedCartItems = showAllItems
    ? cartItems
        .filter(
          (item) =>
            item.productId &&
            item.quantity &&
            item.displayTitle &&
            item.productPrice &&
            item.imageDetails
        )
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.displayTitle,
          price: item.productPrice,
          image:
            item.imageDetails && item.imageDetails.length > 0
              ? item.imageDetails[0].image_path
              : "",
        }))
    : cartItems
        .filter((item) => item.productId === parseInt(buyNow as string))
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.displayTitle,
          price: item.productPrice,
          image:
            item.imageDetails && item.imageDetails.length > 0
              ? item.imageDetails[0].image_path
              : "",
        }));



  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const itemToUpdate = cartItems.find((item) => item.productId === productId);

    if (itemToUpdate) {
      updateCart(productId, newQuantity);
    }
  };

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  

  let discount = searchParams.get('discount');
  let ship = searchParams.get('ship');

  let totalCart = 0;
  mappedCartItems.forEach((item) => {
    const price = parseInt(item.price);
    if (!isNaN(price) && typeof item.quantity === 'number') {
      totalCart += price * item.quantity;
    }
  });

  const handleOrderComplete = () => {
    setIsOrderPlaced(true);
    // Reset the cart and other states
    setCartItems([]);
    setSelectedShippingAddress(null);
    setSelectedBillingAddress(null);
    setSelectedPaymentMethod('');
    // Show a success message or perform any other actions
    setFlashMessage('Your order has been placed successfully!');
    setFlashType('success');
    setFlashKey((prevKey) => prevKey + 1);
  };

 
  
  const validateDeliveryDetails = () => {
  if (!shippingAddressSelected) {
    // Display error message using FlashAlert
    setFlashMessage('Please select a shipping address before proceeding.');
    setFlashType('error');
    setFlashKey((prevKey) => prevKey + 1);
    return false;
  } else if (!useSameAsBillingAddress && !selectedBillingAddress) {
    // Display error message using FlashAlert
    setFlashMessage('Please select a billing address before proceeding.');
    setFlashType('error');
    setFlashKey((prevKey) => prevKey + 1);
    return false;
  } else if (useSameAsBillingAddress && !selectedShippingAddress) {
    // Display error message using FlashAlert
    setFlashMessage('Please select a shipping address before proceeding.');
    setFlashType('error');
    setFlashKey((prevKey) => prevKey + 1);
    return false;
  }
  return true;
};
  
  
  const handleStepClick = (index: number, useSameAsBillingAddress: boolean) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  
    if (index === 0) {
      setSelectedStep(0);
      setSelectedComponent('CartItems');
    } else if (index === 1) {
      // Reset the address selection states when returning to the delivery details step
      setShippingAddressSelected(false);
      setBillingAddressSelected(false);
      setSelectedShippingAddress(null);
      setSelectedBillingAddress(null);
  
      // Validate cart items
      if (cartItems.length === 0) {
        // Display error message using FlashAlert
        setFlashMessage('Your cart is empty. Please add items to your cart before proceeding.');
        setFlashType('error');
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      setSelectedStep(1);
      setSelectedComponent('DeliveryDetails');
    } else if (index === 2) {
      if (validateDeliveryDetails()) {
        setSelectedStep(2);
        setSelectedComponent('Payment');
      }
    }
  };
  

  const handleProceed = (useSameAsBillingAddress: boolean) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  
    if (selectedStep === 0) {
      // Validate cart items
      if (cartItems.length === 0) {
        // Display error message using FlashAlert
        setFlashMessage('Your cart is empty. Please add items to your cart before proceeding.');
        setFlashType('error');
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      setSelectedStep((prevStep) => prevStep + 1);
      setSelectedComponent('DeliveryDetails');
    } else if (selectedStep === 1) {
      if (!validateDeliveryDetails()) {
        return;
      }
      setSelectedStep((prevStep) => prevStep + 1);
      setSelectedComponent('Payment');
    } else if (selectedStep === 2) {
      // Validate payment method
      if (!selectedPaymentMethod) {
        // Display error message using FlashAlert
        setFlashMessage('Please select a payment method before placing the order.');
        setFlashType('error');
        setFlashKey((prevKey) => prevKey + 1);
        return;
      }
      // Initiate the respective payment method
      placeOrder();

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

  const steps = [
    {
      icon: (
        <ShoppingCart
          className={`text-2xl rounded-full ${selectedStep === 0 ? 'text-white' : 'text-gray-500'}`}
        />
      ),
      label: 'Cart',
    },
    {
      icon: <AddressBook className={`text-2xl ${selectedStep === 1 ? 'text-white' : 'text-gray-500'}`} />,
      label: 'Address',
    },
    {
      icon: <Wallet className={`text-2xl ${selectedStep === 2 ? 'text-white' : 'text-gray-500'}`} />,
      label: 'Payment',
    },
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
                  <Image src="/images/collection/check.png" alt="check" width={100} height={10} />
                  <div className="flex flex-col items-start justify-center py-3 ">
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
                      onClick={() => handleStepClick(index, useSameAsBillingAddress)}
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
          <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
          <div className="flex flex-col md:flex-row lg:flex-row justify-between">
            <div className="w-full md:w-[2000px] sm:mt-7 mt-5 md:pr-5">
              <div className="heading bg-surface bora-4 pt-4 pb-4">
                
              </div>
              {selectedComponent === 'CartItems' && (
                <CartItems
                  cartItems={mappedCartItems}
                  handleQuantityChange={handleQuantityChange}
                  removeFromCart={removeFromCart}
                />
              )}
              {selectedComponent === 'DeliveryDetails' && (
                <DeliveryDetails
                onShippingAddressSelected={onShippingAddressSelected}
                onBillingAddressSelected={onBillingAddressSelected}
                useSameAsBillingAddress={useSameAsBillingAddress}
                setUseSameAsBillingAddress={setUseSameAsBillingAddress}
                selectedShippingAddress={selectedShippingAddress}
                setSelectedShippingAddress={setSelectedShippingAddress}
                selectedBillingAddress={selectedBillingAddress}
                setSelectedBillingAddress={setSelectedBillingAddress}
              />
              )}
              {selectedComponent === 'Payment' && (
                  <Payment
                  selectedPaymentMethod={selectedPaymentMethod}
                  handlePaymentMethodChange={handlePaymentMethodChange}
                  totalCart={totalCart}
                  onOrderComplete={handleOrderComplete}
                  selectedShippingAddress={selectedShippingAddress}
                  selectedBillingAddress={selectedBillingAddress}
                  placeOrder={handleProceed}
                />       
              )}
              

              {/* <h3 className="font-medium">Estimated Delivery Date:29/2/2024</h3> */}
            </div>
            <div className="w-full lg:w-3/4 mt-5">
              {selectedComponent === 'CartItems' && (
                <div>
                  <h1 className="my-5 text-2xl text-rose-600">Coupons</h1>
                  <div className="flex justify-between border border-gray-400 p-3">
                    <div className="flex items-center gap-2 font-medium">
                      <Gift style={{ color: 'red', fontSize: '24px' }} />
                      <h3>Available Coupons</h3>
                    </div>
                    <h3 className="text-red-600 underline cursor-pointer" onClick={handleCouponsModal}>
                      View
                    </h3>
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
                  <div className="bg-gray-100 p-2 mt-3">
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
                </div>
              )}

              {(selectedComponent === 'DeliveryDetails' || selectedComponent === 'Payment') && (
                <div>
                  <h1 className="my-5 text-2xl text-rose-600">ORDER SUMMARY</h1>
                  <OrderSummary totalCart={totalCart} cartItems={mappedCartItems} />
                </div>
              )}

              {selectedStep !== 2 && (
                <ProceedButton
                  isMobile={isMobile}
                  proceedButtonTitle={proceedButtonTitle()}
                  handleProceed={handleProceed}
                  useSameAsBillingAddress={useSameAsBillingAddress}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

