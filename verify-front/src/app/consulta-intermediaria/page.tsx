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
import CpfInput from "@/components/input-components/CpfInput/CpfInput";
import CheckoutForm from "@/components/layout-component/CheckoutForm/CheckoutForm";
import { showToast } from "@/helpers/showToast";
import { QueryType } from "@/types/payments";
import { useRouter } from "next/navigation";
import { sanitizeInput } from "@/utils/sanitazeInput";
import { TextInput, Button } from "@tremor/react";
import { consultaIntermediariaPrice } from "@/utils/prices";
import PaymentComplete from "@/blocks/paymentComplete";
import ConsultaIntermediariaDialog from "@/components/dialog/ConsultaIntermediariaDialog/ConsultaIntermediariaDialog";
import { OpenDialogButton } from "@/components/button/OpenDialogButton/OpenDialogButton";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Stripe public key is missing from environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const pfSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    cpf: z
        .string()
        .min(14, "CPF deve conter 11 dígitos")
        .refine((cpf) => sanitizeInput(cpf).length === 11, {
            message: "CPF inválido",
        }),
});

export default function ConsultaIntermediaria() {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [amount] = useState(8.99);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
    } = useForm({
        resolver: zodResolver(pfSchema),
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
        console.log("data", data);
        showToast("success", "Dados validados com sucesso. Siga com pagamento para prosseguir com a consulta");
        setShowPaymentForm(true);
    };

    const handlePaymentSuccess = () => {
        setPaymentCompleted(true);
        setShowPaymentForm(false);
        showToast("success", "Pagamento concluído com sucesso. Gerando PDF...");
    };

    const cpfValue = watch("cpf", "");
    const nameValue = watch("name", "");

    return (
        <LayoutDashboard>
            <div className="max-w-2xl mx-auto space-y-8 py-8 px-6 bg-white shadow-lg rounded-lg">
                <TitleDashboard title="Consultas Intermediária" />
                <SectionDashboard consultationType="Consulta Intermediária" price={consultaIntermediariaPrice} />
                <div className="flex items-center justify-center">
                    <OpenDialogButton handleClickOpen={handleClickOpen} queryType={"Consulta Intermediária"} />
                </div>
                {open && (
                    <ConsultaIntermediariaDialog open={open} setOpen={setOpen} handleClose={handleClose} />
                )}
                <div className="flex items-center justify-center space-x-6 mb-6">
                    {!paymentCompleted ? (
                        <section className="space-y-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col space-y-4">
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
                                            queryCpfOrCpnj={cpfValue}
                                            queryName={nameValue}
                                            natural="Pessoa Física"
                                            queryType={QueryType.Intermediaria}
                                            onSuccess={handlePaymentSuccess}
                                            cpf={cpfValue}
                                            cnpj=""
                                        />
                                    </Elements>
                                </div>
                            )}
                        </section>
                    ) : (
                        <PaymentComplete />
                    )}
                </div>
            </div>
        </LayoutDashboard >
    );
}
