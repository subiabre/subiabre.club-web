<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import type { ImagePortrait } from "$lib/api/types/Image";
    import { Modal } from "carbon-components-svelte";
    import FormPhotoItemSubject from "./FormPhotoItemSubject.svelte";

    export let portrait: ImagePortrait;

    const dispatch = createEventDispatcher();

    let person =
        portrait.person && api.call(portrait.person).then((res) => res.json());

    let open = false;

    function handleSubmit(event: CustomEvent) {
        dispatch("update", {
            portrait: {
                ...portrait,
                person: `/api/people/${event.detail.person.id}`,
            },
        });

        person = event.detail.person;
        open = false;
    }
</script>

<li>
    <img
        alt="Recorte de una cara identificada en la foto"
        src={portrait.crop}
        on:click={() => (open = true)}
        on:keydown={() => (open = true)}
    />
    {#await person then person}
        <p on:click={() => (open = true)} on:keydown={() => (open = true)}>
            {#if person}
                {person.familyName}, {person.givenName}
            {:else}
                Desconocido
            {/if}
        </p>
        <Modal
            hasForm
            passiveModal
            modalHeading="Retrato #{portrait.id}"
            bind:open
        >
            <figure>
                <img alt="Retrato de una persona" src={portrait.crop} />
            </figure>
            <FormPhotoItemSubject {person} on:submit={handleSubmit} />
        </Modal>
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

        p {
            margin: 0 0.5em;
        }

        :global(.bx--modal) {
            width: 100%;
            background: transparent;
        }
    }
</style>
