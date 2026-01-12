"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, Mail, Lock, AlertCircle } from "lucide-react";
import { signIn } from "@/actions";
import { Button, Input } from "@/components/ui";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn(email, password);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
            <div className="absolute inset-0 hero-gradient opacity-50" />
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-glow mb-4">
                        <Cpu className="w-8 h-8 text-dark-900" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                    <p className="text-dark-400 mt-2">Sign in to manage your GenBots platform</p>
                </div>

                <div className="bg-dark-900/80 backdrop-blur-xl border border-dark-800/50 rounded-2xl p-8">
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                            <Input id="email" type="email" placeholder="admin@genbots.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-12" required />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-12" required />
                        </div>

                        <Button type="submit" size="lg" isLoading={loading} className="w-full">
                            Sign In
                        </Button>
                    </form>
                </div>

                <p className="text-center text-dark-500 text-sm mt-6">
                    Protected admin area. Unauthorized access is prohibited.
                </p>
            </motion.div>
        </div>
    );
}
