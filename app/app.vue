<template>
  <NuxtLayout class="layout" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

const config = useRuntimeConfig()
const ColorPrimary = ref<string>('');

try {
  const rawColor = config.public.primaryColor;
  const normalizedColor = normalizeColorToRgb(rawColor);
  ColorPrimary.value = normalizedColor;

  document.documentElement.style.setProperty('--color-primary', ColorPrimary.value);

} catch (e) {
  console.error(e);
}

onMounted(() => {
  document.documentElement.style.setProperty('--color-primary', ColorPrimary.value)
})
</script>