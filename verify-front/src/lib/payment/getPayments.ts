import axios from 'axios';

export const getPayments = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in local storage');
    }
      
    const response = await axios.get(
      // 'http://localhost:3000/payments/create-payment-intent',
      `https://gdo.dev.cellereit.com.br/verify-challenge/payments/queries`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log('Response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching payments', error);
    return null;
  }
};
