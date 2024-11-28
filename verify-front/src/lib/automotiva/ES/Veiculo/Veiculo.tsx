"use server"

import axios, { AxiosError } from 'axios';


export const VeiculoES = async (props: { placa: string; }) => {
    const token = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY

    try {
        const response = await axios.get('https://api.gw.cellereit.com.br/consultas/detran/es/veiculo', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }, params: {
                ...props
            }
        })
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error get veiculo ES:', error.response?.data?.message);
        } else {
            throw new Error('Erro ao buscar veiculo ES');
        }
    };
}