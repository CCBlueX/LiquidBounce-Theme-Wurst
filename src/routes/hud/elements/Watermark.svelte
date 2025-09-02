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
    <img class="logo" src="img/wurst_128.png" alt="logo" />
    <div class="version">{versionString}</div>
</div>

<style lang="scss">
    .watermark {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 20px;
        padding-right: 5px;
        background-color: rgba(white, 0.5);
        height: 22px;

        position: fixed;
        left: 0;
        top: 12px;

        .logo {
            height: 35px;
        }

        .version {
            color: black;
            white-space: nowrap;
        }
    }
</style>
