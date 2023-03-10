<script lang="ts">
    import type { UserKey } from "$lib/api/types/User";
    import { time } from "$lib/human/time";

    export let key: UserKey;

    $: dateCreated = time.ago(key.dateCreated);
    $: dateExpires = key.dateExpires ? time.ago(key.dateExpires) : "Nunca";

</script>

<form>
    <h2>Llave #{key.id}</h2>
    <p>abcd...1234</p>
    <p>Creada <span class="font-weight-medium">{dateCreated}</span></p>
    <p>Caduca <span class="font-weight-medium">{dateExpires}</span></p>
    <p>
        <figure>
            <img
                style="background-color: white;"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/240px-QR_code_for_mobile_English_Wikipedia.svg.png"
            />
        </figure>
    </p>
    <p>
        <span class="button">Copiar</span>
        <button class="color-danger">Destruir</button>
    </p>
</form>