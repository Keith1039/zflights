import countries from "world-countries"
import type {MarkerLocation} from "~/models/MarkerLocation";

const countryGeoMap = new Map<string, MarkerLocation>

// we add both just in case
for (const country of countries){
    const lat = country.latlng[0]
    const lng = country.latlng[1]
    countryGeoMap.set(country.name.common, {name: country.name.common, lat: lat, lng: lng} as MarkerLocation)
    countryGeoMap.set(country.name.official, {name: country.name.official, lat: lat, lng: lng} as MarkerLocation)
}

export default countryGeoMap