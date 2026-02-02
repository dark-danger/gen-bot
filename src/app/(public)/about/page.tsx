"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Target,
    Eye,
    Heart,
    Lightbulb,
    School,
    Users,
    Trophy,
    Rocket,
    User,
    MessageCircle,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent, Button } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { getTeamMembers } from "@/actions";
import type { TeamMember } from "@/lib/database.types";

const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "We push boundaries to create cutting-edge educational experiences.",
    },
    {
        icon: Heart,
        title: "Passion",
        description: "We're driven by our love for technology and education.",
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "We work closely with schools to tailor solutions to their needs.",
    },
    {
        icon: Rocket,
        title: "Excellence",
        description: "We strive for the highest quality in everything we do.",
    },
];

const milestones = [
    { year: "2025", title: "Founded", description: "GenBots was born with a vision to transform STEM education" },
    { year: "2025", title: "First Partner School", description: "Launched our program with our first set of partner schools" },
    { year: "2025", title: "IoT Kit Launch", description: "Developed our proprietary low-cost educational IoT kits" },
    { year: "2025", title: "1,000+ Students", description: "Successfully trained over 1,000 students in our first year" },
];

export default function AboutPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const loadTeamMembers = async () => {
            const { data } = await getTeamMembers();
            if (data) setMembers(data);
        };
        loadTeamMembers();
    }, []);
    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-40 -right-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 -left-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            About <span className="gradient-text">GenBots</span>
                        </h1>
                        <p className="text-lg text-dark-400 max-w-3xl mx-auto">
                            We&apos;re on a mission to democratize STEM education and inspire
                            the next generation of innovators through hands-on learning experiences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <Section>
                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card glow className="h-full">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-cyan-600 flex items-center justify-center mb-6 shadow-glow">
                                    <Target className="w-8 h-8 text-dark-900" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                                <p className="text-dark-400 leading-relaxed">
                                    To empower every student with practical technology skills through
                                    affordable, hands-on STEM education. We believe that learning by
                                    doing is the most effective way to prepare students for the
                                    future of work and innovation.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card glow className="h-full">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue to-blue-600 flex items-center justify-center mb-6 shadow-glow-blue">
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                                <p className="text-dark-400 leading-relaxed">
                                    A world where every school has access to world-class STEM
                                    education, and every student has the opportunity to become a
                                    creator and innovator. We envision technology education that
                                    is accessible, engaging, and transformative.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </Section>

            {/* Our Values */}
            <Section className="bg-dark-900/50">
                <SectionHeader
                    title="Our Values"
                    subtitle="The principles that guide everything we do"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full text-center">
                                <CardContent className="p-6">
                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-dark-800 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/10 transition-colors">
                                        <value.icon className="w-7 h-7 text-neon-cyan" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-dark-400 text-sm">{value.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Timeline */}
            <Section>
                <SectionHeader
                    title="Our Journey"
                    subtitle="Key milestones in our mission to transform STEM education"
                />

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple hidden lg:block" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >
                                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                                    <Card>
                                        <CardContent className="p-6">
                                            <span className="text-neon-cyan font-bold text-lg">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-semibold text-white mt-2 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-dark-400">{milestone.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Timeline dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-cyan rounded-full shadow-glow hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Team Section */}
            {members.length > 0 && (
                <Section>
                    <SectionHeader
                        title="Meet Our Team"
                        subtitle="The passionate individuals driving innovation in STEM education"
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full text-center group">
                                    <CardContent className="p-6">
                                        <div className="relative w-32 h-32 mx-auto mb-4">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                                            <div className="relative w-full h-full rounded-full overflow-hidden bg-dark-800 border-2 border-dark-700 group-hover:border-neon-cyan/50 transition-colors">
                                                {member.image_url ? (
                                                    <Image
                                                        src={member.image_url}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <User className="w-16 h-16 text-dark-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-neon-cyan text-sm font-medium mb-3">
                                            {member.role}
                                        </p>
                                        {member.bio && (
                                            <p className="text-dark-400 text-sm leading-relaxed">
                                                {member.bio}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            )}

            {/* School Partnerships */}
            <Section className="bg-dark-900/50">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center mb-8 shadow-glow-lg">
                        <School className="w-10 h-10 text-dark-900" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Trusted by Schools
                    </h2>
                    <p className="text-dark-400 max-w-2xl mx-auto mb-12">
                        We partner with forward-thinking educational institutions
                        to bring world-class STEM education to their students.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="h-24 rounded-xl bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-500"
                            >
                                Partner School {i}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Contact & WhatsApp CTA */}
            <Section className="relative h-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-blue/10 to-neon-purple/10" />
                    <div className="absolute inset-0 backdrop-blur-3xl" />

                    <div className="relative px-8 py-16 text-center">
                        <MessageCircle className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 italic font-tech">Stay Connected with GenBots</h2>
                        <p className="text-dark-300 max-w-2xl mx-auto mb-10">
                            Have questions or want to stay updated? Contact us directly or join our growing WhatsApp community of innovators.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="https://chat.whatsapp.com/H3z2o0EJKUoCrvBLs8skKT?mode=gi_t"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] border-none text-white gap-2 shadow-glow-sm">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.883 1.027 4.009 1.571 6.173 1.571h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Join WhatsApp Group
                                </Button>
                            </a>
                            <a href="/contact" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full gap-2 px-10">
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
}
