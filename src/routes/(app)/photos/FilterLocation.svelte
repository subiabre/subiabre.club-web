<script lang="ts">
    import { api } from "$lib/api";

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
</script>

<div class="grid-180">
    <div>
        <h6 class="label">País</h6>
        <ul>
            {#await countries then countries}
                {#each countries as country}
                    <li>{country.country}</li>
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Región</h6>
        <ul>
            {#await regions then regions}
                {#each regions as region}
                    <li>{region.region}</li>
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Subregión</h6>
        <ul>
            {#await subregions then subregions}
                {#each subregions as subregion}
                    <li>{subregion.subregion}</li>
                {/each}
            {/await}
        </ul>
    </div>
    <div>
        <h6 class="label">Localidad</h6>
        <ul>
            {#await localities then localities}
                {#each localities as locality}
                    <li>{locality.locality}</li>
                {/each}
            {/await}
        </ul>
    </div>
</div>

<style lang="scss">
    ul {
        max-height: 90px;
        overflow-y: scroll;

        li {
            padding: 0.2em;

            color: darken($color: $color-body, $amount: 50);

            &:hover {
                color: $color-body;
            }
        }
    }
</style>
