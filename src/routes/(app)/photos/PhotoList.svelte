<script lang="ts">
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import PhotoListItems from "./PhotoListItems.svelte";
</script>

<TraySlide id="results">
    <div class="padded">
        <h1>Colección</h1>
    </div>
    <section id="photosList" class="padded grid-250">
        <PhotoListItems />
    </section>
</TraySlide>

<style lang="scss">
    section {
        grid-auto-rows: 210px;
    }
</style>
