"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutMainImage from "../../../app/assets/AboutMainImage.jpg";
import { Button } from "@tremor/react";
import Scroll from "@/utils/scroll";

export default function About() {
    const [titleIndex, setTitleIndex] = useState(0);
    const titles = ["Identidade Verificada", "Confiança Garantida", "Segurança Total"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [titles.length]);

    const titleVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 1 } },
        exit: { opacity: 0, y: -30, transition: { duration: 1 } },
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 lg:p-24 bg-gradient-to-br shadow-2xl rounded-lg space-y-10 md:space-y-0 mt-12 md:mt-24 transition-all duration-500">
            <motion.div
                className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 lg:w-2/5 space-y-4"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <AnimatePresence >
                    <motion.h1
                        key={titleIndex}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 mb-4 leading-tight text-center md:text-left"
                        variants={titleVariants}
                    >
                        {titles[titleIndex]}
                    </motion.h1>
                </AnimatePresence>
                <p className="text-primary-600 text-lg md:text-xl leading-relaxed text-center md:text-left max-w-lg tracking-wide">
                    Somos especialistas em soluções completas de verificação, atendendo pessoas físicas, jurídicas e automotivas.
                </p>
                <Button
                    onClick={() => Scroll("contact")}
                    className="mt-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    Fale Conosco
                </Button>
            </motion.div>

            <motion.div
                className="w-full md:w-1/2 lg:w-3/5 flex justify-center md:justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <div className="relative w-full max-w-lg lg:max-w-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-primary-500 opacity-40 rounded-3xl shadow-2xl"></div>

                    <Image
                        src={AboutMainImage}
                        alt="Verificação de Identidade"
                        width={900}
                        height={900}
                        className="object-cover rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </motion.div>
        </div>
    );
}
