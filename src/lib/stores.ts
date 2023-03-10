import { writable, type Writable } from "svelte/store";
import type { User, UserSession } from "./api/types/User";

interface AuthState {
    user: User,
    session: UserSession
}

export const auth: Writable<AuthState> = writable();

interface FxsSettingsState {
    vfxs: boolean,
    soundfxs: boolean
}

interface FxsSettingsStore extends Writable<FxsSettingsState> {
    init: (user: User) => void;
    save: (user: User, state: FxsSettingsState) => void;
}

export const has: FxsSettingsStore = (() => {
    const { subscribe, set, update } = writable({
        vfxs: true,
        soundfxs: true
    });

    const setFxs = (state: FxsSettingsState) => {
        set(state);
        if (state.vfxs) {
            document.body.classList.add("has-vfxs");
        } else {
            document.body.classList.remove("has-vfxs");
        }
    };

    return {
        subscribe, update,
        set: (value: FxsSettingsState) => {
            setFxs(value);
        },
        init: (user: User) => {
            const init = localStorage.getItem(`${user.id}:has`);
            const state: FxsSettingsState = init ? JSON.parse(init) : { vfxs: true, soundfxs: true };

            setFxs(state);
        },
        save: (user:User, state: FxsSettingsState) => {
            localStorage.setItem(`${user.id}:has`, JSON.stringify(state));

            setFxs(state);
        }
    }
})();

interface SoundFxsState {
    slide: boolean,
    clack: boolean
}

interface SoundFxsStore extends Writable<SoundFxsState> {
    playSlide: () => void;
    playClack: () => void;
}

export const sound: SoundFxsStore = (() => {
    const { subscribe, set, update } = writable({
        slide: false,
        clack: false
    });

    return {
        subscribe, set, update,
        playSlide: () => {
            update((state) => { 
                return {
                    ...state,
                    slide: true
                }
             })
        },
        playClack: () => {
            update((state) => {
                return {
                    ...state,
                    clack: true
                }
            })
        }
    }
})();
