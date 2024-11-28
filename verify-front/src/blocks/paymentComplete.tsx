import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";

export default function PaymentComplete() {
    const router = useRouter()
    return (
        <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-green-600">
                Pagamento realizado com sucesso! 🎉
            </p>
            <p className="text-base text-gray-700">
                Sua consulta está sendo processada. Você receberá um e-mail em breve com o resultado. Você também poderá acessá-la em <span className="font-medium">&#34;Consultas Realizadas&#34;</span> dentro do seu painel.
            </p>
            <div className="mt-4">
                <Button size="lg" className="bg-primary-600 text-white" onClick={() => router.push('/consultas-realizadas')}>
                    Ir para Consultas Realizadas
                </Button>
            </div>
        </div>
    )
}