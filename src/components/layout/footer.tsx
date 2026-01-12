import Link from "next/link";
import { Cpu, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
    company: [
        { href: "/about", label: "About Us" },
        { href: "/programs", label: "Programs" },
        { href: "/projects", label: "Projects" },
        { href: "/why-genbots", label: "Why GenBots" },
    ],
    programs: [
        { href: "/programs#iot", label: "IoT & Smart Home" },
        { href: "/programs#robotics", label: "Robotics" },
        { href: "/programs#drones", label: "Drone Engineering" },
        { href: "/programs#python", label: "Python Programming" },
        { href: "/programs#ai", label: "AI-IoT Systems" },
    ],
    contact: [
        { icon: Mail, text: "hello@genbots.edu", href: "mailto:hello@genbots.edu" },
        { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
        { icon: MapPin, text: "Bangalore, India", href: "#" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/genbots", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/genbots", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/genbots", label: "GitHub" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-dark-950 border-t border-dark-800/50">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center shadow-glow">
                                <Cpu className="w-6 h-6 text-dark-900" />
                            </div>
                            <span className="text-xl font-bold text-white">GenBots</span>
                        </Link>
                        <p className="text-dark-400 text-sm leading-relaxed mb-6">
                            Empowering the next generation with hands-on STEM education through
                            IoT, robotics, and AI-integrated learning experiences.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-dark-400 hover:text-neon-cyan hover:bg-dark-700 hover:shadow-glow transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-neon-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Programs</h4>
                        <ul className="space-y-3">
                            {footerLinks.programs.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-neon-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            {footerLinks.contact.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-3 text-dark-400 hover:text-neon-cyan transition-colors text-sm group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-colors">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-dark-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-sm">
                        © {currentYear} GenBots. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-dark-500 hover:text-dark-300 text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-dark-500 hover:text-dark-300 text-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
