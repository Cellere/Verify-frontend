"use server";

import axios, { AxiosError } from 'axios';

export const ConsultaSimplesJuridica = async (cnpj: string) => {
    const token = process.env.TOKEN;
    try {
        const response = await axios.post(
            'https://api.gw.cellereit.com.br/bg-check/cnpj-simples',
            { cnpj },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Consulta Simples API Error:", error.response?.data);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("Erro ao buscar dados da consulta simples.");
    }
};
