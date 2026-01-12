"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Cpu,
    Bot,
    Plane,
    Code,
    Brain,
    ArrowRight,
    CheckCircle,
    Clock,
    Users,
    GraduationCap,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";

const programs = [
    {
        id: "iot",
        icon: Cpu,
        title: "IoT & Smart Home Automation",
        description:
            "Learn to build connected devices and smart home systems. From sensors to cloud connectivity, students master the complete IoT ecosystem.",
        duration: "40 Hours",
        level: "Beginner to Intermediate",
        ageGroup: "Grade 6-12",
        color: "from-neon-cyan to-cyan-600",
        topics: [
            "Introduction to IoT concepts",
            "Sensors and actuators",
            "Microcontroller programming",
            "WiFi and Bluetooth connectivity",
            "Cloud platforms and dashboards",
            "Smart home project development",
        ],
        outcomes: [
            "Build functional IoT devices",
            "Program microcontrollers",
            "Connect devices to the cloud",
            "Create smart automation systems",
        ],
    },
    {
        id: "robotics",
        icon: Bot,
        title: "Robotics & Autonomous Systems",
        description:
            "Design, build, and program robots that can navigate, sense, and interact with their environment autonomously.",
        duration: "50 Hours",
        level: "Intermediate",
        ageGroup: "Grade 7-12",
        color: "from-neon-blue to-blue-600",
        topics: [
            "Mechanical design principles",
            "Motor control systems",
            "Sensor integration",
            "Path planning algorithms",
            "Computer vision basics",
            "Autonomous navigation",
        ],
        outcomes: [
            "Design robot mechanisms",
            "Program autonomous behaviors",
            "Integrate multiple sensors",
            "Build competition-ready robots",
        ],
    },
    {
        id: "drones",
        icon: Plane,
        title: "Drone Engineering & Aerial Systems",
        description:
            "Master the complete drone lifecycle from assembly to autonomous flight programming and aerial photography.",
        duration: "45 Hours",
        level: "Intermediate to Advanced",
        ageGroup: "Grade 8-12",
        color: "from-neon-purple to-purple-600",
        topics: [
            "Aerodynamics fundamentals",
            "Drone assembly and calibration",
            "Flight controller programming",
            "GPS navigation",
            "Autonomous mission planning",
            "Safety and regulations",
        ],
        outcomes: [
            "Build drones from scratch",
            "Program flight controllers",
            "Execute autonomous missions",
            "Capture aerial imagery",
        ],
    },
    {
        id: "python",
        icon: Code,
        title: "Python Programming",
        description:
            "From basics to advanced concepts with hands-on projects. Learn the most in-demand programming language in the world.",
        duration: "60 Hours",
        level: "Beginner to Advanced",
        ageGroup: "Grade 5-12",
        color: "from-green-400 to-emerald-600",
        topics: [
            "Python fundamentals",
            "Data structures",
            "Object-oriented programming",
            "File handling and APIs",
            "GUI development",
            "Game development with Pygame",
        ],
        outcomes: [
            "Write Python programs",
            "Create interactive applications",
            "Build games and utilities",
            "Prepare for competitive coding",
        ],
    },
    {
        id: "ai",
        icon: Brain,
        title: "AI-Integrated IoT Systems",
        description:
            "Combine artificial intelligence with IoT to create intelligent automation systems that learn and adapt.",
        duration: "55 Hours",
        level: "Advanced",
        ageGroup: "Grade 9-12",
        color: "from-neon-pink to-pink-600",
        topics: [
            "Introduction to AI/ML",
            "Data collection and preprocessing",
            "Training ML models",
            "Edge AI deployment",
            "Computer vision integration",
            "Smart automation projects",
        ],
        outcomes: [
            "Train machine learning models",
            "Deploy AI on edge devices",
            "Create intelligent IoT systems",
            "Build real-world AI applications",
        ],
    },
];

export default function ProgramsPage() {
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
                            Our <span className="gradient-text">Programs</span>
                        </h1>
                        <p className="text-lg text-dark-400 max-w-3xl mx-auto">
                            Comprehensive STEM curriculum designed by industry experts.
                            Each program combines theory with hands-on projects.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Programs List */}
            <Section>
                <div className="space-y-20">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.id}
                            id={program.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="scroll-mt-24"
                        >
                            <div
                                className={`grid lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Program Info */}
                                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 shadow-lg`}
                                    >
                                        <program.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        {program.title}
                                    </h2>
                                    <p className="text-dark-400 text-lg mb-6 leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-sm text-dark-300">
                                            <Clock className="w-4 h-4 text-neon-cyan" />
                                            {program.duration}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-dark-300">
                                            <GraduationCap className="w-4 h-4 text-neon-cyan" />
                                            {program.level}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-dark-300">
                                            <Users className="w-4 h-4 text-neon-cyan" />
                                            {program.ageGroup}
                                        </div>
                                    </div>

                                    {/* Outcomes */}
                                    <div className="mb-8">
                                        <h4 className="text-white font-semibold mb-4">
                                            What Students Will Learn:
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {program.outcomes.map((outcome, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                                                    <span className="text-dark-300 text-sm">{outcome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link href="/contact">
                                        <Button className="group">
                                            Enroll Your School
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Topics Card */}
                                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                    <Card className="sticky top-28">
                                        <CardContent className="p-8">
                                            <h4 className="text-lg font-semibold text-white mb-6">
                                                Curriculum Topics
                                            </h4>
                                            <div className="space-y-4">
                                                {program.topics.map((topic, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/50 border border-dark-700/50"
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${program.color} flex items-center justify-center text-white text-sm font-bold`}
                                                        >
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-dark-300 text-sm">{topic}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < programs.length - 1 && (
                                <div className="mt-20 border-t border-dark-800/50" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section className="bg-dark-900/50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-dark-400 max-w-2xl mx-auto mb-8">
                        Contact us to learn more about our programs and how we can customize
                        them for your school&apos;s needs.
                    </p>
                    <Link href="/contact">
                        <Button size="lg">Schedule a Consultation</Button>
                    </Link>
                </motion.div>
            </Section>
        </PageWrapper>
    );
}
