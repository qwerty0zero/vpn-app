<template>
  <div class="min-h-screen flex justify-center bg-bg_gray layout ">
    <div class="w-full max-w-[480px] bg-bg_dark "
         style="
           padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
         ">
      <DefaultHeader/>
      <NuxtPage />
      <NotificationContainer />
    </div>
  </div>
</template>
<script setup lang="ts">
import DefaultHeader from "~/components/UI/DefaultHeader.vue";
import NotificationContainer from '@/components/NotificationContainer.vue'
</script>


<style>

</style>