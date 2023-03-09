<script lang="ts">
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
                    document
                        .getElementById(currentSlideId ?? "")
                        ?.classList.remove("fx-active-opacity");
                }

                if (entry.intersectionRatio === 1) {
                    document
                        .getElementById(targetSlideId)
                        ?.classList.add("fx-active-opacity");

                    currentSlideId = targetSlideId;
                }
            }
        });

        document
            .querySelectorAll(".slide")
            .forEach((slide) => observer.observe(slide));
    }
</script>

<main class="tray" on:scroll={track}>
    <slot />
</main>
