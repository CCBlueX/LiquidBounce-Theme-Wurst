<script lang="ts">
    import {onMount} from "svelte";
    import {getGameWindow, getModules, getModuleSettings, setTyping} from "../../integration/rest";
    import type {ConfigurableSetting, Module, TogglableSetting} from "../../integration/types";
    import WurstSearch from "./WurstSearch.svelte";
    import WurstModuleGrid from "./WurstModuleGrid.svelte";
    import WurstModuleSettings from "./WurstModuleSettings.svelte";
    import {fade} from "svelte/transition";
    import {listen} from "../../integration/ws";
    import type {ClickGuiValueChangeEvent, ScaleFactorChangeEvent} from "../../integration/events";
    import {gridSize, scaleFactor, showGrid, snappingEnabled, activeSettings} from "./clickgui_store";

    let modules: Module[] = [];
    let filteredModules: Module[] = [];
    let minecraftScaleFactor = 2;
    let clickGuiScaleFactor = 1;
    let searchQuery = "";
    
    $: {
        scaleFactor.set(minecraftScaleFactor * clickGuiScaleFactor);
    }

    $: {
        if (searchQuery.trim() === "") {
            filteredModules = modules;
        } else {
            const query = searchQuery.toLowerCase();
            filteredModules = modules.filter(module => 
                module.name.toLowerCase().includes(query) ||
                module.aliases.some(alias => alias.toLowerCase().includes(query))
            );
        }
    }

    function applyValues(configurable: ConfigurableSetting) {
        clickGuiScaleFactor = configurable.value.find(v => v.name === "Scale")?.value as number ?? 1;

        const snappingValue = configurable.value.find(v => v.name === "Snapping") as TogglableSetting;

        $snappingEnabled = snappingValue?.value.find(v => v.name === "Enabled")?.value as boolean ?? true;
        $gridSize = snappingValue?.value.find(v => v.name === "GridSize")?.value as number ?? 10;
    }

    function closeSettings() {
        activeSettings.set(null);
    }

    onMount(async () => {
        const gameWindow = await getGameWindow();
        minecraftScaleFactor = gameWindow.scaleFactor;

        modules = await getModules();
        filteredModules = modules;

        const clickGuiSettings = await getModuleSettings("ClickGUI");
        applyValues(clickGuiSettings);

        await setTyping(false);
    });

    listen("scaleFactorChange", (e: ScaleFactorChangeEvent) => {
        minecraftScaleFactor = e.scaleFactor;
    });

    listen("clickGuiValueChange", (e: ClickGuiValueChangeEvent) => {
        applyValues(e.configurable);
    });
</script>

<div class="wurst-clickgui" transition:fade|global={{duration: 200}}>
    <WurstSearch bind:searchQuery />
    <WurstModuleGrid modules={filteredModules} />
    
    {#if $activeSettings}
        <WurstModuleSettings 
            module={$activeSettings.module} 
            moduleSettings={$activeSettings.settings} 
            on:close={closeSettings} 
        />
    {/if}
</div>

<style lang="scss">
  @use "../../colors.scss" as *;

  .wurst-clickgui {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    overflow: hidden;
    font-family: "Minecraft.otf", sans-serif;
    font-size: 12px;
    color: white;
  }
</style>
