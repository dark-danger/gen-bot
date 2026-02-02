"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Download, ExternalLink } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";

const softwareList = [
    {
        id: "genide",
        title: "GenIDE",
        platform: "Windows",
        type: "IDE / Development Environment",
        description: "GenIDE is the official GenBots IDE for robotics, Arduino, ESP boards, and automation projects.",
        downloadText: "Download for Windows",
        downloadLink: "https://drive.google.com/file/d/1DT1dN03hfBSWMg61i8QJ5dt7O-j9sym4/view?usp=sharing",
        icon: Monitor,
        color: "from-neon-cyan to-neon-blue"
    },
    {
        id: "genapp",
        title: "GenApp",
        platform: "Android Mobile App",
        type: "IoT Control Application",
        description: "GenApp allows users to control Arduino, HC-05, ESP8266, and ESP32 devices using Bluetooth and Wi-Fi.",
        downloadText: "Download Mobile App",
        downloadLink: "https://drive.google.com/file/d/1kmJDIfV7OhT1dQN4RxMoNy0J0H0wHRyd/view?usp=sharing",
        icon: Smartphone,
        color: "from-neon-blue to-neon-purple"
    }
];

export default function SoftwarePage() {
    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            GenBots <span className="gradient-text">Software</span>
                        </h1>
                        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
                            Download the official tools and applications to power your robotics and IoT innovations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Software List Section */}
            <Section>
                <SectionHeader
                    title="Official Downloads"
                    subtitle="Professional-grade software designed for seamless hardware integration"
                />
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {softwareList.map((software, i) => (
                        <motion.div
                            key={software.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                        >
                            <Card className="h-full group hover:border-neon-cyan/50 transition-colors bg-dark-900/40 backdrop-blur-sm" glow>
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${software.color} flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-500`}>
                                        <software.icon className="w-8 h-8 text-dark-900" />
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-xs font-bold tracking-widest uppercase text-neon-cyan mb-2 block">
                                            {software.platform}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-1">{software.title}</h3>
                                        <p className="text-sm text-dark-500 font-medium italic mb-4">{software.type}</p>
                                    </div>

                                    <p className="text-dark-300 mb-8 flex-grow leading-relaxed">
                                        {software.description}
                                    </p>

                                    <div className="mt-auto">
                                        <a
                                            href={software.downloadLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <Button
                                                variant="primary"
                                                className="w-full group/btn py-6 text-base font-bold shadow-glow-sm"
                                            >
                                                <Download className="mr-2 w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                                                {software.downloadText}
                                                <ExternalLink className="ml-2 w-4 h-4 opacity-50" />
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Setup Support Section */}
            <Section className="bg-dark-900/50">
                <div className="max-w-4xl mx-auto text-center border border-dark-800/50 rounded-3xl p-12 bg-dark-950/50 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
                    <h2 className="text-3xl font-bold text-white mb-6">Need help with installation?</h2>
                    <p className="text-dark-400 mb-8">
                        Our technical support team is available to help you set up and configure GenIDE and GenApp for your specific hardware needs.
                    </p>
                    <a href="/contact">
                        <Button variant="secondary" className="px-8 border-dark-700 hover:border-neon-cyan hover:text-neon-cyan transition-all">
                            Contact Support
                        </Button>
                    </a>
                </div>
            </Section>
        </PageWrapper>
    );
}
