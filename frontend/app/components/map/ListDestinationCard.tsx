import type {Deal} from "~/models/Deal";
import {dateConverter, durationConverter, round} from "~/utils/utils";
import {Bookmark} from "lucide-react"


export default function ListDestinationCard({ deal }: { deal: Deal }) {
    const hasDiscount = deal.discount_percentage !== 0;
    const realDiscount = 1 - deal.discount_percentage / 100;
    const originalPrice = hasDiscount
        ? round(deal.price / realDiscount)
        : 0;

    const flightDuration = durationConverter(deal.flight_duration);
    const outboundDate = dateConverter(deal.outbound_date);
    const returnDate = dateConverter(deal.return_date);

    return (
        <div className="group mb-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D1221] shadow-lg shadow-black/20 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-black/30">

            {/* Destination Image */}
            <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-80">

                <a
                    href={deal.flight_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                >
                    <img
                        src={deal.thumbnail}
                        alt={`${deal.name}, ${deal.country}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </a>

                {/* Image Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B14] via-black/10 to-black/20" />

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg backdrop-blur-md">
                        <span>↓</span>
                        {deal.discount_percentage}% OFF
                    </div>
                )}

                {/* Bookmark Button */}
                <button
                    type="button"
                    aria-label="Bookmark destination"
                    className="absolute right-4 top-16 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white hover:text-indigo-600"
                >
                    <Bookmark className="h-5 w-5" />
                </button>

                {/* Destination Information */}
                <div className="pointer-events-none absolute bottom-5 left-6 right-6">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        {deal.country}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">
                        {deal.name}
                    </h2>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 sm:p-6">

                {/* Price and Dates */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    {/* Price */}
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Round trip
                        </p>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold tracking-tight text-white">
                                ${deal.price}
                            </span>

                            <span className="text-sm font-medium text-slate-400">
                                CAD
                            </span>

                            {hasDiscount && (
                                <span className="ml-1 text-sm text-slate-500 line-through">
                                    ${originalPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path d="M16 3v4M8 3v4M3 11h18" />
                            </svg>
                        </div>

                        <div>
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                Travel dates
                            </p>
                            <p className="text-sm font-semibold text-slate-200">
                                {outboundDate} – {returnDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-white/[0.08]" />

                {/* Flight Information */}
                <div className="flex flex-wrap items-center justify-between gap-5">

                    {/* Stops */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <circle cx="6" cy="12" r="2" />
                                <circle cx="18" cy="12" r="2" />
                                <path d="M8 12h8" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                Stops
                            </p>
                            <p className="text-sm font-semibold text-slate-200">
                                {deal.stops === 0
                                    ? "Nonstop"
                                    : `${deal.stops} ${deal.stops === 1 ? "Stop" : "Stops"}`}
                            </p>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                Duration
                            </p>
                            <p className="text-sm font-semibold text-slate-200">
                                {flightDuration}
                            </p>
                        </div>
                    </div>

                    {/* Airports */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="M2 16l20-5-8-4-3-5-2 1 2 5-7 2-2-2-2 1 3 7z" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                Route
                            </p>
                            <p className="text-sm font-semibold text-slate-200">
                                {deal.departure_airport_code}
                                <span className="mx-2 text-indigo-400">→</span>
                                {deal.arrival_airport_code}
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href={deal.flight_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/30"
                    >
                        <div className="text-white">
                            View flight deal
                        </div>
                        <svg
                            className="h-4 w-4"
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
                    </a>
                </div>
            </div>
        </div>
    );
}
