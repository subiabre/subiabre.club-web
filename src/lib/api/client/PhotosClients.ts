import { error } from "@sveltejs/kit";
import type { Photo } from "../types/Photo";
import type { Client } from "./Client";

export class PhotosClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async getCollection(search?: URLSearchParams): Promise<Photo[]> {
        return this.client.call('/api/photos?' + search).then(res => res.json());
    }

    public async get(photoId: number): Promise<Photo> {
        const res = await this.client.call(`/api/photos/${photoId}`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    public async put(photoId: number, body: {
        date?: {
            min?: string,
            max: string
        },
        place?: {
            country?: string,
            region?: string,
            regionLevel2?: string,
            locality?: string
        }
    }): Promise<Photo> {
        const res = await this.client.call(`/api/photos/${photoId}`, {
            body: JSON.stringify(body),
            method: 'PUT'
        });

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}
