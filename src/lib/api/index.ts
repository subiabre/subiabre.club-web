import { AuthClient } from "./client/AuthClient";
import { Client } from "./client/Client";
import { ImagePortraitsClient } from "./client/ImagePotraitsClient";
import { ImagesClient } from "./client/ImagesClient";
import { PeopleClient } from "./client/PeopleClient";
import { PhotosClient } from "./client/PhotosClients";
import { UserKeysClient } from "./client/UserKeysClient";
import { UserSessionsClient } from "./client/UserSessionsClient";
import { UsersClient } from "./client/UsersClient";

class ApiClient {
    private readonly client: Client;

    public readonly auth: AuthClient;
    public readonly images: ImagesClient;
    public readonly imagePortraits: ImagePortraitsClient;
    public readonly people: PeopleClient;
    public readonly photos: PhotosClient;
    public readonly users: UsersClient;
    public readonly userKeys: UserKeysClient;
    public readonly userSessions: UserSessionsClient;

    constructor(url: string) {
        const client = new Client(url);

        this.client = client;
        this.auth = new AuthClient(client);
        this.images = new ImagesClient(client);
        this.imagePortraits = new ImagePortraitsClient(client);
        this.people = new PeopleClient(client);
        this.photos = new PhotosClient(client);
        this.users = new UsersClient(client);
        this.userKeys = new UserKeysClient(client);
        this.userSessions = new UserSessionsClient(client);
    }

    public call(iri: string, init?: RequestInit): Promise<Response> {
        return this.client.call(iri, init);
    }
}

export const api = new ApiClient('http://localhost');
