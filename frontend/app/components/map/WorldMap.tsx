import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {Deal} from "~/models/Deal";
import DestinationCard from "~/components/map/DestinationCard";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {DealGroup} from "~/models/DealGroup";
import CustomPopup from "~/components/map/CustomPopup";
export const deals: Deal[] = [
    {
        name: "Venice",
        country: "Italy",
        lat: 45.438759,
        lng: 12.3155,
        thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8JcCEIpEBg_D8GkNQSau9r8UzlW-7j11JL_ZSPSXstFlskl6z-upKYRr1sOEsngb5YJ4FBQ",
        outbound_date: "2026-05-10",
        return_date: "2026-05-28",
        price: 2000,
        discount_percentage: 30,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
    {
        name: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaFaJgBg6yRLAHTafGG4DMlv2vqVqDP7ERphRoaXGXig5LAs9fcSpvvc7s7Jj6jpyBDxppRA",
        outbound_date: "2026-08-07",
        return_date: "2026-08-14",
        price: 2000,
        discount_percentage: 10,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
    {
        name: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUHuut-NJARaBeb_5EfY45W1iXEm8nkJSEnHiRmWfW35MCaBTQeqqI_fw4-W57Ca7CNjOIZg",
        outbound_date: "2026-05-20",
        return_date: "2026-05-27",
        price: 1400,
        discount_percentage: 0,
        flight_link: "",
        stops: 0,
        duration: 0,
        departure_airport_code: "YOW",
        arrival_airport_code: "CAG"
    },
]

type MarkerData = {
    clusterMap: Map<string, Map<string, MarkerLocation>>
    dealMap: Map<string, DealGroup>
}

export default function WorldMap({clusterMap, dealMap}: MarkerData){
    return (
        <MapContainer style={{height: "100%"}} center={[20, -20]} zoom={2.5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup minWidth={345} maxHeight={300}>
                    <CustomPopup deals={deals}/>
                </Popup>
            </Marker>
        </MapContainer>
    )
}
