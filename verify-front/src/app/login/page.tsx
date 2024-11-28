"use client";

import { Button, TextInput } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import LoginIlustrator from "../assets/LoginIlustrator.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/helpers/showToast";
import { login } from "@/lib/auth/loginUser";
import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const LoginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.push("/consultas-realizadas");
  //   }
  // }, [router]);

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const formattedData = {
        email: data.email,
        password: data.password,
      };

      const response = await login(formattedData);

      if (response && response.access_token) {
        localStorage.setItem("token", response.access_token);
        showToast("success", "Login efetuado com sucesso");
        setErrorMessage(null);
        router.push('/consultas-realizadas');
      } else {
        setErrorMessage(
          "Erro: Não foi possível realizar o login. Tente novamente."
        );
      }
    } catch (error: AxiosError | any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          error.message || "Ocorreu um erro ao realizar o login. Tente novamente."
        );
      }
    }
  };


  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-16 md:p-20 rounded-lg shadow-xl max-w-screen-lg gap-16 md:gap-24">
        <div className="flex flex-col max-w-md w-full md:w-1/2">
          <h1 className="text-5xl font-extrabold text-center text-primary-500 mb-8">
            Login
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Informe seu email e senha abaixo
          </p>
          {errorMessage && (
            <div className="text-red-500 text-center text-lg mb-6">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-primary-500 text-white rounded-md"
              disabled={!isValid}
            >
              Login
            </Button>
          </form>
          <div className="mt-8 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/register" className="underline text-primary-500">
              Cadastre-se
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src={LoginIlustrator}
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
