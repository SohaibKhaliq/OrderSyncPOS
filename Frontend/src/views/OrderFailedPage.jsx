import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderFailedPage = () => {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate('/m/cart');
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Payment Failed!</h1>
      <button
        onClick={handleReturnToCart}
        className="bg-red-500 text-white py-2 px-4 rounded-lg"
      >
        Return to Cart
      </button>
    </div>
  );
};

export default OrderFailedPage;
