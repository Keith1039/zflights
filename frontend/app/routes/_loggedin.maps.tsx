import {lazy, Suspense} from "react";

const Map = lazy(() => import("~/components/map/WorldMap"))
export default function (){
    if (typeof window === 'undefined') {
        return <div className="text-lg">Loading...</div>
    }
    return (
        <Suspense fallback={<div className="text-lg">Loading...</div>}>
            <div className="flex grow min-h-0 z-20">
                <div className="w-full h-full absolute">
                    <Map/>
                </div>
            </div>
        </Suspense>
    )
}