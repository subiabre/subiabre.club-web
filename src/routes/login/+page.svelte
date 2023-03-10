<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";
    import Tray from "$lib/layout/Tray.svelte";
    import TraySlide from "$lib/layout/TraySlide.svelte";

    let username: string;
    let password: string;
    let passwordSlide: TraySlide;
    let passwordInput: HTMLInputElement;

    let authError = false;

    function handleUsername(event: SubmitEvent) {
        event.preventDefault();
        passwordSlide.focus();
        passwordInput.focus();
    }

    async function handleSubmit() {
        api.auth
            .user(username, password)
            .then(async (session) => {
                const user = await api
                    .call(session.owner)
                    .then((res) => res.json());

                return { user, session };
            })
            .then((data) => {
                auth.set(data);

                goto("/");
            })
            .catch((err) => (authError = true));
    }
</script>

<Tray>
    <TraySlide id="login-password" bind:this={passwordSlide}>
        <div class="padded">
            <h1>Hola{username ? `, ${username}` : ""}.</h1>
            <p>
                Si has perdido tu usuario y contraseña contacta con la persona
                que te invitó.
            </p>

            <form on:submit={handleSubmit}>
                <p class={authError ? "is-visible" : "is-hidden"}>
                    <label for="input-password" class="color-danger">
                        <h5>Usuario o contraseña incorrectos</h5>
                    </label>
                </p>
                <p>
                    <label>
                        <h6>Nombre</h6>
                        <input
                            id="input-username"
                            type="text"
                            placeholder="Larry"
                            bind:value={username}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        <h6>Contraseña</h6>
                        <input
                            id="input-password"
                            type="password"
                            placeholder="Tu contraseña"
                            autocomplete="current-password"
                            bind:value={password}
                            bind:this={passwordInput}
                        />
                    </label>
                </p>
                <p>
                    <button>Confirmar</button>
                </p>
            </form>
        </div>
    </TraySlide>
</Tray>
