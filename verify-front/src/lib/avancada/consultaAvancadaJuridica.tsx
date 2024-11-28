"use server";

import axios, { AxiosError } from 'axios';

export const ConsultaAvancadaJuridica = async (cnpj: string) => {
    const token = process.env.TOKEN;

    if (!token) {
        throw new Error("Token is missing from environment variables.");
    }

    try {
        const response = await axios.get(
            'https://api.gw.cellereit.com.br/bg-check/cnpj-completo',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    cnpj,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Consulta Avançada API Error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("Erro ao buscar dados da consulta avançada.");
    }
};
