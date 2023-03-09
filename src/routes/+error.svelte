<script lang="ts">
    import { page } from "$app/stores";
    import Tray from "$lib/layout/Tray.svelte";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import TraySlideNav from "$lib/layout/TraySlideNav.svelte";
</script>

<Tray>
    <TraySlide id="error">
        <div class="padded">
            <h1>&#128533; {$page.status}</h1>
            <p>Algo no funcionó como debía, el fallo dice:</p>
            <p><code>{$page.error?.message}</code></p>
        </div>
    </TraySlide>
    <TraySlideNav />
</Tray>
