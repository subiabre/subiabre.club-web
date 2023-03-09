import { error, type HttpError } from "@sveltejs/kit";
import type { Client } from "./Client";
import type { UserSession } from "../types/User";

export class UserSessionsClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Fetch the collection of an User's UserSessions
     * @param userId 
     * @returns {Promise<UserSession[]>}
     * @throws {HttpError} In case of request failure
     */
    public async getCollection(userId: number): Promise<UserSession[]> {
        const res = await this.client.call(`/api/users/${userId}/sessions`);

        if (res.status === 200) {
            return res.json();
        }

        throw error(res.status, res.statusText);
    }

    public async delete(userId: number, sessionId: number): Promise<Response> {
        const res = await this.client.call(`/api/users/${userId}/sessions/${sessionId}`, {
            method: 'DELETE'
        });

        if (res.status === 204) {
            return res;
        }

        throw error(res.status, res.statusText);
    }
}