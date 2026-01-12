import React from "react";
import { Navbar, Footer } from "@/components/layout";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
