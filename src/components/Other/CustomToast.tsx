// src/components/CustomToast.tsx
import React from 'react';
import toast from 'react-hot-toast';
import { CheckCircle } from '@phosphor-icons/react'; 

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <CheckCircle size={24} color="#fff" style={{ marginRight: '10px' }} /> */}
      <span>{message}</span>
    </div>
  );
};


export const showCustomToast = (message: string) => {
  toast.dismiss(); 
  toast.success(<CustomToast message={message} />, {
    duration: 2000,
    position: 'top-center',
    style: {
      background: '#e26178',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '10px 15px',
    },
    iconTheme: {
      primary: '#FBBF24', 
      secondary: '#fff',  
    },
  });
};
