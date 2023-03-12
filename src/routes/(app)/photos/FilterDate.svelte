<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
</script>

<div>
    <RangeSlider
        min={1960}
        max={2007}
        values={[1960, 2007]}
        range={true}
        float={true}
        all="label"
        step={1}
        pips={true}
        pipstep={5}
    />
</div>

<style lang="scss">
    // @see https://simeydotme.github.io/svelte-range-slider-pips/#styling
    :global(.rangeSlider) {
        --range-slider: #{darken($color: $color-body, $amount: 75)};
        --range-handle-inactive: #{$color-body};
        --range-handle: #{$color-success};
        --range-handle-focus: #{$color-success};
        --range-handle-border: var(--range-handle);
        --range-range-inactive: var(--range-handle-inactive);
        --range-range: var(--range-handle-focus);
        --range-float-inactive: var(--range-handle-inactive);
        --range-float: var(--range-handle-focus);
        --range-float-text: white;

        --range-pip: #{darken($color: $color-body, $amount: 75)};
        --range-pip-active: #{$color-body};
        --range-pip-hover-text: #{$color-success};
        --range-pip-in-range-text: #{$color-body};
    }

    div {
        font-family: "Inter", sans-serif;
    }
</style>
