<template>
  <div class="flex flex-col p-5 gap-2">
    <h1 class="text-xl font-bold">{{ config.public.appTitle }}</h1>
    <p class="text-primary">{{ config.public.primaryColor }}</p>
    <BaseButton  class="primary rounded-3xl">
      Добавить подписку
    </BaseButton>
    <BaseButton  class="secondary rounded-3xl shadow-custom-primary text-primary">
      Добавить подписку
      <template #icon>
        <img src="@/assets/icons/external-link.svg" alt="external-link" />
      </template>
      Windows
    </BaseButton>
    <BaseButton  class="contex rounded rounded-full shadow-custom-light text-primary">
      <template #icon>
        <img src="@/assets/icons/link.svg" alt="link" />
      </template>
    </BaseButton>

    <BaseButton  class="contex !border-primary-alpha rounded rounded-full shadow-custom-primary text-primary">
      <template #icon>
        <img src="@/assets/icons/telegram.svg" alt="telegram" />
      </template>
    </BaseButton>
  </div>
</template>
<style scoped>

</style>
<script setup lang="ts">
import BaseButton from "~/components/UI/BaseButton.vue";
const config = useRuntimeConfig()

</script>