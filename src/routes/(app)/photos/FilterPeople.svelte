<script lang="ts">
    import { api } from "$lib/api";
    import FilterPeoplePerson from "./FilterPeoplePerson.svelte";

    let people = api.people.getCollection();
</script>

{#await people then people}
    <ul>
        {#each people as person}
            <FilterPeoplePerson {person} />
        {/each}
    </ul>
{/await}

<style lang="scss">
    ul {
        display: flex;
        gap: 1em;
    }
</style>
