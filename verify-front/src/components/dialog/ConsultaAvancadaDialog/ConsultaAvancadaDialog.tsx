import { Dialog } from "@tremor/react";
import { X } from "lucide-react";

export default function ConsultaAvancadaDialog({ open, setOpen, handleClose }: { open: boolean, setOpen: any, handleClose: any }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
                <div className="space-y-4 py-4 text-gray-700">

                    <h1 className="text-lg font-semibold text-center mb-4">
                        Consulta Simples - Detalhes
                    </h1>
                    <h2 className="text-center font-semibold">Pessoa Física</h2>
                    <div>
                        <strong>Nome:</strong>
                        <p className="mt-1 text-sm">Nome completo da pessoa física.</p>
                    </div>

                    <div>
                        <strong>CPF:</strong>
                        <p className="mt-1 text-sm">Número do Cadastro de Pessoa Física (CPF).</p>
                    </div>

                    <div>
                        <strong>Data de Nascimento:</strong>
                        <p className="mt-1 text-sm">Data de nascimento da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Telefone com DDD:</strong>
                        <p className="mt-1 text-sm">Número de telefone com o código de área (DDD).</p>
                    </div>

                    <div>
                        <strong>Endereço de Email:</strong>
                        <p className="mt-1 text-sm">Endereço de email da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Renda Estimada:</strong>
                        <p className="mt-1 text-sm">Estimativa de renda mensal da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Endereço:</strong>
                        <p className="mt-1 text-sm">Logradouro, número, bairro, cidade, UF, CEP e complemento do endereço.</p>
                    </div>

                    <div>
                        <strong>RG:</strong>
                        <p className="mt-1 text-sm">Número do Registro Geral (RG) da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Sexo:</strong>
                        <p className="mt-1 text-sm">Gênero da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Signo:</strong>
                        <p className="mt-1 text-sm">Signo zodiacal da pessoa física.</p>
                    </div>

                    <div>
                        <strong>Situação na Receita:</strong>
                        <p className="mt-1 text-sm">Situação cadastral do CPF junto à Receita Federal.</p>
                    </div>

                    <div>
                        <strong>Última Atualização Receita Federal:</strong>
                        <p className="mt-1 text-sm">Data e hora da última atualização pela Receita Federal.</p>
                    </div>

                    <div>
                        <strong>Inscrição:</strong>
                        <p className="mt-1 text-sm">Data de inscrição da pessoa física no CPF.</p>
                    </div>

                    <div>
                        <strong>Indicação de Óbito:</strong>
                        <p className="mt-1 text-sm">Indicação se existe registro de óbito vinculado ao CPF.</p>
                    </div>

                    <div>
                        <strong>Situação Judicial:</strong>
                        <p className="mt-1 text-sm">Informações sobre processos judiciais relacionados à pessoa física.</p>
                    </div>

                    <div>
                        <strong>Tribunal:</strong>
                        <p className="mt-1 text-sm">Informações sobre o tribunal, instância e tipo de processo.</p>
                    </div>

                    <div>
                        <strong>Última Movimentação:</strong>
                        <p className="mt-1 text-sm">Data da última movimentação judicial.</p>
                    </div>

                    <div>
                        <strong>Total de Processos:</strong>
                        <p className="mt-1 text-sm">Número total de processos judiciais envolvendo a pessoa física.</p>
                    </div>

                    <div>
                        <strong>Polaridade:</strong>
                        <p className="mt-1 text-sm">Classificação da polaridade (positiva, negativa, neutra) relacionada ao CPF.</p>
                    </div>

                    <div>
                        <strong>OAB:</strong>
                        <p className="mt-1 text-sm">Número da Ordem dos Advogados do Brasil (OAB) associado, se aplicável.</p>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <h2 className="text-center font-semibold">Pessoa Jurídica</h2>

                    <div>
                        <strong>CNPJ:</strong>
                        <p className="mt-1 text-sm">Número do Cadastro Nacional da Pessoa Jurídica (CNPJ).</p>
                    </div>

                    <div>
                        <strong>Número de Inscrição:</strong>
                        <p className="mt-1 text-sm">Número de inscrição no CNPJ, incluindo formatação.</p>
                    </div>

                    <div>
                        <strong>Matriz:</strong>
                        <p className="mt-1 text-sm">Indica se é matriz ou filial da empresa.</p>
                    </div>

                    <div>
                        <strong>Data de Abertura:</strong>
                        <p className="mt-1 text-sm">Data de abertura da empresa.</p>
                    </div>

                    <div>
                        <strong>Nome Empresarial:</strong>
                        <p className="mt-1 text-sm">Nome empresarial ou razão social da empresa.</p>
                    </div>

                    <div>
                        <strong>Atividade Econômica Principal:</strong>
                        <p className="mt-1 text-sm">Código e descrição da atividade econômica principal da empresa.</p>
                    </div>

                    <div>
                        <strong>Natureza Jurídica:</strong>
                        <p className="mt-1 text-sm">Código e descrição da natureza jurídica da empresa.</p>
                    </div>

                    <div>
                        <strong>Endereço:</strong>
                        <p className="mt-1 text-sm">Logradouro, número, bairro, município, UF e CEP do endereço da empresa.</p>
                    </div>

                    <div>
                        <strong>Telefone:</strong>
                        <p className="mt-1 text-sm">Número de telefone da empresa com DDD.</p>
                    </div>

                    <div>
                        <strong>Porte:</strong>
                        <p className="mt-1 text-sm">Classificação do porte da empresa (ME, EPP, Demais).</p>
                    </div>

                    <div>
                        <strong>Situação Cadastral:</strong>
                        <p className="mt-1 text-sm">Situação cadastral atual da empresa no CNPJ.</p>
                    </div>

                    <div>
                        <strong>Data da Situação Cadastral:</strong>
                        <p className="mt-1 text-sm">Data de atualização da situação cadastral no CNPJ.</p>
                    </div>

                    <div>
                        <strong>Motivo da Situação Cadastral:</strong>
                        <p className="mt-1 text-sm">Motivo relacionado à situação cadastral, se informado.</p>
                    </div>

                    <div>
                        <strong>Data de Emissão:</strong>
                        <p className="mt-1 text-sm">Data de emissão do documento da consulta.</p>
                    </div>

                    <div>
                        <strong>Data da Consulta:</strong>
                        <p className="mt-1 text-sm">Data e hora da realização da consulta.</p>
                    </div>

                    <div>
                        <strong>Capital Social:</strong>
                        <p className="mt-1 text-sm">Valor do capital social da empresa, incluindo descrição completa e normalizada.</p>
                    </div>

                    <div>
                        <strong>Sócio - Nome Empresarial:</strong>
                        <p className="mt-1 text-sm">Nome do sócio da empresa.</p>
                    </div>
                    <h2 className="text-center font-semibold">Se CPF ou CNPJ apresentar processos, pode vir:</h2>
                    <div>
                        <strong>Sócio - Nome Empresarial:</strong>
                        <p className="mt-1 text-sm">Nome do sócio da empresa.</p>
                    </div>

                    <div>
                        <strong>Número do Processo:</strong>
                        <p className="mt-1 text-sm">Número de identificação do processo.</p>
                    </div>

                    <div>
                        <strong>Tipo:</strong>
                        <p className="mt-1 text-sm">Tipo do processo.</p>
                    </div>

                    <div>
                        <strong>Assunto:</strong>
                        <p className="mt-1 text-sm">Assunto do processo.</p>
                    </div>

                    <div>
                        <strong>Tribunal:</strong>
                        <p className="mt-1 text-sm">Nome do tribunal.</p>
                    </div>

                    <div>
                        <strong>Instância:</strong>
                        <p className="mt-1 text-sm">Tribunal da instância</p>
                    </div>

                    <div>
                        <strong>Tipo de Tribunal:</strong>
                        <p className="mt-1 text-sm">Tipo do tribunal do processo.</p>
                    </div>

                    <div>
                        <strong>Distrito:</strong>
                        <p className="mt-1 text-sm">Distrituo do processo.</p>
                    </div>

                    <div>
                        <strong>Estado:</strong>
                        <p className="mt-1 text-sm">Estado do processo.</p>
                    </div>

                    <div>
                        <strong>Situação:</strong>
                        <p className="mt-1 text-sm">Situação do processo.</p>
                    </div>

                    <div>
                        <strong>Data da Publicação:</strong>
                        <p className="mt-1 text-sm">Data da Publicação do processo.</p>
                    </div>

                    <div>
                        <strong>Data da Notificação:</strong>
                        <p className="mt-1 text-sm">Data da Notificação do processo.</p>
                    </div>

                    <div>
                        <strong>Última Movimentação:</strong>
                        <p className="mt-1 text-sm">Última Movimentação do processo.</p>
                    </div>

                    <div>
                        <strong>Data da Captura:</strong>
                        <p className="mt-1 text-sm">Data da Captura do processo.</p>
                    </div>

                    <div>
                        <strong>Última Atualização:</strong>
                        <p className="mt-1 text-sm">Última Atualização do processo.</p>
                    </div>

                    <div>
                        <strong>Parte Ativa:</strong>
                        <p className="mt-1 text-sm">Parte ativa do processo.</p>
                    </div>

                    <div>
                        <strong>Parte Passiva:</strong>
                        <p className="mt-1 text-sm">Parte passiva do processo.</p>
                    </div>

                    <div>
                        <strong>Juiz:</strong>
                        <p className="mt-1 text-sm">Juiz responsável do processo.</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </Dialog>
    )
}