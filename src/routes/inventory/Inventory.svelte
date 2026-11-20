<script>
    import {fade} from 'svelte/transition';
</script>

<div class="watermark" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
    <img src="img/wurst_128.png" alt="Wurst Client">
</div>

<style>
    .watermark {
        position: absolute;
        bottom: 15px;
        right: 15px;
        opacity: 0.6;
    }

    img {
        display: block;
        width: 165px;
    }
</style>
