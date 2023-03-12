<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FilterDate from "./FilterDate.svelte";
    import PhotoList from "./PhotoList.svelte";
    import FilterLocation from "./FilterLocation.svelte";
    import type { Photo } from "$lib/api/types/Photo";
    import PhotoListItem from "./PhotoListItem.svelte";

    let item: TraySlide;
    let photo: Promise<Photo>;

    $: photos = api.photos.getCollection(
        new URLSearchParams([
            ...$filters.filter((param) => param.length === 2),
            ["date[order]", "asc"],
        ])
    );

    function handleSelection(event: any) {
        item.focus();

        photo = api.photos.get(event.detail.photo.id);
    }
</script>

<TraySlide id="filters">
    <div class="padded">
        <h1>Filtros</h1>
    </div>
    <div class="padded">
        <h2>Cuándo</h2>
        <FilterDate />
    </div>
    <div class="padded">
        <h2>Dónde</h2>
        <FilterLocation />
    </div>
    <div class="padded">
        <h2>Quién</h2>
    </div>
    <div class="padded">
        <h2>Cómo</h2>
        <form>
            <input type="text" placeholder="..." />
        </form>
    </div>
</TraySlide>
<TraySlide id="results">
    <div class="padded">
        <h1>Colección</h1>
    </div>
    {#await photos then photos}
        <PhotoList {photos} on:selection={handleSelection} />
    {/await}
</TraySlide>
<TraySlide id="item" bind:this={item}>
    <div class="padded">
        <h1>Elemento</h1>
        {#if photo}
            {#await photo then photo}
                <PhotoListItem {photo} />
            {/await}
        {/if}
    </div>
</TraySlide>
