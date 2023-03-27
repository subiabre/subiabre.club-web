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

    let people = api.people.getCollection();

    let openModal = false;

    function handleChange(event: any) {
        const value = event.target.value;

        if (value === "new") {
            openModal = true;
            return;
        }

        dispatch("update", {
            portrait: { ...portrait, person: value },
        });
    }

    function handleSubmit(event: CustomEvent) {
        dispatch("update", {
            portrait: {
                ...portrait,
                person: `/api/people/${event.detail.person.id}`,
            },
        });

        people = api.people.getCollection();

        openModal = false;
    }
</script>

<li>
    <img
        alt="Recorte de una cara identificada en la foto"
        src={portrait.crop}
    />
    {#await person then subject}
        <Modal
            hasForm
            passiveModal
            modalHeading="Añadir sujeto"
            bind:open={openModal}
        >
            <h6>Retrato #{portrait.id}</h6>
            <p>
                <figure>
                    <img alt="Retrato de una persona" src={portrait.crop} />
                </figure>
            </p>
            <FormPhotoItemSubject on:submit={handleSubmit} />
        </Modal>
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

        :global(.bx--modal) {
            background: transparent;
        }
    }
</style>
