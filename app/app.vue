<template>
  <NuxtLayout class="layout" />

</template>
<script setup lang="ts">
import { onMounted } from 'vue'

const config = useRuntimeConfig()

function hexToRgb(hex: string): string {
  const sanitizedHex = hex.replace(/^#/, '')

  const bigint = parseInt(sanitizedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r}, ${g}, ${b}`
}

onMounted(() => {
  const primaryHex = config.public.primaryColor
  const primaryRgb = hexToRgb(primaryHex)


  document.documentElement.style.setProperty('--color-primary', primaryHex)
  document.documentElement.style.setProperty('--color-primary-rgb', primaryRgb)
})
</script>