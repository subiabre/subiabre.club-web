<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import type { Person } from "$lib/api/types/Person";
    import type { ImagePortrait } from "$lib/api/types/Image";

    export let person: Person;

    let isActive = false;

    let portrait: Promise<ImagePortrait> = api
        .call(
            person.portraits[
                Math.floor(Math.random() * person.portraits.length)
            ]
        )
        .then((res) => res.json());

    const dispatch = createEventDispatcher();

    function handleSelection() {
        if (isActive) {
            dispatch("clear", { person });
        } else {
            dispatch("select", { person })
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

        &:hover,
        &.is-active {
            opacity: 1;
        }

        &:hover {
            color: $color-success;
        }

        img {
            width: auto;
            height: 3rem;
            border-radius: 100%;
        }

        div,
        div p {
            margin: 0 0.5em;
        }
    }
</style>
