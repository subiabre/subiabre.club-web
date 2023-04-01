<script lang="ts">
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FilterDate from "./FilterDate.svelte";
    import PhotoList from "./PhotoList.svelte";
    import FilterPlace from "./FilterPlace.svelte";
    import FilterPeople from "./FilterPeople.svelte";
    import FilterDescription from "./FilterDescription.svelte";
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
        <FilterPeople />
    </div>
    <div class="padded">
        <h2>Cómo</h2>
        <FilterDescription />
    </div>
</TraySlide>
<TraySlide id="results">
    <div class="padded">
        <h1>Colección</h1>
    </div>
    <PhotoList />
</TraySlide>
<slot />
