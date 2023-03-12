<script lang="ts">
    import type { Location, LocationLevel } from "$lib/api/types/Location";
    import { createEventDispatcher } from "svelte";

    export let location: Location;
    export let level: LocationLevel;

    let isActive = false;

    const dispatch = createEventDispatcher();

    function handleSelection() {
        dispatch(isActive ? "clear" : "selection", { location, level });

        isActive = !isActive;
    }
</script>

<li
    class={isActive ? "is-active" : ""}
    on:click={handleSelection}
    on:keydown={handleSelection}
>
    {location[level]}
</li>

<style lang="scss">
    li {
        padding: 0.2em;

        color: darken($color: $color-body, $amount: 50);

        &:hover {
            color: darken($color: $color-body, $amount: 25);
        }

        &.is-active {
            color: $color-body;
        }
    }
</style>
