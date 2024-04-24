import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '@/utils/constants';
import { FaCheckCircle, FaEdit, FaTimes } from 'react-icons/fa';
import Preloader from '@/components/other/Preloader'; 

interface Address {
  address_id: number;
  customer_id: number;
  address_type: string;
  full_address: string;
  country: string;
  state: string;
  city: string;
  landmark: string | null;
  pincode: number;
  created_at: string;
  updated_at: string;
}

interface ShippingAddressListProps {
    onAddressSelect: (address: Address) => void;
    selectedAddress: Address | null;
    addressAdded: boolean; 
    onAddressAdded: () => void; 
  }

const ShippingAddressList: React.FC<ShippingAddressListProps> = ({
    onAddressSelect,
    selectedAddress,
    addressAdded, 
    onAddressAdded, 
  }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
    setIsLoading(true);
      try {
        const cookieTokenn = Cookies.get('localtoken');
        const response = await axios.get<{ customerAddress?: Address[] }>(`${baseUrl}/customer/getAddresses`, {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        });

        if (response.data && response.data.customerAddress) {
          const shippingAddresses = response.data.customerAddress.filter(
            (address) => address.address_type !== 'billing'
          );
          setAddresses(shippingAddresses);
        } else {
          console.error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [addressAdded]);

  useEffect(() => {
    if (addressAdded) {
      onAddressAdded(); // Call the onAddressAdded function when a new address is added
    }
  }, [addressAdded, onAddressAdded]);
  
  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
  };

  const sortedAddresses = addresses.slice();
  if (selectedAddress) {
    sortedAddresses.sort((a, b) => {
      if (a.address_id === selectedAddress.address_id) return -1;
      if (b.address_id === selectedAddress.address_id) return 1;
      return 0;
    });
  }

  return (
    <div>
      <h2 className="mb-4 text-xl">Shipping Address</h2>
      {isLoading ? (
        <Preloader />
      ) : addresses.length === 0 ? (
        <p>No shipping addresses found.</p>
      ) : (
        <div>
          {sortedAddresses.map((address) => (
            <div
              key={address.address_id}
              className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${
                selectedAddress?.address_id === address.address_id
                  ? 'bg-rose-200'
                  : 'bg-gray-100 opacity-50' // Apply faded style to unselected addresses
              } cursor-pointer`}
              onClick={() => handleAddressSelect(address)}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{address.full_address.split(',')[0]}</h3>
                  {selectedAddress?.address_id === address.address_id && (
                    <FaCheckCircle className="text-rose-800 text-xl" />
                  )}
                </div>
                <p>{address.full_address.split(',').slice(1).join(', ')}</p>
                <p>{`${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}</p>
                <p>Address Type: {address.address_type}</p>
              </div>
              <div className="flex space-x-2">
                <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                <FaTimes className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingAddressList;