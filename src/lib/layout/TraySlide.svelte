<script lang="ts">
    export let id: string;

    let slide: HTMLElement;

    function scrollToHere() {
        slide.scrollIntoView({ behavior: "smooth" });
    }
</script>

<section
    {id}
    class="slide fx-idle-opacity"
    on:click={scrollToHere}
    on:keydown={scrollToHere}
    bind:this={slide}
>
    <slot />
</section>
