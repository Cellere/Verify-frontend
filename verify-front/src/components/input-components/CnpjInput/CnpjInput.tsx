"use client";

import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TextInput } from "@tremor/react";
import { useState } from "react";

interface CnpjInputProps {
    register: UseFormRegister<FieldValues>;
    name: string;
    value: string;
    setValue: UseFormSetValue<FieldValues>;
    disabled?: boolean;
    error?: boolean
}

export default function CnpjInput({ register, name, value, setValue, disabled, error }: CnpjInputProps) {
    const [isCnpjValid, setIsCnpjValid] = useState(true);

    const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value.replace(/\D/g, "");

        if (inputValue.length > 12) {
            inputValue = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        } else if (inputValue.length > 8) {
            inputValue = inputValue.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3");
        } else if (inputValue.length > 5) {
            inputValue = inputValue.replace(/(\d{2})(\d{3})/, "$1.$2");
        }

        setValue(name, inputValue);  // Update the form value

        // Simple validation: Check if the length is exactly 14 digits
        setIsCnpjValid(inputValue.replace(/\D/g, "").length === 14);
    };

    return (
        <div className="w-full max-w-md">
            <TextInput
                placeholder="Informe seu CNPJ"
                className={`w-full ${!isCnpjValid ? "border-red-500" : ""}`}
                {...register(name, {
                    required: "CNPJ é obrigatório",
                    validate: () => isCnpjValid || "CNPJ inválido"
                })}
                value={value}
                maxLength={18}
                onChange={handleCnpjChange}
                disabled={disabled}
                error={error}
            />
            {!isCnpjValid && (
                <span className="text-red-500 text-sm">
                    CNPJ inválido
                </span>
            )}
        </div>
    );
}
