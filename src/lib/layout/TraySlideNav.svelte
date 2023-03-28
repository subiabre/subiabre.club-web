<script lang="ts">
    import { page } from "$app/stores";
    import { sound } from "$lib/stores";
    import { onMount } from "svelte";

    let slide: HTMLElement;

    $: $page.url.pathname && track();

    function track() {
        if (!document) return;

        document.querySelectorAll(".current").forEach((current) => {
            current.classList.remove("current");
        });

        document
            .querySelector(`[href='${$page.url.pathname}']`)
            ?.classList.add("current");
        document.querySelector("#nav")?.classList.add("current");
    }

    function focus() {
        slide.scrollIntoView({ behavior: "smooth" });
    }

    onMount(() => {
        track();
    });
</script>

<nav
    id="nav"
    class="slide"
    on:click={focus}
    on:keydown={focus}
    bind:this={slide}
>
    <div class="padded">
        <h1>Menú</h1>
    </div>
    <ul class="padded menu">
        <li class="page">
            <a
                href="/photos"
                on:mouseenter={() =>
                    "/photos" !== $page.url.pathname && sound.playClack()}
            >
                <h2>Galería</h2>
            </a>
            <ul class="menu slot">
                <li>
                    <a
                        href="/photos#filters"
                        on:mouseenter={() =>
                            "/photos#filters" !== $page.url.pathname &&
                            sound.playClack()}><h3>Filtros</h3></a
                    >
                </li>
                <li>
                    <a
                        href="/photos#results"
                        on:mouseenter={() =>
                            "/photos#collection" !== $page.url.pathname &&
                            sound.playClack()}><h3>Colección</h3></a
                    >
                </li>
            </ul>
        </li>
        <li class="page">
            <a
                href="/user"
                on:mouseenter={() =>
                    "/user" !== $page.url.pathname && sound.playClack()}
                ><h2>Usuario</h2></a
            >
            <ul class="menu slot">
                <li>
                    <a
                        href="/user#config"
                        on:mouseenter={() =>
                            "/user#config" !== $page.url.pathname &&
                            sound.playClack()}><h3>Configuración</h3></a
                    >
                </li>
                <li>
                    <a
                        href="/user#sessions"
                        on:mouseenter={() =>
                            "/user#sessions" !== $page.url.pathname &&
                            sound.playClack()}><h3>Sesiones</h3></a
                    >
                </li>
                <li>
                    <a
                        href="/user#keys"
                        on:mouseenter={() =>
                            "/user#keys" !== $page.url.pathname &&
                            sound.playClack()}><h3>Llaves</h3></a
                    >
                </li>
            </ul>
        </li>
    </ul>
</nav>
