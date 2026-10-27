import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {Deal} from "~/models/Deal";

export const deals: Deal[] = [
    {
        name: "Venice",
        country: "Italy",
        lat: 45.438759,
        lng: 12.3155,
        thumbnail: "",
        outbound_date: "",
        return_date: "",
        price: 0,
        discount_percentage: 0,
        flight_link: ""
    },
    {
        name: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
        thumbnail: "",
        outbound_date: "",
        return_date: "",
        price: 0,
        discount_percentage: 0,
        flight_link: ""
    },
    {
        name: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        thumbnail: "",
        outbound_date: "",
        return_date: "",
        price: 0,
        discount_percentage: 0,
        flight_link: ""
    },
]

export default function WorldMap(){
    return (
        <MapContainer style={{height: "100%"}} center={[20, -20]} zoom={2.5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}