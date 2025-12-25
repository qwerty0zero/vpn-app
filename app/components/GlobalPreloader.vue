<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n'

const loaded = ref(false);
const percentage = ref(0);
const { t } = useI18n()

onMounted(() => {
  if (process.client) {
    const updateProgress = () => {
      if (percentage.value < 100) {
        percentage.value += 1;
        requestAnimationFrame(updateProgress);
      }
    };
    if (percentage.value < 100) {
      updateProgress();
    }
    const finishLoading = () => {
      setTimeout(() => {
        loaded.value = true;
      }, 500);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }
  }
});
</script>

<template>
  <div
    class="preloader"
    :class="{ 'preloader--loaded': loaded }"
    :aria-hidden="loaded"
  >
    <div class="preloader__content">
      <div class="preloader__message">{{t('preloader.loading')}}</div>
      <div class="preloader__percent">{{ Math.round(percentage) }}%</div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  z-index: 9999;
  transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
  will-change: transform;
}

.preloader--loaded {
  transform: translateY(-100%);
  pointer-events: none;
}

.preloader__message {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.preloader__percent {
  font-size: 6rem;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.preloader--loaded .preloader__percent,
.preloader--loaded .preloader__message {
  opacity: 0;
}
</style>