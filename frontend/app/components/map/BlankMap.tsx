import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {DealGroup} from "~/models/DealGroup";
import {countryGeoMap, countryCodeMap} from "~/utils/utils";
import type {Deal} from "~/models/Deal";

const maxBounds = L.latLngBounds(
    L.latLng(-80, -180),
    L.latLng(80, 180)
);

export default function WorldMap({allDeals, setCountry, doneLoading}: {allDeals: Deal[], setCountry: (country: string) => void, doneLoading: () => void}){
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
            zoom={2}
            minZoom={2}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {[...allCountries].map(([country]) => (
                <Marker
                    eventHandlers={
                        {
                            click: (e) => {
                                setCountry(country)
                            }

                        }
                    }
                    position={{lat: countryGeoMap.get(country)!!.lat, lng: countryGeoMap.get(country)!!.lng}}
                >
                    <Popup>
                        {country}
                    </Popup>
                </Marker>
            ))

            }
        </MapContainer>
    )
}