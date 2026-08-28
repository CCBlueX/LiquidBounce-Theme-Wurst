<script lang="ts">
    import {setTyping} from "../../integration/rest";
    
    export let searchQuery: string = "";
    
    let searchInput: HTMLInputElement;
    
    function handleFocus() {
        setTyping(true);
    }
    
    function handleBlur() {
        setTyping(false);
    }
</script>

<div class="wurst-search">
    <span class="search-label">Search:</span>
    <input 
        bind:this={searchInput}
        bind:value={searchQuery}
        type="text" 
        class="search-input"
        on:focus={handleFocus}
        on:blur={handleBlur}
        spellcheck="false"
    />
</div>

<style lang="scss">
    @use "../../colors.scss" as *;
    .wurst-search {
        position: absolute;
        top: 40px;
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
