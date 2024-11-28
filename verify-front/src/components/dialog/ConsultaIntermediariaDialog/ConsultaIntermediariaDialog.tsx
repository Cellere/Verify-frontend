import { Dialog } from "@tremor/react";
import { X } from "lucide-react";

export default function ConsultaIntermediariaDialog({ open, setOpen, handleClose }: { open: boolean, setOpen: any, handleClose: any }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
                <div className="space-y-4 py-4 text-gray-700">
                    <h1 className="text-lg font-semibold text-center mb-4">
                        Consulta Intermediária - Detalhes
                    </h1>
                    <h2 className="text-center font-semibold">Pessoa Física</h2>

                    <div>
                        <strong>Nome:</strong>
                        <p className="mt-1 text-sm">Nome completo do indivíduo.</p>
                    </div>

                    <div>
                        <strong>CPF:</strong>
                        <p className="mt-1 text-sm">Número do Cadastro de Pessoa Física (CPF).</p>
                    </div>

                    <div>
                        <strong>Data de Nascimento:</strong>
                        <p className="mt-1 text-sm">Data de nascimento do indivíduo.</p>
                    </div>

                    <div>
                        <strong>Telefone com DDD:</strong>
                        <p className="mt-1 text-sm">Número de telefone com o código de área (DDD).</p>
                    </div>

                    <div>
                        <strong>Nome da Mãe:</strong>
                        <p className="mt-1 text-sm">Nome completo da mãe do indivíduo.</p>
                    </div>

                    <div>
                        <strong>Situação Cadastral:</strong>
                        <p className="mt-1 text-sm">Situação cadastral do CPF ou CNPJ.</p>
                    </div>

                    <div>
                        <strong>Endereço:</strong>
                        <p className="mt-1 text-sm">Logradouro, número, bairro, cidade, UF e CEP do endereço.</p>
                    </div>

                    <div>
                        <strong>Indicação de Óbito:</strong>
                        <p className="mt-1 text-sm">Indicação se existe registro de óbito vinculado ao CPF.</p>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
        </Dialog>
    )
}