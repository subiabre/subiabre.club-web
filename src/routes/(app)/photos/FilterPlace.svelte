<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import FilterPlaceItem from "./FilterPlaceItem.svelte";

    let history: [string, string][] = [];

    $: $filters = [
        ...$filters.filter((param) => !param[0].startsWith("place.")),
        ...history,
    ];

    $: countries = api.photos
        .getCollection(
            new URLSearchParams([
                ["unique[place.country]", "true"],
                ...$filters.filter((param) => param[0].startsWith("date")),
            ])
        )
        .then((photos) => {
            return photos.map((photo) => photo.place?.country ?? "");
        });

    $: regions = api.photos
        .getCollection(
            new URLSearchParams([
                ["unique[place.region]", "true"],
                ...$filters.filter(
                    (param) =>
                        param[0].startsWith("date") ||
                        param[0] === `place.country[]`
                ),
            ])
        )
        .then((photos) => {
            return photos.map((photo) => photo.place?.region ?? "");
        });

    $: subregions = api.photos
        .getCollection(
            new URLSearchParams([
                ["unique[place.regionLevel2]", "true"],
                ...$filters.filter(
                    (param) =>
                        param[0].startsWith("date") ||
                        param[0] === `place.region[]`
                ),
            ])
        )
        .then((photos) => {
            return photos.map((photo) => photo.place?.regionLevel2 ?? "");
        });

    $: localities = api.photos
        .getCollection(
            new URLSearchParams([
                ["unique[place.locality]", "true"],
                ...$filters.filter(
                    (param) =>
                        param[0].startsWith("date") ||
                        param[0] === `place.regionLevel2[]`
                ),
            ])
        )
        .then((photos) => {
            return photos.map((photo) => photo.place?.locality ?? "");
        });

    function rewind(type: string, name: string) {
        const index = history.findIndex((param) => {
            return param[0] === type && param[1] === name;
        });

        history = history.slice(0, index);
    }

    function push(type: string, name: string) {
        history = [...history, [type, name]];
    }

    function add(event: CustomEvent) {
        push(event.detail.type, event.detail.name);
    }

    function clear(event: CustomEvent) {
        rewind(event.detail.type, event.detail.name);
    }
</script>

<div>
    <div class="grid-250">
        <div>
            <h5 class="label">País</h5>
            <ul>
                {#await countries then countries}
                    {#each countries as country}
                        <FilterPlaceItem
                            type="place.country[]"
                            name={country}
                            on:add={add}
                            on:clear={clear}
                        />
                    {/each}
                {/await}
            </ul>
        </div>

        <div>
            <h5 class="label">Región</h5>
            <ul>
                {#await regions then regions}
                    {#each regions as region}
                        <FilterPlaceItem
                            type="place.region[]"
                            name={region}
                            on:add={add}
                            on:clear={clear}
                        />
                    {/each}
                {/await}
            </ul>
        </div>

        <div>
            <h5 class="label">Subregión</h5>
            <ul>
                {#await subregions then subregions}
                    {#each subregions as subregion}
                        <FilterPlaceItem
                            type="place.regionLevel2[]"
                            name={subregion}
                            on:add={add}
                            on:clear={clear}
                        />
                    {/each}
                {/await}
            </ul>
        </div>

        <div>
            <h5 class="label">Localidad</h5>
            <ul>
                {#await localities then localities}
                    {#each localities as locality}
                        <FilterPlaceItem
                            type="place.locality[]"
                            name={locality}
                            on:add={add}
                            on:clear={clear}
                        />
                    {/each}
                {/await}
            </ul>
        </div>
    </div>

    <ul class="breadcrumb">
        {#each history as milestone}
            <li>{milestone[1]}</li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .breadcrumb {
        margin: 1.5rem 0;
        opacity: 0.5;

        &::before {
            content: "/ ";
        }

        * {
            display: inline;

            &:not(:first-child)::before {
                content: " / ";
            }
        }
    }

    .grid-250 ul {
        height: 5rem;
    }
</style>
