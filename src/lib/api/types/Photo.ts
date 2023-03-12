export interface Photo {
    id: number,
    date: {
        min?: string,
        max: string
    },
    location?: string,
    images: string[],
    scopes: { role: string }[]
}