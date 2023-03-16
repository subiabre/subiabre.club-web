import { error } from "@sveltejs/kit";
import type { Client } from "./Client";
import type { ImagePortrait } from "../types/Image";

export class ImagePortraitsClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async get(imageId: number, portraitId: number): Promise<ImagePortrait> {
        const res = await this.client.call(`/api/images/${imageId}/portraits/${portraitId}`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    public async put(imageId: number, portraitId: number, body: { person: string | undefined }): Promise<ImagePortrait> {
        const res = await this.client.call(`/api/images/${imageId}/portraits/${portraitId}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}
