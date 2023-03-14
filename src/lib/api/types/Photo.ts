export interface Photo {
    id: number,
    date: {
        min?: string,
        max: string
    },
    place?: {
        country?: string,
        region?: string,
        subregion?: string,
        locality?: string
    },
    images: string[],
    scopes: { role: string }[]
}
