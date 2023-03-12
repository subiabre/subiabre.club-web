import type { Client } from "./Client";
import type { Location } from "../types/Location";
import { error } from "@sveltejs/kit";

export class LocationsClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async getCollection(search?: URLSearchParams): Promise<Location[]> {
        return this.client.call('/api/locations?' + search).then(res => res.json());
    }

    public async get(locationId: number): Promise<Location> {
        const res = await this.client.call(`/api/locations${locationId}`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}
