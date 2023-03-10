<script lang="ts">
    import type { UserKey } from "$lib/api/types/User";
    import FormKey from "./FormKey.svelte";
    import KeyListItem from "./KeyListItem.svelte";

    export let keys: UserKey[];

    function handleCreation(event: CustomEvent) {
        keys = [...keys, event.detail.key];
    }
</script>

<section class="padded">
    <h2>Crear llave</h2>
    <FormKey on:creation={handleCreation} />
</section>
<section class="padded grid">
    {#each keys as key}
        <KeyListItem {key} />
    {/each}
</section>