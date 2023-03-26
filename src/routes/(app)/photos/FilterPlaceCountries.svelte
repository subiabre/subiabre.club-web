<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { MultiSelect } from "carbon-components-svelte";

    let countries = api.photos
        .getCollection(new URLSearchParams([["unique[place.country]", "true"]]))
        .then((photos) => {
            return photos
                .filter((photo) => photo.place?.country)
                .map((photo) => {
                    return {
                        id: photo.id,
                        text: photo.place?.country ?? "",
                    };
                });
        });

    function handleSelect(event: CustomEvent) {
        $filters = [
            ...$filters.filter((param) => param[0] !== "place.country[]"),
            ...event.detail.selected.map((selected: { text: string }) => {
                return ["place.country[]", selected.text];
            }),
        ];
    }
</script>

{#await countries then countries}
    <MultiSelect
        titleText="Países"
        spellcheck="false"
        filterable
        placeholder="Filtrar países..."
        items={countries}
        on:select={handleSelect}
    />
{/await}
