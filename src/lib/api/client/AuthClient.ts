import { error, type HttpError } from "@sveltejs/kit";
import type { UserSession } from "../types/User";
import type { Client } from "./Client";

export class AuthClient {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    private async getAuth(res: Response): Promise<UserSession> {
        if (res.status === 204) {
            return await this.client.call(res.headers.get('Location') ?? "")
                .then(res => res.json());
        }

        throw error(res.status, res.statusText);
    }

    private async postAuth(endpoint: string, body: any): Promise<any> {
        const res = await this.client.call(
            endpoint,
            {
                body: JSON.stringify(body),
                method: 'POST',
            }
        );

        return await this.getAuth(res);
    }

    /**
     * Performs an Authentication check on the current user, browser only
     * @returns {Promise<UserSession>}
     * @throws {HttpError} In case of any failure on the request
     */
    public async get(): Promise<UserSession> {
        const res = await this.client.call('/api/authentication');

        return await this.getAuth(res);
    }

    /**
     * Authenticate an User via an UserKey property `value`
     * @param value `value` of UserKey
     * @returns {Promise<UserSession>}
     * @throws {HttpError} In case of any failure on the request
     */
    public async key(value: string): Promise<UserSession> {
        return await this.postAuth('/api/authentication/key', { value });
    }

    /**
     * Authenticate an User via an User properties `username` and `password`
     * @param username `username` of User
     * @param password `password` of User
     * @returns {Promise<UserSession>}
     */
    public async user(username: string, password: string): Promise<UserSession> {
        return await this.postAuth('/api/authentication/user', { username, password });
    }
}
