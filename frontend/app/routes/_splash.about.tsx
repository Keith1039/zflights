
export default function About() {
    return (
        <main className="relative z-20 min-h-full overflow-hidden bg-[#080B14] text-white">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute -left-40 top-[600px] h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">

                {/* Fictional Disclaimer */}
                <div className="mb-12 flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] px-4 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                        ⚠
                    </span>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                            Fictional company disclaimer
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                            This is a fictional company created for demonstration
                            purposes. Our story, team, statistics, and achievements
                            are entirely made up. No actual travel company exists here.
                        </p>
                    </div>
                </div>

                {/* Hero */}
                <section className="mb-24 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        A completely fictional travel company
                    </div>

                    <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        We're here to help you
                        <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            fly somewhere.
                        </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                        We believe the world is too big to stay in one place.
                        Our entirely imaginary team is on a mission to make
                        discovering flight deals feel effortless.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <a
                            href="#our-story"
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            Discover our story
                        </a>
                        <a
                            href="#our-mission"
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                        >
                            What we believe
                        </a>
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-24 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[
                        { value: "∞", label: "Imaginary destinations" },
                        { value: "0", label: "Real employees" },
                        { value: "100%", label: "Made-up statistics" },
                        { value: "1", label: "Very fictional mission" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 p-5 text-center"
                        >
                            <p className="text-3xl font-bold text-indigo-400 sm:text-4xl">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Our Story */}
                <section id="our-story" className="mb-24 grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                            Our story
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Born from a love of travel.
                            <span className="text-slate-500"> And a suspicious amount of coffee.</span>
                        </h2>

                        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
                            <p>
                                Legend has it that our company was founded in
                                a tiny apartment by three fictional friends
                                who shared one very real problem: flight
                                prices were confusing.
                            </p>

                            <p>
                                After approximately 47 imaginary brainstorming
                                sessions, countless fictional cups of coffee,
                                and one extremely questionable business plan,
                                our imaginary platform was born.
                            </p>

                            <p>
                                Today, we continue our completely fabricated
                                journey of making travel discovery simpler,
                                smarter, and a little more exciting.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-[#111827] to-purple-500/20 p-8 sm:p-12">
                        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

                        <div className="relative flex min-h-64 flex-col items-center justify-center text-center">
                            <span className="text-7xl">✈️</span>
                            <h3 className="mt-6 text-2xl font-bold">
                                The sky isn't the limit.
                            </h3>
                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                                Unless you're flying commercially.
                                Then there are probably some regulations.
                            </p>
                            <span className="mt-6 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                An entirely fictional philosophy
                            </span>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section id="our-mission" className="mb-24">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                            Our mission
                        </p>
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Making the world feel a little smaller.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Three completely fabricated principles guide
                            everything we pretend to do.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: "🌍",
                                title: "Explore more",
                                description:
                                    "The world is full of incredible places. We think finding your next destination should be part of the adventure.",
                            },
                            {
                                icon: "💸",
                                title: "Travel smarter",
                                description:
                                    "Nobody enjoys overpaying for flights. Our imaginary algorithms are dedicated to finding imaginary opportunities.",
                            },
                            {
                                icon: "✈️",
                                title: "Fly freely",
                                description:
                                    "Whether it's a spontaneous weekend away or a dream vacation, we believe every journey starts somewhere.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="mb-24">
                    <div className="mb-10 text-center">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                            Meet the team
                        </p>
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Real talent. Fake people.
                        </h2>
                        <p className="mt-4 text-sm text-slate-400">
                            Every single one of these people is fictional.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        {[
                            {
                                name: "Alex Wander",
                                role: "Chief Daydreamer",
                                emoji: "🧑‍✈️",
                                description: "Responsible for having big ideas and absolutely no real passport stamps.",
                            },
                            {
                                name: "Sam Skies",
                                role: "Head of Imaginary Deals",
                                emoji: "🧑‍💻",
                                description: "Finds fictional bargains at prices that are almost too good to be true.",
                            },
                            {
                                name: "Jamie Miles",
                                role: "Director of Getting Lost",
                                emoji: "🧭",
                                description: "Believes getting lost is just another way of discovering somewhere new.",
                            },
                        ].map((person) => (
                            <div
                                key={person.name}
                                className="rounded-2xl border border-white/[0.08] bg-[#0D1221]/80 p-7 text-center"
                            >
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-4xl">
                                    {person.emoji}
                                </div>
                                <h3 className="mt-5 text-lg font-bold">
                                    {person.name}
                                </h3>
                                <p className="mt-1 text-xs font-semibold text-indigo-400">
                                    {person.role}
                                </p>
                                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                                    {person.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-600/20 to-purple-600/10 px-6 py-16 text-center sm:px-12">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

                    <div className="relative">
                        <span className="text-4xl">🌎</span>
                        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                            Your next adventure awaits.
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
                            At least, it would if we were a real travel
                            company. But hey, the possibilities are endless.
                        </p>

                        <a
                            href="/"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            Back to exploring
                            <span>→</span>
                        </a>
                    </div>
                </section>

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
        </main>
    );
}

