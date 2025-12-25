<template>
  <NuxtLoadingIndicator />

  <NuxtLayout class="layout" />

</template>
<script setup lang="ts">
import { onMounted } from 'vue'

const config = useRuntimeConfig()



onMounted(() => {
  document.documentElement.style.setProperty('--color-primary', config.public.primaryColor)
})
</script>