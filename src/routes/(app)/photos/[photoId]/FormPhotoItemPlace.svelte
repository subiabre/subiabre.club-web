<script lang="ts">
    import { api } from "$lib/api";
    import type { Photo } from "$lib/api/types/Photo";

    export let photo: Photo;

    let country = photo.place?.country ?? "";
    let region = photo.place?.region ?? "";
    let regionLevel2 = photo.place?.regionLevel2 ?? "";
    let locality = photo.place?.locality ?? "";

    let placeUpdated = false;

    function handleSubmit() {
        api.photos
            .put(photo.id, {
                ...photo,
                place: {
                    country: country.length < 1 ? undefined : country,
                    region: region.length < 1 ? undefined : region,
                    regionLevel2: regionLevel2.length < 1 ? undefined : regionLevel2,
                    locality : locality.length < 1 ? undefined : locality,
                },
            })
            .then(() => {
                placeUpdated = true;
                setTimeout(() => {
                    placeUpdated = false;
                }, 2500);
            });
    }
</script>

<form on:submit={handleSubmit}>
    <h5>Dónde</h5>
    <div class="grid-180">
        <p>
            <label>
                <h6>País</h6>
                <input type="text" placeholder="País" bind:value={country} />
            </label>
        </p>
        <p>
            <label>
                <h6>Región</h6>
                <input type="text" placeholder="Región" bind:value={region} />
            </label>
        </p>
    </div>
    <div class="grid-180">
        <p>
            <label>
                <h6>Subregión</h6>
                <input
                    type="text"
                    placeholder="Subregión"
                    bind:value={regionLevel2}
                />
            </label>
        </p>
        <p>
            <label>
                <h6>Localidad</h6>
                <input
                    type="text"
                    placeholder="Localidad"
                    bind:value={locality}
                />
            </label>
        </p>
    </div>
    <p>
        {#if placeUpdated}
            <span class="button">Lugar actualizado</span>
        {:else}
            <button class="color-success">Actualizar lugar</button>
        {/if}
    </p>
</form>
