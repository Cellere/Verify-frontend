"use client";

import { Button, TextInput } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import RegisterIlustrator from "../assets/RegisterIlustrator.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/lib/auth/createUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "@/helpers/showToast";
import { AxiosError } from "axios";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const RegisterSchema = z.object({
        nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        confirmPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            const formattedData = {
                name: data.nome,
                email: data.email,
                password: data.password,
            };

            await createUser(formattedData);
            router.push(`/verifyCode?email=${encodeURIComponent(formattedData.email)}`);

            showToast("success", "Email enviado! Verifique seu código");
        } catch (error: AxiosError | any) {
            setErrorMessage(
                error.message || "Ocorreu um erro ao criar a conta. Tente novamente."
            );
        }
    };


    return (
        <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-16 md:p-20 rounded-lg shadow-xl max-w-screen-lg gap-16 md:gap-24">
                <div className="flex flex-col max-w-md w-full md:w-1/2">
                    <h1 className="text-5xl font-extrabold text-center text-primary-500 mb-8">
                        Cadastro
                    </h1>
                    <p className="text-center text-gray-500 mb-10">
                        Informe suas informações abaixo
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {errorMessage && (
                            <div className="text-center text-red-500 mb-4">
                                {errorMessage}
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="nome"
                                className="block text-base font-semibold mb-2 text-gray-700"
                            >
                                Nome
                            </label>
                            <TextInput
                                id="nome"
                                type="text"
                                placeholder="Marcos"
                                {...register("nome")}
                                className={`w-full border ${errors.nome ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm py-2 px-4`}
                            />
                            {errors.nome && (
                                <span className="text-red-500 text-sm">
                                    {errors.nome.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-base font-semibold mb-2 text-gray-700"
                            >
                                Email
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="Informe seu email"
                                {...register("email")}
                                className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm py-2 px-4`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-base font-semibold mb-2 text-gray-700"
                            >
                                Senha
                            </label>
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="Informe sua senha"
                                {...register("password")}
                                className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm py-2 px-4`}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-base font-semibold mb-2 text-gray-700"
                            >
                                Confirmar Senha
                            </label>
                            <TextInput
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme sua senha"
                                {...register("confirmPassword")}
                                className={`w-full border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm py-2 px-4`}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-3 text-lg font-semibold bg-primary-500 text-white rounded-md"
                            disabled={!isValid}
                        >
                            Registrar
                        </Button>
                    </form>
                    <div className="mt-8 text-center text-sm text-gray-600">
                        Já tem uma conta?
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <Image
                        src={RegisterIlustrator}
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
