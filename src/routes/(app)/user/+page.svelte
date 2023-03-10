<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FormEffectsSettings from "./FormEffectsSettings.svelte";
    import FormPassword from "./FormPassword.svelte";
    import FormUsername from "./FormUsername.svelte";
    import SessionList from "./SessionList.svelte";
    import KeyList from "./KeyList.svelte";

    let sessions = api.userSessions.getCollection($auth.user.id);
    let keys = api.userKeys.getCollection($auth.user.id);
</script>

<TraySlide id="config">
    <div class="padded">
        <h1>Configuración</h1>
        <p>
            Aquí puedes actualizar la información asociada a tu cuenta así como
            tu configuración de efectos.
        </p>
        <p>
            Los cambios en tu configuración de efectos se guardarán en el
            navegador actual y no se sincronizarán para todas tus sesiones.
        </p>
    </div>

    <section class="padded">
        <h2>Efectos</h2>
        <FormEffectsSettings />
    </section>

    <section class="padded">
        <h2>Nombre</h2>
        <FormUsername />
    </section>

    <section class="padded">
        <h2>Contraseña</h2>
        <FormPassword />
    </section>
</TraySlide>
<TraySlide id="sessions">
    <div class="padded">
        <h1>Sesiones</h1>
        <p>
            Las sesiones se crean cuando se usa tu usuario y contraseña, o una
            llave asociada a tu cuenta.
        </p>
        <p>
            Las sesiones evitan que tengas que autentificarte en cada conexión,
            pero sólo tienen validez hasta dos semanas después de tu última
            actividad.
        </p>
    </div>
    {#await sessions then sessions}
        <SessionList {sessions} />
    {/await}
</TraySlide>
<TraySlide id="keys">
    <div class="padded">
        <h1>Llaves</h1>
        <p>
            Las llaves son enlaces URL que garantizan acceso a tu cuenta al ser
            visitados.
        </p>
        <p>
            Las llaves pueden usarse indiscriminadamente antes de caducar. Para
            evitar problemas de seguridad, <strong
                >evita que otras personas las vean</strong
            >.
        </p>
    </div>
    {#await keys then keys}
        <KeyList {keys} />
    {/await}
</TraySlide>
