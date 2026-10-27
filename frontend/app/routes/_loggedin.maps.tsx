import {lazy, Suspense} from "react";
import type {Deal} from "~/models/Deal";
import type {DealGroup} from "~/models/DealGroup";

const dealsToDealGroups = (deals: Deal[]): DealGroup[] => {
    const m: Map<string, DealGroup> = new Map();

    // step 1: group deals by country
    for (const deal of deals) {
        let group = m.get(deal.country)
        if (!group) {
            const newArr = new Array<Deal>()
            newArr.push(deal)
            m.set(deal.country, {country: deal.country, deals: newArr} as DealGroup);
        } else {
            group.deals.push(deal)
        }
    }

    const groupArray: DealGroup[] = []
    // step 2: export map as array
    for (const [, group] of m) {
        groupArray.push(group)
    }
    return groupArray;
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