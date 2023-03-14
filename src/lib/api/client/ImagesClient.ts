import { error } from "@sveltejs/kit";
import type { Client } from "./Client";
import type { Image } from "../types/Image";

export class ImagesClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async put(imageId: number, body: {
        path?: string,
        description?: string
    }): Promise<Image> {
        const res = await this.client.call(`/api/images/${imageId}`, {
            body: JSON.stringify(body),
            method: 'PUT'
        });

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}