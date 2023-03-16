<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";
    import PortraitList from "./PortraitList.svelte";

    export let image: Image;

    let portraits = Promise.all(
        image.portraits.map((portrait) =>
            api.call(portrait).then((res) => res.json())
        )
    );
</script>

<ul>
    {#await portraits then portraits}
        <PortraitList {portraits} />
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
