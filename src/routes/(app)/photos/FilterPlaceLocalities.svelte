<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { MultiSelect } from "carbon-components-svelte";

    let localities = api.photos
        .getCollection(new URLSearchParams([["unique[place.locality]", "true"]]))
        .then((photos) => {
            return photos
                .filter((photo) => photo.place?.locality)
                .map((photo) => {
                    return {
                        id: photo.id,
                        text: photo.place?.locality ?? "",
                    };
                });
        });

    function handleSelect(event: CustomEvent) {
        $filters = [
            ...$filters.filter((param) => param[0] !== "place.locality"),
            ...event.detail.selected.map((selected: { text: string }) => {
                return ["place.locality", selected.text];
            }),
        ];
    }
</script>

{#await localities then localities}
    <MultiSelect
        titleText="Localidades"
        spellcheck="false"
        filterable
        placeholder="Filtrar localidades..."
        items={localities}
        on:select={handleSelect}
    />
{/await}
