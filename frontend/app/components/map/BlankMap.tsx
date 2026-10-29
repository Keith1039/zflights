import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {DealGroup} from "~/models/DealGroup";
import {countryGeoMap, countryCodeMap} from "~/utils/utils";

const maxBounds = L.latLngBounds(
    L.latLng(-80, -180),
    L.latLng(80, 180)
);

export default function WorldMap({countryGroups}: {countryGroups: Map<string, DealGroup>}){
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
            {[...countryGroups].map(([country, dealGroup]) => (
                <Marker
                    position={{lat: countryGeoMap.get(country)!!.lat, lng: countryGeoMap.get(country)!!.lng}}
                >
                    <Popup>
                        {`${country} `}
                    </Popup>
                </Marker>
            ))

            }
        </MapContainer>
    )
}