<script lang="ts">
    import type { Location } from "$lib/api/types/Location";

    export let location: Location;
</script>

<p>
    {#if location.country}
        <span>{location.country}</span>
    {/if}
    {#if location.region}
        <span>&gt; {location.region}</span>
    {/if}
    {#if location.subregion}
        <span>&gt; {location.subregion}</span>
    {/if}
    {#if location.locality}
        <span>&gt; {location.locality}</span>
    {/if}
</p>
