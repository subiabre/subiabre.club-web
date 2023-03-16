import { error } from "@sveltejs/kit";
import type { Person } from "../types/Person";
import type { Client } from "./Client";

export class PeopleClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async getCollection(search?: URLSearchParams): Promise<Person[]> {
        return this.client.call('/api/people?' + search).then(res => res.json());
    }

    public async post(body: { familyName: string, givenName: string }): Promise<Person> {
        const res = await this.client.call('/api/people', {
            body: JSON.stringify(body),
            method: 'POST'
        });

        if (res.status === 201) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}
