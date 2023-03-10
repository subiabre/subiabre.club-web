<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";

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

<form on:submit={handleSubmit}>
    <p class={passwordOldError ? "is-visible" : "is-hidden"}>
        <label for="input-password-current" class="color-danger">
            <h5>Contraseña incorrecta</h5>
        </label>
    </p>
    <p>
        <label for="input-password-current">
            <h6>Contraseña actual</h6>
            <input
                id="input-password-current"
                type="password"
                placeholder="******"
                bind:value={passwordOld}
            />
        </label>
    </p>

    <p class={passwordNewError ? "is-visible" : "is-hidden"}>
        <label for="input-password-current" class="color-danger">
            <h5>Nueva contraseña inválida</h5>
        </label>
    </p>
    <p>
        <label for="input-password-new">
            <h6>Contraseña nueva</h6>
            <input
                id="input-password-new"
                type="password"
                placeholder="*****"
                bind:value={passwordNew}
            />
        </label>
    </p>

    <p>Esta acción destruirá todas tus sesiones actuales.</p>
    <p>
        <button class="color-success">Actualizar contraseña</button>
    </p>
</form>
