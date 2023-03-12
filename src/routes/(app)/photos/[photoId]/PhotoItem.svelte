<script lang="ts">
    import { api } from "$lib/api";
    import { time } from "$lib/human/time";
    import type { Photo } from "$lib/api/types/Photo";
    import type { Location } from "$lib/api/types/Location";
    import PhotoItemLocation from "./PhotoItemLocation.svelte";
    import PhotoItemImage from "./PhotoItemImage.svelte";

    export let photo: Photo;

    $: location =
        photo.location &&
        ((): Promise<Location> =>
            api.call(photo.location).then((res) => res.json()))();
</script>

<div class="padded">
    <h4>Foto #{photo.id}</h4>
    <p>
        {time.year(photo.date.max)}
        {#if photo.date.min}
            - {time.year(photo.date.min)}
        {/if}
    </p>
    {#if location}
        {#await location then location}
            <PhotoItemLocation {location} />
        {/await}
    {/if}
</div>
{#each photo.images as image}
    <PhotoItemImage {photo} iri={image} />
{/each}
<div class="padded">
    <p>{photo.images.length} imágenes.</p>
</div>
