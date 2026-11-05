import type {Route} from "../../.react-router/types/app/routes/+types/_loggedin.deals";
import type {Deal} from "~/models/Deal";
import api from "~/axios/api";
import {lazy, Suspense, useEffect, useState} from "react";
import {useLoaderData} from "react-router";

const per_page = 5;

export async function clientLoader({}: Route.ClientLoaderArgs): Promise<Deal[]> {
    const res = await api.get("/deals", {params: {_page: 1, _per_page: per_page}})
    return res.data.data as Deal[]
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
    return <div>Loading...</div>;
}


const DealsWorldMap = lazy(() => import("~/components/map/DealsWorldMap"))

export default function (){
    // our cache of sorts
    const [allDeals, setAllDeals] = useState<Deal[]>(useLoaderData<Deal[]>());
    const [country, setCountry] = useState<string | null>(null);
    const [currentDeals, setCurrentDeals] = useState<Deal[]>(allDeals)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const resetCountry = () => {
        setCountry(null)
    }

    const setFocusCountry = (targetCountry: string, onSet: () => void, onRemove: () => void) => {
        if (country === targetCountry) {
            setCountry(null)
            onRemove()
        } else {
            setCountry(targetCountry)
            onSet()
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
                <div className="w-full h-17/20 absolute">
                    <DealsWorldMap
                        allDeals={allDeals}
                        setCountry={setFocusCountry}
                        resetCountry={resetCountry}
                        doneLoading={() => {
                            setIsLoading(false);
                        }}
                        currentDeals={currentDeals}
                        fetchMore={fetchMore}
                        hasMore={hasMore}
                        open={open}
                        setOpen={setOpen}/>
                </div>
            </div>
        </Suspense>
    )
}