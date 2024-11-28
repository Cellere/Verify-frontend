"use client"

import { FaGlobe, FaThumbsUp, FaUserShield, FaBolt, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    Icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
    title: string;
    items: string[];
}

function FeatureCard({ Icon, title, items }: FeatureCardProps) {
    return (
        <motion.div
            className="flex flex-col items-start p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-500 rounded-full mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <ul className="text-gray-700 space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-500">✔</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function Features() {
    return (
        <motion.div
            className="py-12 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    Descubra o <span className="text-primary-500">Poder da Verify</span>
                </h2>
                <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
                    <FeatureCard
                        Icon={FaBolt}
                        title="Verificação Automotiva"
                        items={[
                            "Validação de documentos e histórico veicular",
                            "Verificação completa de propriedade e multas",
                            "Integração com bases de dados automotivas nacionais"
                        ]}
                    />
                    <FeatureCard
                        Icon={FaThumbsUp}
                        title="Experiência de Verificação Fluida"
                        items={[
                            "Interface intuitiva e fácil de usar",
                            "Captura automática e identificação de documentos",
                            "Verificação integrada de documentos e biometria"
                        ]}
                    />
                    <FeatureCard
                        Icon={FaUserShield}
                        title="Verificação de Identidade Segura"
                        items={[
                            "Detecção de fraudes e verificação de autenticidade de documentos",
                            "Verificação de documentos eletrônicos e NFC",
                            "Controle rigoroso de autenticidade"
                        ]}
                    />
                    <FeatureCard
                        Icon={FaBolt}
                        title="Velocidade e Eficiência"
                        items={[
                            "Verificação de documentos em segundos",
                            "Integração rápida e fácil com novos clientes",
                            "Escalabilidade para lidar com picos de demanda"
                        ]}
                    />
                    <FeatureCard
                        Icon={FaMobileAlt}
                        title="Integração Simplificada"
                        items={[
                            "Documentação completa e suporte disponível"
                        ]}
                    />
                    <FeatureCard
                        Icon={FaShieldAlt}
                        title="Segurança e Conformidade Rigorosas"
                        items={[
                            "Solução segura em dispositivo ou on-premise",
                            "Conformidade com normas e regulamentos nacionais"
                        ]}
                    />
                </div>
            </div>
        </motion.div>
    );
}
