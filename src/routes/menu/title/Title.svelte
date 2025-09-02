<script lang="ts">
    import ButtonContainer from "../common/buttons/ButtonContainer.svelte";
    import IconTextButton from "../common/buttons/IconTextButton.svelte";
    import IconButton from "../common/buttons/IconButton.svelte";
    import {
        browse,
        exitClient,
        getClientUpdate,
        openScreen,
        toggleBackgroundShaderEnabled
    } from "../../../integration/rest";
    import Menu from "../common/Menu.svelte";
    import {fly} from "svelte/transition";
    import {onMount} from "svelte";
    import {notification} from "../common/header/notification_store";

    onMount(() => {
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

<!-- Wurst Logo -->
<img class="wurst-logo" src="img/wurst_128.png" alt="Wurst Client"  transition:fly|global={{duration: 200, y: -60, delay: 0}} />


<Menu>
    <div class="content">
        <div class="bottom-section" transition:fly|global={{duration: 200, y: 50, delay: 0}}>
            <div class="additional-buttons">
                <ButtonContainer>
                    
                    <IconTextButton icon="icon-exit.svg" title="Exit" on:click={exitClient}/>
                    <IconTextButton icon="icon-change-background.svg" title="Toggle Shader"
                                    on:click={toggleBackgroundShaderEnabled}/>
                    <IconTextButton icon="icon-proxymanager.svg" title="Proxy Manager" on:click={() => openScreen("proxymanager")}/>
                    <IconTextButton icon="icon-clickgui.svg" title="Click GUI" on:click={() => openScreen("clickgui")}/>
                </ButtonContainer>
            </div>

            <div class="social-buttons">
                <ButtonContainer>
                    <IconButton title="Forum" icon="nodebb" on:click={() => browse("MAINTAINER_FORUM")}/>
                    <IconButton title="GitHub" icon="github" on:click={() => browse("MAINTAINER_GITHUB")}/>
                    <IconButton title="Discord" icon="discord" on:click={() => browse("MAINTAINER_DISCORD")}/>
                    <IconButton title="Twitter" icon="twitter" on:click={() => browse("MAINTAINER_TWITTER")}/>
                    <IconButton title="YouTube" icon="youtube" on:click={() => browse("MAINTAINER_YOUTUBE")}/>
                    <IconTextButton title="liquidbounce.net" icon="icon-liquidbounce.net.svg"
                                    on:click={() => browse("CLIENT_WEBSITE")}/>
                </ButtonContainer>
            </div>
        </div>
    </div>
</Menu>

<style>
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .wurst-logo {
        height: 160px;
        width: auto;
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        z-index: 10;
    }

    .bottom-section {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0;
    }
</style>
