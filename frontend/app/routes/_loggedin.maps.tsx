import {lazy, Suspense} from "react";

const Map = lazy(() => import("~/components/map/WorldMap"))
export default function (){
    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }
    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="grow min-h-0 z-20">
                <div className="w-full h-17/20 absolute">
                    <Map/>
                </div>
            </div>
        </Suspense>
    )
}