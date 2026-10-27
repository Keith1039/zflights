import {lazy, Suspense} from "react";
import type {Deal} from "~/models/Deal";
import type {DealGroup} from "~/models/DealGroup";

const dealsToDealGroups = (deals: Deal[]): [Map<string, DealGroup>, Map<string, DealGroup>] => {
    const countryMap: Map<string, DealGroup> = new Map();
    const cityMap: Map<string, DealGroup> = new Map();
    // step 1: group deals by country
    for (const deal of deals) {
        const group = countryMap.get(deal.country)
        if (!group) {
            const newArr = new Array<Deal>()
            newArr.push(deal)
            countryMap.set(deal.country, {name: deal.country, deals: newArr} as DealGroup);
        } else {
            group.deals.push(deal)
        }

        const cityGroup = countryMap.get(deal.name)
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
    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                <div className="w-full h-17/20 absolute">
                    <WorldMap/>
                </div>
            </div>
        </Suspense>
    )
}