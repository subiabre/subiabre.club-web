<script lang="ts">
    import { auth, has } from "$lib/stores";
    import { Toggle } from "carbon-components-svelte";

    $: has.save($auth.user, $has);
</script>

<form>
    <p>Las elecciones de efectos se guardan automáticamente.</p>

    <h6>Efectos visuales</h6>
    <Toggle labelA="Desactivados" labelB="Activados" bind:toggled={$has.vfxs} />

    <h6>Efectos de sonido</h6>
    <Toggle labelA="Desactivados" labelB="Activados" bind:toggled={$has.soundfxs} />
    <p>Los efectos de sonido pueden no sonar hasta que interactúes con la página usando tu teclado o ratón.</p>
</form>
