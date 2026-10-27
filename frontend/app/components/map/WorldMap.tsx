import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CardContainer from "~/components/map/CardContainer";
import type {Deal} from "~/models/Deal";
import DestinationCard from "~/components/map/DestinationCard";
export const deals: Deal[] = [
    {
        name: "Venice",
        country: "Italy",
        lat: 45.438759,
        lng: 12.3155,
        thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8JcCEIpEBg_D8GkNQSau9r8UzlW-7j11JL_ZSPSXstFlskl6z-upKYRr1sOEsngb5YJ4FBQ",
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
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaFaJgBg6yRLAHTafGG4DMlv2vqVqDP7ERphRoaXGXig5LAs9fcSpvvc7s7Jj6jpyBDxppRA",
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
        thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUHuut-NJARaBeb_5EfY45W1iXEm8nkJSEnHiRmWfW35MCaBTQeqqI_fw4-W57Ca7CNjOIZg",
        outbound_date: "",
        return_date: "",
        price: 0,
        discount_percentage: 0,
        flight_link: ""
    },
    {
        name: "Venice",
        country: "Italy",
        lat: 45.438759,
        lng: 12.3155,
        thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8JcCEIpEBg_D8GkNQSau9r8UzlW-7j11JL_ZSPSXstFlskl6z-upKYRr1sOEsngb5YJ4FBQ",
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
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaFaJgBg6yRLAHTafGG4DMlv2vqVqDP7ERphRoaXGXig5LAs9fcSpvvc7s7Jj6jpyBDxppRA",
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
        thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUHuut-NJARaBeb_5EfY45W1iXEm8nkJSEnHiRmWfW35MCaBTQeqqI_fw4-W57Ca7CNjOIZg",
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
                <Popup minWidth={345} maxHeight={200}>
                    <div>
                        <ul className="border-solid border-2 rounded-md content-center">
                            {deals.map((deal) => (
                                <li className="w-full border-solid border-b font-bold text-center cursor-pointer">
                                    <DestinationCard deal={deal} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}
