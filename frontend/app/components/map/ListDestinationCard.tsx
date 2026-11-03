import type {Deal} from "~/models/Deal";
import {dateConverter, durationConverter, round} from "~/utils/utils";
import {Bookmark} from "lucide-react"

export default function ListDestinationCard({deal}: {deal: Deal}) {
    const hasDiscount = deal.discount_percentage !== 0
    const realDiscount = round(1 - (deal.discount_percentage / 100))
    const originalPrice = hasDiscount ? round(deal.price / realDiscount) : 0;
    const flightDuration = durationConverter(deal.flight_duration)

    const outboundDate = dateConverter(deal.outbound_date)
    const returnDate = dateConverter(deal.return_date)
    return (
        <div className="w-full min-h-0 h-2/10 max-h-2/10 mb-2">
            <div className="w-full h-18/20">
                <div className="h-full w-full relative">
                    <a href={deal.flight_link} target="_blank" className="hover:opacity-85">
                        <img src={deal.thumbnail} className="min-h-0 h-full w-full" alt="HTML 5 ICON"/>
                    </a>
                    <div className="flex flex-col absolute top-8/10 items-center left-1/30 z-50">
                        <div className="text-2xl text-white font-bold self-start">{deal.name}</div>
                        <div className="text-md text-white self-start">{deal.country}</div>
                    </div>
                    {hasDiscount && <div className="flex flex-col w-full absolute top-0 z-50">
                        <div className="text-xl text-white text-right font-bold pr-6 bg-green-600 rounded-b-md">{deal.discount_percentage}% off</div>
                    </div>}
                    <div className="absolute top-26/30 left-27/30">
                        <Bookmark
                            className="cursor-pointer h-12/10 w-12/10 hover:opacity-75 hover:fill-black"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-2/20 bg-gray-400 border-solid border-2 rounded-b-md">
                <div className="flex text-white flex-row justify-evenly h-1/2 w-full text-md">
                    <div className="text-md"> {outboundDate} - {returnDate}</div>
                    {hasDiscount && <div className="line-through"> CAD${originalPrice}</div>}
                    {hasDiscount  && <div> CAD${deal.price}</div>}
                    {!hasDiscount && <div>CAD${deal.price}</div>}
                </div>
                <div className="flex text-white flex-row justify-evenly h-1/2 w-full text-md">
                    <div> {deal.stops} {deal.stops === 1 ? "Stop" : "Stops"}</div>
                    <div> {flightDuration}</div>
                    <div> {deal.departure_airport_code} → {deal.arrival_airport_code}</div>
                </div>
            </div>
        </div>
    )
}