import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {countryGeoMap} from "~/utils/utils";
import type {Deal} from "~/models/Deal";
import DealList from "~/components/map/DealList";
import CustomMarker from "~/components/map/CustomMarker";

type DealMapData = {
    allDeals: Deal[];
    resetCountry: () => void;
    setCountry: (country: string, onSet: () => void, onRemove: () => void) => void,
    doneLoading: () => void
    currentDeals: Deal[];
    fetchMore: () => void;
    hasMore: boolean
    open: boolean;
    setOpen: (open: boolean) => void;
}

const maxBounds = L.latLngBounds(
    L.latLng(-80, -180),
    L.latLng(80, 180)
);

export default function WorldMap({allDeals, setCountry, doneLoading, open, setOpen, fetchMore, hasMore, currentDeals, resetCountry}: DealMapData){
    const allCountries: Map<string, Boolean> = new Map();
    doneLoading()
    allDeals.forEach(deal => {
        if (!allCountries.get(deal.country)){
            allCountries.set(deal.country, true)
        }
    })

    return (
        <MapContainer
            style={{height: "100%"}}
            center={[20, 0]}
            maxZoom={20}
            zoom={2}
            minZoom={2}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/attribution/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <DealList
                allDeals={allDeals}
                currentDeals={currentDeals}
                fetchMore={fetchMore}
                hasMore={hasMore}
                open={open}
                setOpen={setOpen}
                resetCountry={resetCountry}
            />
            {[...allCountries].map(([country]) => (
                <CustomMarker setCountry={setCountry} country={country} lat={countryGeoMap.get(country)!!.lat} lng={countryGeoMap.get(country)!!.lng}/>
            ))

            }
        </MapContainer>
    )
}