"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type ComponentWithChildren = React.ComponentType<{ children?: ReactNode }>;

function authGuard(Component: ComponentWithChildren) {
    return function AuthGuardedComponent(props: any) {
        const router = useRouter();
        const isAuthenticated =
            typeof window !== "undefined" && localStorage.getItem("token");

        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/login");
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };
}

export default authGuard;
