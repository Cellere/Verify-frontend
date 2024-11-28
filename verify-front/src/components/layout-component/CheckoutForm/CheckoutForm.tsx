import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@tremor/react";
import { UploadPdf } from "@/lib/pdf/uploadPdfFile";
import jsPDF from "jspdf";
import { formatToBRL } from "@/helpers/formatToBRL";
import { QueryType } from "@/types/payments";
import { CreatePayment } from "@/lib/payment/createPayment";
import { LicenciamentoCE } from "@/lib/automotiva/CE/Licenciamento/Licenciamento";
import { VeiculoCE } from "@/lib/automotiva/CE/Veiculo/Veiculo";
import { VeiculoDF } from "@/lib/automotiva/DF/Veiculo/Veiculo";
import { VeiculoES } from "@/lib/automotiva/ES/Veiculo/Veiculo";
import { GravameGo } from "@/lib/automotiva/GO/gravame";
import { NadaConstaRJ } from "@/lib/automotiva/RJ/NadaConsta/NadaConsta";
import { VeiculoRJ } from "@/lib/automotiva/RJ/Veiculo/Veiculo";
import Spinner from "@/app/assets/Spinner";
import { sanitizeInput } from "@/utils/sanitazeInput";
import { ConsultaSimplesJuridica } from "@/lib/simples/consultaSimplesJuridica";
import { ConsultaSimplesFisica } from "@/lib/simples/consultaSimplesFisica";
import { ConsultaIntermediariaFisica } from "@/lib/intermediaria/consultaIntermediariaFisica";
import { ConsultaAvancadaFisica } from "@/lib/avancada/consultaAvancadaFisica";
import { ConsultaAvancadaJuridica } from "@/lib/avancada/consultaAvancadaJuridica";
import { ConsultaAvancadaFisicaProcessos } from "@/lib/avancada/consultaAvancadaFisicaProcessos";
import { ConsultaAvancadaJuridicaProcessos } from "@/lib/avancada/consultaAvancadaJuridicaProcessos";

interface CheckoutFormProps {
    amount: number;
    queryCpfOrCpnj: string;
    queryName: string;
    queryType: QueryType;
    natural: string;
    selectValue?: string;
    placa?: string;
    renavam?: string;
    cpf: string;
    cnpj: string;
    onSuccess: () => void;
}

const CheckoutForm = ({
    amount,
    queryCpfOrCpnj,
    queryName,
    queryType,
    natural,
    selectValue,
    placa,
    renavam,
    cpf,
    cnpj,
    onSuccess,
}: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe.js has not been loaded yet.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Cartão não encontrado");
            setLoading(false);
            return;
        }

        const paymentData = { amount, queryCpfOrCpnj, queryName, queryType, natural };

        try {
            const { clientSecret, paymentId } = await CreatePayment(paymentData);

            if (!clientSecret) {
                throw new Error("Failed to create payment intent.");
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (error) {
                handleError(error.message || "Payment failed.");
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                onSuccess();
                await handleSuccessfulPayment(paymentId);
            } else {
                handleError("Erro ao efetuar pagamento.");
            }
        } catch (error) {
            handleError("Erro ao efetuar pagamento.");
            console.log("ERROR payment", error)
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessfulPayment = async (paymentId: number) => {
        try {
            const responseData = await handleQueryByType();
            const pdfFile = generateDataAndPdf(queryType, { responseData }, natural);
            await UploadPdf({ pdf: pdfFile, paymentId, queryType });
        } catch (error) {
            console.log("Falha ao enviar PDF", error)
            handleError("Falha ao enviar PDF");
        }
    };

    const handleQueryByType = async (): Promise<any> => {
        let responseData;
        const personIdentifier = cpf ? sanitizeInput(cpf) : sanitizeInput(cnpj);

        if (queryType === QueryType.Automotiva) {
            responseData = await handleAutomotiveQuery(personIdentifier);
        } else if (queryType === QueryType.Simples) {
            responseData = await handleSimpleQuery(personIdentifier);
        } else if (queryType === QueryType.Intermediaria) {
            responseData = await handleIntermediariaQuery(personIdentifier)
        } else if (queryType === QueryType.Avancada) {
            responseData = await handleAvancadaQuery(personIdentifier)
        }
        else {
            throw new Error("Unsupported query type.");
        }

        return responseData;
    };

    const handleAutomotiveQuery = async (personIdentifier: string): Promise<any> => {
        const stateHandlers: Record<string, Function> = {
            CE: async () => {
                if (!placa || !renavam) throw new Error("Placa and Renavam are required for CE.");
                return {
                    licenciamento: await LicenciamentoCE({ placa, renavam }),
                    veiculo: await VeiculoCE({ placa, renavam }),
                };
            },
            DF: async () => {
                if (!placa) throw new Error("Placa is required for DF.");
                return { veiculo: await VeiculoDF({ placa }) };
            },
            ES: async () => {
                if (!placa) throw new Error("Placa is required for ES.");
                return { veiculo: await VeiculoES({ placa }) };
            },
            GO: async () => {
                if (!placa) throw new Error("Placa is required for GO.");
                return { gravame: await GravameGo({ placa }) };
            },
            RJ: async () => {
                if (!placa || !renavam) throw new Error("Placa and Renavam are required for RJ.");
                return {
                    nadaConsta: await NadaConstaRJ({ placa, renavam, personIdentifier }),
                    veiculo: await VeiculoRJ({ placa }),
                };
            },
        };

        if (!selectValue) {
            throw new Error("No state selected.");
        }

        const selectedStateHandler = stateHandlers[selectValue];
        if (!selectedStateHandler) {
            throw new Error(`State ${selectValue} is not supported.`);
        }

        return selectedStateHandler();
    };

    const handleIntermediariaQuery = async (personIdentifier: string): Promise<any> => {
        if (natural === "Pessoa Física") {
            return { ConsultaIntermediaria: await ConsultaIntermediariaFisica(personIdentifier) };
        } else {
            throw new Error("Invalid natural type.");
        }
    };


    const handleSimpleQuery = async (personIdentifier: string): Promise<any> => {
        if (natural === "Pessoa Física") {
            return { consultaSimples: await ConsultaSimplesFisica(personIdentifier) };
        } else if (natural === "Pessoa Jurídica") {
            return { consultaSimples: await ConsultaSimplesJuridica(personIdentifier) };
        } else {
            throw new Error("Invalid natural type.");
        }
    };
    const handleAvancadaQuery = async (personIdentifier: string): Promise<any> => {
        if (natural === "Pessoa Física") {
            return {
                consultaSimples: await ConsultaAvancadaFisica(personIdentifier),
                consultaProcessos: await ConsultaAvancadaFisicaProcessos(personIdentifier)
            };
        } else if (natural === "Pessoa Jurídica") {
            return {
                consultaSimples: await ConsultaAvancadaJuridica(personIdentifier),
                consultaProcessos: await ConsultaAvancadaJuridicaProcessos(personIdentifier)
            };
        } else {
            throw new Error("Invalid natural type.");
        }
    };

    const handleError = (message: string) => {
        console.error(message);
        setErrorMessage(message);
        setLoading(false);
    };


    const generateDataAndPdf = (queryType: string, jsonData: any, natural: string) => {
        const isPessoaFisica = natural === "Pessoa Física";

        const translations: Record<string, string> = {
            CPF: "CPF",
            DataNascimento: "Data de Nascimento",
            Emails: "Emails",
            Telefones: "Telefones",
            Enderecos: "Endereços",
            UF: "UF",
            CEP: "CEP",
            Bairro: "Bairro",
            Cidade: "Cidade",
            Numero: "Número",
            Logradouro: "Logradouro",
            Complemento: "Complemento",
            Idade: "Idade",
            Nome: "Nome",
            NomeMae: "Nome da Mãe",
            RG: "RG",
            RgUf: "UF do RG",
            Sexo: "Sexo",
            Signo: "Signo",
            SituacaoReceitaBancoDados: "Situação na Receita",
            UltimaAtualizacaoRf: "Última Atualização Receita Federal",
            ReceitaFederalCpf: "CPF Receita Federal",
            ConstaObito: "Consta Óbito",
            DataEmissao: "Data de Emissão",
            DataInscricaoAnterior1990: "Inscrição Anterior a 1990",
            Origem: "Origem",
            SituacaoCadastral: "Situação Cadastral",
            NumeroCpf: "Número do CPF",
            NomePessoaFisica: "Nome da Pessoa Física",
            EnderecoEmail: "Endereço do Email",
            TelefoneComDDD: "Telefone com DDD",
            Matriz: "Matriz",
            DataAbertura: "Data de Abertura",
            NomeEmpresarial: "Nome Empresarial",
            NomeFantasia: "Nome Fantasia",
            AtividadeEconomicaPrincipal: "Atividade Econômica Principal",
            NaturezaJuridica: "Natureza Jurídica",
            SituacaoEspecial: "Situação Especial",
            DataSituacaoCadastral: "Data Situação Cadastral",
            DataConsulta: "Data de Consulta",
            NumeroInscricao: "Número de Inscrição",
            CapitalSocial: "Capital Social",
            Qualificacao: "Qualificação",
            Porte: "Porte",
            Telefone: "Telefone",
            BairroDistrito: "Bairro/Distrito",
            Municipio: "Município",
            CapitalSocialNorm: "Capital Social Normalizado",
            TaxIdStatus: "Situação do CPF",
            TaxIdOrigin: "Origem do CPF",
            HasObitIndication: "Indicação de Óbito",
            BaseStatus: "Status da Empresa",
            Cnae: "CNAE",
            MainEconomicActivity: "Atividade Econômica Principal",
            MotivoSituacaoCadastral: "Motivo da Situação Cadastral",
            EnderecoEletronico: "Endereço Eletrônico",
            NomeNomeEmpresarial: "Nome do Sócio",
            QualificacaoRepLegal: "Qualificação do Representante Legal"
        };

        const processJsonForPdf = (doc: any, data: any, x: number, y: number, indent: number = 0) => {
            const step = 8;
            const pageWidth = 190 - x;

            const flattenData = (data: any) => {
                const result: Record<string, any> = {};
                for (const [key, value] of Object.entries(data)) {
                    if (!isNaN(Number(key))) continue;

                    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                        const flatObject = flattenData(value);
                        Object.assign(result, flatObject);
                    } else if (Array.isArray(value)) {
                        value.forEach((arrayItem: any, index: number) => {
                            if (key === "Socios") {
                                result[`Sócio ${index + 1} - Nome Empresarial`] = arrayItem.NomeNomeEmpresarial;
                                result[`Sócio ${index + 1} - Qualificação`] = arrayItem.Qualificacao;
                                result[`Sócio ${index + 1} - Qualificação Representante Legal`] = arrayItem.QualificacaoRepLegal || 'Não Informada';
                            } else if (key === "Processos") {
                                result[`Processo ${index + 1} - Número`] = arrayItem.Numero;
                                result[`Processo ${index + 1} - Tipo`] = arrayItem.Tipo;
                                result[`Processo ${index + 1} - Assunto`] = arrayItem.Assunto;
                                result[`Processo ${index + 1} - Tribunal Nome`] = arrayItem.TribunalNome;
                                result[`Processo ${index + 1} - Situação`] = arrayItem.Situacao;
                                arrayItem.Partes.forEach((parte: any, parteIndex: number) => {
                                    result[`Processo ${index + 1} - Parte ${parteIndex + 1} - Nome`] = parte.Nome;
                                    result[`Processo ${index + 1} - Parte ${parteIndex + 1} - Tipo`] = parte.Tipo;
                                    result[`Processo ${index + 1} - Parte ${parteIndex + 1} - Polaridade`] = parte.Polaridade;
                                });
                            } else {
                                const flatObject = flattenData(arrayItem);
                                Object.assign(result, flatObject);
                            }
                        });
                    } else {
                        result[key] = value;
                    }
                }
                return result;
            };

            const flattenedData = flattenData(data);

            Object.entries(flattenedData).forEach(([key, value]) => {
                if (value === null || value === undefined || value === '' || value === 0 || key === 'Situação Cadastral') return;

                key = translations[key] || key.replace(/_/g, ' ');

                if (typeof value === "boolean") value = value ? "Verdadeiro" : "Falso";

                const text = `${" ".repeat(indent)}${key}: ${value}`;
                const lines = doc.splitTextToSize(text, pageWidth);

                lines.forEach((line: string) => {
                    doc.setFont("helvetica", "normal");
                    doc.text(line, x, y);
                    y += step;

                    if (y > 270) {
                        doc.addPage();
                        y = 20;
                    }
                });
            });

            return y;
        };

        const doc = new jsPDF();
        const titleX = 105;
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Verify - Resultado da consulta", titleX, 15, { align: "center" });

        doc.setLineWidth(0.5);
        doc.line(20, 20, 190, 20);

        let startY = 30;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        const identifierLabel = isPessoaFisica ? "CPF" : "CNPJ";
        const identifierValue = isPessoaFisica ? cpf : cnpj;

        doc.text(`${identifierLabel}: ${identifierValue}`, 20, startY);

        startY += 10;

        doc.text(`Tipo de Consulta: ${queryType}`, 20, startY);

        startY += 10;

        doc.text(`Consulta para: ${isPessoaFisica ? "Pessoa Física" : "Pessoa Jurídica"}`, 20, startY);

        startY += 10;
        doc.setLineWidth(0.3);
        doc.line(20, startY, 190, startY);

        startY += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Dados da Resposta:", 20, startY);

        startY += 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Situação do ${identifierLabel}: REGULAR`, 20, startY);
        startY += 10;
        doc.text(`Origem do ${identifierLabel}: RECEITA FEDERAL`, 20, startY);
        startY += 10;

        startY = processJsonForPdf(doc, jsonData, 20, startY);



        if (jsonData.Qsa && jsonData.Qsa.Socios) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Sócios:", 20, startY);
            startY += 10;

            jsonData.Qsa.Socios.forEach((socio: any) => {
                startY = processJsonForPdf(doc, socio, 20, startY, 2);
            });
        }

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("Documento gerado automaticamente por Verify", titleX, 280, { align: "center" });

        const pdfBlob = doc.output("blob");
        const fileName = isPessoaFisica ? "PessoaFisica.pdf" : "PessoaJuridica.pdf";
        const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

        return pdfFile;
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Complete seu pagamento</h2>
                <p className="text-gray-500">Pagamento seguro com a Stripe.</p>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="card-element">
                    Informação do cartão
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                    <CardElement
                        id="card-element"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                    "::placeholder": {
                                        color: "#a0aec0",
                                    },
                                },
                                invalid: {
                                    color: "#fa755a",
                                    iconColor: "#fa755a",
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

            <Button
                type="submit"
                disabled={!stripe || !elements || loading}
                className={`w-full mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Spinner /> Processando...
                    </div>
                ) : (
                    `Pagar ${formatToBRL(amount)}`
                )}
            </Button>

        </form>
    );
};

export default CheckoutForm;
