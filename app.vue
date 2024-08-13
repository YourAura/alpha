<template>
  <TopBar class="absolute w-full" />
  <div class="background flex justify-center align-middle">
    <div ref="grid" class="grid" :style="{ width: gridSize.width + 'px', height: gridSize.height + 'px' }" />
    <LazyWidgetContainer v-if="recalc" widgetType="clockArray" :position="{ x: 38, y: 2 }" :size="{ x: 12, y: 6 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="search" :position="{ x: 20, y: 2 }" :size="{ x: 12, y: 2 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="todo" :position="{ x: 2, y: 6 }" :size="{ x: 12, y: 10 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="news" :position="{ x: 20, y: 6 }" :size="{ x: 12, y: 10 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="stopwatch" :position="{ x: 2, y: 18 }" :size="{ x: 8, y: 6 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="linkArray" :position="{ x: 30, y: 18 }" :size="{ x: 13, y: 3 }" />
    <LazyWidgetContainer v-if="recalc" widgetType="empty" :position="{ x: 14, y: 18 }" :size="{ x: 5, y: 3 }">
      <div class="flex flex-col justify-center items-center h-full w-full">
        <h2>Meta</h2>
        <div class="text-white">{{ gridSize }}</div>
      </div>
    </LazyWidgetContainer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 2s;
}

.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://media.discordapp.net/attachments/1200129545177681952/1260885458171465748/prone4257_The_object_is_a_vertically-oriented_luminous_flat_cir_64bbbcd0-a91d-4306-a1cf-cd3d717a2c6a.png?ex=66bc7417&is=66bb2297&hm=1870e69083607ebad0bc27f385bba90b4d6fd5a453380d0facedf66260619d96&=&format=webp&quality=lossless&width=1181&height=662');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.grid {
  background-size: 50px 50px;
  /* transition: all 1s; */
  background-image:
    linear-gradient(to right, rgba(200, 200, 200, v-bind(gridTransparency)) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(200, 200, 200, v-bind(gridTransparency)) 1px, transparent 1px);
}

.draggable {
  position: fixed;
  touch-action: none;
  /* For better touch support */
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserActionsStore } from './store/userActionsStore';
import { useUIStore } from './store/uiStore';

const grid = ref<HTMLElement | null>(null);
const { left, top } = useElementBounding(grid);

const uiStore = useUIStore();
const { cellSize } = uiStore;
const { gridOffsetX, gridOffsetY } = storeToRefs(uiStore);

// Ensure reactivity is synced
syncRefs(left, gridOffsetX);
syncRefs(top, gridOffsetY);

const recalc = ref(false);

const { width, height } = useWindowSize();
const gridSize = computed(() => {
  recalc.value;
  const calculatedWidth = Math.floor(width.value / cellSize) * cellSize + 1 - cellSize;
  const calculatedHeight = Math.floor(height.value / cellSize) * cellSize + 1 - cellSize;
  return { width: calculatedWidth > 0 ? calculatedWidth : 500, // default width if calculation fails
           height: calculatedHeight > 0 ? calculatedHeight : 500 // default height if calculation fails
  };
});

onMounted(async () => {
  await nextTick();
  recalc.value = !recalc.value;
});

const userActionsStore = useUserActionsStore();
const { dragging, resizing } = storeToRefs(userActionsStore);

const gridTransparency = computed(() => dragging.value || resizing.value ? 0.1 : 0.025);
</script>
