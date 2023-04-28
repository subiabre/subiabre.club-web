<script lang="ts">
    import { goto } from "$app/navigation";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import PhotoListItems from "./PhotoListItems.svelte";

    function handleSelection(event: any) {
        goto(`/photos/${event.detail.photo.id}#item`, { keepFocus: true });
    }
</script>

<TraySlide id="results">
    <div class="padded">
        <h1>Colección</h1>
    </div>
    <section id="photosList" class="padded grid-250">
        <PhotoListItems on:selection={handleSelection} />
    </section>
</TraySlide>

<style lang="scss">
    section {
        grid-auto-rows: 210px;
    }
</style>
