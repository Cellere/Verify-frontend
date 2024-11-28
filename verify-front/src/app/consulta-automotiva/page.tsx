"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LayoutDashboard from "@/components/layout-component/LayoutDashboard/LayoutDashboard";
import SectionDashboard from "@/components/layout-component/SectionDashboard/SectionDashboard";
import TitleDashboard from "@/components/layout-component/TitleDashboard/TitleDashboard";
import { TextInput, Button, SelectItem, Select } from "@tremor/react";
import CpfInput from "@/components/input-components/CpfInput/CpfInput";
import CheckoutForm from "@/components/layout-component/CheckoutForm/CheckoutForm";
import { showToast } from "@/helpers/showToast";
import CnpjInput from "@/components/input-components/CnpjInput/CnpjInput";
import { QueryType } from "@/types/payments";
import { sanitizeInput } from "@/utils/sanitazeInput";
import { consultaAutomotivaPrice } from "@/utils/prices";
import PaymentComplete from "@/blocks/paymentComplete";
import { RadioInput } from "@/components/input-components/RadioInput/RadioInput";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Stripe public key is missing from environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const pfSchema = z.object({
    renavam: z.string().min(1, "Nome é obrigatório"),
    placa: z.string().min(1, "Placa é obrigatória"),
    cpf: z
        .string()
        .min(14, "CPF deve conter 11 dígitos")
        .refine((cpf) => sanitizeInput(cpf).length === 11, {
            message: "CPF inválido",
        }),
});

const pjSchema = z.object({
    renavam: z.string().min(1, "Nome é obrigatório"),
    placa: z.string().min(1, "Placa é obrigatória"),
    cnpj: z
        .string()
        .min(18, "CNPJ deve conter 14 dígitos")
        .refine((cnpj) => sanitizeInput(cnpj).length === 14, {
            message: "CNPJ inválido",
        }),
});



export default function ConsultaAutomotiva() {
    const [isPessoaFisica, setIsPessoaFisica] = useState(true);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [amount] = useState(consultaAutomotivaPrice);
    const [selectedState, setSelectedState] = useState("");

    const schema = isPessoaFisica ? pfSchema : pjSchema;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        const subscription = watch(() => {
            trigger();
        });

        return () => subscription.unsubscribe();
    }, [isValid, watch, trigger]);

    const onSubmit = (data: any) => {
        if (!isValid) return;
        showToast("success", "Dados validados com sucesso. Siga com pagamento para prosseguir com a consulta");
        setShowPaymentForm(true);
    };


    const handlePaymentSuccess = () => {
        setPaymentCompleted(true);
        setShowPaymentForm(false);
        showToast("success", "Pagamento concluído com sucesso. Gerando PDF...");
    };

    const handlePersonTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === "pessoaFisica";
        setIsPessoaFisica(value);
        setValue("cpf", "");
        setValue("cnpj", "");
        setValue("renavam", "");
        setValue("placa", "");
    };

    const handleSelectChange = (value: string) => {
        setSelectedState(value);
    };

    const cpfValue = watch("cpf", "");
    const cnpjValue = watch("cnpj", "");
    const renavamValue = watch("renavam", "");
    const placaValue = watch("placa", "");
    const companyNameValue = watch("companyName", "");
    const nameValue = watch("name", "");

    const statesConsulta = ["CE", "DF", "ES", "GO", "RJ"];

    return (
        <LayoutDashboard>
            <div className="max-w-2xl mx-auto space-y-8 py-8 px-6 bg-white shadow-lg rounded-lg">
                <TitleDashboard title="Consulta Automotiva" />
                <SectionDashboard consultationType="Consulta Automotiva" price={consultaAutomotivaPrice} />
                <div className="flex items-center justify-center space-x-6 mb-6">
                    <div>
                        <RadioInput
                            value="pessoaFisica" id="pessoaFisica"
                            checked={isPessoaFisica}
                            onChange={handlePersonTypeChange} disabled={showPaymentForm} />

                        <label htmlFor="pessoaFisica" className={isPessoaFisica ? "font-bold text-primary-500" : ""}>
                            Pessoa Física
                        </label>
                    </div>
                    <div>
                        <RadioInput
                            value="pessoaJuridica" id="pessoaJuridica"
                            checked={!isPessoaFisica}
                            onChange={handlePersonTypeChange} disabled={showPaymentForm} />

                        <label htmlFor="pessoaFisica" className={isPessoaFisica ? "font-bold text-primary-500" : ""}>
                            Pessoa Jurídica
                        </label>
                    </div>
                </div>

                {!paymentCompleted ? (
                    <section className="space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col space-y-4">
                            <div className="w-full max-w-md">
                                <Select
                                    placeholder="Escolha o estado para consulta"
                                    onValueChange={(value: string) => handleSelectChange(String(value))}
                                    value={selectedState}
                                    disabled={showPaymentForm}
                                >
                                    {statesConsulta.map((item) => (
                                        <SelectItem
                                            value={item}
                                            key={item}
                                            className="py-2 px-3 hover:bg-primary-100 focus:bg-primary-100 transition-colors duration-150"
                                        >
                                            {item}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            {isPessoaFisica ? (
                                <>
                                    <div className="w-full max-w-md">
                                        <CpfInput
                                            register={register}
                                            name="cpf"
                                            value={cpfValue}
                                            setValue={setValue}
                                            disabled={showPaymentForm}
                                            error={errors.placa ? true : false}
                                        />
                                        {errors.cpf?.message && (
                                            <span className="text-red-600 text-sm">
                                                {errors.cpf.message as string}
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            {...register("renavam")}
                                            placeholder="RENAVAM"
                                            error={errors.renavam ? true : false}
                                            disabled={showPaymentForm}

                                        />
                                        {errors.renavam?.message && (
                                            <span className="text-red-600 text-sm">{errors.renavam.message as string}</span>
                                        )}
                                    </div>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            {...register("placa")}
                                            placeholder="Placa"
                                            error={errors.placa ? true : false}
                                            disabled={showPaymentForm}

                                        />
                                        {errors.placa?.message && (
                                            <span className="text-red-600 text-sm">{errors.placa.message as string}</span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-full max-w-md">
                                        <CnpjInput
                                            register={register}
                                            name="cnpj"
                                            value={cnpjValue}
                                            setValue={setValue}
                                            disabled={showPaymentForm}
                                            error={errors.cnpj ? true : false}
                                        />
                                        {errors.cnpj?.message && (
                                            <span className="text-red-600 text-sm">
                                                {errors.cnpj.message as string}
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            {...register("renavam")}
                                            placeholder="RENAVAM"
                                            error={errors.renavam ? true : false}
                                            disabled={showPaymentForm}
                                        />
                                        {errors.renavam?.message && (
                                            <span className="text-red-600 text-sm">{errors.renavam.message as string}</span>
                                        )}
                                    </div>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            {...register("placa")}
                                            placeholder="Placa"
                                            error={errors.placa ? true : false}
                                            disabled={showPaymentForm}
                                        />
                                        {errors.placa?.message && (
                                            <span className="text-red-600 text-sm">{errors.placa.message as string}</span>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="text-center">
                                <Button type="submit" size="lg" disabled={showPaymentForm}>
                                    Consultar
                                </Button>
                            </div>
                        </form>
                        {showPaymentForm && (
                            <div className="w-full max-w-2xl mx-auto my-6">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        amount={amount}
                                        queryCpfOrCpnj={isPessoaFisica ? cpfValue : cnpjValue}
                                        natural={isPessoaFisica ? "Pessoa Física" : "Pessoa Jurídica"}
                                        queryType={QueryType.Automotiva}
                                        placa={placaValue}
                                        renavam={renavamValue}
                                        cpf={cpfValue}
                                        cnpj={cnpjValue}
                                        selectValue={selectedState}
                                        queryName={isPessoaFisica ? companyNameValue : nameValue}
                                        onSuccess={handlePaymentSuccess}
                                    />
                                </Elements>
                            </div>
                        )}
                    </section>
                ) : (
                    <PaymentComplete />
                )}
            </div>
        </LayoutDashboard>
    );
}
