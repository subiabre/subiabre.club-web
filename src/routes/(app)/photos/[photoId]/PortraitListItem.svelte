<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import type { ImagePortrait } from "$lib/api/types/Image";

    export let portrait: ImagePortrait;

    const dispatch = createEventDispatcher();

    let person =
        portrait.person && api.call(portrait.person).then((res) => res.json());

    let people = api.people.getCollection();

    function handleChange(event: any) {
        dispatch("update", {
            portrait: { ...portrait, person: event.target.value },
        });
    }
</script>

<li>
    <img
        alt="Recorte de una cara identificada en la foto"
        src={portrait.crop}
    />
    {#await person then subject}
        {#await people then people}
            <select on:change={handleChange}>
                <option>Desconocido</option>
                <option value="new">Nueva persona</option>
                {#each people as person}
                    <option
                        value="/api/people/{person.id}"
                        selected={subject?.familyName === person.familyName &&
                            subject?.givenName === person.givenName}
                    >
                        {person.familyName}, {person.givenName}
                    </option>
                {/each}
            </select>
        {/await}
    {/await}
</li>

<style lang="scss">
    li {
        display: flex;
        align-items: center;

        flex-shrink: 0;

        &:hover {
            cursor: pointer;
        }

        img {
            width: auto;
            height: 3rem;

            border-radius: 100%;
            border: 1px solid $color-background;
        }

        select {
            margin: 0 0.5em;
        }
    }
</style>
