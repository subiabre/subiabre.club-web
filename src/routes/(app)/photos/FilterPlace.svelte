<script lang="ts">
    import FilterPlaceCountries from "./FilterPlaceCountries.svelte";
    import FilterPlaceLocalities from "./FilterPlaceLocalities.svelte";
    import FilterPlaceRegions from "./FilterPlaceRegions.svelte";
    import FilterPlaceSubregions from "./FilterPlaceSubregions.svelte";
</script>

<div class="grid-180">
    <FilterPlaceCountries />
    <FilterPlaceRegions />
    <FilterPlaceSubregions />
    <FilterPlaceLocalities />
</div>
