<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import WindowsIcon from '@/assets/icons/windows.svg'
import MacIcon from '@/assets/icons/macos.svg'
import AndroidIcon from '@/assets/icons/android.svg'
import IosIcon from '@/assets/icons/ios.svg'

export interface DropdownOption {
  label: string
  value: string | number
  icon: string
}

const options: DropdownOption[] = [
  { label: 'Windows', value: 'windows', icon: WindowsIcon },
  { label: 'macOS', value: 'macos', icon: MacIcon },
  { label: 'Android', value: 'android', icon: AndroidIcon },
  { label: 'iOS', value: 'ios', icon: IosIcon }
]

interface Props {
  modelValue: DropdownOption | null
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите платформу'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: DropdownOption): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  if (!props.modelValue) {
    const userAgent = navigator.userAgent.toLowerCase()
    let detectedValue: string | null = null

    if (userAgent.includes('android')) detectedValue = 'android'
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) detectedValue = 'ios'
    else if (userAgent.includes('mac')) detectedValue = 'macos'
    else if (userAgent.includes('win')) detectedValue = 'windows'

    if (detectedValue) {
      const foundOption = options.find(opt => opt.value === detectedValue)
      if (foundOption) {
        emit('update:modelValue', foundOption)
      }
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown bg-bg_gray rounded-xl shadow-custom-light" ref="dropdownRef" @click="toggle">
    <div
        class="dropdown-trigger bg-bg_gray"
        :class="{ 'is-active': isOpen }"
    >
      <div v-if="modelValue" style="display: flex; align-items: center; gap: 10px;">
        <img :src="modelValue.icon" alt="" style="width: 20px; height: 20px;" />
        <span class="selected-text">{{ modelValue.label }}</span>
      </div>

      <span v-else class="placeholder">{{ placeholder }}</span>

      <span class="arrow">
        <img src="@/assets/icons/sort.svg" alt="sort" role="icon">
      </span>
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="dropdown-menu bg-bg_gray shadow-custom-light rounded-xl">
        <li
            v-for="option in options"
            :key="option.value"
            class="dropdown-item"
            :class="{ 'selected': modelValue?.value === option.value }"
            @click.stop="selectOption(option)"
        >
          <div style="display: flex; align-items: center; gap: 10px;">
            <img :src="option.icon" alt="" style="width: 20px; height: 20px;" />
            <span>{{ option.label }}</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  user-select: none;
  font-size: 1.7rem ;
  padding: 1.3rem 1.6rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dropdown-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  gap: 2rem;
}

.dropdown-trigger:hover { border-color: #aaa; }
.dropdown-trigger.is-active { border-color: #3b82f6; }

.placeholder { color: #999; }
.arrow { transition: transform 0.3s; color: #666; font-size: 0.8em; }


.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  padding: 10px 14px;
  cursor: pointer;
}

.dropdown-item:hover { background-color: #181818; }
.dropdown-item.selected { background-color: #181818; color: var(--color-primary); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-5px); }
</style>