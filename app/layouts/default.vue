<template>
  <div class="min-h-screen flex justify-center bg-bg_dark layout ">
    <GlobalPreloader />
    <div
          class="w-full max-w-[700px] flex flex-col layout_content  shadow-custom-primary rounded-xl  backdrop-blur-sm">
      <DefaultHeader/>
      <NuxtPage />
      <NotificationContainer />
      </div>
  </div>
</template>
<script setup lang="ts">
import DefaultHeader from "~/components/UI/DefaultHeader.vue";
import NotificationContainer from '~/components/NotificationContainer.vue'
import GlobalPreloader from '~/components/GlobalPreloader.vue'


</script>


<style>
.layout{
  position: relative;
  background-image:
    linear-gradient(
      to right,
      var(--line-color) var(--line-width),
      transparent var(--line-width)
    ),
    linear-gradient(
      to bottom,
      var(--line-color) var(--line-width),
      transparent var(--line-width)
    );
  background-size: var(--square-size) var(--square-size);
}

.layout::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--oval-width);
  height: var(--oval-height);
  transform: translate(-50%, -50%);

  background: radial-gradient(
    ellipse at center,
    rgb(var(--color-primary)) 0%,
    transparent 70%
  );

  filter: blur(var(--oval-blur));
  opacity: var(--oval-opacity);

  pointer-events: none;
}
.layout_content {
  background-color: var(--color-app-bg-tr);
  padding:
    calc(env(safe-area-inset-top) + 0.5rem)
    calc(env(safe-area-inset-right) + 0.5rem)
    calc(env(safe-area-inset-bottom) + 0.5rem)
    calc(env(safe-area-inset-left) + 0.5rem);
}
</style>