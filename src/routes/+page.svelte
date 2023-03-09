<script lang="ts">
    import Tray from "../lib/layout/Tray.svelte";
    import TraySlide from "../lib/layout/TraySlide.svelte";
    import TraySlideNav from "../lib/layout/TraySlideNav.svelte";

</script>

<Tray>
    <TraySlideNav>
        <h1>Navigation</h1>
    </TraySlideNav>
    <TraySlide id="slide1">
        <h1>Section 1</h1>
    </TraySlide>
    <TraySlide id="slide2">
        <h1>Section 2</h1>
    </TraySlide>
</Tray>
