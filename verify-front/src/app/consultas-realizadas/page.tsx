"use client";

import LayoutDashboard from "@/components/layout-component/LayoutDashboard/LayoutDashboard";
import { getPayments } from "@/lib/payment/getPayments";
import { PaymentQuery } from "@/types/payments";
import { formatDate } from "@/utils/formatDate";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { formatToBRL } from "@/helpers/formatToBRL";
import { TextInput, DatePicker } from "@tremor/react";
import Spinner from "../assets/Spinner";

export default function ConsultasRealizadas() {
    const [dataPayments, setDataPayments] = useState<PaymentQuery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const today = new Date();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getPayments();
            setDataPayments(data || []);
            setLoading(false);
        };
        getData();
    }, []);

    const handleDownloadPdf = (pdfUrl: string) => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfUrl.split("/").pop() || "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const baseUrl = "https://gdo.dev.cellereit.com.br/verify-challenge"

    if (!baseUrl) {
        throw new Error("baseUrl is missing from environment variables.");
    }


    const filteredPayments = dataPayments.filter((payment) => {
        const queryLower = searchQuery.toLowerCase();
        const paymentDate = new Date(payment.createdAt);

        const matchesQuery =
            payment.queryName?.toLowerCase().includes(queryLower) ||
            payment.queryCpfOrCpnj.toLowerCase().includes(queryLower) ||
            payment.user.name.toLowerCase().includes(queryLower) ||
            payment.user.email.toLowerCase().includes(queryLower);

        const withinDateRange =
            (!startDate || paymentDate >= startDate) &&
            (!endDate || paymentDate <= endDate);

        return matchesQuery && withinDateRange;
    });

    return (
        <LayoutDashboard>
            <div className="flex flex-col items-center justify-center mb-8 w-full">
                <h1 className="text-3xl font-bold text-primary-500 mb-8 text-center">
                    Consultas Realizadas
                </h1>

                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
                    <TextInput
                        type="text"
                        placeholder="Pesquisar por nome, CPF/CNPJ, e-mail..."
                        className="w-full p-1 md:w-1/2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <DatePicker
                            value={startDate}
                            onValueChange={setStartDate}
                            className="w-full md:w-1/2 z-50"
                            placeholder="Data inicial"
                            maxDate={today}
                        />
                        <DatePicker
                            value={endDate}
                            onValueChange={setEndDate}
                            className="w-full md:w-1/2 z-40"
                            placeholder="Data final"
                            maxDate={today}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="space-y-4 w-full max-w-4xl mx-auto">
                    {filteredPayments.length === 0 ? (
                        <p className="text-center text-xl font-bold text-gray-600">
                            Nenhuma consulta realizada.
                        </p>
                    ) : (
                        filteredPayments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-all transform hover:shadow-lg gap-5"
                            >
                                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                                    <div className="text-lg font-semibold text-gray-700">
                                        <p>Consulta #{payment.id}</p>
                                    </div>
                                    <div className="text-gray-600">
                                        {payment.queryName && (
                                            <p>
                                                {payment.natural === "Pessoa Jurídica" ? (
                                                    <strong>Nome da Empresa:</strong>
                                                ) : (
                                                    <strong>Nome:</strong>
                                                )}{" "}
                                                {payment.queryName}
                                            </p>
                                        )}
                                        <p>
                                            {payment.natural === "Pessoa Jurídica" ? (
                                                <strong>CNPJ:</strong>
                                            ) : (
                                                <strong>CPF:</strong>
                                            )}{" "}
                                            {payment.queryCpfOrCpnj}
                                        </p>
                                        <p>
                                            <strong>Tipo de Consulta:</strong> {payment.queryType}
                                        </p>
                                        <p>
                                            <strong>Tipo de Pessoa:</strong> {payment.natural}
                                        </p>
                                        <p>
                                            <strong>Valor:</strong> {formatToBRL(payment.amount)}
                                        </p>
                                        <p>
                                            <strong>Data:</strong> {formatDate(payment.createdAt)}
                                        </p>
                                        <p>
                                            <strong>Usuário:</strong> {payment.user.name} (
                                            {payment.user.email})
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0 flex gap-4">
                                    <button
                                        className="flex items-center gap-2 cursor-pointer text-blue-600 font-medium hover:text-blue-800"
                                        onClick={() => handleDownloadPdf(`${baseUrl}${payment.pdfUrl}`)}
                                        disabled={!payment.pdfUrl}
                                    >
                                        <Eye size={20} />
                                        Visualizar PDF
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </LayoutDashboard>
    );
}
