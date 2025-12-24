<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import type { Notification } from '@/composables/useNotifications'

const props = defineProps<{
  item: Notification
}>()

const { remove } = useNotifications()
let timer: ReturnType<typeof setTimeout>

const close = () => {
  remove(props.item.id)
}

onMounted(() => {
  timer = setTimeout(() => {
    close()
  }, props.item.duration)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="notification-card rounded-xl shadow-custom-light" @click="close">
    <div class="content flex flex-col items-start">
      <div v-if="item.icon" class="icon-wrapper">
        <img :src="item.icon" alt="" class="icon" />
      </div>
      <h5 v-if="item.title">{{item.title}}</h5>
      <span class="text">{{ item.text }}</span>
    </div>

    <div
        class="progress-bar"
        :style="{ animationDuration: `${item.duration}ms` }"
    ></div>
  </div>
</template>

<style scoped>
.notification-card {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-gray);
  color: white;
  padding: 1.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  cursor: pointer;
  min-width: 300px;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  z-index: 2;
}

.icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
h5{
  font-size: 1.7rem;
  font-weight: 600;

}
.text {
  font-size: 1.3rem;
  font-weight: 500;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: var(--color-primary);
  width: 100%;
  animation-name: shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>