<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import type { Image } from "$lib/api/types/Image";
    import type { Photo } from "$lib/api/types/Photo";

    export let photo: Photo;

    $: cover = ((): Promise<Image> =>
        api.call(photo.images[0]).then((res) => res.json()))();

    const dispatch = createEventDispatcher();

    function handleSelection(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        dispatch("selection", { photo });
    }
</script>

{#await cover then cover}
    <figure
        class={cover.metadata.height > cover.metadata.width ? "is-tall" : ""}
        on:click={handleSelection}
        on:keydown={handleSelection}
    >
        <img src={cover.thumbnails[0].path} alt={cover.description} />
    </figure>
{/await}

<style lang="scss">
    figure {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    figure > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    .is-tall {
        column-span: 2;
    }
</style>
