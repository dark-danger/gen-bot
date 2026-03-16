"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/projects", label: "Projects" },
    { href: "/software", label: "Software" },
    { href: "/why-genbots", label: "Why GenBots" },
    { href: "/contact", label: "Contact" },
    { href: "/store", label: "Store", highlight: true },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-dark-950/90 backdrop-blur-xl border-b border-dark-800/50 shadow-lg"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-glow">
                                <Cpu className="w-6 h-6 text-dark-900" />
                            </div>
                        </motion.div>
                        <span className="text-xl font-bold font-tech italic bg-gradient-to-r from-white to-dark-300 bg-clip-text text-transparent group-hover:from-neon-cyan group-hover:to-neon-blue transition-all duration-300">
                            GenBots
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                        link.highlight 
                                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:shadow-glow hover:bg-neon-cyan/20 transform hover:-translate-y-0.5" 
                                            : isActive
                                                ? "text-neon-cyan"
                                                : "text-dark-300 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && !link.highlight && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-0 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://chat.whatsapp.com/H3z2o0EJKUoCrvBLs8skKT?mode=gi_t"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="secondary" size="sm" className="bg-[#25D366] hover:bg-[#128C7E] border-none text-white gap-2">
                                <MessageCircle className="w-4 h-4 fill-current" />
                                Join Group
                            </Button>
                        </a>
                        <Link href="/contact">
                            <Button variant="primary" size="sm">
                                Partner With Us
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-dark-800/50"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${
                                                link.highlight 
                                                    ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,240,212,0.15)]" 
                                                    : isActive
                                                        ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                                                        : "text-dark-300 hover:text-white hover:bg-dark-800"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{link.label}</span>
                                                {link.highlight && (
                                                    <span className="flex h-2.5 w-2.5 relative">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan"></span>
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <div className="space-y-3 pt-4">
                                <a
                                    href="https://chat.whatsapp.com/H3z2o0EJKUoCrvBLs8skKT?mode=gi_t"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none text-white gap-2">
                                        <MessageCircle className="w-5 h-5 fill-current" />
                                        Join WhatsApp Group
                                    </Button>
                                </a>
                                <Link href="/contact" className="block">
                                    <Button variant="primary" className="w-full">
                                        Partner With Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
