<script lang="ts">
    import TraySlide from "$lib/layout/TraySlide.svelte";
    import FilterDate from "./FilterDate.svelte";
</script>
<TraySlide id="filters">
    <div class="padded">
        <h2>Cuándo</h2>
        <FilterDate />
    </div>
    <div class="padded">
        <h2>Dónde</h2>
    </div>
    <div class="padded">
        <h2>Quién</h2>
    </div>
    <div class="padded">
        <h2>Cómo</h2>
        <form>
            <input type="text" placeholder="..." />
        </form>
    </div>
</TraySlide>
<TraySlide id="result">
    <div class="padded grid">
        <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/C77190s1_Ant.Map_Ross_Island.jpg/320px-C77190s1_Ant.Map_Ross_Island.jpg" />
        </figure>
        <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/C77190s1_Ant.Map_Ross_Island.jpg/320px-C77190s1_Ant.Map_Ross_Island.jpg" />
        </figure>
        <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/C77190s1_Ant.Map_Ross_Island.jpg/320px-C77190s1_Ant.Map_Ross_Island.jpg" />
        </figure>
        <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/C77190s1_Ant.Map_Ross_Island.jpg/320px-C77190s1_Ant.Map_Ross_Island.jpg" />
        </figure>
    </div>
</TraySlide>
