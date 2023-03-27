<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import { Button, ComboBox, Form } from "carbon-components-svelte";
    import type { Person } from "$lib/api/types/Person";

    const dispatch = createEventDispatcher();

    export let person: Person | undefined;

    let people = api.people.getCollection();

    let familyName: string;
    let givenName: string;

    function handleSubmit(event: SubmitEvent) {
        api.people.post({ familyName, givenName }).then((person) => {
            dispatch("submit", { person });
        });
    }

    function handleSelect(event: CustomEvent) {
        api.people.get(event.detail.selectedId).then((person) => {
            dispatch("submit", { person });
        });
    }

    function shouldFilterItem(item: { text: string }, value: string) {
        if (!value) return true;
        return item.text.toLowerCase().includes(value.toLowerCase());
    }
</script>

<div class="grid-250">
    <div>
        <h6>Seleccionar sujeto</h6>
        <p>
            {#await people then people}
                <ComboBox
                    {shouldFilterItem}
                    on:select={handleSelect}
                    selectedId={person?.id}
                    items={people.map((person) => {
                        return {
                            id: person.id,
                            text: `${person.familyName}, ${person.givenName}`,
                        };
                    })}
                />
            {/await}
        </p>
    </div>
    <Form on:submit={handleSubmit}>
        <h6>Añadir sujeto</h6>
        <p>
            <label>
                <h6>Nombre</h6>
                <input
                    type="text"
                    placeholder="Nombre"
                    bind:value={givenName}
                />
            </label>
        </p>
        <p>
            <label>
                <h6>Apellido</h6>
                <input
                    type="text"
                    placeholder="Apellido"
                    bind:value={familyName}
                />
            </label>
        </p>
        <p>
            <Button type="submit" kind="tertiary" class="color-success">
                Añadir persona
            </Button>
        </p>
    </Form>
</div>
