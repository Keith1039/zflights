import type {Deal} from "~/models/Deal";
import {dateConverter, durationConverter, round} from "~/utils/utils";

export default function ListDestinationCard({deal}: {deal: Deal}) {
    const hasDiscount = deal.discount_percentage !== 0
    const realDiscount = round(1 - (deal.discount_percentage / 100))
    const originalPrice = hasDiscount ? round(deal.price / realDiscount) : 0;
    const flightDuration = durationConverter(deal.flight_duration)

    const outboundDate = dateConverter(deal.outbound_date)
    const returnDate = dateConverter(deal.return_date)
    return (
        <div className="flex flex-col w-full h-2/10 hover:opacity-75">
            <div className="w-full h-8/10 bg-blue-400">
                <div className="h-full w-full">
                    <img src={deal.thumbnail} className="h-full w-full opacity-90" alt="HTML 5 ICON"/>
                    <div className="flex flex-col relative max-h-4/10 top-7/7 items-center left-1/30 z-50">
                        <div className="text-xl text-white font-bold self-start">{deal.name}</div>
                        <div className="text-xs text-white self-start">{deal.country}</div>
                    </div>
                    {hasDiscount && <div className="flex flex-col w-full relative -top-13/10 z-50">
                        <div className="text-xl text-white text-right font-bold m-2 pr-6 bg-green-600 rounded-b-md">{deal.discount_percentage}% off</div>
                    </div>}
                </div>
            </div>
            <div className="w-full h-3/10 bg-green-600">
                <div className="w-full h-1/2"> row 1</div>
                <div className="w-full h-1/2"> row 2</div>
            </div>
        </div>
    )
}