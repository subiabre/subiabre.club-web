<script lang="ts">
    import { api } from "$lib/api";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FilterDate from "./FilterDate.svelte";
    import PhotoList from "./PhotoList.svelte";

    let photos = api.photos.getCollection();
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
<TraySlide id="result">
    <div class="padded">
        <h1>Colección</h1>
    </div>
    {#await photos then photos}
        <PhotoList {photos} />
    {/await}
</TraySlide>
