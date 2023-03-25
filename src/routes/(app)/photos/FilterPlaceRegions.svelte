<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { MultiSelect } from "carbon-components-svelte";

    let regions = api.photos
        .getCollection(new URLSearchParams([["unique[place.region]", "true"]]))
        .then((photos) => {
            return photos
                .filter((photo) => photo.place?.region)
                .map((photo) => {
                    return {
                        id: photo.id,
                        text: photo.place?.region ?? "",
                    };
                });
        });

    function handleSelect(event: CustomEvent) {
        $filters = [
            ...$filters.filter((param) => param[0] !== "place.region"),
            ...event.detail.selected.map((selected: { text: string }) => {
                return ["place.region", selected.text];
            }),
        ];
    }
</script>

{#await regions then regions}
    <MultiSelect
        titleText="Regiones"
        spellcheck="false"
        filterable
        placeholder="Filtrar regiones..."
        items={regions}
        on:select={handleSelect}
    />
{/await}
