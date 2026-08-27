<script lang="ts">
    import ArrayList from "./elements/ArrayList.svelte";
    import Watermark from "./elements/Watermark.svelte";
    import {onMount, setContext} from "svelte";
    import {
        getClientInfo,
        getComponents,
        getGameWindow,
        getMetadata,
        getNativeComponents
    } from "../../integration/rest";
    import {listen} from "../../integration/ws";
    import type {HudComponent, Metadata} from "../../integration/types";
    import type {ComponentsUpdateEvent, ScaleFactorChangeEvent} from "../../integration/events";
    import DraggableComponent from "./elements/DraggableComponent.svelte";
    import KeyBinds from "./elements/KeyBinds.svelte";
    import ClosedCaptions from "./elements/ClosedCaptions.svelte";
    import {os} from "../clickgui/clickgui_store";
    import {
        HUD_EDITOR_ELEMENTS_CONTEXT,
        type HudEditorDragState
    } from "../clickgui/tabs/hud_editor/constants";
    import Image from "./elements/Image.svelte";

    export let inEditor = false;
    export let onDragStateChange: ((state: HudEditorDragState) => void) | undefined = undefined;
    export let magneticTargetIds: string[] = [];

    let zoom = 100;
    let metadata: Metadata;
    let nativeComponents: HudComponent[] = [];
    let themeComponents: HudComponent[] = [];

    $: renderedComponents = inEditor ? [...nativeComponents, ...themeComponents] : themeComponents;

    setContext(HUD_EDITOR_ELEMENTS_CONTEXT, new Map<string, HTMLElement>());

    onMount(async () => {
        $os = (await getClientInfo()).os;

        const gameWindow = await getGameWindow();
        zoom = gameWindow.scaleFactor * 50;

        metadata = await getMetadata();
        [nativeComponents, themeComponents] = await Promise.all([
            inEditor ? getNativeComponents() : Promise.resolve([]),
            getComponents(metadata.id)
        ]);
    });

    listen("scaleFactorChange", (data: ScaleFactorChangeEvent) => {
        zoom = data.scaleFactor * 50;
    });

    listen("componentsUpdate", (event: ComponentsUpdateEvent) => {
        if (inEditor && event.source === "native") {
            nativeComponents = event.components;
        }

        if (event.source === "theme" && event.themeId === metadata?.id) {
            themeComponents = event.components;
        }
    });
</script>

<div class="hud" style="zoom: {zoom}%">
    {#each renderedComponents as c (c.id)}
        {#if c.settings.enabled}
            <DraggableComponent
                    {inEditor}
                    {onDragStateChange}
                    componentId={c.id}
                    componentName={c.name}
                    alignment={c.settings.alignment}
                    zIndex={c.settings.zIndex ?? 0}
                    magneticallyReferenced={magneticTargetIds.includes(c.id)}
                    width={c.width}
                    height={c.height}
            >
                {#if c.name === "Watermark"}
                    <Watermark/>
                {:else if c.name === "ArrayList"}
                    <ArrayList settings={c.settings}/>
                {:else if c.name === "Image"}
                    <Image componentId={c.id} settings={c.settings}/>
                {:else if c.name === "KeyBinds"}
                    <KeyBinds/>
                {:else if c.name === "ClosedCaptions"}
                    <ClosedCaptions/>
                {:else if c.width !== undefined && c.height !== undefined}
                    <div></div>
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
