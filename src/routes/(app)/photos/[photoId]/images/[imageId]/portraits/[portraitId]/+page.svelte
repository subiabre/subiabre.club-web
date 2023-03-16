<script lang="ts">
    import { api } from "$lib/api";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import { onMount } from "svelte";

    let portrait = api.imagePortraits.get(
        parseInt($page.params.imageId),
        parseInt($page.params.portraitId)
    );

    let familyName: string;
    let givenName: string;

    let slide: TraySlide;

    async function handleSubmit() {
        const person = await api.people.post({ familyName, givenName });

        api.imagePortraits.put(
            parseInt($page.params.imageId),
            parseInt($page.params.portraitId),
            { person: `/api/people/${person.id}` }
        ).then(() => {
            goto(`/photos/${$page.params.photoId}`);
        });
    }

    onMount(() => {
        slide.focus();
    });
</script>

<TraySlide id="portrait" bind:this={slide}>
    {#await portrait then portrait}
        <div class="padded">
            <h1>Retrato #{portrait.id}</h1>
        </div>
        <div class="padded">
            <figure>
                <img alt="Retrato de una persona" src={portrait.crop} />
            </figure>
        </div>
        <div class="padded">
            <form on:submit={handleSubmit}>
                <h5>Añadir persona</h5>
                <p>
                    <label>
                        <h6>Nombre</h6>
                        <input
                            type="text"
                            placeholder="Nombre"
                            bind:value={givenName}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        <h6>Apellido</h6>
                        <input
                            type="text"
                            placeholder="Apellido"
                            bind:value={familyName}
                        />
                    </label>
                </p>
                <p>
                    <button class="color-success">Añadir persona</button>
                </p>
            </form>
        </div>
    {/await}
</TraySlide>
