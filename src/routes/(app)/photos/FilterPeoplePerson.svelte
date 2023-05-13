<script lang="ts">
    import { api } from "$lib/api";
    import { dice } from "$lib/human/dice";
    import { createEventDispatcher } from "svelte";
    import type { Person } from "$lib/api/types/Person";
    import type { ImagePortrait } from "$lib/api/types/Image";

    export let person: Person;

    let isActive = false;

    let portrait: Promise<ImagePortrait> = api
        .call(dice.item(person.portraits))
        .then((res) => res.json());

    const dispatch = createEventDispatcher();

    function handleSelection() {
        if (isActive) {
            dispatch("clear", { person });
        } else {
            dispatch("select", { person });
        }

        isActive = !isActive;
    }
</script>

<li
    class={isActive ? "is-active" : ""}
    on:click={handleSelection}
    on:keydown={handleSelection}
>
    {#await portrait then portrait}
        <figure>
            <img
                class="portrait"
                alt="Retrato de {person.familyName}, {person.givenName}."
                src={portrait.crop}
            />
        </figure>
    {/await}
    <div>
        <p>{person.familyName}</p>
        <p>{person.givenName}</p>
    </div>
</li>

<style lang="scss">
    li {
        display: flex;
        align-items: center;

        opacity: 0.4;

        &:hover {
            color: $color-success;
        }

        &:hover,
        &.is-active {
            opacity: 1;
        }

        div,
        div p {
            margin: 0 0.5em;
            white-space: nowrap;
        }
    }
</style>
