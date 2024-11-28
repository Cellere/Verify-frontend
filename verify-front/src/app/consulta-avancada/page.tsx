"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LayoutDashboard from "@/components/layout-component/LayoutDashboard/LayoutDashboard";
import SectionDashboard from "@/components/layout-component/SectionDashboard/SectionDashboard";
import TitleDashboard from "@/components/layout-component/TitleDashboard/TitleDashboard";
import { TextInput, Button, Dialog } from "@tremor/react";
import CpfInput from "@/components/input-components/CpfInput/CpfInput";
import CheckoutForm from "@/components/layout-component/CheckoutForm/CheckoutForm";
import { showToast } from "@/helpers/showToast";
import CnpjInput from "@/components/input-components/CnpjInput/CnpjInput";
import { QueryType } from "@/types/payments";
import { useRouter } from "next/navigation";
import { consultaAvancadaPrice } from "@/utils/prices";
import PaymentComplete from "@/blocks/paymentComplete";
import ConsultaAvancadaDialog from "@/components/dialog/ConsultaAvancadaDialog/ConsultaAvancadaDialog";
import { RadioInput } from "@/components/input-components/RadioInput/RadioInput";
import { OpenDialogButton } from "@/components/button/OpenDialogButton/OpenDialogButton";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Stripe public key is missing from environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const sanitizeInput = (input: string) => input.replace(/[^\d]/g, "");

const pfSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    cpf: z
        .string()
        .min(14, "CPF deve conter 11 dígitos")
        .refine((cpf) => sanitizeInput(cpf).length === 11, {
            message: "CPF inválido",
        }),
});

const pjSchema = z.object({
    companyName: z.string(),
    cnpj: z
        .string()
        .min(18, "CNPJ deve conter 14 dígitos")
        .refine((cnpj) => sanitizeInput(cnpj).length === 14, {
            message: "CNPJ inválido",
        }),
});

export default function ConsultaAvancada() {
    const [isPessoaFisica, setIsPessoaFisica] = useState(true);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [amount] = useState(consultaAvancadaPrice);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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

    const cpfValue = watch("cpf", "");
    const cnpjValue = watch("cnpj", "");
    const companyNameValue = watch("companyName", "");
    const nameValue = watch("name", "");

    useEffect(() => {
        const subscription = watch(() => {
            trigger();
        });

        return () => subscription.unsubscribe();
    }, [isValid, watch, trigger]);

    const onSubmit = () => {
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
        setValue("name", "");
        setValue("cpf", "");
        setValue("companyName", "");
        setValue("cnpj", "");
    };

    return (
        <LayoutDashboard>
            <div className="max-w-2xl mx-auto space-y-8 py-8 px-6 bg-white shadow-lg rounded-lg">
                <TitleDashboard title="Consultas Avançada" />
                <SectionDashboard consultationType="Consulta Avançada" price={consultaAvancadaPrice} />
                <div className="flex items-center justify-center">
                    <OpenDialogButton handleClickOpen={handleClickOpen} queryType={"Consulta Avançada"} />
                </div>
                {open && (
                    <ConsultaAvancadaDialog setOpen={setOpen} handleClose={handleClose} open={open} />
                )}
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
                            {isPessoaFisica ? (
                                <>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            placeholder="Informe seu nome"
                                            {...register("name")}
                                            className="w-full"
                                            disabled={showPaymentForm}
                                            error={errors.name ? true : false}

                                        />
                                        {errors.name && (
                                            <span className="text-red-600 text-sm">
                                                {errors.name.message as string}
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-full max-w-md">
                                        <CpfInput
                                            register={register}
                                            name="cpf"
                                            value={cpfValue}
                                            setValue={setValue}
                                            disabled={showPaymentForm}
                                            error={errors.cpf ? true : false}

                                        />
                                        {errors.cpf?.message && (
                                            <span className="text-red-600 text-sm">
                                                {errors.cpf.message as string}
                                            </span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            placeholder="Informe o nome da empresa"
                                            {...register("companyName")}
                                            className="w-full"
                                            disabled={showPaymentForm}
                                            error={errors.companyName ? true : false}

                                        />
                                        {errors.companyName && (
                                            <span className="text-red-600 text-sm">
                                                {errors.companyName.message as string}
                                            </span>
                                        )}
                                    </div>

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
                                </>
                            )}

                            <div className="text-center">
                                <Button type="submit" size="lg" disabled={showPaymentForm}>
                                    Consultar
                                </Button>
                            </div>
                        </form>

                        {showPaymentForm && (
                            <div className="mt-8">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        amount={amount}
                                        queryCpfOrCpnj={isPessoaFisica ? cpfValue : cnpjValue}
                                        natural={isPessoaFisica ? "Pessoa Física" : "Pessoa Jurídica"}
                                        queryType={QueryType.Avancada}
                                        onSuccess={handlePaymentSuccess}
                                        cnpj={cnpjValue}
                                        cpf={cpfValue}
                                        queryName={isPessoaFisica ? nameValue : companyNameValue}
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
