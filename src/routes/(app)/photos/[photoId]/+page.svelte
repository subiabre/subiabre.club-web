<script lang="ts">
    import { api } from "$lib/api";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import PhotoItemImage from "./PhotoItemImage.svelte";
    import FormPhotoItemDate from "./FormPhotoItemDate.svelte";
    import FormPhotoItemPlace from "./FormPhotoItemPlace.svelte";

    let item: TraySlide;

    $: photo = api.photos.get(parseInt($page.params.photoId));
    $: $page.params.photoId && item && item.focus();

    onMount(() => {
        item.focus();
    });
</script>

<TraySlide id="item" bind:this={item}>
    <div class="padded">
        <h1>Elemento</h1>
    </div>
    {#await photo then photo}
        {#each photo.images as image}
            <PhotoItemImage iri={image} />
        {/each}
        <div class="padded grid-360">
            <FormPhotoItemDate {photo} />
            <FormPhotoItemPlace {photo} />
        </div>
    {/await}
</TraySlide>
