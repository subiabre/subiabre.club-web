export class Client {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async call(iri: string, init?: RequestInit): Promise<Response> {
        return await fetch(this.baseUrl.concat(iri), {
            ...init,
            credentials: 'include',
            headers: [
                ['Content-Type', 'application/json']
            ]
        });
    }
}
