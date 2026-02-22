<script setup lang="ts">
import { provide, onMounted, reactive } from "vue";

// COMPONENTS
import DesktopIcon from "./components/DesktopIcon.vue";
import Window from "./components/Window.vue";

// HELPERS
import { icons } from "./icons";
import type { AppStartup, DesktopIconData } from "./types";

// WINDOWS
import Welcome from "./windows/Welcome.vue";

const activeApps: Array<AppStartup> = reactive([]);

const desktop_icons: DesktopIconData[] = [
  {
    name: "Welcome",
    icon: icons.App!,
    app: {
      icon: icons.App!,
      title: 'Welcome',
      window: Welcome
    }
  },
  {
    name: 'Links',
    icon: icons.App!
  }
];

function StartApplication(app: AppStartup) {
  activeApps.push(app);

  console.log(activeApps);
}

provide("StartFunc", StartApplication);

onMounted(() => {
  StartApplication({
    title: "Welcome!",
    window: Welcome
  });
});
</script>

<template>
  <div class="windows">
    <Window v-for="(data, index) in activeApps" :title="data.title" :icon="data.icon" @window-close="activeApps.splice(index,1)">
      <component :is="data.window"></component>
    </Window>
  </div>
  <div class="explorer">
    <div class="desktop">
      <DesktopIcon
        v-for="(data, index) in desktop_icons"
        :key="index"
        :data="data"
      />
    </div>
    <div class="taskbar">
      <div class="task-icon" v-for="data in activeApps">
        <img :src="data.icon" v-if="data.icon">
        <img src="/src/assets/icons/App.ico" v-else>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.windows {
  position: absolute;

  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.explorer {
  height: 100vh;
  width: 100vw;

  display: grid;

  grid-template-rows: 1fr 50px;

  .desktop {
    background-color: #6b6b6b;
    padding: 10px;

    display: grid;
    grid-template-columns: repeat(auto-fill, 75px);
    grid-auto-rows: min-content; // rows fit content, not stretching
    gap: 10px;

    justify-content: start; // align icons to the left
    align-content: start; // align rows to the top
    height: auto; // do NOT expand the container
    max-height: calc(100vh - 50px); // optional: don’t let it exceed parent
  }

  .taskbar {
    background-color: #303030;

    z-index: 100;

    display: flex;

    align-items: center;
    justify-content: center;

    .task-icon {
      display: flex;

      align-items: center;
      justify-content: center;

      img {
        height: 30px;
      }

      border-radius: 100%;
      background-color: #353535;

      aspect-ratio: 1;
      width: 45px;
    }
  }
}
</style>
