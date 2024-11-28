import { QueryType } from '@/types/payments';
import axios from 'axios';

interface UploadPdfProps {
  pdf: File;
  paymentId: number;
  queryType: QueryType;
}

export const UploadPdf = async (props: UploadPdfProps) => {
  const { pdf, paymentId, queryType } = props;
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found in local storage');
  }

  try {
    const formData = new FormData();
    formData.append('pdf', pdf); 
    formData.append('paymentId', paymentId.toString());
    formData.append('queryType', queryType);

    const response = await axios.post(
      // 'http://localhost:3000/payments/upload-pdf',
       `https://gdo.dev.cellereit.com.br/verify-challenge/payments/upload-pdf`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('formData', formData);
    console.log('Response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return null;
  }
};
