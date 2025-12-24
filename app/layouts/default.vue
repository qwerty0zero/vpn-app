<template>
  <div class="min-h-screen flex justify-center bg-bg_dark layout ">
    <div
          class="w-full max-w-[700px] bg-bg_dark flex flex-col"
         style="
           padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
         ">
      <DefaultHeader/>
      <NuxtPage />
      <NotificationContainer />
      </div>
    <AnimatedBackground/>
  </div>
</template>
<script setup lang="ts">
import DefaultHeader from "~/components/UI/DefaultHeader.vue";
import NotificationContainer from '~/components/NotificationContainer.vue'
import AnimatedBackground from "~/components/VueBits/AnimatedBackground.vue";
</script>


<style>
.layout{
  position: relative;
}
</style>