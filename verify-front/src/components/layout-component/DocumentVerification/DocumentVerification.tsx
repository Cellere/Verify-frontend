"use client";

import { FaUser, FaIdCard, FaCar, FaFilePdf } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function DocumentVerification() {
    const verifications = [
        { title: "Nome e CPF", icon: FaUser },
        { title: "Nome da Empresa e CNPJ", icon: FaIdCard },
        { title: "Placa de Veículo", icon: FaCar },
    ];

    return (
        <div className="bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900 text-gray-100 py-12 mt-10 shadow-xl rounded-lg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-white">
                    Verifique Dados com Apenas Algumas Informações
                </h2>
                <p className="text-center mb-12 text-lg text-gray-200 leading-relaxed">
                    Nosso sistema oferece uma verificação rápida e eficiente. Com apenas o nome, CPF, CNPJ ou a placa de um veículo, você recebe instantaneamente um relatório em PDF com todas as informações necessárias, sem a necessidade de documentos adicionais.
                </p>

                <AnimatePresence>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2,
                                },
                            },
                        }}
                    >
                        {verifications.map((verification, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2"
                                variants={{
                                    hidden: { opacity: 0, y: 50, scale: 0.95 },
                                    visible: { opacity: 1, y: 0, scale: 1 },
                                }}
                                whileHover={{ scale: 1.08 }}
                                exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
                            >
                                <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-4 rounded-full mb-6 shadow-lg">
                                    <verification.icon className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {verification.title}
                                </h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
