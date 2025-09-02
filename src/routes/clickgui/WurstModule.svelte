<script lang="ts">
    import type {Module, ConfigurableSetting} from "../../integration/types";
    import {setModuleEnabled, getModuleSettings} from "../../integration/rest";
    import {listen} from "../../integration/ws";
    import type {ModuleToggleEvent} from "../../integration/events";
    import {onMount} from "svelte";
    import {activeSettings} from "./clickgui_store";
    
    export let module: Module;
    
    let moduleSettings: ConfigurableSetting | null = null;
    let hasSettings = false;
    
    async function toggleModule() {
        await setModuleEnabled(module.name, !module.enabled);
    }
    
    async function toggleSettings() {
        if (!hasSettings) return;
        
        if (!moduleSettings) {
            moduleSettings = await getModuleSettings(module.name);
        }
        
        activeSettings.set({
            module: module,
            settings: moduleSettings
        });
    }
    
    onMount(async () => {
        try {
            const settings = await getModuleSettings(module.name);
            hasSettings = settings.value.filter(v => v.name !== "Hidden").length > 0;
            moduleSettings = settings;
        } catch (e) {
            hasSettings = false;
        }
    });
    
    listen("moduleToggle", (e: ModuleToggleEvent) => {
        if (e.moduleName === module.name) {
            module.enabled = e.enabled;
        }
    });
</script>

<div class="wurst-module" class:enabled={module.enabled}>
    <div class="module-button">
        <button class="main-button" on:click={toggleModule}>
            <span class="module-name">{module.name}</span>
        </button>
        {#if hasSettings}
            <button class="settings-arrow" on:click={toggleSettings}>
                <span class="arrow">▶</span>
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    .wurst-module {
        height: 35px;
        width: 240px;
        position: relative;
    }
    
    .module-button {
        width: 100%;
        height: 100%;
        background: rgba(64, 64, 64, 0.8);
        border: 1px solid rgba(128, 128, 128, 0.5);
        display: flex;
        transition: background-color 0.2s;
    }
    
    .main-button {
        flex: 1;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        font-family: "Minecraft.otf", sans-serif;
        cursor: pointer;
        padding: 0 5px;
        text-align: left;
        
        &:hover {
            background: rgba(96, 96, 96, 0.9);
        }
    }
    
    .wurst-module.enabled .module-button {
        background: #00FF00;
    }
    
    .wurst-module.enabled .main-button {
        &:hover {
            background: #32FF32;
        }
    }
    
    .module-name {
        flex: 1;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    }
    
    .settings-arrow {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 100%;
        border-left: 1px solid rgba(128, 128, 128, 0.5);
    }
    
    .arrow {
        font-size: 8px;
        transition: transform 0.2s;
        color: #00FF00;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    }
</style>
