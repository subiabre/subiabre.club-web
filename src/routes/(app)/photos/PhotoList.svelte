<script lang="ts">
    import type { Photo } from "$lib/api/types/Photo";
    import PhotoListItem from "./PhotoListItem.svelte";

    export let photos: Photo[];
</script>

<section class="padded grid">
    {#each photos as photo (photo.id)}
        <PhotoListItem {photo} />
    {/each}
</section>
