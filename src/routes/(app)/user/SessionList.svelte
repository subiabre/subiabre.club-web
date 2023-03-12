<script lang="ts">
    import type { UserSession } from "$lib/api/types/User";
    import SessionListItem from "./SessionListItem.svelte";

    export let sessions: UserSession[];

    function handleDeletion(event: CustomEvent) {
        sessions = sessions.filter(session => {
            return session.id !== event.detail.session.id;
        });
    }
</script>

<section class="padded grid-250">
    {#each sessions as session (session.id)}
        <SessionListItem {session} on:deletion={handleDeletion} />
    {/each}
</section>
