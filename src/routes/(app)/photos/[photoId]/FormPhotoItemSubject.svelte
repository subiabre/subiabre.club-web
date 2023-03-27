<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import { Button, Form } from "carbon-components-svelte";

    const dispatch = createEventDispatcher();

    let familyName: string;
    let givenName: string;

    function handleSubmit(event: SubmitEvent) {
        api.people.post({ familyName, givenName }).then((person) => {
            console.log(person);
            dispatch("submit", { person });
        });
    }
</script>

<Form on:submit={handleSubmit}>
    <p>
        <label>
            <h6>Nombre</h6>
            <input type="text" placeholder="Nombre" bind:value={givenName} />
        </label>
    </p>
    <p>
        <label>
            <h6>Apellido</h6>
            <input type="text" placeholder="Apellido" bind:value={familyName} />
        </label>
    </p>
    <p>
        <Button type="submit" kind="tertiary" class="color-success">
            Añadir persona
        </Button>
    </p>
</Form>
