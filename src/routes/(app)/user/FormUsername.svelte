<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { Button, Form, TextInput } from "carbon-components-svelte";

    let username: string;
    let invalid = false;

    function handleSubmit() {
        api.users
            .put($auth.user.id, { username })
            .then((user) => {
                $auth.user = user;
                invalid = false;
            })
            .catch((err) => (invalid = true));
    }
</script>

<Form on:submit={handleSubmit}>
    <p>
        <TextInput
            labelText="Nombre"
            placeholder="Nuevo nombre de usuario"
            {invalid}
            invalidText="Nombre de usuario no válido"
            bind:value={username}
        />
    </p>
    <p>
        <Button type="submit" kind="tertiary" class="color-success">Actualizar nombre de usuario</Button>
    </p>
</Form>
