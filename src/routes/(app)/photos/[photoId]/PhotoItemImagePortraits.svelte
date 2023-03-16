<script lang="ts">
    import { api } from "$lib/api";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
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

        if (portrait.person === "new") {
            goto(`/photos/${$page.params.photoId}/images/${image.id}/portraits/${portrait.id}#portrait`);
            return;
        }

        api.imagePortraits.put(image.id, portrait.id, {
            person: portrait.person,
        });
    }
</script>

{#await portraits then portraits}
    <PortraitList {portraits} on:update={handleUpdate} />
{/await}
