<script lang="ts">
    import type { Photo } from "$lib/api/types/Photo";
    import PhotoListItem from "./PhotoListItem.svelte";

    export let photos: Photo[];
</script>

<section class="padded grid-250">
    {#each photos as photo (photo.id)}
        <PhotoListItem {photo} on:selection />
    {/each}
</section>

<style lang="scss">
    section {
        grid-auto-rows: 210px;
    }
</style>
