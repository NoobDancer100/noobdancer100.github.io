<script lang="ts" setup>
import { inject } from 'vue'
import type { DesktopIconData } from '../types';
// Destructure the props so template can use 'data' directly
const { data } = defineProps<{ data: DesktopIconData }>()

const startApplication = inject("StartFunc") as Function;

function attemptOpen() {
    if (data.app) {
        startApplication(data.app);
    }
}
</script>

<template>
  <div class="desk-icon" @click="attemptOpen">
    <div class="icon">
        <img :src="data.icon" :alt="data.icon">
    </div>
    <div class="caption">{{ data.name }}</div>
  </div>
</template>

<style lang="scss">
.desk-icon {
    width: 75px;

    display: grid;

    grid-template-rows: 1fr auto;

    text-align: center;

    .icon > img {
        height: 60px;
    }

    .caption {
        color: white;
        margin-top: 5px;
    }

    cursor: pointer;

    border: 1px solid transparent;

    &:hover {
        border: 1px solid rgb(72, 72, 248);

        background-color: rgba(0, 132, 255, 0.685);
    }

    user-select: none;
}
</style>