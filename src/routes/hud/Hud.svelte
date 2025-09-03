<script lang="ts">
    import ArrayList from "./elements/ArrayList.svelte";
    import Watermark from "./elements/Watermark.svelte";
    import {onMount} from "svelte";
    import {getComponents, getGameWindow} from "../../integration/rest";
    import {listen} from "../../integration/ws";
    import type {Component} from "../../integration/types";
    import type {ComponentsUpdateEvent, ScaleFactorChangeEvent} from "../../integration/events";
    import DraggableComponent from "./elements/DraggableComponent.svelte";

    let zoom = 100;
    let components: Component[] = [];

    onMount(async () => {
        const gameWindow = await getGameWindow();
        zoom = gameWindow.scaleFactor * 50;

        components = await getComponents();
    });

    listen("scaleFactorChange", (data: ScaleFactorChangeEvent) => {
        zoom = data.scaleFactor * 50;
    });

    listen("componentsUpdate", (data: ComponentsUpdateEvent) => {
        // force update to re-render
        components = [];
        components = data.components;
    });
</script>

<div class="hud" style="zoom: {zoom}%">
    {#each components as c}
        {#if c.settings.enabled}
            <DraggableComponent name={c.name} id={c.id} alignment={c.settings.alignment} >
                {#if c.name === "Watermark"}
                    <Watermark/>
                {:else if c.name === "ArrayList"}
                    <ArrayList/>
                {/if}
            </DraggableComponent>
        {/if}
    {/each}
</div>

<style lang="scss">
  .hud {
    height: 100vh;
    width: 100vw;
  }
</style>
