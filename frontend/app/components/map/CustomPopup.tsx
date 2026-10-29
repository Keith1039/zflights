import type {Deal} from "~/models/Deal";
import DestinationCard from "~/components/map/DestinationCard";

export default function CustomPopup({deals}: {deals: Deal[]}) {
    return (
        <div>
            <ul className="content-center">
                {deals.map((deal) => (
                    <li className="w-full font-bold text-center cursor-pointer">
                        <DestinationCard deal={deal} />
                    </li>
                ))}
            </ul>
        </div>
    )
}