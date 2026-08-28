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
            <button class="settings-arrow" on:click={toggleSettings} aria-label="Settings">
                <span class="arrow"></span>
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    @use "../../colors.scss" as *;

    .wurst-module {
        height: 35px;
        width: 240px;
        position: relative;
    }

    /* Wurst fills the feature box with the background colour at the GUI
       opacity, and multiplies that opacity by 1.5 while hovered. */
    .module-button {
        width: 100%;
        height: 100%;
        background: rgba($wurst-bg, $wurst-opacity);
        display: flex;
        transition: background-color 0.2s;

        &:hover {
            background: rgba($wurst-bg, $wurst-hover-opacity);
        }
    }

    .wurst-module.enabled .module-button {
        background: rgba($wurst-enabled, $wurst-opacity);

        &:hover {
            background: rgba($wurst-enabled, $wurst-hover-opacity);
        }
    }

    .main-button {
        flex: 1;
        min-width: 0;
        background: none;
        border: none;
        color: $wurst-text;
        font-size: 18px;
        font-family: "Minecraft.otf", sans-serif;
        cursor: pointer;
        padding: 0 8px;
        text-align: left;
    }

    .module-name {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* the arrow sits in a square the height of the box, split off by a
       vertical accent line inset two pixels top and bottom */
    .settings-arrow {
        position: relative;
        flex: 0 0 35px;
        height: 100%;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
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

    .settings-arrow:hover .arrow {
        border-top-color: $wurst-arrow-hover;
    }
</style>
