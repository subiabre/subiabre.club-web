<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import type { Photo } from "$lib/api/types/Photo";
    import PhotoListItem from "./PhotoListItem.svelte";
    import { Button } from "carbon-components-svelte";
    import { onDestroy, onMount } from "svelte";

    let page = 1;
    let photos: Photo[] = [];

    const unsubscribe = filters.subscribe(async () => {
        page = 1;

        photos = [];
        photos = await api.photos.getCollection(
            new URLSearchParams([...$filters, ["date[order]", "asc"]])
        );
    });

    async function loadPhotos() {
        photos = [
            ...photos,
            ...(await api.photos.getCollection(
                new URLSearchParams([
                    ...$filters,
                    ["date[order]", "asc"],
                    ["page", page.toString()],
                ])
            )),
        ];
    }

    onMount(() => {
        loadPhotos();
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#each photos as photo}
    <PhotoListItem {photo} />
{/each}
<div>
    <Button
        kind="tertiary"
        disabled={photos.length % 30 != 0}
        on:click={() => {
            page++;
            loadPhotos();
        }}
    >
        Cargar más
    </Button>
    <p>{photos.length} elementos.</p>
</div>
