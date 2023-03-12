<script lang="ts">
    import { api } from "$lib/api";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import PhotoItem from "./PhotoItem.svelte";

    let item: TraySlide;

    $: photo = api.photos.get(parseInt($page.params.photoId));
    $: $page.params.photoId && item && item.focus();

    onMount(() => {
        item.focus();
    });
</script>

<TraySlide id="item" bind:this={item}>
    {#if photo}
        {#await photo then photo}
            <PhotoItem {photo} />
        {/await}
    {/if}
</TraySlide>
