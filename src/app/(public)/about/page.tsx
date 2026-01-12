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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
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
    { year: "2019", title: "Founded", description: "GenBots was born with a vision to transform STEM education" },
    { year: "2020", title: "First Partner School", description: "Launched our pilot program with 5 schools" },
    { year: "2021", title: "IoT Kit Launch", description: "Developed our proprietary low-cost educational IoT kits" },
    { year: "2022", title: "50+ Schools", description: "Expanded to 50+ partner schools across 10 cities" },
    { year: "2023", title: "AI Integration", description: "Launched AI-integrated IoT curriculum" },
    { year: "2024", title: "10,000 Students", description: "Reached milestone of 10,000+ students trained" },
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
                        Trusted by Leading Schools
                    </h2>
                    <p className="text-dark-400 max-w-2xl mx-auto mb-12">
                        We partner with forward-thinking educational institutions across India
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

            {/* Recognition */}
            <Section>
                <div className="text-center">
                    <Trophy className="w-12 h-12 text-neon-cyan mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Recognition & Awards
                    </h2>
                    <p className="text-dark-400 max-w-2xl mx-auto mb-12">
                        Our commitment to excellence has been recognized by leading
                        organizations in education and technology.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "EdTech Innovation Award 2023",
                            "Best STEM Education Provider",
                            "Startup India Recognition",
                        ].map((award, index) => (
                            <motion.div
                                key={award}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50"
                            >
                                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-white font-medium">{award}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </PageWrapper>
    );
}
