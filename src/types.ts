import { type Component } from "vue";

export interface AppStartup {
  title: string;
  window: Component;
  icon?: string;
}

export interface DesktopIconData {
  name: string
  icon: string
  app?: AppStartup
}