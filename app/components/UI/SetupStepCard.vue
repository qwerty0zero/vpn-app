<script setup lang="ts">
defineProps<{
  title : string,
  text: string,
  index : number,
}>()
</script>

<template>
  <div class="set_up_card">
    <p class="index">{{index + 1}}</p>
    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{text}}</p>
      <slot />

    </div>
  </div>
</template>

<style scoped>
.set_up_card, .content{
  display: flex;
  gap: 1.6em;
}
.content{
  flex-direction: column;

}
h3{
  font-size: 2rem;
  font-weight: bold;
}
.content p{
  font-size: 1.7rem;
  color: rgba(255, 255, 255, 0.60);
}
.index{
  font-weight: bold;
  font-size: 4.4rem;
  color: var(--color-index);
  height: fit-content;
  line-height: 1;
}
</style>
