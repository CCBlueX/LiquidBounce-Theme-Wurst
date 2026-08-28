<script lang="ts">
  import { onMount } from "svelte";
  import { getSelectedProtocol } from "../../../integration/rest";

    let gameVersion = "1.21.4";
    $: versionString = `v7.41.1 MC ${gameVersion}`;

    onMount(async () => {
        const protocol = await getSelectedProtocol();
        gameVersion = protocol.name;
    });
</script>

<div class="watermark">
    <div class="bar">
        <img class="logo" src="img/wurst_128.png" alt="logo" />
        <div class="version">{versionString}</div>
    </div>
</div>

<style lang="scss">
    @use "../../../colors.scss" as *;

    /* The logo is taller than the bar behind it, as in the real client. The
       row reserves that overflow so the top of the logo isn't cut off at the
       screen edge, and so the HUD component's box matches what it draws. */
    .watermark {
        padding: 7px 0;
        width: max-content;
    }

    .bar {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 20px;
        padding-right: 5px;
        background-color: rgba(white, 0.5);
        height: 22px;

        .logo {
            height: 35px;
        }

        .version {
            color: black;
            white-space: nowrap;
        }
    }
</style>
