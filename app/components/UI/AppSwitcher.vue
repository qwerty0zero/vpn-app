<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import BaseButton from "~/components/UI/BaseButton.vue";

const emit = defineEmits<{
  (e: 'update', data:string): void
}>()

const activeTab = ref<'happ' | 'koala'>('happ')

const selectTab = (tab: 'happ' | 'koala') => {
  activeTab.value = tab
  if (tab === 'happ') {
    emit('update', 'happ')
  } else {
    emit('update', 'koala')
  }
}

onMounted(() => {
  selectTab('happ')
})
</script>

<template>
  <div class="switcher-container rounded-3xl bg-bg_gray">
    <div
        class="slider rounded-3xl"
        :class="{ 'slide-right': activeTab === 'koala' }"
    ></div>

    <BaseButton
        class="switcher-btn"
        :class="{ 'is-active': activeTab === 'happ' }"
        @click="selectTab('happ')">
      <template #icon>
          <img src="@/assets/icons/sun.svg" alt="happ" role="img">
      </template>
      <p>Happ</p>
    </BaseButton>

    <BaseButton
        class="switcher-btn"
        :class="{ 'is-active': activeTab === 'koala' }"
        @click="selectTab('koala')">
      <p>Koala Clash</p>
    </BaseButton>
  </div>
</template>

<style scoped>
.switcher-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  width: 100%;
  isolation: isolate;

  font-size: var(--font-size-button);
  font-weight: bold;
  color: white;

  border: 1px solid rgba(255, 255, 255, 0.05);
}

.slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background-color: #000000;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  z-index: 1;
}

.slider.slide-right {
  transform: translateX(100%);
  transform: translateX(calc(100%));
}

.switcher-btn {
  position: relative;
  z-index: 2;
  padding: 1.2rem 0;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.3s;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
}

.switcher-btn:hover {
  color: #ccc;
}

.switcher-btn.is-active {
  color: white;
}
</style>