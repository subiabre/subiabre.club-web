<script lang="ts">
    import { sound } from "$lib/stores";
    import { onMount } from "svelte";

    let currentSlideId: string | undefined;

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
                    element?.classList.remove("current");
                }

                if (
                    entry.intersectionRatio === 1 &&
                    currentSlideId !== undefined &&
                    currentSlideId !== targetSlideId
                ) {
                    sound.playSlide();
                }

                if (entry.intersectionRatio === 1) {
                    let element = document.getElementById(targetSlideId);
                    element?.classList.add("current");

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
