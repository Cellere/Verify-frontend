"use client";

import Scroll from '@/utils/scroll';
import { Button } from '@tremor/react';
import { FaCar, FaBuilding, FaUser, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { consultaAutomotivaPriceFormatted, consultaAvancadaPriceFormatted, consultaIntermediariaPriceFormatted, consultaSimplesPriceFormatted } from '@/utils/prices';

export default function Pricing() {
  const data = [
    {
      title: "Consulta Simples",
      price: consultaSimplesPriceFormatted,
      description: "Descontos progressivos conforme o volume de relatórios. Confira a tabela de preços.",
      details: "Este relatório consulta diversas fontes e retorna em um único documento informações básicas, como CPF e nome.",
      sources: ["Receita Federal", "IEPTB", "eSocial"],
      buttonPrimary: "Contato Comercial",
      icon: <FaUser className="text-4xl text-primary-color" />,
    },
    {
      title: "Consulta Intermediário",
      price: consultaIntermediariaPriceFormatted,
      description: "Descontos progressivos conforme o volume de relatórios. Confira a tabela de preços.",
      details: "Este relatório consulta diversas fontes e retorna informações fiscais e trabalhistas.",
      sources: ["Receita Federal", "SINTEGRA", "CGU"],
      buttonPrimary: "Contato Comercial",
      icon: <FaBuilding className="text-4xl text-primary-color" />,
    },
    {
      title: "Consulta Avançado",
      price: consultaAvancadaPriceFormatted,
      description: "Descontos progressivos conforme o volume de relatórios. Confira a tabela de preços.",
      details: "Este relatório fornece análises mais profundas com dados cadastrais e score de crédito.",
      sources: ["Quod", "Receita Federal", "SIT"],
      buttonPrimary: "Contato Comercial",
      icon: <FaDollarSign className="text-4xl text-primary-color" />,
    },
    {
      title: "Consulta Automotivo",
      price: consultaAutomotivaPriceFormatted,
      description: "Descontos progressivos conforme o volume de relatórios. Confira a tabela de preços.",
      details: "Este relatório consulta informações detalhadas sobre veículos, como histórico e propriedade.",
      sources: ["Detran", "Receita Federal", "Polícia Federal"],
      buttonPrimary: "Contato Comercial",
      icon: <FaCar className="text-4xl text-primary-color" />,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="container mx-auto py-12" id='plans'>
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between"
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="md:w-1/2 flex flex-col items-start">
            <motion.h3 className="text-xl font-semibold mb-2">
              {item.title}
            </motion.h3>
            <motion.p className="text-primary-color font-bold text-3xl mb-2">
              {item.price}
            </motion.p>
            <motion.p className="text-sm text-gray-600 mb-4">
              {item.description}
            </motion.p>
            <motion.p className="text-gray-700 mb-4">
              {item.details}
            </motion.p>
            <motion.ul className="text-sm text-gray-600 mb-6">
              {item.sources.map((source, i) => (
                <li key={i} className="inline-block mr-2">
                  <span className="text-gray-800">{source}</span>
                  {i < item.sources.length - 1 && <span>,</span>}
                </li>
              ))}
            </motion.ul>
            <div className="flex gap-2">
              <Button onClick={() => Scroll('contact')}>
                {item.buttonPrimary}
              </Button>
            </div>
          </div>
          <motion.div
            className="md:w-1/3 flex justify-center mt-6 md:mt-0"
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
