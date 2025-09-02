<script lang="ts">
    import type {Module} from "../../integration/types";
    import WurstModule from "./WurstModule.svelte";
    
    export let modules: Module[] = [];
</script>

<div class="wurst-module-grid">
    <div class="module-grid">
        {#each modules as module (module.name)}
            <WurstModule {module} />
        {/each}
    </div>
</div>

<style lang="scss">
    .wurst-module-grid {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
        overflow-y: auto;
        overflow-x: hidden;
        
        /* Hide default scrollbar */
        scrollbar-width: none;
        -ms-overflow-style: none;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }
    
    .module-grid {
        display: grid;
        grid-template-columns: repeat(3, 240px);
        gap: 4px;
        justify-content: center;
    }
</style>
