<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { Button, Form, PasswordInput } from "carbon-components-svelte";

    let passwordOld: string;
    let passwordOldError = false;

    let passwordNew: string;
    let passwordNewError = false;

    function handleSubmit() {
        const current = api.auth
            .user($auth.user.username, passwordOld)
            .catch((err) => (passwordOldError = true));

        if (!current) return;

        const password = api.users
            .put($auth.user.id, { password: passwordNew })
            .then((user) => ($auth.user = user))
            .catch((err) => (passwordNewError = true));

        if (!password) return;

        api.userSessions
            .getCollection($auth.user.id)
            .then((sessions) =>
                sessions.map((session) => {
                    api.userSessions.delete($auth.user.id, session.id);
                })
            )
            .then(() => goto("/login"));
    }
</script>

<Form on:submit={handleSubmit}>
    <p>
        <PasswordInput
            labelText="Contraseña antigua"
            placeholder="******"
            invalid={passwordOldError}
            invalidText="Contraseña incorrecta"
            bind:value={passwordOld}
        />
    </p>

    <p>
        <PasswordInput
            labelText="Contraseña nueva"
            placeholder="******"
            invalid={passwordNewError}
            invalidText="Nueva contraseña inválida"
            bind:value={passwordNew}
        />
    </p>

    <p>Esta acción destruirá todas tus sesiones actuales.</p>
    <p>
        <Button type="submit" kind="tertiary" class="color-success">
            Actualizar contraseña
        </Button>
    </p>
</Form>
