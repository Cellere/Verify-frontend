"use server"

import axios, { AxiosError } from 'axios';


export const VeiculoRJ = async (props: { placa: string; }) => {
    const token = process.env.TOKEN

    try {
        const response = await axios.get('https://api.gw.cellereit.com.br/consultas/detran/rj/veiculo', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }, params: {
                placa: props.placa,
            }
        })
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error get veiculo RJ:', error.response?.data?.message);
        } else {
            throw new Error('Erro ao buscar veiculo RJ');
        }
    };
}