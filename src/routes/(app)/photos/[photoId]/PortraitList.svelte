<script lang="ts">
    import type { ImagePortrait } from "$lib/api/types/Image";
    import PortraitListItem from "./PortraitListItem.svelte";

    export let portraits: ImagePortrait[];

    $: portraits = [...portraits].sort((a, b) => {
        if (a.person && !b.person) return -1;
        if (b.person && !a.person) return 1;

        return 0;
    });
</script>

{#each portraits as portrait}
    <PortraitListItem {portrait} />
{/each}
