<script lang="ts">
    import { api } from "$lib/api";
    import type { Image } from "$lib/api/types/Image";

    export let image: Image;

    function handleChange() {
        api.images.put(image.id, {
            description: image.description,
        });
    }
</script>

<textarea
    placeholder="¿Qué está pasando en esta foto?"
    bind:value={image.description}
    on:input={handleChange}
/>
