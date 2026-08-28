<script lang="ts">
    import {onMount, tick} from "svelte";
    import type {Module} from "../../../integration/types";
    import {getModules} from "../../../integration/rest";
    import {listen} from "../../../integration/ws";
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";

    export let settings: { [name: string]: any };

    let cSettings = settings as HudArrayListSettings;

    let enabledModules: Module[] = [];

    async function updateEnabledModules() {
        const modules = await getModules();

        // Wurst sorts its hack list by name (HackListOtf SortBy.NAME), not by
        // rendered width; Order picks the direction.
        enabledModules = modules
            .filter(m => m.enabled && !m.hidden)
            .sort((a, b) => cSettings.order === "Descending"
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name));

        await tick();
    }

    $: if (cSettings !== settings) {
        cSettings = settings as HudArrayListSettings;
        updateEnabledModules();
    }

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
    {#each enabledModules as {name} (name)}
        <div
                class="module"
                style={cSettings.itemAlignment === "Left" ? "margin-right: auto;" : "margin-left: auto;"}
                animate:flip={{ duration: 200 }}
                transition:fly={{ x: 50, duration: 200 }}
        >
            {name}
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

</style>
