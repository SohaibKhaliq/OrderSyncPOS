import axios from 'axios';

export const createCheckoutSession = async (cartItems, customer, customerType, tableId, qrcode) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/payment/create-checkout-session', {
      cartItems,
      customer,
      customerType,
      tableId,
      qrcode,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
