<script setup lang="ts">
const config = useRuntimeConfig()

</script>

<template>
<header>
  <img src="@/assets/icons/logo.svg" alt="logo">
  <h1>{{config.public.appTitle}}</h1>
</header>
</template>

<style scoped>
header{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  padding: 1.6rem;
  padding-bottom: 0;

}
img{
  height: 3.2rem;
}
</style>