<script lang="ts">
    let slide: HTMLElement;

    function scrollToHere() {
        slide.scrollIntoView({ behavior: "smooth" });
    }
</script>

<nav
    id="nav"
    class="slide fx-idle-opacity"
    on:click={scrollToHere}
    on:keydown={scrollToHere}
    bind:this={slide}
>
    <div class="padded">
        <h1>Menú.</h1>
    </div>
    <ul class="padded menu">
        <li class="page">
            <a class="color-body" href="/photos"><h2>Galería.</h2></a>
            <ul class="menu slot">
                <li>
                    <a class="color-body" href="/photos#filters"><h3>Filtros</h3></a
                    >
                </li>
                <li>
                    <a class="color-body" href="/photos#collection"
                        ><h3>Colección</h3></a
                    >
                </li>
            </ul>
        </li>
        <li class="page">
            <a class="color-body" href="/user"><h2>Usuario.</h2></a>
            <ul class="menu slot">
                <li>
                    <a class="color-body" href="/user#config"><h3>Configuración</h3></a>
                </li>
                <li>
                    <a class="color-body" href="/user#sessions"><h3>Sesiones</h3></a>
                </li>
                <li>
                    <a class="color-body" href="/user#keys"><h3>Llaves</h3></a>
                </li>
            </ul>
        </li>
    </ul>
</nav>
