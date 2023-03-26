<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { qr } from "$lib/human/qr";
    import { time } from "$lib/human/time";
    import { shorten } from "$lib/human/shorten";
    import { createEventDispatcher, onMount } from "svelte";
    import type { UserKey } from "$lib/api/types/User";
    import { Button, Form } from "carbon-components-svelte";

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

<Form on:submit={handleSubmit}>
    <h2>Llave #{key.id}</h2>
    <p>{value}</p>
    <p>Creada <span class="font-weight-medium">{dateCreated}</span></p>
    <p>Caduca <span class="font-weight-medium">{dateExpires}</span></p>
    <p><canvas bind:this={canvas} /></p>
    <p>
        <Button type="button" kind="tertiary" on:click={handleCopy}>
            {#if keyCopy}
                Enlace copiado
            {:else}
                Copiar enlace
            {/if}
        </Button>
        <Button type="submit" kind="danger-tertiary" class="color-danger">Destruir</Button>
    </p>
</Form>
