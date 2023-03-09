<script lang="ts">
    import { onMount } from "svelte";

    let currentSlideId: string | undefined;

    $: console.log(currentSlideId);

    function track() {
        const observer = new IntersectionObserver((entries) => {
            for (let index = 0; index < entries.length; index++) {
                const entry = entries[index];
                const targetSlideId = entry.target.getAttribute("id") ?? "";

                if (!entry.isIntersecting) {
                    continue;
                }

                if (
                    entry.intersectionRatio > 0.5 &&
                    currentSlideId === targetSlideId
                ) {
                    let element = document.getElementById(currentSlideId ?? "");
                    element?.classList.remove("fx-active-opacity");
                    element?.classList.add("fx-idle-opacity");
                }

                if (entry.intersectionRatio === 1) {
                    let element = document.getElementById(targetSlideId)
                    element?.classList.remove("fx-idle-opacity");
                    element?.classList.add("fx-active-opacity");

                    currentSlideId = targetSlideId;
                }
            }
        });

        document
            .querySelectorAll(".slide")
            .forEach((slide) => observer.observe(slide));
    }

    onMount(() => {
        track();
    });
</script>

<main class="tray" on:scroll={track}>
    <slot />
</main>
