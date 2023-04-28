<script lang="ts">
    import { api } from "$lib/api";
    import { createEventDispatcher } from "svelte";
    import type { Image } from "$lib/api/types/Image";
    import type { Photo } from "$lib/api/types/Photo";

    export let photo: Photo;

    let cover: Image;
    let coverClass: string = "loading";

    const dispatch = createEventDispatcher();

    async function loadCover(photo: Photo) {
        cover = await api.call(photo.images[0]).then(res => res.json());
        coverClass = cover.metadata.height - cover.metadata.width > 50 ? "is-tall" : "";
    }

    function handleSelection(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        dispatch("selection", { photo });
    }

    $: loadCover(photo);
</script>

<figure
    class={coverClass}
    on:click={handleSelection}
    on:keydown={handleSelection}
>
    <img src={cover?.thumbnails[0].path} alt={cover?.description} />
</figure>

<style lang="scss">
    figure {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.2s ease;
    }

    figure.loading {
        opacity: 0;
    }

    figure > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }

    .is-tall {
        grid-row: span 2;
    }
</style>
