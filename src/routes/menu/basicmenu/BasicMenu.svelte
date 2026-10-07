<script lang="ts">
    import FeatureButton from "../common/buttons/FeatureButton.svelte";
    import {openScreen, toggleBasicMode} from "../../../integration/rest";
    import {fly} from "svelte/transition";
</script>

<!-- Clicks also reach the vanilla screen below, so this stays in its empty left strip. -->
<nav class="basic-menu" transition:fly|global={{duration: 200, x: -60}}>
    <FeatureButton title="Full Mode" icon="liquidbounce" on:click={toggleBasicMode}/>
    <FeatureButton title="Click GUI" icon="clickgui" on:click={() => openScreen("clickgui")}/>
    <FeatureButton title="Alt Manager" icon="user" on:click={() => openScreen("altmanager")}/>
    <FeatureButton title="Proxy Manager" icon="proxymanager" on:click={() => openScreen("proxymanager")}/>
</nav>

<style lang="scss">
  .basic-menu {
    position: fixed;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
</style>
