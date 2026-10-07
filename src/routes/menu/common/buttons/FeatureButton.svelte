<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let title: string;
    export let icon: string;

    const dispatch = createEventDispatcher();
</script>

<!-- styled like Wurst's feature boxes -->
<button class="feature-button" on:click={() => dispatch("click")}>
    <img class="icon" src="img/menu/icon-{icon}.svg" alt="" aria-hidden="true"/>
    <span class="label">{title}</span>
</button>

<style lang="scss">
    @use "../../../../colors.scss" as *;

    .feature-button {
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
