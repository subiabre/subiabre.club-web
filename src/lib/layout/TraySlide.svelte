<script lang="ts">
    export let id: string;
</script>

<section {id} class="slide">
    <slot />
</section>

<style lang="scss">
    @import "/src/styles/trayslide.scss";
</style>
