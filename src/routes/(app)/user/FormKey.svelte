<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
    import { Button, Form } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let datePeriod: string = "+1day";

    function handleChange(event: any) {
        datePeriod = event.target.value;
    }

    function handleSubmit() {
        api.userKeys
            .post($auth.user.id, { dateExpires: datePeriod })
            .then((key) => dispatch("creation", { key }));
    }
</script>

<Form on:submit={handleSubmit}>
    <p />
    <p class="color-warning">
        Las llaves otorgan acceso a tu cuenta igual que tu usuario y contraseña.
    </p>
    <p>
        Evita exponer tus llaves a la vista de otras personas y no compartas el
        enlace con nadie.
    </p>
    <p>
        <label for="select-date-expires">
            Caduca después de
            <select id="select-date-expires" on:change={handleChange}>
                <option selected value="+1day">1 día</option>
                <option value="+2days">2 días</option>
                <option value="+3days">3 días</option>
                <option value="+7days">1 semana</option>
            </select>
        </label>
    </p>
    <p>
        <Button type="submit" kind="tertiary" class="color-success">Crear llave</Button>
    </p>
</Form>
