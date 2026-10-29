import type {Route} from "../../.react-router/types/app/routes/+types/_loggedin.deals";
import type {Deal} from "~/models/Deal";
import api from "~/axios/api";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {DealGroup} from "~/models/DealGroup";
import {lazy, Suspense, useState} from "react";
import {useLoaderData} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import DestinationCard from "~/components/map/DestinationCard";

const per_page = 2;
export async function clientLoader({}: Route.ClientLoaderArgs): Promise<Deal[]> {
    const res = await api.get("/deals", {params: {_page: 1, _per_page: per_page}})
    return res.data.data as Deal[]
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
    const [deals, setDeals] = useState<Deal[]>(useLoaderData<Deal[]>())
    const [hasMore, setHasMore] = useState<boolean>(true)
    const fetchMore = async () => {
        const currentPage = Math.floor(deals.length / per_page)
        const res = await api.get("/deals", {params: {_page: currentPage,  _per_page: per_page}});
        const next = res.data.data as Deal[]
        if (!res.data.next) {
            setHasMore(false);
        }
        setDeals((prev) => [...prev, ...next]);
    };

    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }

    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                <div className="absolute left-8/10 w-2/10 h-17/20 bg-gray-600 z-10000000 overflow-y-auto">
                    <InfiniteScroll
                        dataLength={deals.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
                    >
                        {deals.map(deal => (
                            <DestinationCard deal={deal}/>
                        ))}
                    </InfiniteScroll>

                </div>
                <div className="w-full h-17/20 absolute">
                    <WorldMap/>
                </div>
            </div>
        </Suspense>
    )
}