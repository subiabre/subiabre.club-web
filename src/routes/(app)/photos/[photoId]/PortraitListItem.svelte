<script lang="ts">
    import { api } from "$lib/api";
    import type { ImagePortrait } from "$lib/api/types/Image";

    export let portrait: ImagePortrait;

    let person =
        portrait.person && api.call(portrait.person).then((res) => res.json());

    function handleSelection() {
        alert("modal");
    }
</script>

<li on:click={handleSelection} on:keydown={handleSelection}>
    <img
        alt="Recorte de una cara identificada en la foto"
        src={portrait.crop}
    />
    {#await person then person}
        <div>
            <p>{person?.familyName ?? ""}</p>
            <p>{person?.givenName ?? ""}</p>
        </div>
    {/await}
</li>

<style lang="scss">
    li {
        display: flex;
        align-items: center;

        flex-shrink: 0;

        &:hover {
            cursor: pointer;
        }

        img {
            width: auto;
            height: 3rem;

            border-radius: 100%;
            border: 1px solid $color-background;
        }

        div {
            p {
                margin: 0 0.5em;
            }
        }
    }
</style>
