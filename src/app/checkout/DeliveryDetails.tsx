import React, { useState } from 'react';
import ShippingAddressList from './ShippingAddressList';
import BillingAddressList from './BillingAddressList';
import AddAddressModal from './AddAddressModal';
import AddAddressMobile from './AddAddressMobile';
import FlashAlert from "../../components/other/FlashAlert";

const DeliveryDetails: React.FC = () => {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);
  const [useSameAsBillingAddress, setUseSameAsBillingAddress] = useState(true);
  const [isShippingAddressModalOpen, setIsShippingAddressModalOpen] = useState(false);
  const [isBillingAddressModalOpen, setIsBillingAddressModalOpen] = useState(false);
  const [isShippingAddressMobileOpen, setIsShippingAddressMobileOpen] = useState(false);
  const [isBillingAddressMobileOpen, setIsBillingAddressMobileOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [flashKey, setFlashKey] = useState(0);
  const [shippingAddressAdded, setShippingAddressAdded] = useState(false); // Add this state variable
  const [billingAddressAdded, setBillingAddressAdded] = useState(false); // Add this state variable


  const handleShippingAddressSelect = (address: Address) => {
    setSelectedShippingAddress(address);
    if (useSameAsBillingAddress) {
      setSelectedBillingAddress(address);
    }
    console.log("Setting flash message for shipping address");
    setFlashMessage(`Shipping address updated`);
    setFlashKey(prevKey => prevKey + 1);
  };

  const handleBillingAddressSelect = (address: Address) => {
    setSelectedBillingAddress(address);
    if (!useSameAsBillingAddress) {
      setFlashMessage(`Billing address updated`);
      setFlashKey(prevKey => prevKey + 1);
    }
  };

  const handleBillingAddressToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAsBillingAddress(event.target.checked);
    if (event.target.checked) {
      setSelectedBillingAddress(selectedShippingAddress);
    } else {
      setSelectedBillingAddress(null);
    }
  };

  const closeShippingAddressModal = () => {
    setIsShippingAddressModalOpen(false);
  };

  const closeBillingAddressModal = () => {
    setIsBillingAddressModalOpen(false);
  };

  const closeShippingAddressMobile = () => {
    setIsShippingAddressMobileOpen(false);
  };

  const closeBillingAddressMobile = () => {
    setIsBillingAddressMobileOpen(false);
  };

  const handleAddressAdded = (isBillingAddress: boolean) => {
    if (isBillingAddress) {
      setBillingAddressAdded(prevState => !prevState);
    } else {
      setShippingAddressAdded(prevState => !prevState);
    }
  };


  console.log("Flash Message:", flashMessage);

  return (
    <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300 p-8">
      <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
      <ShippingAddressList
        onAddressSelect={handleShippingAddressSelect}
        selectedAddress={selectedShippingAddress}
        addressAdded={shippingAddressAdded}
        onAddressAdded={handleAddressAdded}
      />
      <h2
        className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
        onClick={() => {
          if (window.innerWidth <= 768) {
            setIsShippingAddressMobileOpen(true);
          } else {
            setIsShippingAddressModalOpen(true);
          }
        }}
      >
        + Add a New Shipping Address
      </h2>
      {isShippingAddressModalOpen && (
        <AddAddressModal
          closeModal={closeShippingAddressModal}
          isForBillingAddress={false}
          onAddressAdded={handleAddressAdded}
        />
      )}
      {isShippingAddressMobileOpen && (
        <AddAddressMobile
          isOpen={isShippingAddressMobileOpen}
          onClose={closeShippingAddressMobile}
          isForBillingAddress={false}
          onAddressAdded={handleAddressAdded}
        />
      )}

      <div className="mt-8">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useShippingAddressAsBillingAddress"
            checked={useSameAsBillingAddress}
            onChange={handleBillingAddressToggle}
            className="form-checkbox"
          />
          <label htmlFor="useShippingAddressAsBillingAddress" className="ml-2">
            Use shipping address as billing address
          </label>
        </div>
        {useSameAsBillingAddress && selectedShippingAddress && (
          <ShippingAddressList
            onAddressSelect={handleBillingAddressSelect}
            selectedAddress={selectedShippingAddress}
            readOnly
          />
        )}
        {!useSameAsBillingAddress && (
          <>
            <BillingAddressList
              onAddressSelect={handleBillingAddressSelect}
              selectedAddress={selectedBillingAddress}
              addressAdded={billingAddressAdded}
              onAddressAdded={handleAddressAdded} 
            />
            <h2
              className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setIsBillingAddressMobileOpen(true);
                } else {
                  setIsBillingAddressModalOpen(true);
                }
              }}
            >
              + Add a New Billing Address
            </h2>
            {isBillingAddressModalOpen && (
              <AddAddressModal
                closeModal={closeBillingAddressModal}
                isForBillingAddress={true}
                onAddressAdded={handleAddressAdded}
              />
            )}
            {isBillingAddressMobileOpen && (
              <AddAddressMobile
                isOpen={isBillingAddressMobileOpen}
                onClose={closeBillingAddressMobile}
                isForBillingAddress={true}
                onAddressAdded={handleAddressAdded}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;