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
            <div class="slot"><slot name="photos" /></div>
        </li>
        <li class="page">
            <a class="color-body" href="/user"><h2>Usuario.</h2></a>
            <div class="slot"><slot name="user" /></div>
        </li>
    </ul>
</nav>
