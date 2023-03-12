export interface Location {
    id: 0,
    country: string,
    region: string,
    subregion: string,
    locality: string
}

export enum LocationLevel {
    country = "country",
    region = "region",
    subregion = "subregion",
    locality = "locality"
}
