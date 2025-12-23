

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';

interface Props {
  src: string;
}

const props = defineProps<Props>();
const svgContent = ref<string>('');

const iconStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const fetchSvg = async () => {
  if (!props.src) return;

  try {
    const response = await fetch(props.src);
    svgContent.value = await response.text();
  } catch (err) {
    console.error('Ошибка загрузки SVG:', err);
    svgContent.value = '';
  }
};

watch(() => props.src, fetchSvg);

onMounted(fetchSvg);
</script>

<template>
  <div
      class="svg-icon"
      :style="iconStyle"
      v-html="svgContent"
      role="img"
  ></div>
</template>

<style scoped>
.svg-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: var(--color-primary);
}
</style>