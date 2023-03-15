<script lang="ts">
    import { filters } from "$lib/stores";
    import { createEventDispatcher } from "svelte";

    export let type: string;
    export let name: string;

    $: console.log({ type, name });

    const dispatch = createEventDispatcher();

    $: isActive = !!$filters.find((param) => {
        return param[0] === type && param[1] === name;
    });

    function handleSelection() {
        if (isActive) {
            dispatch("clear", { type, name });
        } else {
            dispatch("add", { type, name });
        }
    }
</script>

<li
    class={isActive ? "is-active" : ""}
    on:click={handleSelection}
    on:keydown={handleSelection}
>
    {name}
</li>

<style lang="scss">
    li {
        padding: 0.25em 0;
        opacity: 0.5;

        &:hover,
        &.is-active {
            opacity: 1;
        }
    }
</style>
