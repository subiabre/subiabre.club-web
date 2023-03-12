import type { Client } from "./Client";
import type { Location } from "../types/Location";

export class LocationsClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async getCollection(search?: URLSearchParams): Promise<Location[]> {
        return this.client.call('/api/locations?' + search).then(res => res.json());
    }
}
