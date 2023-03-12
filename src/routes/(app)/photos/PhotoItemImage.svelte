<script lang="ts">
    import { api } from "$lib/api";
    import { file } from "$lib/human/file";
    import type { Image } from "$lib/api/types/Image";
    import type { Photo } from "$lib/api/types/Photo";

    export let iri: string;
    export let photo: Photo;

    $: image = ((): Promise<Image> =>
        api.call(iri).then((res) => res.json()))();
</script>

{#await image then image}
    <figure>
        <img alt={image.description} src={image.path} />
    </figure>
    <div class="padded">
        <h5>Foto #{photo.id} &gt; Imágen #{image.id}</h5>
        {#if image.description}
            <p>{image.description}</p>
        {/if}
        <p>{image.metadata.width}x{image.metadata.height} píxeles</p>
        <p>{file.size(image.metadata.size)}</p>
    </div>
{/await}
