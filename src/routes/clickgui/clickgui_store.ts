import {type Writable, writable} from "svelte/store";
import type {Module, ConfigurableSetting} from "../../integration/types";

export interface TDescription {
    description: string;
    anchor: "left" | "right",
    x: number;
    y: number;
}

export interface ActiveSettings {
    module: Module;
    settings: ConfigurableSetting;
}

export const description: Writable<TDescription | null> = writable(null);

export const maxPanelZIndex: Writable<number> = writable(0);

export const highlightModuleName: Writable<string | null> = writable(null);

export const scaleFactor: Writable<number> = writable(2);

export const showGrid: Writable<boolean> = writable(false);

export const snappingEnabled: Writable<boolean> = writable(true);

export const gridSize: Writable<number> = writable(10);

export const activeSettings: Writable<ActiveSettings | null> = writable(null);