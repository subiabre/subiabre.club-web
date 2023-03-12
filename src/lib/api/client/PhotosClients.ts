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
}
