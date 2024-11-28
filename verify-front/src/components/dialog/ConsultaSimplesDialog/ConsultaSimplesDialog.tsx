import { Dialog } from "@tremor/react";
import { X } from "lucide-react";

export default function ConsultaSimplesDialog({ open, setOpen, handleClose }: { open: boolean, setOpen: any, handleClose: any }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
                <h1 className="text-lg font-semibold text-center mb-4">
                    Consulta Simples - Detalhes
                </h1>
                <div className="space-y-4 py-4 text-gray-700">
                    <h2 className="text-center font-semibold">Pessoa Física</h2>
                    <div>
                        <strong>Situação CPF/CNPJ:</strong>
                        <p className="mt-1 text-sm">Verificação da situação cadastral do CPF ou CNPJ.</p>
                    </div>
                    <div>
                        <strong>Origem CPF/CNPJ:</strong>
                        <p className="mt-1 text-sm">Consulta da origem cadastral do documento.</p>
                    </div>
                    <div>
                        <strong>Indicação de Óbito:</strong>
                        <p className="mt-1 text-sm">Indicação se existe registro de óbito vinculado ao CPF.</p>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <h2 className="text-center font-semibold">Pessoa Jurídica</h2>
                    <div>
                        <strong>Status da Empresa:</strong>
                        <p className="mt-1 text-sm">Verificação da situação cadastral da Empresa.</p>
                    </div>
                    <div>
                        <strong>CNAE:</strong>
                        <p className="mt-1 text-sm">Classificação Nacional das Atividades Econômicas.</p>
                    </div>
                    <div>
                        <strong>Atividade Econômica Principal:</strong>
                        <p className="mt-1 text-sm">Indicação da principal atividade econômica da empresa.</p>
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