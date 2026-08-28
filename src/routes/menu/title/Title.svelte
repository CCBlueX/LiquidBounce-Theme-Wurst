<script lang="ts">
    import ConfettiBackground from "./ConfettiBackground.svelte";
    import Menu from "../common/Menu.svelte";
    import {
        getBackgroundShaderEnabled,
        getClientUpdate,
        openScreen,
        toggleBackgroundShaderEnabled
    } from "../../../integration/rest";
    import {fly} from "svelte/transition";
    import {onMount} from "svelte";
    import {notification} from "../common/header/notification_store";
    import {isAnniversary} from "../../../util/utils";

    const menuButtons = [
        {title: "Alt Manager", icon: "icon-user.svg", screen: "altmanager"},
        {title: "Proxy Manager", icon: "icon-proxymanager.svg", screen: "proxymanager"},
        {title: "Click GUI", icon: "icon-clickgui.svg", screen: "clickgui"}
    ];

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
    {#each menuButtons as {title, icon, screen} (screen)}
        <button class="menu-button" on:click={() => openScreen(screen)}>
            <img class="icon" src="img/menu/{icon}" alt="" aria-hidden="true"/>
            <span class="label">{title}</span>
        </button>
    {/each}
</nav>

<style lang="scss">
    @use "../../../colors.scss" as *;

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

    /* centred directly under the logo, styled like Wurst's feature boxes */
    .menu-buttons {
        position: absolute;
        top: 215px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
        z-index: 10;
    }

    .menu-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border: none;
        border-radius: 0;
        cursor: pointer;
        color: $wurst-text;
        font-size: 18px;
        background: rgba($wurst-bg, $wurst-opacity);
        transition: background-color 0.2s;

        &:hover {
            background: rgba($wurst-bg, $wurst-hover-opacity);
        }
    }

    .icon {
        width: 16px;
        height: 16px;
    }

    .label {
        white-space: nowrap;
    }
</style>
