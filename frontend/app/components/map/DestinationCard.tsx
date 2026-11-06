import type {Deal} from "~/models/Deal";
import {dateConverter, durationConverter, round} from "~/utils/utils";

export default function DestinationCard({ deal }: { deal: Deal }) {
    const hasDiscount = deal.discount_percentage !== 0;
    const realDiscount = 1 - deal.discount_percentage / 100;
    const originalPrice = hasDiscount
        ? round(deal.price / realDiscount)
        : 0;

    const flightDuration = durationConverter(deal.flight_duration);
    const outboundDate = dateConverter(deal.outbound_date);
    const returnDate = dateConverter(deal.return_date);

    return (
        <a
            href={deal.flight_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[460px] max-w-[calc(100vw-40px)] min-h-[190px] overflow-hidden rounded-xl border border-white/10 bg-[#0D1221] text-white shadow-2xl shadow-black/40 transition-all hover:border-indigo-400/40"
        >
            {/* Image */}
            <div className="relative w-[48%] min-h-[190px] shrink-0 overflow-hidden">
                <img
                    src={deal.thumbnail}
                    alt={deal.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {hasDiscount && (
                    <div className="absolute left-2 top-2 rounded-md bg-emerald-500 px-2 py-1 text-md font-bold text-white shadow-lg">
                        -{deal.discount_percentage}%
                    </div>
                )}

                <div className="absolute bottom-3 left-3 right-2">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-white/70">
                        {deal.country}
                    </p>
                    <h3 className="mt-0.5 text-xl font-bold leading-tight text-white">
                        {deal.name}
                    </h3>
                </div>
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5">

                {/* Price + Dates */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                            Round trip
                        </p>

                        <div className="mt-0.5 flex items-baseline gap-1">
                            <span className="text-2xl font-bold tracking-tight text-white">
                                ${deal.price}
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">
                                CAD
                            </span>
                        </div>

                        {hasDiscount && (
                            <p className="text-[10px] text-slate-500 line-through">
                                ${originalPrice} CAD
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                            Dates
                        </p>
                        <p className="mt-1 whitespace-nowrap text-[10px] font-semibold text-slate-200">
                            {outboundDate}
                        </p>
                        <p className="mt-1 whitespace-nowrap text-[10px] font-semibold text-slate-200">
                            to
                        </p>
                        <p className="text-[10px] text-slate-400">
                            {returnDate}
                        </p>
                    </div>
                </div>

                <div className="my-2 border-t border-white/[0.08]" />

                {/* Flight Details */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                        <span>{deal.departure_airport_code}</span>
                        <span className="text-indigo-400">→</span>
                        <span>{deal.arrival_airport_code}</span>
                    </div>

                    <span className="text-[10px] text-slate-400">
                        {deal.stops === 0
                            ? "Nonstop"
                            : `${deal.stops} ${deal.stops === 1 ? "stop" : "stops"}`}
                    </span>
                </div>

                <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                        ◷ {flightDuration}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 transition-colors group-hover:text-indigo-300">
                        View deal
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </span>
                </div>
            </div>
        </a>
    );
}

