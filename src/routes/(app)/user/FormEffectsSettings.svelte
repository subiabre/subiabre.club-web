<script lang="ts">
    import { auth, effects } from "$lib/stores";

    $: effects.save($auth.user, $effects);
    $: if ($effects.vfxs) {
        document.body.classList.add("has-fxs");
    } else {
        document.body.classList.remove("has-fxs");
    }
</script>

<form>
    <p>
        <label for="check-fxs">
            <h6>Efectos visuales</h6>
            <input
                id="check-fxs"
                type="checkbox"
                bind:checked={$effects.vfxs}
            />
            <label for="check-fxs">
                {$effects.vfxs ? "Activados" : "Desactivados"}
            </label>
        </label>
    </p>

    <p>
        <label for="check-soundfxs">
            <h6>Efectos de sonido</h6>
            <input
                id="check-soundfxs"
                type="checkbox"
                bind:checked={$effects.soundfxs}
            />
            <label for="check-soundfxs">
                {$effects.soundfxs ? "Activados" : "Desactivados"}
            </label>
        </label>
    </p>

    <p>Las elecciones de efectos se guardan automáticamente.</p>
</form>
