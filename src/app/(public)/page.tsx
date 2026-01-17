"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Cpu,
    Bot,
    Plane,
    Code,
    Brain,
    ArrowRight,
    Sparkles,
    GraduationCap,
    Building2,
    Users,
    ChevronRight,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";

const programs = [
    {
        icon: Cpu,
        title: "IoT & Smart Home",
        description:
            "Learn to build connected devices and automate everyday environments.",
        color: "from-neon-cyan to-cyan-600",
    },
    {
        icon: Bot,
        title: "Robotics",
        description:
            "Design, build, and program robots that interact with the physical world.",
        color: "from-neon-blue to-blue-600",
    },
    {
        icon: Plane,
        title: "Drone Engineering",
        description:
            "Master aerial systems from assembly to autonomous flight programming.",
        color: "from-neon-purple to-purple-600",
    },
    {
        icon: Code,
        title: "Python Programming",
        description:
            "From basics to advanced concepts with real-world project applications.",
        color: "from-green-400 to-emerald-600",
    },
    {
        icon: Brain,
        title: "AI-IoT Systems",
        description:
            "Integrate artificial intelligence with IoT for smart automation.",
        color: "from-neon-pink to-pink-600",
    },
];

const stats = [
    { icon: GraduationCap, value: "50+", label: "Partner Schools" },
    { icon: Users, value: "10,000+", label: "Students Trained" },
    { icon: Building2, value: "100+", label: "Labs Installed" },
    { icon: Sparkles, value: "500+", label: "Projects Built" },
];

export default function HomePage() {
    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
                {/* Background effects */}
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-neon-cyan/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-blue/15 rounded-full blur-[150px]" />

                {/* Floating elements */}
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/3 left-[15%] w-4 h-4 bg-neon-cyan rounded-full opacity-60"
                />
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 right-[20%] w-3 h-3 bg-neon-blue rounded-full opacity-50"
                />
                <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute bottom-1/3 left-[25%] w-2 h-2 bg-neon-purple rounded-full opacity-40"
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-neon-cyan/10 border border-neon-cyan/30"
                        >
                            <span className="text-neon-cyan text-sm font-medium tracking-wider">
                                INNOVATE · LEARN · CREATE
                            </span>
                        </motion.div>

                        {/* Main heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-tech">
                            <span className="text-white italic">Building Future</span>
                            <br />
                            <span className="text-neon-cyan italic">Innovators</span>
                            <span className="text-white italic"> with</span>
                            <br />
                            <span className="text-white italic">IoT, Robotics &amp; AI</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-dark-400 max-w-3xl mx-auto mb-12 text-balance">
                            Empowering students with hands-on education in cutting-edge technology.
                            From smart homes to autonomous drones, we make innovation accessible.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/programs">
                                <Button size="lg" className="group">
                                    Explore Programs
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="secondary" size="lg">
                                    Partner With Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <Section className="relative -mt-12 md:-mt-20 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="glass rounded-2xl p-6 text-center hover:border-neon-cyan/30 transition-all duration-300">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-6 h-6 text-neon-cyan" />
                                </div>
                                <div className="text-3xl font-bold text-neon-cyan mb-1 font-tech italic">
                                    {stat.value}
                                </div>
                                <div className="text-dark-400 text-sm font-tech italic">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Programs Section */}
            <Section>
                <SectionHeader
                    title="Our Programs"
                    subtitle="Comprehensive STEM curriculum designed to inspire curiosity and build practical skills"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full group cursor-pointer">
                                <CardContent className="p-6">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}
                                    >
                                        <program.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                        {program.title}
                                    </h3>
                                    <p className="text-dark-400 leading-relaxed">
                                        {program.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-neon-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Learn more
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/programs">
                        <Button variant="secondary" size="lg">
                            View All Programs
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </Section>

            {/* Why GenBots Section */}
            <Section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[100px]" />

                <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-tech italic">
                            Why Schools Choose{" "}
                            <span className="text-neon-cyan">GenBots</span>
                        </h2>
                        <p className="text-dark-400 text-lg mb-8 leading-relaxed">
                            We don&apos;t just teach technology — we inspire innovation. Our
                            hands-on approach ensures students learn by doing, building
                            real-world projects that prepare them for the future.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Industry-aligned curriculum developed by experts",
                                "Low-cost educational IoT kits for every student",
                                "Complete lab setup and teacher training",
                                "Continuous support and curriculum updates",
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                                    </div>
                                    <span className="text-dark-300">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link href="/why-genbots">
                                <Button size="lg">
                                    Discover More
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50 p-8 flex items-center justify-center">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Central icon */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-32 h-32 rounded-full border border-dashed border-dark-600"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-52 h-52 rounded-full border border-dashed border-dark-700"
                                />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-72 h-72 rounded-full border border-dashed border-dark-700/50"
                                />

                                {/* Center logo */}
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-glow-lg">
                                    <Cpu className="w-12 h-12 text-dark-900" />
                                </div>

                                {/* Orbiting icons */}
                                {[Bot, Plane, Code, Brain].map((Icon, index) => (
                                    <motion.div
                                        key={index}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 15 + index * 3,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <div
                                            className="absolute w-10 h-10 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center shadow-lg"
                                            style={{
                                                top: index === 0 ? "5%" : index === 2 ? "85%" : "50%",
                                                left: index === 1 ? "5%" : index === 3 ? "85%" : "50%",
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            <Icon className="w-5 h-5 text-neon-cyan" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-blue/20 to-neon-purple/20" />
                    <div className="absolute inset-0 backdrop-blur-3xl" />

                    <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-tech italic">
                            Ready to Transform Your School?
                        </h2>
                        <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-10">
                            Join 50+ schools already building the future with GenBots. Schedule
                            a consultation to learn how we can bring world-class STEM education
                            to your institution.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="group">
                                    Schedule a Demo
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="secondary" size="lg">
                                    Learn About Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
}
