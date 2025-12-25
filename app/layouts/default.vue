<template>
  <div class="min-h-screen flex justify-center bg-bg_dark layout ">
    <GlobalPreloader />
    <div
          class="w-full max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1500px] xl:max-w-[1500px]  bg-bg_dark flex flex-col"
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
import GlobalPreloader from '~/components/GlobalPreloader.vue'


</script>


<style>
.layout{
  position: relative;
}
</style>