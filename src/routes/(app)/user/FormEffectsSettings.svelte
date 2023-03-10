<script lang="ts">
    import { auth, has } from "$lib/stores";

    $: has.save($auth.user, $has);
</script>

<form>
    <p>
        <label for="check-fxs">
            <h6>Efectos visuales</h6>
            <input
                id="check-fxs"
                type="checkbox"
                bind:checked={$has.vfxs}
            />
            <label for="check-fxs">
                {$has.vfxs ? "Activados" : "Desactivados"}
            </label>
        </label>
    </p>

    <p>
        <label for="check-soundfxs">
            <h6>Efectos de sonido</h6>
            <input
                id="check-soundfxs"
                type="checkbox"
                bind:checked={$has.soundfxs}
            />
            <label for="check-soundfxs">
                {$has.soundfxs ? "Activados" : "Desactivados"}
            </label>
        </label>
    </p>

    <p>Las elecciones de efectos se guardan automáticamente.</p>
</form>
