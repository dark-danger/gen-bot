"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    CheckCircle,
    ArrowRight,
    Sparkles,
    GraduationCap,
    Wrench,
    HeadphonesIcon,
    BookOpen,
    Award,
    TrendingUp,
    Users,
    Lightbulb,
    Shield,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";

const benefits = [
    { icon: GraduationCap, title: "Expert-Designed Curriculum", description: "Developed by industry professionals and educators." },
    { icon: Wrench, title: "Low-Cost IoT Kits", description: "Affordable, custom-designed educational kits." },
    { icon: HeadphonesIcon, title: "Ongoing Support", description: "Dedicated support throughout the academic year." },
    { icon: BookOpen, title: "Teacher Training", description: "Comprehensive training for effective STEM delivery." },
    { icon: Award, title: "Certification", description: "Recognized certificates upon completion." },
    { icon: TrendingUp, title: "Progress Tracking", description: "Detailed analytics and progress reports." },
];

const pedagogy = [
    { step: "01", title: "Learn", description: "Engaging visual content and demos", icon: BookOpen },
    { step: "02", title: "Build", description: "Hands-on project construction", icon: Wrench },
    { step: "03", title: "Code", description: "Beginner-friendly programming", icon: Lightbulb },
    { step: "04", title: "Innovate", description: "Create original solutions", icon: Sparkles },
];

const differentiators = [
    "Real hardware, not simulations", "Project-based learning", "Age-appropriate curriculum",
    "Board-aligned frameworks", "Competitions & hackathons", "Industry mentorship",
    "Parent workshops", "Career guidance",
];

export default function WhyGenBotsPage() {
    return (
        <PageWrapper>
            <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Why Choose <span className="gradient-text">GenBots</span>?
                        </h1>
                        <p className="text-lg text-dark-400 max-w-3xl mx-auto">
                            What makes us the preferred STEM education partner for schools across India.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Section>
                <SectionHeader title="Our Advantages" subtitle="Everything for world-class STEM education" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((b, i) => (
                        <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <Card className="h-full group">
                                <CardContent className="p-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        <b.icon className="w-7 h-7 text-neon-cyan" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{b.title}</h3>
                                    <p className="text-dark-400">{b.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-dark-900/50">
                <SectionHeader title="Our Teaching Methodology" subtitle="Proven hands-on STEM learning" />
                <div className="grid md:grid-cols-4 gap-6">
                    {pedagogy.map((item, i) => (
                        <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                            <Card className="h-full text-center">
                                <CardContent className="p-6">
                                    <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-dark-800 flex items-center justify-center mb-4">
                                        <item.icon className="w-7 h-7 text-neon-cyan" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-dark-400 text-sm">{item.description}</p>
                                </CardContent>
                            </Card>
                            {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10"><ArrowRight className="w-6 h-6 text-dark-600" /></div>}
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Sets Us <span className="gradient-text">Apart</span></h2>
                        <p className="text-dark-400 text-lg mb-8">Comprehensive approach for real-world challenges.</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {differentiators.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-300 text-sm">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <Card glow><CardContent className="p-8">
                            <div className="grid grid-cols-2 gap-6">
                                {[{ v: "98%", l: "Satisfaction" }, { v: "85%", l: "Completion" }, { v: "3+", l: "Schools" }, { v: "4.9", l: "Rating" }].map((s, i) => (
                                    <div key={i} className="text-center p-4 rounded-xl bg-dark-800/50">
                                        <div className="text-3xl font-bold text-neon-cyan mb-1">{s.v}</div>
                                        <div className="text-dark-400 text-sm">{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent></Card>
                    </motion.div>
                </div>
            </Section>

            <Section className="bg-dark-900/50">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                    <Shield className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Educators</h2>
                    <p className="text-dark-400 max-w-2xl mx-auto mb-12">Schools trust us for measurable outcomes.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { q: "GenBots transformed our science lab. Students are more engaged than ever.", a: "Principal, Delhi Public School" },
                            { q: "Hands-on approach and affordable kits made STEM accessible to all.", a: "STEM Coordinator, Ryan International" },
                            { q: "Outstanding curriculum and excellent support.", a: "Chairman, Cambridge School" },
                        ].map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <Card className="h-full"><CardContent className="p-6">
                                    <div className="text-4xl text-neon-cyan mb-4">&ldquo;</div>
                                    <p className="text-dark-300 mb-6 italic">{t.q}</p>
                                    <p className="text-dark-500 text-sm">— {t.a}</p>
                                </CardContent></Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            <Section>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-blue/20 to-neon-purple/20" />
                    <div className="absolute inset-0 backdrop-blur-3xl" />
                    <div className="relative px-8 py-16 text-center">
                        <Users className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the GenBots Family</h2>
                        <p className="text-dark-300 max-w-2xl mx-auto mb-8">Partner with us for world-class STEM education.</p>
                        <Link href="/contact"><Button size="lg" className="group">Get in Touch<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
}
