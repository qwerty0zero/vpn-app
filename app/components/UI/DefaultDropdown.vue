<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

export interface DropdownOption {
  label: string
  value: string
  icon?: string
}

interface Props {
  modelValue: string | null
  options: DropdownOption[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите...',
  options: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || null
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown-wrapper" ref="dropdownRef">

    <div @click="toggle" class="trigger-container">
      <slot name="trigger" :selected="selectedOption" :isOpen="isOpen">
        <div class="default-trigger shadow-custom-light" :class="{ 'is-active': isOpen }">
          <div v-if="selectedOption" class="flex-center">
            <img v-if="selectedOption.icon" :src="selectedOption.icon" class="opt-icon" />
            <span class="selected-text">{{ selectedOption.label }}</span>
          </div>
          <span v-else class="placeholder">{{ placeholder }}</span>
          <span class="arrow">
             <img src="@/assets/icons/sort.svg" alt="sort">
          </span>
        </div>
      </slot>
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="dropdown-menu  shadow-custom-light rounded-xl">
        <li
            v-for="option in props.options"
            :key="option.value"
            class="dropdown-item"
            :class="{ 'selected': modelValue === option.value }"
            @click.stop="selectOption(option)"
        >
          <div class="flex-center">
            <img v-if="option.icon" :src="option.icon" class="opt-icon" />
            <span>{{ option.label }}</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.dropdown-wrapper {
  position: relative;
}

.trigger-container {
  cursor: pointer;
}

.default-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s;
  font-size: var(--font-size-heading);
  gap: 2rem;
  background-color: var(--color-gray);

}
.default-trigger:hover {
  background-color: var(--color-app-bg);
}

.flex-center { display: flex; align-items: center; gap: 10px; }
.opt-icon { width: 20px; height: 20px; }
.placeholder { color: #999; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  width: max-content;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 100;
  overflow: hidden;
  background-color: var(--color-gray);
}

.dropdown-menu { right: 0; }

.dropdown-item { padding: 10px 14px; cursor: pointer; font-size: var(--font-size-button); }
.dropdown-item:hover { background-color: #181818; }
.dropdown-item.selected { background-color: #181818; color:rgb(var(--color-primary)); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }
</style>