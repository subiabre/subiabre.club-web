<script lang="ts">
    export let id: string;

    let slide: HTMLElement;

    export function focus() {
        slide.scrollIntoView({ behavior: "smooth" });
    }
</script>

<section
    {id}
    class="slide"
    on:scroll
    on:click={focus}
    on:keydown={focus}
    bind:this={slide}
>
    <slot />
</section>
