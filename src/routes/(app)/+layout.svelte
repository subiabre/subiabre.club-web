<script lang="ts">
    import { api } from "$lib/api";
    import { auth, has } from "$lib/stores";
    import { goto } from "$app/navigation";
    import Tray from "$lib/layout/Tray.svelte";
    import TraySlideNav from "$lib/layout/TraySlideNav.svelte";
    import { onMount } from "svelte";

    let isReady = false;

    onMount(async () => {
        const session = $auth
            ? $auth.session
            : await api.auth.get().catch((err) => goto("/login"));

        if (!session) return;
        const user = await api.call(session.owner).then((res) => res.json());

        has.init(user);
        auth.set({ user, session });

        isReady = true;
    });
</script>

{#if isReady}
    <Tray>
        <TraySlideNav />
        <slot />
    </Tray>
{/if}
