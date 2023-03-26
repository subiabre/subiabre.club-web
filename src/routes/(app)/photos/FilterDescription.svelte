<script lang="ts">
    import { filters } from "$lib/stores";
    import { Form, Search } from "carbon-components-svelte";

    let value: string;

    function handleSubmit(event: SubmitEvent) {
        $filters = [
            ...$filters.filter(param => param[0] !== "images.description"),
            ["images.description", value]
        ]
    }
</script>

<Form on:submit={handleSubmit}>
    <Search placeholder="Describe la imagen que estás buscando" bind:value />
</Form>
