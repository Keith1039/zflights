
import { useState } from "react";
import { Link } from "react-router";
import {
    Plane,
    Mail,
    MessageCircle,
    MapPin,
    Phone,
    Clock,
    ArrowRight,
    Send,
} from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const contactInfo = [
        {
            icon: Mail,
            title: "Email us",
            detail: "hello@aerofind.com",
            description: "Drop us an email anytime.",
        },
        {
            icon: Phone,
            title: "Call us",
            detail: "+1 (800) 555-0192",
            description: "Mon – Fri, 9am – 6pm.",
        },
        {
            icon: MapPin,
            title: "Our office",
            detail: "New York, USA",
            description: "We're always happy to connect.",
        },
        {
            icon: Clock,
            title: "Support hours",
            detail: "24/7 Online",
            description: "We're here whenever you need us.",
        },
    ];

    return (
        <div className="relative z-20 min-h-full overflow-hidden bg-[#080B14] text-white">

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center">
                <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            WE'RE HERE TO HELP
          </span>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        Let's get you
                        <br />
                        <span className="text-indigo-400">
              going places.
            </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-indigo-100/60 sm:text-lg">
                        Whether you have a question, need some help finding
                        a flight, or just want to say hello, our team is
                        always ready to help.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-5">

                {/* Contact Information */}
                <div className="space-y-8 lg:col-span-2">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Get in touch
                        </h2>
                        <p className="mt-3 leading-7 text-indigo-100/50">
                            Have something on your mind? Reach out through
                            any of the channels below. We'd love to hear
                            from you.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        {contactInfo.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-indigo-400/40 hover:bg-indigo-500/[0.08]"
                                >
                                    <div className="rounded-xl bg-indigo-500/15 p-3 text-indigo-400 transition group-hover:bg-indigo-500 group-hover:text-white">
                                        <Icon size={22} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-indigo-300">
                                            {item.detail}
                                        </p>
                                        <p className="mt-1 text-xs text-indigo-100/40">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-indigo-400/20 p-2 text-indigo-300">
                                <MessageCircle size={20} />
                            </div>
                            <h3 className="font-semibold">Need quick help?</h3>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-indigo-100/60">
                            Check out our support team for assistance with
                            finding flights and navigating AeroFind.
                        </p>

                        <a
                            href="mailto:hello@aerofind.com"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-white"
                        >
                            Contact support <ArrowRight size={16} />
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <div className="rounded-3xl border border-white/10 bg-[#191940] p-6 shadow-2xl shadow-black/20 sm:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">
                                Send us a message
                            </h2>
                            <p className="mt-2 text-sm text-indigo-100/50">
                                Fill out the form and we'll get back to you
                                as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Contact form:", form);
                            alert("Thanks for reaching out! We'll be in touch.");
                            setForm({ name: "", email: "", subject: "", message: "" });
                        }} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-indigo-100/80">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => {
                                            setForm({ ...form, [e.target.name]: e.target.value });
                                        }}
                                        placeholder="John Doe"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-[#10102B] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-indigo-100/25 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-indigo-100/80">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(e) => {
                                            setForm({ ...form, [e.target.name]: e.target.value });
                                        }}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-[#10102B] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-indigo-100/25 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-indigo-100/80">
                                    Subject
                                </label>
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={(e) => {
                                        setForm({ ...form, [e.target.name]: e.target.value });
                                    }}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#10102B] px-4 py-3.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <option value="" disabled>
                                        Select a subject
                                    </option>
                                    <option value="flight-search">Flight search</option>
                                    <option value="technical">Technical issue</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-indigo-100/80">
                                    Your message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={(e) => {
                                        setForm({ ...form, [e.target.name]: e.target.value });
                                    }}
                                    placeholder="Tell us how we can help..."
                                    rows={6}
                                    required
                                    className="w-full resize-none rounded-xl border border-white/10 bg-[#10102B] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-indigo-100/25 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-500 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 active:translate-y-0"
                            >
                                Send Message
                                <Send size={18} />
                            </button>

                            <p className="text-center text-xs text-indigo-100/30">
                                By submitting, you agree to be contacted by
                                the AeroFind support team.
                            </p>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer */}
            {/* Disclaimer Footer */}
            <footer className="mt-16 border-t border-white/[0.08] pt-8 text-center">
                <p className="text-xs font-semibold text-amber-400">
                    Disclaimer: This company is entirely fictional.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                    All names, characters, statistics, stories, and claims
                    on this page are invented. This is a demonstration
                    project, not a real travel agency.
                </p>
                <p className="mt-5 text-[10px] text-slate-600">
                    © {new Date().getFullYear()} Imaginary Airlines & Co.
                    — Probably not flying anywhere.
                </p>
            </footer>
        </div>
    );
}

