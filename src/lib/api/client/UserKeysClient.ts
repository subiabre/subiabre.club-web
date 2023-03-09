import { error, type HttpError } from "@sveltejs/kit";
import type { Client } from "./Client";
import type { UserKey } from "../types/User";

export class UserKeysClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Fetch the collection of an User's UserKeys
     * @param userId 
     * @returns {Promise<UserKey[]>}
     * @throws {HttpError} In case of request failure
     */
    public async getCollection(userId: number): Promise<UserKey[]> {
        const res = await this.client.call(`/api/users/${userId}/keys`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    /**
     * Create a new UserKey for the User
     * @param userId 
     * @param body
     * @returns {Promise<UserKey>}
     * @throws {HttpError} In case of request failure
     */
    public async post(userId: number, body: {
        dateExpires?: string
    }): Promise<UserKey> {
        const res = await this.client.call(`/api/users/${userId}/keys`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        if (res.status === 201) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    /**
     * Read a given UserKey
     * @param userId 
     * @param keyId 
     * @returns {Promise<UserKey}
     * @throws {HttpError} In case of request failure
     */
    public async get(userId: number, keyId: number): Promise<UserKey> {
        const res = await this.client.call(`/api/users/${userId}/keys/${keyId}`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    public async delete(userId: number, keyId: number): Promise<Response> {
        const res = await this.client.call(`/api/users/${userId}/keys/${keyId}`, {
            method: 'DELETE'
        });

        if (res.status === 204) {
            return res;
        }

        throw error(res.status, res.statusText);
    }
}