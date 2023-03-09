<script lang="ts">
    let slide: HTMLElement;

    function scrollToHere() {
        slide.scrollIntoView({ behavior: "smooth" });
    }
</script>

<nav
    id="nav"
    class="slide fx-idle-opacity"
    on:click={scrollToHere}
    on:keydown={scrollToHere}
    bind:this={slide}
>
    <slot />
</nav>
