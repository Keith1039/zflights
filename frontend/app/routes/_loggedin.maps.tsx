import {lazy, Suspense} from "react";
import type {Deal} from "~/models/Deal";
import type {DealGroup} from "~/models/DealGroup";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {Route} from "../../.react-router/types/app/routes/+types/_loggedin.maps"
import api from "~/axios/api"
import {useLoaderData} from "react-router";

export async function clientLoader({}: Route.ClientLoaderArgs): Promise<Deal[]> {
    const res = await api.get("/deals")
    return res.data as Deal[]
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
    return <div>Loading...</div>;
}

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

    const deals = useLoaderData<Deal[]>()
    const [clusterMap, dealMap] = dealsToDealGroups(deals);
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