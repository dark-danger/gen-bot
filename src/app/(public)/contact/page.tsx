"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Textarea, Card, CardContent } from "@/components/ui";
import { PageWrapper, Section } from "@/components/layout";

const contactInfo = [
    { icon: Mail, label: "Email", value: "khannayash394@gmail.com", href: "mailto:khannayash394@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 92110 67540", href: "tel:+919211067540" },
    { icon: MapPin, label: "Location", value: "Sonipat, Haryana, India", href: "#" },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", organization: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        // Validate input
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            setErrorMessage("Please fill in all required fields");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus("error");
            setErrorMessage("Please enter a valid email address");
            return;
        }

        try {
            const supabase = createClient();

            const { data, error } = await supabase
                .from("contact_queries")
                .insert({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || null,
                    organization: formData.organization || null,
                    message: formData.message,
                    status: "new",
                })
                .select()
                .single();

            if (error) {
                console.error("Error submitting contact form:", error);
                setStatus("error");
                setErrorMessage("Failed to submit form. Please try again.");
            } else {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", organization: "", message: "" });
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <PageWrapper>
            <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get in <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-lg text-dark-400 max-w-3xl mx-auto">
                            Ready to transform your school&apos;s STEM program? Let&apos;s start a conversation.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Section>
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <Card><CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

                            {status === "success" && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <p className="text-green-400">Thank you! We&apos;ll get back to you soon.</p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <p className="text-red-400">{errorMessage}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Input label="Name *" id="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    <Input label="Email *" id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Input label="Phone" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                    <Input label="Organization" id="organization" placeholder="School / Institution" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
                                </div>
                                <Textarea label="Message *" id="message" placeholder="Tell us about your requirements..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                                <Button type="submit" size="lg" isLoading={status === "loading"} className="w-full sm:w-auto">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent></Card>
                    </div>

                    <div className="space-y-6">
                        <Card><CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <a key={i} href={item.href} className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-neon-cyan" />
                                        </div>
                                        <div>
                                            <div className="text-dark-400 text-xs">{item.label}</div>
                                            <div className="text-white text-sm">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </CardContent></Card>

                        <Card><CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Office Hours</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-dark-400">Mon - Fri</span><span className="text-white">9:00 AM - 6:00 PM</span></div>
                                <div className="flex justify-between"><span className="text-dark-400">Saturday</span><span className="text-white">10:00 AM - 4:00 PM</span></div>
                                <div className="flex justify-between"><span className="text-dark-400">Sunday</span><span className="text-dark-500">Closed</span></div>
                            </div>
                        </CardContent></Card>
                    </div>
                </div>
            </Section>
        </PageWrapper>
    );
}
