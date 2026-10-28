import type {Deal} from "~/models/Deal";
import DestinationCard from "~/components/map/DestinationCard";
import {deals} from "~/components/map/WorldMap";

export default function CustomPopup({deals}: {deals: Deal[]}) {
    return (
        <div>
            <ul className="border-solid border-2 rounded-md content-center">
                {deals.map((deal) => (
                    <li className="w-full border-solid border-b font-bold text-center cursor-pointer">
                        <DestinationCard deal={deal} />
                    </li>
                ))}
            </ul>
        </div>
    )
}