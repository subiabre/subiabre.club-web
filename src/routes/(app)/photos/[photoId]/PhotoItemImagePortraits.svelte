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

<ul class="grid-180">
    {#await portraits then portraits}
        {#each portraits as portrait}
            <PhotoItemImagePortraitsItem {portrait} />
        {/each}
    {/await}
</ul>
