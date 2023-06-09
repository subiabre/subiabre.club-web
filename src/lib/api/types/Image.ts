export interface Image {
    id: number,
    photo: string,
    path: string,
    description: string,
    thumbnails:
    {
        width: number,
        height: number,
        path: string
    }[],
    portraits: string[],
    metadata: {
        width: number,
        height: number,
        size: number,
        type: string,
        exif: string[]
    }
}

export interface ImagePortrait {
    id: number,
    image: string,
    crop: string,
    person?: string,
    x: number,
    y: number,
    width: number,
    height: number
}
