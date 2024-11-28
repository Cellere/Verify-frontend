"use server";

import axios, { AxiosError } from 'axios';

export const ConsultaSimplesFisica = async (cpf: string) => {
    const token = process.env.TOKEN;
    try {
        const response = await axios.post(
            'https://api.gw.cellereit.com.br/bg-check/cpf-simples',
            { cpf },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log("URL", response.config.url);
        console.log("responseData", response.data);
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
