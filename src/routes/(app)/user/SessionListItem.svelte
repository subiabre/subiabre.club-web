<script lang="ts">
    import { api } from "$lib/api";
    import { ua } from "$lib/human/ua";
    import { time } from "$lib/human/time";
    import { auth } from "$lib/stores";
    import { createEventDispatcher } from "svelte";
    import type { UserSession } from "$lib/api/types/User";
    import { Button, Form } from "carbon-components-svelte";

    export let session: UserSession;

    $: userAgent = ua.parse(session.userAgent);
    $: dateCreated = time.ago(session.dateCreated);
    $: dateExpires = time.ago(session.dateExpires);

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        api.userSessions.delete($auth.user.id, session.id).then(() => {
            dispatch("deletion", { session });
        });
    }
</script>

<Form on:submit={handleSubmit}>
    <h2>
        Sesión #{session.id}
    </h2>
    <p title={session.userAgent}>
        <strong>{userAgent.browser}</strong> en <strong>{userAgent.os}</strong>
        {#if session.id === $auth.session.id}
            <span class="color-success">(Actual)</span>
        {/if}
    </p>
    <p>Creada <span class="font-weight-medium">{dateCreated}</span></p>
    <p>Caduca <span class="font-weight-medium">{dateExpires}</span></p>
    <p>
        <Button type="submit" kind="danger-tertiary" class="color-danger">Destruir</Button>
    </p>
</Form>
