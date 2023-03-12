<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";
    import type { Photo } from "$lib/api/types/Photo";

    export let photo: Photo;

    $: cover = ((): Promise<Image> =>
        api.call(photo.images[0]).then((res) => res.json()))();
</script>

<figure>
    {#await cover then cover}
        <img src={cover.path} alt={cover.description} />
    {/await}
</figure>

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
</style>
