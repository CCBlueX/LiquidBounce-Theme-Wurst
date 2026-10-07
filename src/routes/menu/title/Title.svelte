<script lang="ts">
    import ConfettiBackground from "./ConfettiBackground.svelte";
    import Menu from "../common/Menu.svelte";
    import FeatureButton from "../common/buttons/FeatureButton.svelte";
    import {
        getBackgroundShaderEnabled,
        getClientUpdate,
        openScreen,
        toggleBackgroundShaderEnabled,
        toggleBasicMode
    } from "../../../integration/rest";
    import {fly} from "svelte/transition";
    import {onMount} from "svelte";
    import {notification} from "../common/header/notification_store";
    import {isAnniversary} from "../../../util/utils";

    onMount(async () => {
        // this theme draws its own background, so the shader is turned off if
        // the client still has it on
        if (await getBackgroundShaderEnabled()) {
            await toggleBackgroundShaderEnabled();
        }

        setTimeout(async () => {
            const clientUpdate = await getClientUpdate();

            if (clientUpdate.update) {
                notification.set({
                    title: `LiquidBounce ${clientUpdate.update.clientVersion} has been released!`,
                    message: `Download it from liquidbounce.net!`,
                    error: false,
                    delay: 99999999
                });
            }
        }, 2000);
    });
</script>

<Menu>
    {#if isAnniversary()}
        <ConfettiBackground/>
    {/if}
</Menu>

<!-- Wurst Logo -->
<img class="wurst-logo" src="img/wurst_128.png" alt="Wurst Client"  transition:fly|global={{duration: 200, y: -60, delay: 0}} />

<nav class="menu-buttons" transition:fly|global={{duration: 200, y: 30, delay: 0}}>
    <FeatureButton title="Alt Manager" icon="user" on:click={() => openScreen("altmanager")}/>
    <FeatureButton title="Proxy Manager" icon="proxymanager" on:click={() => openScreen("proxymanager")}/>
    <FeatureButton title="Click GUI" icon="clickgui" on:click={() => openScreen("clickgui")}/>
    <FeatureButton title="Basic Mode" icon="eye" on:click={toggleBasicMode}/>
</nav>

<style lang="scss">
    .wurst-logo {
        height: auto;
        width: 590px;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        z-index: 10;
        object-fit: contain;
    }

    /* centred directly under the logo */
    .menu-buttons {
        position: absolute;
        top: 215px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
        z-index: 10;
    }
</style>
