import type {Deal} from "~/models/Deal";

const round = (num: number): number => Math.round(num * 100) / 100
export default function DestinationCard({deal}: {deal: Deal}) {
    const realDiscount = round(1 - (deal.discount_percentage / 100))
    const originalPrice = deal.discount_percentage == 0 ? 0 : round(deal.price / realDiscount);
    return (
        <a href="#" className="">
            <div className="flex flex-col h-53 w-79.5 bg-gray-600 rounded-md">
                <div className="h-8/10 w-full">
                    <div className="h-full w-full">
                        <img src={deal.thumbnail} className="h-full w-full opacity-90" alt="HTML 5 ICON"/>
                        <div className="flex flex-col relative max-h-4/10 -top-2/7 items-center left-1/30 z-50">
                            <div className="text-xl text-white font-bold self-start">{deal.name}</div>
                            <div className="text-xs text-white self-start">{deal.country}</div>
                        </div>
                        {deal.discount_percentage !== 0 && <div className="flex flex-col relative -top-12/10 z-50">
                            <div className="text-xl text-white text-right font-bold">{deal.discount_percentage}%</div>
                        </div>}
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="flex text-white flex-row justify-evenly h-1/2 w-full">
                        <div className="text-xs"> Start Date - End Date</div>
                        {originalPrice > 0 && <div className="text-xs line-through"> CAD${originalPrice}</div>}
                        {originalPrice > 0 && <div className="text-xs"> CAD${deal.price}</div>}
                        {originalPrice == 0 && <div className="text-xs">CAD${deal.price}</div>}
                    </div>
                    <div className="flex text-white flex-row justify-evenly h-1/2 w-full">
                        <div className="text-xs"> {deal.stops} Stops</div>
                        <div className="text-xs"> Duration</div>
                        <div className="text-xs"> {deal.departure_airport_code} → {deal.arrival_airport_code}</div>
                    </div>
                </div>
            </div>
        </a>
    )
}