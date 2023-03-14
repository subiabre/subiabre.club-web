export interface Photo {
    id: number,
    date: {
        min?: string,
        max: string
    },
    place?: {
        country?: string,
        region?: string,
        regionLevel2?: string,
        locality?: string
    },
    images: string[],
    scopes: { role: string }[]
}
