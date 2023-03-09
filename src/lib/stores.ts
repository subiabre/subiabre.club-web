import { writable, type Writable } from "svelte/store";
import type { User, UserSession } from "./api/types/User";

interface AuthState {
    user: User,
    session: UserSession
}

export const auth: Writable<AuthState> = writable();
