import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate('/m/cart');
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <button
        onClick={handleReturnToCart}
        className="bg-restro-green text-white py-2 px-4 rounded-lg"
      >
        Return to Cart
      </button>
    </div>
  );
};

export default OrderSuccessPage;
