<script lang="ts">
    import { api } from "$lib/api";
    import PortraitList from "./PortraitList.svelte";
    import type { Image, ImagePortrait } from "$lib/api/types/Image";

    export let image: Image;

    let portraits = Promise.all(
        image.portraits.map((portrait) =>
            api.call(portrait).then((res) => res.json())
        )
    );

    function handleUpdate(event: CustomEvent) {
        const portrait: ImagePortrait = event.detail.portrait;

        api.imagePortraits.put(image.id, portrait.id, {
            person: portrait.person,
        });
    }
</script>

{#await portraits then portraits}
    <PortraitList {portraits} on:update={handleUpdate} />
{/await}
