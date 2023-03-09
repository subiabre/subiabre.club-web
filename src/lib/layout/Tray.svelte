<script lang="ts">
</script>

<main class="tray">
    <slot />
</main>

<style lang="scss">
    .tray {
        height: 100svh;
        box-sizing: border-box;
        font-family: sans-serif;
        scrollbar-gutter: stable;

        display: flex;

        overflow-y: hidden;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }
</style>
