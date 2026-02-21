<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const { title, icon } = defineProps<{ title: string, icon?: string }>()
const emit = defineEmits(['window-close'])

const x = ref(100)
const y = ref(100)

const dragging = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

function onMouseDown(e: MouseEvent) {
  dragging.value = true
  offsetX.value = e.clientX - x.value
  offsetY.value = e.clientY - y.value
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  x.value = e.clientX - offsetX.value
  y.value = e.clientY - offsetY.value
}

function onMouseUp() {
  dragging.value = false
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseUp)
})

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", onMouseUp)
})
</script>

<template>
  <div
    class="window"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    @dragstart.prevent
  >
    <div class="titlebar" @mousedown="onMouseDown">
      <img :src="icon" v-if="icon">
      <img v-else src="/src/assets/icons/ThisPC.png" />
      <p>{{ title }}</p>
      <button @click="() => emit('window-close')">X</button>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.window {
  border: 1px solid blue;
  border-radius: 5px 5px 0px 0px;

  min-width: 450px;
  width: fit-content;
}

.titlebar {
  cursor: grab;
  user-select: none;

  background-color: blue;
  color: white;

  padding: 5px;

  border-radius: 4px 4px 0px 0px;

  display: grid;

  grid-template-columns: 30px 1fr 30px;
  gap: 5px;

  p {
    font-size: 1.5em;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  img {
    height: 30px;
  }
  button {
    width: 30px;
    height: 30px;

    border: 1px solid #640000;

    background-color: #ee0000;

    color: white;
    font-size: 24px;

    cursor: pointer;
  }
}

.titlebar:active {
  cursor: grabbing;
}

.content {
  padding: 12px;

  background-color: #fefefe;
}
</style>