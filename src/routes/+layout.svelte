<script lang="ts">
    import "../app.scss";
    import { auth } from "$lib/stores";
    import { onMount } from "svelte";
    import { getEffects } from "$lib/human/effects";

    onMount(() => {
        const prefers = getEffects($auth?.user);

        if (prefers.fx) {
            document.body.classList.add("has-fxs");
        }
    });
</script>

<slot />
