"use client";

import { Button, TextInput } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import VerifyCodeIlustrator from "../assets/VerifyCodeIlustrator.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { showToast } from "@/helpers/showToast";
import { VerifyCodeAuth } from "@/lib/auth/verifyCode";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const VerifyCodeSchema = z.object({
        code: z.string().min(6, "Código deve ter pelo menos 6 caracteres"),
    });
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<z.infer<typeof VerifyCodeSchema>>({
        resolver: zodResolver(VerifyCodeSchema),
        mode: "onChange",
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailFromQuery = searchParams.get("email");
        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }
    }, []);


    const onSubmit = async (data: z.infer<typeof VerifyCodeSchema>) => {
        try {
            if (email) {
                await VerifyCodeAuth({ code: data.code, email });
                showToast("success", "Código verificado com sucesso");
                router.push('/login');
            } else {
                setErrorMessage("Email não encontrado. Tente novamente.");
            }
        } catch (error: any) {
            setErrorMessage(
                error.message || "Ocorreu um erro ao verificar o código. Tente novamente."
            );
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-16 md:p-20 rounded-lg shadow-xl max-w-screen-lg gap-16 md:gap-24">
                <div className="flex flex-col max-w-md w-full md:w-1/2">
                    <h1 className="text-5xl font-extrabold text-center text-primary-500 mb-8">
                        Verificar Código
                    </h1>
                    <p className="text-center text-gray-500 mb-10">
                        Insira o código de verificação que enviamos para o seu e-mail.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {errorMessage && (
                            <div className="text-center text-red-500 mb-4">
                                {errorMessage}
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="code"
                                className="block text-base font-semibold mb-2 text-gray-700"
                            >
                                Código de Verificação
                            </label>
                            <TextInput
                                id="code"
                                type="text"
                                placeholder="Digite o código"
                                {...register("code")}
                                className={`w-full border ${errors.code ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm py-2 px-4`}
                            />
                            {errors.code && (
                                <span className="text-red-500 text-sm">
                                    {errors.code.message}
                                </span>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-3 text-lg font-semibold bg-primary-500 text-white rounded-md"
                            disabled={!isValid}
                        >
                            Verificar Código
                        </Button>
                    </form>
                </div>
                <div className="w-full flex justify-center">
                    <Image
                        src={VerifyCodeIlustrator}
                        alt="Background"
                        width={500}
                        height={500}
                        className="object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}
