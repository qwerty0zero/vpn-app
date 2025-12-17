<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div>
    <p>{{config.public.appTitle}}</p>
    <p>{{config.public.primaryColor}}</p>
  </div>

</template>

<style scoped>

</style>