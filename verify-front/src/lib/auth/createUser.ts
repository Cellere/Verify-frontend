import axios, { AxiosError } from 'axios';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (props: CreateUserProps) => {
  try {
    const response = await axios.post(
      // 'http://localhost:3000/auth/register',
      `https://gdo.dev.cellereit.com.br/verify-challenge/auth/register`,
      props
    );
    console.log('Response', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error logging in user:', error.response?.data?.message);
      throw new Error(error.response?.data?.message || 'Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    } else {
      throw new Error('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
  }
};
