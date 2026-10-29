import type {Route} from "../../.react-router/types/app/routes/+types/_loggedin.deals";
import type {Deal} from "~/models/Deal";
import api from "~/axios/api";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {DealGroup} from "~/models/DealGroup";
import {lazy, Suspense} from "react";
import {useLoaderData} from "react-router";

export async function clientLoader({}: Route.ClientLoaderArgs): Promise<Deal[]> {
    const res = await api.get("/deals")
    return res.data as Deal[]
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
    return <div>Loading...</div>;
}

const dealsToDealGroups = (deals: Deal[]): Map<string, DealGroup> => {
    const countryMap: Map<string, DealGroup> = new Map();
    // step 1: group deals by country
    for (const deal of deals) {
        const countryGroup = countryMap.get(deal.country)
        if (!countryGroup) {
            const newArr = new Array<Deal>()
            newArr.push(deal)
            countryMap.set(deal.country, {name: deal.country, deals: newArr} as DealGroup);
        } else {
            countryGroup.deals.push(deal)
        }

    }
    return countryMap
}

const WorldMap = lazy(() => import("~/components/map/BlankMap"))

export default function (){
    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }

    const deals = useLoaderData<Deal[]>()

    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                <div className="absolute left-8/10 w-2/10 h-17/20 bg-gray-600 z-10000000 overflow-y-auto">

                </div>
                <div className="w-full h-17/20 absolute">
                    <WorldMap/>
                </div>
            </div>
        </Suspense>
    )
}