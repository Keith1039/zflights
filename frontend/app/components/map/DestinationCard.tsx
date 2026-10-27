import type {Deal} from "~/models/Deal";
import Logo from "~/components/Logo";

export default function DestinationCard({deal}: {deal: Deal}) {
    return (
        <a href="#">
            <div className="flex flex-col h-53 w-79.5 bg-gray-400 rounded-md ">
                <div className="h-7/10 w-full bg-blue-400">
                    <div className="h-full w-full bg-black-400">
                        <img src={deal.thumbnail} className="h-full w-full" alt="HTML 5 ICON"/>
                        <div className="flex flex-row relative max-h-4/10 -top-2/9 items-center gap-2 left-1/30 z-50">
                            <div className="text-xl text-black font-bold self-start">City</div>
                            <div className="text-xs text-black self-end">Country</div>
                        </div>
                    </div>
                </div>
                <div className="h-3/10 w-full bg-green-400">

                </div>
            </div>
        </a>
    )
}