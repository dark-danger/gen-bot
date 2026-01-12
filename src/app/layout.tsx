import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "GenBots | STEM Education & IoT Innovation",
        template: "%s | GenBots",
    },
    description:
        "GenBots is an IoT education & innovation company delivering hands-on STEM education through robotics, drones, Python programming, and AI-integrated learning experiences.",
    keywords: [
        "STEM education",
        "IoT",
        "robotics",
        "drones",
        "Python programming",
        "AI education",
        "educational technology",
        "school programs",
        "hands-on learning",
    ],
    authors: [{ name: "GenBots" }],
    creator: "GenBots",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://genbots.edu",
        siteName: "GenBots",
        title: "GenBots | STEM Education & IoT Innovation",
        description:
            "Empowering the next generation with hands-on STEM education through IoT, robotics, and AI-integrated learning.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "GenBots - STEM Education",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "GenBots | STEM Education & IoT Innovation",
        description:
            "Empowering the next generation with hands-on STEM education through IoT, robotics, and AI-integrated learning.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-dark-950">
                {children}
            </body>
        </html>
    );
}
