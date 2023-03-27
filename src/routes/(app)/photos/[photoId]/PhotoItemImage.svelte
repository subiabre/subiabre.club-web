<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";
    import PhotoItemImageDescription from "./PhotoItemImageDescription.svelte";
    import PhotoItemImagePortraits from "./PhotoItemImagePortraits.svelte";

    export let iri: string;

    let description: PhotoItemImageDescription;

    $: image = ((): Promise<Image> =>
        api.call(iri).then((res) => res.json()))();

    function showOverlay() {
        description.focus();
    }
</script>

{#await image then image}
    <div>
        <figure on:touchstart={showOverlay}>
            <img alt={image.description} src={image.path} />
            <div class="padded overlay">
                {#if image.portraits.length > 0}
                    <h5>Quién</h5>
                    <PhotoItemImagePortraits {image} />
                {/if}
                <p />
                <h5>Descripción</h5>
                <PhotoItemImageDescription {image} bind:this={description} />
            </div>
        </figure>
    </div>
{/await}

<style lang="scss">
    figure {
        width: 100%;

        display: flex;
        justify-content: center;
        position: relative;

        &:hover,
        &:focus-within {
            .overlay {
                opacity: 1;
                transition: opacity 0.2s ease;
            }
        }

        img {
            width: auto;
            max-width: 100%;
        }

        .overlay {
            width: 100%;
            padding: 1.5em;
            position: absolute;
            bottom: 0;

            opacity: 0;
            transition: opacity 0.2s ease;
            background: linear-gradient(
                180deg,
                rgba($color-background, 0) 0%,
                rgba($color-background, 0.5) 50%,
                rgba($color-background, 1) 100%
            );

            :global(*) {
                text-shadow: 1px 1px $color-background;
            }
        }
    }
</style>
