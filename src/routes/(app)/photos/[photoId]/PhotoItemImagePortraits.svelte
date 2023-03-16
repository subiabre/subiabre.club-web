<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";
    import PhotoItemImagePortraitsItem from "./PhotoItemImagePortraitsItem.svelte";

    export let image: Image;

    let portraits = Promise.all(
        image.portraits.map((portrait) =>
            api.call(portrait).then((res) => res.json())
        )
    );
</script>

<ul>
    {#await portraits then portraits}
        {#each portraits as portrait}
            <PhotoItemImagePortraitsItem {portrait} />
        {/each}
    {/await}
</ul>

<style lang="scss">
    ul {
        margin: 1.5rem 0;

        display: flex;
        gap: 1rem;
        overflow-y: scroll;
    }
</style>
