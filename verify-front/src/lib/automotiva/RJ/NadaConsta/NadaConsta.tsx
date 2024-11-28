"use server";

import axios, { AxiosError } from 'axios';

export const NadaConstaRJ = async (props: { placa: string; renavam: string; personIdentifier: string; }) => {
    const token = process.env.TOKEN;

    try {
        const response = await axios.get('https://api.gw.cellereit.com.br/consultas/detran/rj/nada-consta', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                ...props
            }
        });

        return response.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error fetching Nada Consta RJ:', error.response?.data?.message || error.message);
        } else {
            throw new Error('Erro ao buscar nada consta RJ');
        }
    }
};
