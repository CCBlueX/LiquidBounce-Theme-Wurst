<script lang="ts">
    import type {Module} from "../../integration/types";
    import WurstModule from "./WurstModule.svelte";
    
    export let modules: Module[] = [];
    export let openGlobalSettings: () => void;
</script>

<div class="wurst-module-grid">
    <div class="module-grid">
        {#each modules as module (module.name)}
            <WurstModule {module} />
        {/each}

        {#if modules.length > 0}
            <!-- the global settings entry, after the last module like the base's Settings panel -->
            <button class="global-settings" on:click={openGlobalSettings}>
                <span class="name">Settings</span>
                <span class="arrow-box"><span class="arrow"></span></span>
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    @use "../../colors.scss" as *;

    .wurst-module-grid {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
        overflow-y: auto;
        overflow-x: hidden;
        
        /* Hide default scrollbar */
        scrollbar-width: none;
        -ms-overflow-style: none;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }
    
    .module-grid {
        display: grid;
        grid-template-columns: repeat(3, 240px);
        gap: 4px;
        justify-content: center;
    }

    /* same box as WurstModule */
    .global-settings {
        height: 35px;
        display: flex;
        align-items: stretch;
        padding: 0;
        border: none;
        background: rgba($wurst-bg, $wurst-opacity);
        color: $wurst-text;
        font-size: 18px;
        font-family: "Minecraft.otf", sans-serif;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background: rgba($wurst-bg, $wurst-hover-opacity);
        }
    }

    .name {
        flex: 1;
        padding: 0 8px;
        text-align: left;
        align-self: center;
    }

    .arrow-box {
        position: relative;
        flex: 0 0 35px;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            bottom: 4px;
            width: 1px;
            background: rgba($wurst-accent, 0.5);
        }
    }

    .arrow {
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 8px solid $wurst-arrow;
        filter: drop-shadow(0 0 1px rgba($wurst-accent, 0.5));
        transition: border-top-color 0.2s;
    }

    .global-settings:hover .arrow {
        border-top-color: $wurst-arrow-hover;
    }
</style>
