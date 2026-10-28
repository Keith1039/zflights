import {lazy, Suspense} from "react";
import type {Deal} from "~/models/Deal";
import type {DealGroup} from "~/models/DealGroup";
import type {MarkerLocation} from "~/models/MarkerLocation";

export const deals: Deal[] = [
    {
        name: "Venice",
        country: "Italy",
        lat: 45.438759,
        lng: 12.3155,
        thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8JcCEIpEBg_D8GkNQSau9r8UzlW-7j11JL_ZSPSXstFlskl6z-upKYRr1sOEsngb5YJ4FBQ",
        outbound_date: "2026-05-10",
        return_date: "2026-05-28",
        price: 2000,
        discount_percentage: 30,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
    {
        name: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaFaJgBg6yRLAHTafGG4DMlv2vqVqDP7ERphRoaXGXig5LAs9fcSpvvc7s7Jj6jpyBDxppRA",
        outbound_date: "2026-08-07",
        return_date: "2026-08-14",
        price: 2000,
        discount_percentage: 10,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
    {
        name: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUHuut-NJARaBeb_5EfY45W1iXEm8nkJSEnHiRmWfW35MCaBTQeqqI_fw4-W57Ca7CNjOIZg",
        outbound_date: "2026-05-20",
        return_date: "2026-05-27",
        price: 1400,
        discount_percentage: 0,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
]

const dealsToDealGroups = (deals: Deal[]): [Map<string, Map<string, MarkerLocation>>, Map<string, DealGroup>] => {
    const countryMap: Map<string, Map<string, MarkerLocation>> = new Map();
    const cityMap: Map<string, DealGroup> = new Map();
    // step 1: group deals by country
    for (const deal of deals) {
        const group = countryMap.get(deal.country)
        if (!group) {
            const m = new Map<string, MarkerLocation>();
            m.set(deal.name, {name: deal.name, lat: deal.lat, lng: deal.lng} as MarkerLocation);
            countryMap.set(deal.country, m);

        } else {
            const isIn = group.get(deal.name) !== undefined;
            if (!isIn) {
                group.set(deal.name, {name: deal.name, lat: deal.lat, lng: deal.lng} as MarkerLocation)
            }
        }

        const cityGroup = cityMap.get(deal.name)
        if (!cityGroup) {
            const newArr = new Array<Deal>()
            newArr.push(deal)
            cityMap.set(deal.name, {name: deal.name, deals: newArr} as DealGroup);
        } else {
            cityGroup.deals.push(deal)
        }

    }

    return [countryMap, cityMap];
}

const WorldMap = lazy(() => import("~/components/map/WorldMap"))
export default function (){

    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }
    const [clusterMap, dealMap] = dealsToDealGroups(deals);
    console.log("Cities in Italy are...")
    console.log(clusterMap.get("Italy"))

    console.log("Rome metadata...")
    console.log(dealMap.get("Rome")?.deals)
    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                <div className="w-full h-17/20 absolute">
                    <WorldMap clusterMap={clusterMap} dealMap={dealMap} />
                </div>
            </div>
        </Suspense>
    )
}