<script lang="ts">
    export let searchQuery: string = "";
</script>

<div class="wurst-search">
    <span class="search-label">Search:</span>
    <input
        bind:value={searchQuery}
        type="text"
        class="search-input"
        spellcheck="false"
    />
</div>

<style lang="scss">
    @use "../../colors.scss" as *;
    .wurst-search {
        position: absolute;
        top: 62px;
        left: 50%;
        transform: translateX(-50%);
        margin-left: -200px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 10;
    }

    .search-label {
        color: $wurst-text;
        font-size: 20px;
        font-weight: normal;
    }

    .search-input {
        background: transparent;
        border: none;
        color: $wurst-text;
        font-size: 20px;
        outline: none;
        font-family: "Minecraft.otf", sans-serif;
        min-width: 200px;

        &::placeholder {
            color: rgba(240, 240, 240, 0.7);
        }
    }
</style>
