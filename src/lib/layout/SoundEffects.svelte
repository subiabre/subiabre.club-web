<script lang="ts">
    import { has, sound } from "$lib/stores";

    let controls = false;

    let slides: HTMLAudioElement[] = [];
    let clacks: HTMLAudioElement[] = [];

    $: $sound.slide && playSlide();
    $: $sound.clack && playClack();

    function play(sounds: HTMLAudioElement[]) {
        if (!$has.soundfxs) return;
        const index = Math.floor(Math.random() * sounds.length);
        const sound = sounds[index];

        sounds.filter((sound, i) => i !== index).map(sound => {
            sound.pause();
            sound.currentTime = 0;
        });

        sound.currentTime = 0;
        sound.play();
    }

    function playSlide() {
        $sound.slide = false;

        play(slides);
    }

    function playClack() {
        $sound.clack = false;

        play(clacks);
    }
</script>

<div>
    <audio controls={controls} bind:this={slides[0]}>
        <source src="/sound/slide_01.ogg" type="audio/ogg" />
    </audio>
    <audio controls={controls} bind:this={slides[1]}>
        <source src="/sound/slide_02.ogg" type="audio/ogg" />
    </audio>
    <audio controls={controls} bind:this={slides[2]}>
        <source src="/sound/slide_03.ogg" type="audio/ogg" />
    </audio>
    <audio controls={controls} bind:this={slides[3]}>
        <source src="/sound/slide_04.ogg" type="audio/ogg" />
    </audio>
    <audio controls={controls} bind:this={slides[4]}>
        <source src="/sound/slide_05.ogg" type="audio/ogg" />
    </audio>
    
    <audio controls={controls} bind:this={clacks[0]}>
        <source src="/sound/clack_01.ogg" type="audio/ogg" />
    </audio>
    <audio controls={controls} bind:this={clacks[1]}>
        <source src="/sound/clack_02.ogg" type="audio/ogg" />
    </audio>
</div>
