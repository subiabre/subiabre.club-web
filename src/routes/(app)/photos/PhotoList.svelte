<script lang="ts">
    import { goto } from "$app/navigation";
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import PhotoListItem from "./PhotoListItem.svelte";

    $: photos = api.photos.getCollection(
        new URLSearchParams([
            ...$filters.filter((param) => param.length === 2),
            ["date[order]", "asc"],
        ])
    );

    function handleSelection(event: any) {
        goto(`/photos/${event.detail.photo.id}#item`, { keepFocus: true });
    }
</script>

<section class="padded grid-250">
    {#await photos then photos}
        {#each photos as photo (photo.id)}
            <PhotoListItem {photo} on:selection={handleSelection} />
        {/each}
    {/await}
</section>

<style lang="scss">
    section {
        grid-auto-rows: 210px;
    }
</style>
