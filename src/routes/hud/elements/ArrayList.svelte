<script lang="ts">
    import {onMount, tick} from "svelte";
    import type {Module} from "../../../integration/types";
    import {getModules} from "../../../integration/rest";
    import {listen} from "../../../integration/ws";
    import {getTextWidth} from "../../../integration/text_measurement";
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
    import {convertToSpacedString, spaceSeperatedNames} from "../../../theme/theme_config";

    export let settings: { [name: string]: any };

    let cSettings = settings as HudArrayListSettings;

    let enabledModules: Module[] = [];

    async function updateEnabledModules() {
        const modules = await getModules();
        const visibleModules = modules.filter(m => m.enabled && !m.hidden);

        const modulesWithWidths = visibleModules.map(module => {
            const formattedName = $spaceSeperatedNames ? convertToSpacedString(module.name) : module.name;
            const fullName = module.tag == null || !cSettings.showTags
                ? formattedName
                : formattedName + " " + module.tag;

            return {
                ...module,
                width: getTextWidth(fullName, "20px Minecraft.otf")
            };
        });

        modulesWithWidths.sort((a, b) => cSettings.order === "Ascending" ? a.width - b.width : b.width - a.width);

        enabledModules = modulesWithWidths;
        await tick();
    }

    $: if (cSettings !== settings) {
        cSettings = settings as HudArrayListSettings;
        updateEnabledModules();
    }

    spaceSeperatedNames.subscribe(async () => {
        await updateEnabledModules();
    });

    onMount(async () => {
        await updateEnabledModules();
    });

    listen("moduleToggle", async () => {
        await updateEnabledModules();
    });

    listen("refreshArrayList", async () => {
        await updateEnabledModules();
    });
</script>

<div class="arraylist">
    {#each enabledModules as {name, tag} (name)}
        <div
                class="module"
                style={cSettings.itemAlignment === "Left" ? "margin-right: auto;" : "margin-left: auto;"}
                animate:flip={{ duration: 200 }}
                transition:fly={{ x: 50, duration: 200 }}
        >
            {$spaceSeperatedNames ? convertToSpacedString(name) : name}
            {#if tag && cSettings.showTags}
                <span class="tag"> {tag}</span>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
  .module {
    color: var(--arraylist-text-color);
    font-size: 20px;
    line-height: 20px;
    text-shadow: black 1px 1px;
    width: max-content;
  }

  .tag {
    color: var(--arraylist-tag-color);
  }
</style>
