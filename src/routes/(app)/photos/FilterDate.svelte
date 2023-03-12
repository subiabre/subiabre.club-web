<script lang="ts">
    import { api } from "$lib/api";
    import { filters } from "$lib/stores";
    import RangeSlider from "svelte-range-slider-pips";

    let min = api.photos
        .getCollection(new URLSearchParams([["date[order]", "asc"]]))
        .then((photos) => {
            return photos.filter((photos) => photos.date.min);
        })
        .then((photos) => {
            return new Date(photos[0]?.date.min ?? "").getFullYear();
        });
    let max = api.photos
        .getCollection(new URLSearchParams([["date[order]", "desc"]]))
        .then((photos) => {
            return new Date(photos[0]?.date.max).getFullYear();
        });

    function handleChange(event: any) {
        const values = event.detail.values;

        filters.update((params) => {
            return [
                ...params.filter((param) => param[0] !== "date[from]"),
                ...params.filter((param) => param[0] !== "date[to]"),
                [
                    "date[from]",
                    new Date(values[0], 0, 2).toISOString().split("T")[0],
                ],
                [
                    "date[to]",
                    new Date(values[1], 11, 32).toISOString().split("T")[0],
                ],
            ];
        });
    }
</script>

<div>
    {#await min then min}
        {#await max then max}
            <RangeSlider
                {min}
                {max}
                values={[min, max]}
                range={true}
                float={true}
                all="label"
                step={1}
                pips={true}
                pipstep={10}
                on:change={handleChange}
            />
        {/await}
    {/await}
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
        font-family: $font-family-body;
    }
</style>
