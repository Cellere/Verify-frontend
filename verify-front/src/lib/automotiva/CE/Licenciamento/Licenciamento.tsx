"use server"

import axios, { AxiosError } from 'axios';


export const LicenciamentoCE = async (props: { placa: string; renavam: string }) => {
    const token = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    try {
        const response = await axios.get('https://api.gw.cellereit.com.br/consultas/detran/ce/licenciamento',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }, params: {
                    ...props
                }
            })
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error get licenciamento CE:', error.response?.data?.message);
        } else {
            throw new Error('Erro ao buscar licenciamento CE');
        }
    };
}