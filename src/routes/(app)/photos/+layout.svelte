<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { goto } from "$app/navigation";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FilterDate from "./FilterDate.svelte";
    import PhotoList from "./PhotoList.svelte";
    import FilterPlace from "./FilterPlace.svelte";

    $: photos = api.photos.getCollection(
        new URLSearchParams([
            ...$filters.filter((param) => param.length === 2),
            ["date[order]", "asc"],
        ])
    );

    function handleSelection(event: any) {
        goto(`/photos/${event.detail.photo.id}`, { keepFocus: true });
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
        <FilterPlace />
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
<slot />
