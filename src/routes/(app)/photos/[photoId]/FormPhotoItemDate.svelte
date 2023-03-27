<script lang="ts">
    import { time } from "$lib/human/time";
    import type { Photo } from "$lib/api/types/Photo";
    import { api } from "$lib/api";
    import { Button, ToastNotification } from "carbon-components-svelte";

    export let photo: Photo;

    let hasDateExact = photo.date.min ? false : true;

    let dateMin = hasDateExact
        ? undefined
        : time.ymd(photo.date.min ?? photo.date.max);
    let dateMax = time.ymd(photo.date.max);

    let dateUpdated = false;

    function handleSubmit() {
        api.photos
            .put(photo.id, {
                date: {
                    min: dateMin,
                    max: dateMax,
                },
            })
            .then((photo) => {
                dateUpdated = true;
                setTimeout(() => {
                    dateUpdated = false;
                }, 2500);
            });
    }
</script>

<form on:submit={handleSubmit}>
    <h5>Fecha</h5>
    <p>
        <label>
            <h6>Después de</h6>
            <input type="date" bind:value={dateMin} disabled={hasDateExact} />
        </label>
        <label>
            <input type="checkbox" bind:checked={hasDateExact} />
            Sé la fecha exacta
        </label>
    </p>
    <p>
        <label>
            <h6>Antes de/exactamente</h6>
            <input type="date" bind:value={dateMax} />
        </label>
    </p>
    <p>
        {#if dateUpdated}
            <Button disabled>Fecha actualizada</Button>
        {:else}
            <Button type="submit" kind="tertiary" class="color-success">Actualizar fecha</Button>
        {/if}
    </p>
</form>
