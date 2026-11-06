import { Link } from "react-router";
import HomeNavbar from "~/components/navbar/HomeNavbar";
import Threads from "~/components/Threads";

export default function HomePage() {
    return (
        <div className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-slate-950">

            {/* Animated Background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black">
                <Threads
                    color="#ffffff"
                    lineCount={90}
                    thickness={0.6}
                    softness={1.3}
                    amplitude={1.7}
                    distance={0.4}
                    waves={1.05}
                    speed={0.6}
                    split={0.04}
                    fray={0.5}
                    angle={0}
                    taper={0.85}
                    brightness={1.4}
                    parting={0}
                    fade={0}
                    opacity={1}
                    seed={0}
                    className="min-h-dvh w-full"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.55)_100%)]" />
            </div>

            <header className="relative z-20">
                <HomeNavbar />
            </header>

            <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-16 text-center">

                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs font-medium tracking-wide text-white/80">
                        Your next adventure starts here
                    </span>
                </div>

                <h1 className="max-w-5xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                    Here to help
                    <br />
                    you{" "}
                    <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">
                        fly.
                    </span>
                </h1>

                <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                    Discover incredible destinations, find flights worth
                    travelling for, and turn those faraway places into your
                    next adventure.
                </p>

                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                    <Link
                        to="/deals"
                        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-indigo-500/30 sm:w-auto"
                    >
                        Explore flight deals
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14m-7-7 7 7-7 7"
                            />
                        </svg>
                    </Link>

                    <Link
                        to="/about"
                        className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/[0.05] px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
                    >
                        Learn more
                    </Link>
                </div>

                <div className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">

                    <div className="flex flex-col items-center gap-2">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10V6l7-3 7 3v4M5 10v10m14-10v10M3 20h18" />
                        </svg>
                        <span className="text-xs font-semibold text-white sm:text-sm">
                            Great destinations
                        </span>
                        <span className="hidden text-xs text-slate-500 sm:block">
                            Explore the world
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 border-x border-white/10">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.5 0-4 1-4 2.5S9.5 13 12 13s4 1 4 2.5S14.5 18 12 18m0-10V5m0 13v2m9-8a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-semibold text-white sm:text-sm">
                            Better prices
                        </span>
                        <span className="hidden text-xs text-slate-500 sm:block">
                            Travel for less
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 16l20-5-8-4-3-5-2 1 2 5-7 2-2-2-2 1 3 7z" />
                        </svg>
                        <span className="text-xs font-semibold text-white sm:text-sm">
                            New adventures
                        </span>
                        <span className="hidden text-xs text-slate-500 sm:block">
                            Find your next trip
                        </span>
                    </div>

                </div>
            </main>

            <footer className="relative z-10 flex items-center justify-center px-6 py-5">
                <p className="text-xs text-slate-500">
                    Made for those who were born to explore.
                </p>
            </footer>
        </div>
    );
}