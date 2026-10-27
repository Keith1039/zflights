import type {Deal} from "~/models/Deal";

export default function DestinationCard({deal}: {deal: Deal}) {
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
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="flex text-white flex-row justify-evenly h-1/2 w-full">
                        <div className="text-xs"> Start Date - End Date</div>
                        <div className="text-xs"> Original price</div>
                        <div className="text-xs"> Reduced Price</div>
                    </div>
                    <div className="flex text-white flex-row justify-evenly h-1/2 w-full">
                        <div className="text-xs"> X Stops</div>
                        <div className="text-xs"> Duration</div>
                        <div className="text-xs"> Airport A → Airport B</div>
                    </div>
                </div>
            </div>
        </a>
    )
}