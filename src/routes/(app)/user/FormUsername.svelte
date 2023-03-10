<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";

    let username: string;
    let usernameError = false;

    function handleSubmit() {
        api.users
            .put($auth.user.id, { username })
            .then(user => {
                $auth.user = user;
                usernameError = false;
            })
            .catch((err) => (usernameError = true));
    }
</script>

<form on:submit={handleSubmit}>
    <p class={usernameError ? "is-visible" : "is-hidden"}>
        <label for="input-username" class="color-danger">
            <h5>Nombre de usuario inválido</h5>
        </label>
    </p>
    <p>
        <label for="input-username">
            <h6>Nombre</h6>
            <input
                id="input-username"
                type="text"
                placeholder="Nuevo nombre de usuario"
                bind:value={username}
            />
        </label>
    </p>

    <p>
        <button class="color-success">Actualizar nombre de usuario</button>
    </p>
</form>
