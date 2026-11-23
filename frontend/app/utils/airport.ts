import type {Option} from "~/models/Option";
import { airport } from "aviation-codes";

export const getAirlineCodesAsOptions = (codes: string[]): Option[] =>  {
    const options: Option[] = [];

    for (const code of codes) {
        const data = airport.iata.get(code)
        if (!data) {
            console.log(`Airline Code ${code} is invalid`);
        }
        options.push({label: `${data!!.name} (${code})`, value: code})
    }
    return options
}

export const airportOptions = getAirlineCodesAsOptions(airport.iata.codes())