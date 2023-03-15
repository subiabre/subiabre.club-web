<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";

    export let image: Image;

    let textarea: HTMLTextAreaElement;

    export function focus() {
        textarea.focus();
    }

    function handleChange() {
        api.images.put(image.id, {
            description: image.description,
        });
    }
</script>

<textarea
    placeholder="¿Qué hay en esta imagen?"
    bind:value={image.description}
    bind:this={textarea}
    on:input={handleChange}
/>
