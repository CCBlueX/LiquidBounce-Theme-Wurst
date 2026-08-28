<script lang="ts">
    import type {Component} from "svelte";
    import {fly} from "svelte/transition";

    type Tab = {
        title: string;
        content: Component;
    };

    let {tabs, activeTab = $bindable(0)} = $props<{
        tabs: Tab[];
        activeTab?: number;
    }>();

    const Active = $derived(tabs[activeTab]?.content);
</script>

<div class="tabs" transition:fly={{duration: 200, y: -20}}>
    <div class="available-tabs">
        {#each tabs as tab, index (tab.title)}
            <button
                    class="tab-button"
                    class:active={index === activeTab}
                    onclick={() => (activeTab = index)}
                    type="button"
            >
                {tab.title}
            </button>
        {/each}
    </div>

    <div class="content">
        {#if Active}
            {@render Active()}
        {/if}
    </div>
</div>

<style lang="scss">
  @use "../../../colors.scss" as *;

  /* a row of Wurst feature boxes: flat grey at the GUI opacity, 1px accent
     separators between them, green when active, brighter on hover */
  .available-tabs {
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0;
    padding: 0;
    border-radius: 0;
    background-color: rgba($wurst-bg, $wurst-opacity);
    box-shadow: 0 0 6px rgba($wurst-accent, 0.5);
    z-index: 9999999999;
  }

  .tab-button {
    background: transparent;
    color: $wurst-text;
    padding: 5px 16px;
    font-size: 16px;
    font-weight: normal;
    border-radius: 0;
    cursor: pointer;
    border: none;
    transition: ease background-color 0.2s;

    & + .tab-button {
      border-left: 1px solid rgba($wurst-accent, 0.5);
    }

    &:hover {
      color: $wurst-text;
      background-color: rgba($wurst-bg, $wurst-hover-opacity);
    }

    &.active {
      color: $wurst-text;
      background-color: rgba($wurst-enabled, $wurst-opacity);
    }

    &.active:hover {
      background-color: rgba($wurst-enabled, $wurst-hover-opacity);
    }
  }
</style>
