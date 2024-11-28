import axios, { AxiosError } from 'axios';

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (props: LoginProps) => {

  try {
    const response = await axios.post(`https://gdo.dev.cellereit.com.br/verify-challenge/auth/login`, 
      props)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error logging in user:', error);
      throw new Error(error.response?.data?.message || 'Ocorreu um erro ao realizar o login. Tente novamente.');
    } else {
      throw new Error('Ocorreu um erro ao realizar o login. Tente novamente.');
    }
};
}