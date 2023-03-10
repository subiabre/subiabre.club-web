<script lang="ts">
    import { api } from "$lib/api";
    import { auth } from "$lib/stores";
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

<form on:submit={handleSubmit}>
    <p>
        <label for="select-date-expires">
            <h6>Esta llave caduca después de</h6>
            <select id="select-date-expires" on:change={handleChange}>
                <option selected value="+1day">1 día</option>
                <option value="+2days">2 días</option>
                <option value="+3days">3 días</option>
                <option value="+7days">1 semana</option>
            </select>
        </label>
    </p>

    <p>
        <button class="color-success">Crear llave</button>
    </p>
</form>
