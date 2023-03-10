import { writable, type Writable } from "svelte/store";
import type { User, UserSession } from "./api/types/User";

interface AuthState {
    user: User,
    session: UserSession
}

export const auth: Writable<AuthState> = writable();

interface FxsState {
    vfxs: boolean,
    soundfxs: boolean
}

interface FxsStore extends Writable<FxsState> {
    init: (user: User) => void;
    save: (user: User, state: FxsState) => void;
}

export const effects: FxsStore = (() => {
    const { subscribe, set, update } = writable({
        vfxs: true,
        soundfxs: true
    });

    return {
        subscribe, set, update,
        init: (user: User) => {
            const init = localStorage.getItem(`${user.id}:fxs`);
            const state: FxsState = init ? JSON.parse(init) : { vfxs: true, soundfxs: true };

            set(state);
        },
        save: (user:User, state: FxsState) => {
            localStorage.setItem(`${user.id}:fxs`, JSON.stringify(state));
        }
    }
})();
