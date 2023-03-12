<script lang="ts">
    import type { UserKey } from "$lib/api/types/User";
    import FormKey from "./FormKey.svelte";
    import KeyListItem from "./KeyListItem.svelte";

    export let keys: UserKey[];

    function handleCreation(event: CustomEvent) {
        keys = [...keys, event.detail.key];
    }

    function handleDeletion(event: CustomEvent) {
        keys = keys.filter((key) => key.id !== event.detail.key.id);
    }
</script>

<section class="padded">
    <h2>Crear llave</h2>
    <FormKey on:creation={handleCreation} />
</section>
<section class="padded grid-250">
    {#each keys as key}
        <KeyListItem {key} on:deletion={handleDeletion} />
    {/each}
</section>
