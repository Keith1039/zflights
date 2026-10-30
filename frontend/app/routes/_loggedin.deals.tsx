import type {Route} from "../../.react-router/types/app/routes/+types/_loggedin.deals";
import type {Deal} from "~/models/Deal";
import api from "~/axios/api";
import {lazy, Suspense, useEffect, useState} from "react";
import {useLoaderData} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import DestinationCard from "~/components/map/DestinationCard";

const per_page = 5;

export async function clientLoader({}: Route.ClientLoaderArgs): Promise<Deal[]> {
    const res = await api.get("/deals", {params: {_page: 1, _per_page: per_page}})
    return res.data.data as Deal[]
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
    return <div>Loading...</div>;
}


const WorldMap = lazy(() => import("~/components/map/BlankMap"))

export default function (){
    // our cache of sorts
    const [allDeals, setAllDeals] = useState<Deal[]>(useLoaderData<Deal[]>());
    const [country, setCountry] = useState<string | null>(null);
    const [currentDeals, setCurrentDeals] = useState<Deal[]>(allDeals)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const setFocusCountry = (targetCountry: string) => {
        if (country === targetCountry) {
            setCountry(null)
        } else {
            setCountry(targetCountry)
        }
    }

    useEffect(() =>
    {
        //mitigate double take from lazy loading
        if(!isLoading) {
            if (country === null) {
                setOpen(false)
                setHasMore(true)
                setCurrentDeals(allDeals)
            } else {
                setOpen(true)
                setHasMore(true)
                setCurrentDeals(allDeals.filter(deal => deal.country === country))
                fetchSpecificMore(country)
            }
        }
    }, [country])

    const fetchGeneralMore = async () => {
        const currentPage = Math.floor(currentDeals.length / per_page)
        const res = await api.get("/deals", {params: {_page: currentPage + 1,  _per_page: per_page}});
        const next = res.data.data as Deal[]
        if (!res.data.next) {
            setHasMore(false);
        }
        setAllDeals([...currentDeals, ...next])
        setCurrentDeals((prev) => [...prev, ...next]);
    }
    const fetchSpecificMore = async (country: string) => {
        const currentPage = Math.floor(currentDeals.length / per_page)
        const params = {
            _page: currentPage + 1,
            _per_page: per_page,
            country: country,
        }
        const res = await api.get("/deals", {params: params});
        const next = res.data.data as Deal[]
        if (!res.data.prev && !res.data.next) {
            setHasMore(false);
            return
        }
        if (!res.data.next) {
            setHasMore(false);
        }
        setCurrentDeals((prev) => [...prev, ...next]);
    }

    const fetchMore = async () => {
        if (!country) {
            await fetchGeneralMore();
        } else {
            await fetchSpecificMore(country)
        }
    };

    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }

    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                {open && <div className="absolute left-8/10 w-2/10 h-17/20 bg-gray-600 z-10000000 overflow-y-auto">
                    <InfiniteScroll
                        dataLength={allDeals.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
                    >
                        {currentDeals.map(deal => (
                            <DestinationCard deal={deal}/>
                        ))}
                    </InfiniteScroll>
                </div>}
                {!open && <div className="absolute left-29/30 w-1/30 h-1/10 z-10000000">
                    <button
                        className="w-full pt-1.5 pb-1.5 cursor-pointer rounded-md text-nowrap bg-blue-500 hover:bg-blue-700"
                    onClick={() => {setOpen(true)}}>
                        +
                    </button>
                </div>
                }
                <div className="w-full h-17/20 absolute">
                    <WorldMap
                        allDeals={allDeals}
                        setCountry={setFocusCountry}
                        doneLoading={() => {setIsLoading(false)}}/>
                </div>
            </div>
        </Suspense>
    )
}