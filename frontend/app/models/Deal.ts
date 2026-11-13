export type Deal = {
    id: number;
    name: string,  // really 'city'
    country: string,
    thumbnail: string,
    latlng: number[],
    outbound_date: string,
    return_date: string,
    price: number,
    stops: number,
    flight_duration: number,
    discount_percentage: number,
    flight_link: string,
    departure_airport_code: string,
    arrival_airport_code: string,
}