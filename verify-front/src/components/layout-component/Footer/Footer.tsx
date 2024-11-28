import VerifyLogo from '@/app/assets/VerifyLogo';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-primary-50 text-gray-800 py-10 mt-16 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div className="flex items-center gap-3 text-center sm:text-left text-sm">
                        <VerifyLogo />
                        <span>&copy; 2024 Todos os direitos reservados.</span>
                    </div>
                    <nav className="mt-4 sm:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <a href="#contact" className="hover:text-primary-600 transition-colors duration-200">Contato</a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-primary-600 transition-colors duration-200">Política de Privacidade</a>
                            </li>
                            <li>
                                <a href="/terms-of-service" className="hover:text-primary-600 transition-colors duration-200">Termos de Serviço</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-center sm:text-left mb-4 sm:mb-0">
                        <p className="mb-2">Endereço: Rua Fictícia, 123, Cidade, Estado</p>
                        <p>Email: <a href="mailto:contato@verify.com" className="text-primary-600 hover:underline">contato@verify.com</a></p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
