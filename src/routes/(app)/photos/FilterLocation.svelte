<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import { LocationLevel } from "$lib/api/types/Location";
    import FilterLocationItem from "./FilterLocationItem.svelte";

    $: countries = api.locations.getCollection(
        new URLSearchParams([
            ["unique[country]", "true"],
            ["exists[country]", "true"],
        ])
    );
    $: regions = api.locations.getCollection(
        new URLSearchParams([
            ["unique[region]", "true"],
            ["exists[region]", "true"],
        ])
    );
    $: subregions = api.locations.getCollection(
        new URLSearchParams([
            ["unique[subregion]", "true"],
            ["exists[subregion]", "true"],
        ])
    );
    $: localities = api.locations.getCollection(
        new URLSearchParams([
            ["unique[locality]", "true"],
            ["exists[locality]", "true"],
        ])
    );

    function handleClear(event: any) {
        const level = event.detail.level;
        const location = event.detail.location;

        filters.update((params) => {
            return params.filter((param) => {
                switch (param[0] === `location.${level}[]`) {
                    case true:
                        return param[1] !== location[level];
                    default:
                        return true;
                }
            });
        });
    }

    function handleSelection(event: any) {
        const level = event.detail.level;
        const location = event.detail.location;

        filters.update((params) => {
            return [...params, [`location.${level}[]`, location[level]]];
        });
    }
</script>

<div class="grid-180">
    <div>
        <h6 class="label">País</h6>
        <ul>
            {#await countries then countries}
                {#each countries as country}
                    <FilterLocationItem
                        location={country}
                        level={LocationLevel.country}
                        on:clear={handleClear}
                        on:selection={handleSelection}
                    />
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Región</h6>
        <ul>
            {#await regions then regions}
                {#each regions as region}
                    <FilterLocationItem
                        location={region}
                        level={LocationLevel.region}
                        on:clear={handleClear}
                        on:selection={handleSelection}
                    />
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Subregión</h6>
        <ul>
            {#await subregions then subregions}
                {#each subregions as subregion}
                    <FilterLocationItem
                        location={subregion}
                        level={LocationLevel.subregion}
                        on:clear={handleClear}
                        on:selection={handleSelection}
                    />
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Localidad</h6>
        <ul>
            {#await localities then localities}
                {#each localities as locality}
                    <FilterLocationItem
                        location={locality}
                        level={LocationLevel.locality}
                        on:clear={handleClear}
                        on:selection={handleSelection}
                    />
                {/each}
            {/await}
        </ul>
    </div>
</div>

<style lang="scss">
    ul {
        max-height: 90px;
        overflow-y: scroll;
    }
</style>
