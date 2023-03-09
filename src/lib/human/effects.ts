import type { User } from "$lib/api/types/User";

export interface Fx {
    fx: boolean,
    soundfx: boolean
}

export interface FxStorage extends Fx {
    save: (data: Fx) => void;
    clear: () => void;
}

export function getEffects(user: User | undefined): FxStorage {
    const item = localStorage.getItem(`${user?.id}:fx`);
    const data = item ? JSON.parse(item) : { fx: true, soundfx: false };

    return {
        ...data,
        save: (data) => {
            localStorage.setItem(`${user?.id}:fx`, JSON.stringify(data));
        },
        clear: () => {
            localStorage.removeItem(`${user?.id}:fx`);
        }
    };
}