<script lang="ts">
    import { filters } from "$lib/stores";
    import { Form, Search } from "carbon-components-svelte";

    let value: string;

    function handleSearch() {
        const search = value.trim();

        if (!search) {
            handleClear();
            return;
        }

        $filters = [
            ...$filters.filter((param) => param[0] !== "images.description"),
            ["images.description", value],
        ];
    }

    function handleClear() {
        $filters = $filters.filter(
            (param) => param[0] !== "images.description"
        );
    }
</script>

<Form>
    <Search
        placeholder="Describe la imagen que estás buscando"
        on:input={handleSearch}
        on:clear={handleClear}
        bind:value
    />
</Form>
