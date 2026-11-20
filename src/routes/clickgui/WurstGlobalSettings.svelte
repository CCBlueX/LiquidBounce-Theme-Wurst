<script lang="ts">
    import GlobalSettings from "./GlobalSettings.svelte";
</script>

<div class="settings-panel">
    <div class="settings-header">
        <h3>Global Settings</h3>
    </div>

    <div class="settings-content">
        <GlobalSettings/>
    </div>
</div>

<style lang="scss">
    @use "../../colors.scss" as *;

    /* same box as WurstModuleSettings, placed where the module grid is */
    .settings-panel {
        position: absolute;
        top: 100px;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 600px;
        background: rgba(64, 64, 64, 0.95);
        border: 2px solid $accent-color;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-family: "Minecraft.otf", sans-serif;
        color: white;
    }

    .settings-header {
        background: $accent-color;
        padding: 12px 16px;

        h3 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .settings-content {
        padding: 16px;
        overflow-y: auto;
    }
</style>
