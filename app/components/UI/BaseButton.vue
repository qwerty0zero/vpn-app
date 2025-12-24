<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  href: {
    type: String,
    default: null
  },

  type: {
    type: String,
    default: 'button'
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()

const isLink = computed(() => !!props.href)

const tag = computed(() => (isLink.value ? 'a' : 'button'))

const componentAttrs = computed(() => {
  if (isLink.value) {
    return {
      href: props.href,
      'aria-disabled': props.disabled || undefined,
      ...attrs
    }
  }

  return {
    type: props.type,
    disabled: props.disabled,
    ...attrs
  }
})
</script>

<template>
  <component
      :is="tag"
      class="base-button "
      v-bind="componentAttrs"
  >
    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>

    <span v-if="$slots.default" class="base-button__label">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 1.8rem 2.4rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
  transition: 0.3s;
  text-transform: capitalize;
}
.primary{
  background-color: var(--color-primary);
  color: var(--color-gray);
  border: 1px solid  var(--color-primary);


}
.secondary{
  background-color:  rgb(from var(--color-primary) r g b / 0.05);
  border: 1px solid  rgb(from var(--color-primary) r g b / 0.24);
}
.contex{
  background-color: var(--color-bg-gray);
    border: 1px solid rgba(255, 255, 255, 0.1) ;
}
.rounded-full{
  padding: 1.8rem;
}

.primary:hover{
  background-color: transparent;
  color: var(--color-primary);
}
.secondary:hover{
  box-shadow:  0 0 26px  rgb(from var(--color-primary) r g b / 0.5);
}
.contex:hover{
  background-color: var(--color-app-bg);
  border: 1px solid rgba(255, 255, 255, 0.1) ;
}
.base-button[aria-disabled="true"],
.base-button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
.base-button__icon{
  display: flex;
}
.base-button__icon img {
  width: 1em;
  height: 1em;
}
</style>
