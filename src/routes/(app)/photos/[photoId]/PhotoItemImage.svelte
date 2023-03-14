<script lang="ts">
    import { api } from "$lib/api";
    import { file } from "$lib/human/file";
    import type { Image } from "$lib/api/types/Image";
    import PhotoItemImageFormDescription from "./PhotoItemImageFormDescription.svelte";

    export let iri: string;

    $: image = ((): Promise<Image> =>
        api.call(iri).then((res) => res.json()))();
</script>

{#await image then image}
    <figure>
        <img alt={image.description} src={image.path} />
    </figure>
    <div class="padded">
        <PhotoItemImageFormDescription {image} />
    </div>
    <div class="padded">
        <h5>Quién</h5>
    </div>
{/await}
