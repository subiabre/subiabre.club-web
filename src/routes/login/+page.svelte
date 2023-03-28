<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";
    import Tray from "$lib/layout/Tray.svelte";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import {
        Button,
        Form,
        PasswordInput,
        TextInput,
    } from "carbon-components-svelte";

    let username: string;
    let password: string;

    let authError = false;

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
    <TraySlide id="login">
        <div class="padded">
            <h1>Hola{username ? `, ${username}` : ""}.</h1>
            <p>
                Si has perdido tu usuario y contraseña contacta con la persona
                que te invitó.
            </p>

            <Form on:submit={handleSubmit}>
                <p class={authError ? "is-visible" : "is-hidden"}>
                    <label for="input-password" class="color-danger">
                        <h5>Usuario o contraseña incorrectos</h5>
                    </label>
                </p>
                <p>
                    <TextInput
                        labelText="Usuario"
                        bind:value={username}
                        bind:invalid={authError}
                    />
                </p>
                <p>
                    <PasswordInput
                        labelText="Contraseña"
                        bind:value={password}
                        bind:invalid={authError}
                    />
                </p>
                <p>
                    <Button type="submit" kind="tertiary">Entrar</Button>
                </p>
            </Form>
        </div>
    </TraySlide>
</Tray>

<style lang="scss">
    p {
        width: 90%;
        max-width: 1000px;
    }
</style>
