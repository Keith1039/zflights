import {X} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListDestinationCard from "~/components/map/ListDestinationCard";
import type {Deal} from "~/models/Deal";
import {useMap} from "react-leaflet";

type ListData = {
    allDeals: Deal[];
    currentDeals: Deal[];
    fetchMore: () => void;
    hasMore: boolean
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function DealList({open, setOpen, allDeals, fetchMore, hasMore, currentDeals}: ListData) {
    const map = useMap();
    const handleOpen = () => {
        setOpen(true);
        map.scrollWheelZoom.disable();
    }

    const handleClose = () => {
        setOpen(false);
        map.closePopup()
        map.scrollWheelZoom.enable()
    }

    const newSetOpen = (open: boolean) => {
        if (open) {
            handleOpen()
        } else {
            handleClose()
        }
    }
    return (
        <>
            {open && <div className="absolute pl-2 left-7/10 w-3/10 h-full z-10000000 overflow-y-auto bg-white rounded-md border-2 border-solid">
                <X
                    color="black"
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => newSetOpen(false)}/>
                <InfiniteScroll
                    dataLength={allDeals.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
                >
                    {currentDeals.map(deal => (
                        <ListDestinationCard deal={deal}/>
                    ))}
                </InfiniteScroll>
            </div>}
            {!open && <div className="absolute left-29/30 w-1/30 h-1/10 z-10000000">
                <button
                    className="w-full pt-1.5 pb-1.5 cursor-pointer rounded-md text-nowrap bg-blue-500 hover:bg-blue-700"
                    onClick={() => {newSetOpen(true)}}>
                    +
                </button>
            </div>
            }
        </>
    )
}