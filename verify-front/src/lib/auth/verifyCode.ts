import axios, { AxiosError } from 'axios';

interface LoginProps {
  email: string;
  code: string;
}

export const VerifyCodeAuth = async (props: LoginProps) => {

  try {
    const response = await axios.post(`https://gdo.dev.cellereit.com.br/verify-challenge/auth/verify`, 
      props)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error logging in user:', error.response?.data?.message);
      throw new Error(error.response?.data?.message || 'Ocorreu um erro ao realizar o login. Tente novamente.');
    } else {
      throw new Error('An unexpected error occurred');
    }
};
}