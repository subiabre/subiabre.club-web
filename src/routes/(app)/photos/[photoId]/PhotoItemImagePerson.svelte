<script lang="ts">
    import { api } from "$lib/api";
    import type { Person } from "$lib/api/types/Person";

    export let person: Person | undefined;

    let familyName = person?.familyName ?? "";
    let givenName = person?.givenName ?? "";

    async function handleSubmit() {
        const existing = await api.people.getCollection(new URLSearchParams([
            ["familyName", familyName],
            ["givenName", givenName]
        ]));

        if (existing.length < 1) {
            await api.people.post({ familyName, givenName });
        }
    }
</script>

<form on:submit={handleSubmit}>
    <p><input type="text" bind:value={familyName} placeholder="Apellido" /></p>
    <p><input type="text" bind:value={givenName} placeholder="Nombre" /></p>
</form>

<style lang="scss">
    form {
        p,
        input {
            margin: 0 0.5em;
        }
    }
</style>
