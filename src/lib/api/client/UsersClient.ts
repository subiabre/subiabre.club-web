import { error, type HttpError } from "@sveltejs/kit";
import type { User } from "../types/User";
import type { Client } from "./Client";

export class UsersClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Read an User
     * @param userId 
     * @returns {Promise<User}
     * @throws {HttpError} In case of request failure
     */
    public async get(userId: number): Promise<User> {
        const res = await this.client.call(`/api/users/${userId}`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    /**
     * Update an User
     * @param userId
     * @param body
     * @returns {Promise<User>} The updated User object from the API
     * @throws {HttpError} In case of request failure
     */
    public async put(userId: number, body: {
        username?: string,
        password?: string,
        roles?: string[]
    }): Promise<User> {
        const res = await this.client.call(`/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }
}