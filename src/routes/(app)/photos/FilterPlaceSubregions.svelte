<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { MultiSelect } from "carbon-components-svelte";

    let subregions = api.photos
        .getCollection(new URLSearchParams([["unique[place.regionLevel2]", "true"]]))
        .then((photos) => {
            return photos
                .filter((photo) => photo.place?.regionLevel2)
                .map((photo) => {
                    return {
                        id: photo.id,
                        text: photo.place?.regionLevel2 ?? "",
                    };
                });
        });

    function handleSelect(event: CustomEvent) {
        $filters = [
            ...$filters.filter((param) => param[0] !== "place.regionLevel2[]"),
            ...event.detail.selected.map((selected: { text: string }) => {
                return ["place.regionLevel2[]", selected.text];
            }),
        ];
    }
</script>

{#await subregions then subregions}
    <MultiSelect
        titleText="Subregiones"
        spellcheck="false"
        filterable
        placeholder="Filtrar regiones de 2do nivel..."
        items={subregions}
        on:select={handleSelect}
    />
{/await}
