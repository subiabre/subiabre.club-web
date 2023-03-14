<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { qr } from "$lib/human/qr";
    import { time } from "$lib/human/time";
    import { shorten } from "$lib/human/shorten";
    import { createEventDispatcher, onMount } from "svelte";
    import type { UserKey } from "$lib/api/types/User";

    export let key: UserKey;

    const dispatch = createEventDispatcher();

    let keyCopy = false;
    let canvas: HTMLCanvasElement;

    $: url = `${window.location.origin}/login?key=${key.value}`;
    $: value = shorten.hyphened(key.value, 15);
    $: dateCreated = time.ago(key.dateCreated);
    $: dateExpires = key.dateExpires ? time.ago(key.dateExpires) : "Nunca";

    function handleCopy() {
        navigator.clipboard.writeText(url);

        keyCopy = true;
        setTimeout(() => {
            keyCopy = false;
        }, 2500);
    }

    function handleSubmit() {
        api.userKeys
            .delete($auth.user.id, key.id)
            .then(() => dispatch("deletion", { key }));
    }

    onMount(() => {
        qr.toCanvas(canvas, url);
    });
</script>

<form on:submit={handleSubmit}>
    <h2>Llave #{key.id}</h2>
    <p>{value}</p>
    <p>Creada <span class="font-weight-medium">{dateCreated}</span></p>
    <p>Caduca <span class="font-weight-medium">{dateExpires}</span></p>
    <p><canvas bind:this={canvas} /></p>
    <p>
        {#if keyCopy}
            <span class="button color-success">Enlace copiado</span>
        {:else}
            <button type="button" on:click={handleCopy}>Copiar enlace</button>
        {/if}
        <button type="submit" class="color-danger">Destruir</button>
    </p>
</form>
