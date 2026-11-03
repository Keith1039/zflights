import {Marker, Popup, useMap} from "react-leaflet";

type MarkerProps = {
    setCountry: (country: string, onSet: () => void, onRemove: () => void) => void,
    country: string,
    lat: number,
    lng: number,
}

export default function CustomMarker({country, setCountry, lat, lng}: MarkerProps) {
    const map = useMap();

    const onSet = () => {
        map.scrollWheelZoom.disable();
    }

    const onRemove = () => {
        map.scrollWheelZoom.enable();
    }
    return (
        <Marker
            eventHandlers={
                {
                    click: (e) => {
                        setCountry(country, onSet, onRemove);
                    }

                }
            }
            position={{lat: lat, lng: lng}}
        >
            <Popup>
                {country}
            </Popup>
        </Marker>
    )
}