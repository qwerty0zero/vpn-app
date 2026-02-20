<script lang="ts" setup>
import { useNotifications } from '@/composables/useNotifications'
import NotificationItem from '@/components/UI/DefaultNotifications.vue'

const { notifications } = useNotifications()
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="list">
      <NotificationItem
          v-for="notification in notifications"
          :key="notification.id"
          :item="notification"
          class="notification-item-spacing"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.notification-item-spacing {
  pointer-events: auto;
  backface-visibility: hidden;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}

.list-move {
  transition: transform 0.4s ease;
}

.list-leave-active {
  position: absolute;
}
</style>