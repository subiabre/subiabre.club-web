<script lang="ts">
    import { api } from "$lib/api";
    import type { ImagePortrait } from "$lib/api/types/Image";
    import PhotoItemImagePerson from "./PhotoItemImagePerson.svelte";

    export let portrait: ImagePortrait;

    let person =
        portrait.person && api.call(portrait.person).then((res) => res.json());
</script>

<li>
    <img
        alt="Recorte de una cara identificada en la foto"
        src={portrait.crop}
    />
    {#await person then person}
        <PhotoItemImagePerson {person} />
    {/await}
</li>

<style lang="scss">
    li {
        display: flex;
        align-items: center;

        img {
            width: auto;
            height: 3rem;
            padding: 2px;

            border-radius: 100%;
        }
    }
</style>
