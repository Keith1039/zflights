import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {MarkerLocation} from "~/models/MarkerLocation";
import type {DealGroup} from "~/models/DealGroup";
import CustomPopup from "~/components/map/CustomPopup";
import MarkerClusterGroup from "react-leaflet-cluster";
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'
import L from "leaflet";

type MarkerData = {
    clusterMap: Map<string, Map<string, MarkerLocation>>
    dealMap: Map<string, DealGroup>
}

const maxBounds = L.latLngBounds(
    L.latLng(-80, -180),
    L.latLng(80, 180)
);

export default function WorldMap({clusterMap, dealMap}: MarkerData){
    return (
        <MapContainer
            style={{height: "100%"}}
            center={[20, 0]}
            zoom={2}
            maxZoom={20}
            minZoom={2}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/attribution/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            {[...clusterMap].map(([, cityMarkers]) => (
                <MarkerClusterGroup
                    chunkedLoading
                >
                    {[...cityMarkers].map(([city, markerData]) => (
                        <Marker position={{lat: markerData.lat, lng: markerData.lng}}>
                            <Popup minWidth={450} maxHeight={300}>
                                { <CustomPopup deals={dealMap.get(city)!!.deals}/>}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            ))}
        </MapContainer>
    )
}
