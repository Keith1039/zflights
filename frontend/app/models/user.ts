export type EmailConfig = {
    subscribed: boolean,
    batch_type: string
}

export type User = {
    id: number,
    email: string,
    email_config: EmailConfig
    threshold: number,
    relevant_airports: string[],
    subscribed_countries: string[]
}