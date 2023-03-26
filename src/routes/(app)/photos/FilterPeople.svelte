<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import type { Person } from "$lib/api/types/Person";
    import FilterPeoplePerson from "./FilterPeoplePerson.svelte";

    let people = api.people.getCollection();

    let selected: Person[] = [];

    $: console.log($filters);

    $: $filters = [
        ...$filters.filter(
            (param) => !param[0].startsWith("images.portraits.person")
        ),
        ...selected.map((person) => {
            return [
                "images.portraits.person.familyName[]",
                person.familyName,
            ] as [string, string];
        }),
        ...selected.map((person) => {
            return [
                "images.portraits.person.givenName[]",
                person.givenName,
            ] as [string, string];
        }),
    ];

    function handleClear(event: CustomEvent) {
        selected = selected.filter(
            (person) => person.id !== event.detail.person.id
        );
    }

    function handleSelect(event: CustomEvent) {
        selected = [...selected, event.detail.person];
    }
</script>

{#await people then people}
    <ul>
        {#each people as person}
            <FilterPeoplePerson
                {person}
                on:clear={handleClear}
                on:select={handleSelect}
            />
        {/each}
    </ul>
{/await}

<style lang="scss">
    ul {
        display: flex;
        gap: 1em;
    }
</style>
