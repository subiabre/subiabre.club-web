<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { onMount } from "svelte";

    onMount(() => {
        api.auth
            .key($page.params.key)
            .then(async (session) => {
                const user = await api
                    .call(session.owner)
                    .then((res) => res.json());

                return { user, session };
            })
            .then((data) => {
                auth.set(data);

                goto("/");
            })
            .catch(() => {
                goto("/");
            });
    });
</script>
