"use client";

import Link from "next/link";
import {
    CircleUser,
    Menu,
    FileSearch,
    FileText,
    FileCheck,
    FilePlus,
    CarFront,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@tremor/react";
import authGuard from "@/auth/authHOC";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { showToast } from "@/helpers/showToast";
import VerifyLogo from "@/app/assets/VerifyLogo";

const LayoutDashboard = ({ children }: { children?: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const logout = () => {
        localStorage.clear();
        router.push('/');
        showToast("success", "Logout efetuado com sucesso");
    };

    if (!hydrated) {
        return null;
    }

    const currentRoute = pathname;

    const isActive = (path: string) => currentRoute === path;

    return (
        <div className="min-h-screen grid w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block bg-muted/40 border-r">
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <VerifyLogo />
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <nav className="sticky top-0 grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/consulta-simples"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-simples")
                                    ? " text-primary-500"
                                    : "text-primary hover:text-primary"
                                    }`}
                            >
                                <FileSearch className="h-4 w-4" />
                                Consulta Simples
                            </Link>
                            <Link
                                href="/consulta-intermediaria"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-intermediaria")
                                    ? " text-primary-500"
                                    : "bg-muted text-primary hover:text-primary"
                                    }`}
                            >
                                <FileText className="h-4 w-4" />
                                Consulta Intermediária
                            </Link>
                            <Link
                                href="/consulta-avancada"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-avancada")
                                    ? " text-primary-500"
                                    : "bg-muted text-primary hover:text-primary"
                                    }`}
                            >
                                <FilePlus className="h-4 w-4" />
                                Consulta Avançada
                            </Link>
                            <Link
                                href="/consulta-automotiva"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-automotiva")
                                    ? " text-primary-500"
                                    : "bg-muted text-primary hover:text-primary"
                                    }`}
                            >
                                <CarFront className="h-4 w-4" />
                                Consulta Automotiva
                            </Link>
                            <Link
                                href="/consultas-realizadas"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consultas-realizadas")
                                    ? " text-primary-500"
                                    : "bg-muted text-primary hover:text-primary"
                                    }`}
                            >
                                <FileCheck className="h-4 w-4" />
                                Consultas Realizadas
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="shrink-0 md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
                            >
                                <VerifyLogo />
                            </Link>
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-10">
                                <Link
                                    href="/consulta-simples"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-simples")
                                        ? " text-primary-500"
                                        : "text-primary hover:text-primary"
                                        }`}
                                >
                                    <FileSearch className="h-4 w-4" />
                                    Consulta Simples
                                </Link>
                                <Link
                                    href="/consulta-intermediaria"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-intermediaria")
                                        ? " text-primary-500"
                                        : "bg-muted text-primary hover:text-primary"
                                        }`}
                                >
                                    <FileText className="h-4 w-4" />
                                    Consulta Intermediária
                                </Link>
                                <Link
                                    href="/consulta-avancada"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-avancada")
                                        ? " text-primary-500"
                                        : "bg-muted text-primary hover:text-primary"
                                        }`}
                                >
                                    <FilePlus className="h-4 w-4" />
                                    Consulta Avançada
                                </Link>
                                <Link
                                    href="/consulta-automotiva"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consulta-automotiva")
                                        ? " text-primary-500"
                                        : "bg-muted text-primary hover:text-primary"
                                        }`}
                                >
                                    <CarFront className="h-4 w-4" />
                                    Consulta Automotiva
                                </Link>
                                <Link
                                    href="/consultas-realizadas"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${isActive("/consultas-realizadas")
                                        ? " text-primary-500"
                                        : "bg-muted text-primary hover:text-primary"
                                        }`}
                                >
                                    <FileCheck className="h-4 w-4" />
                                    Consultas Realizadas
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="flex justify-end items-center gap-4 ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" className="rounded-full cursor-pointer">
                                    <CircleUser className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel
                                    className="cursor-pointer"
                                    onClick={logout}
                                >
                                    Sair da conta
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default authGuard(LayoutDashboard);
