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

    function lazy() {
        const observer = new IntersectionObserver((entries) => {
            for (let index = 0; index < entries.length; index++) {
                const entry = entries[index];

                if (!entry.isIntersecting) {
                    continue;
                }

                console.log("loader on sight");
            }
        });

        const loader = document.getElementById("photosLoader");
        if (loader) {
            observer.observe(loader);
        }
    }
</script>

<section class="padded grid-250" on:scroll={lazy}>
    {#await photos then photos}
        {#each photos as photo (photo.id)}
            <PhotoListItem {photo} on:selection={handleSelection} />
        {/each}
    {/await}
    <div id="photosLoader" />
</section>

<style lang="scss">
    section {
        grid-auto-rows: 210px;
    }
</style>
