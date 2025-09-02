<script lang="ts">
    import type {Module, ConfigurableSetting} from "../../integration/types";
    import {setModuleSettings} from "../../integration/rest";
    import {createEventDispatcher} from "svelte";
    import GenericSetting from "./setting/common/GenericSetting.svelte";
    
    export let module: Module;
    export let moduleSettings: ConfigurableSetting;
    
    const dispatch = createEventDispatcher();
    
    async function updateSettings() {
        await setModuleSettings(module.name, moduleSettings);
    }
    
    function closeSettings() {
        dispatch('close');
    }
    
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeSettings();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="settings-overlay" on:click={closeSettings}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="settings-panel" on:click|stopPropagation>
        <div class="settings-header">
            <h3>{module.name} Settings</h3>
            <button class="close-button" on:click={closeSettings}>×</button>
        </div>
        
        <div class="settings-content">
            {#each moduleSettings.value as setting (setting.name)}
                {#if setting.name !== "Hidden"}
                    <GenericSetting path="wurst-settings" bind:setting on:change={updateSettings} />
                {/if}
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    @use "../../colors.scss" as *;

    .settings-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .settings-panel {
        background: rgba(64, 64, 64, 0.95);
        border: 2px solid $accent-color;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    
    .settings-header {
        background: $accent-color;
        color: white;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(128, 128, 128, 0.5);
        
        h3 {
            margin: 0;
            font-size: 16px;
            font-family: "Minecraft.otf", sans-serif;
            font-weight: bold;
        }
    }
    
    .close-button {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
    }
    
    .settings-content {
        padding: 16px;
        overflow-y: auto;
        color: white;
    }
</style>
