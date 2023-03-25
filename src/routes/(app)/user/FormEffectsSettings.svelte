<script lang="ts">
    import { auth, has } from "$lib/stores";
    import { Toggle } from "carbon-components-svelte";

    $: has.save($auth.user, $has);
</script>

<form>
    <h6>Efectos visuales</h6>
    <Toggle labelA="Desactivados" labelB="Activados" bind:toggled={$has.vfxs} />

    <h6>Efectos de sonido</h6>
    <Toggle labelA="Desactivados" labelB="Activados" bind:toggled={$has.soundfxs} />

    <p>Las elecciones de efectos se guardan automáticamente.</p>
</form>
