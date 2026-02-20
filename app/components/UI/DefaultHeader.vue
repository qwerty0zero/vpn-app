<script setup lang="ts">
const config = useRuntimeConfig()

</script>

<template>
<header class="relative z-10">
  <img src="@/assets/icons/logo.svg" alt="logo" role="img">
  <h1>{{config.public.appTitle}}</h1>
</header>
</template>

<style scoped>
header{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: var(--font-size-header);
  padding: 1.6rem 1.6rem 0;
}
img{
  height: 3.2rem;
}
</style>