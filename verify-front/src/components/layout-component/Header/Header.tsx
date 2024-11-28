"use client";

import VerifyLogo from '@/app/assets/VerifyLogo';
import Scroll from '@/utils/scroll';
import { Button } from '@tremor/react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export default function Header() {
    return (
        <header className="w-full shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-8 text-gray-900">
                <div className="flex items-center">
                    <VerifyLogo />
                </div>

                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm lg:text-md">
                    <Button onClick={() => Scroll('contact')} className="text-md">
                        Fale conosco
                    </Button>
                    <Button
                        variant='light'
                        className="text-md text-gray-900"
                        onClick={() => Scroll('plans')}
                    >
                        Planos
                    </Button>
                    <Link href="/login" className="flex items-center space-x-2 text-md">
                        <FaUser />
                        <span>Entrar</span>
                    </Link>
                </nav>

                <div className="flex md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-label="Toggle Menu" className="text-white " variant='primary'>
                                ☰
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex items-center flex-col gap-4 p-4 bg-white shadow-md z-10">
                            <DropdownMenuItem
                                onSelect={() => {
                                    Scroll('contact');
                                }}
                                className="cursor-pointer"
                            >
                                Fale conosco
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => {
                                    Scroll('plans');
                                }}
                                className="cursor-pointer"
                            >
                                Planos
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/login" className="flex items-center space-x-2">
                                    <FaUser />
                                    <span>Entrar</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
