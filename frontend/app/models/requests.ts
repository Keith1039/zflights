
export type GeneralSettingsReq = {
    threshold: number;
    subscribed_countries: string[];
    relevant_airports: string[];
}

export type EmailSettingsReq = {
    subscribed: boolean;
    batch_type: string
}