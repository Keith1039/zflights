import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {DealGroup} from "~/models/DealGroup";
import CustomPopup from "~/components/map/CustomPopup";
import MarkerClusterGroup from "react-leaflet-cluster";
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

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
            {[...clusterMap].map(([, cityMarkers]) => (
                <MarkerClusterGroup
                    chunkedLoading
                >
                    {[...cityMarkers].map(([city, markerData]) => (
                        <Marker position={{lat: markerData.lat, lng: markerData.lng}}>
                            <Popup>
                                { <CustomPopup deals={dealMap.get(city)!!.deals}/>}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            ))}
        </MapContainer>
    )
}
