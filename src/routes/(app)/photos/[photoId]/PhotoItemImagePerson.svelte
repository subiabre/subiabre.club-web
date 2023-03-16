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

<div on:submit={handleSubmit}>
    <p>{familyName}</p>
    <p>{givenName}</p>
</div>

<style lang="scss">
    div {
        p {
            margin: 0 0.5em;
        }
    }
</style>
