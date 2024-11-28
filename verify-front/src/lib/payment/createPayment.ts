import { QueryType } from '@/types/payments';
import axios from 'axios';

interface CreatePaymentProps {
    queryType: QueryType;
    amount: number;
    queryName?: string;
    queryCpfOrCpnj: string;
    natural: string;
    pdfPath?: string;
}

export const CreatePayment = async (props: CreatePaymentProps) => {
  if (typeof window === 'undefined') {
    throw new Error('LocalStorage is not available in server-side execution.');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in local storage');
  }

  // const apiURL = process.env.CELLERE_API;
  // if (!apiURL) {
  //   console.error('API URL not defined');
  // }
  try {
    const response = await axios.post(
      `https://gdo.dev.cellereit.com.br/verify-challenge/payments/create-payment-intent`,
      props,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Response', response.data);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};
