<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

import WindowsIcon from '@/assets/icons/windows.svg'
import MacIcon from '@/assets/icons/macos.svg'
import AndroidIcon from '@/assets/icons/android.svg'
import IosIcon from '@/assets/icons/ios.svg'

// 1. В интерфейсе опции value теперь строго string
export interface DropdownOption {
  label: string
  value: string
  icon: string
}

const options: DropdownOption[] = [
  { label: 'Windows', value: 'windows', icon: WindowsIcon },
  { label: 'macOS', value: 'macos', icon: MacIcon },
  { label: 'Android', value: 'android', icon: AndroidIcon },
  { label: 'iOS', value: 'ios', icon: IosIcon }
]

interface Props {
  // 2. Props принимает string или null (для v-model="ref<string | null>")
  modelValue: string | null
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите платформу'
})

const emit = defineEmits<{
  // 3. Возвращаем строго строку
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// 4. Ищем объект опции по строковому значению
const selectedOption = computed(() => {
  return options.find(option => option.value === props.modelValue) || null
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: DropdownOption) => {
  // Эмитим строку
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

  // Автоопределение платформы
  if (!props.modelValue) {
    const userAgent = navigator.userAgent.toLowerCase()
    let detectedValue: string | null = null

    if (userAgent.includes('android')) detectedValue = 'android'
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) detectedValue = 'ios'
    else if (userAgent.includes('mac')) detectedValue = 'macos'
    else if (userAgent.includes('win')) detectedValue = 'windows'

    if (detectedValue) {
      // Проверяем наличие такой строки в опциях перед эмитом
      const exists = options.some(opt => opt.value === detectedValue)
      if (exists) {
        emit('update:modelValue', detectedValue)
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
      <div v-if="selectedOption" style="display: flex; align-items: center; gap: 10px;">
        <img :src="selectedOption.icon" alt="" style="width: 20px; height: 20px;" />
        <span class="selected-text">{{ selectedOption.label }}</span>
      </div>

      <span v-else class="placeholder">{{ placeholder }}</span>

      <span class="arrow">
        <img src="@/assets/icons/sort.svg" alt="sort" role="img">
      </span>
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="dropdown-menu bg-bg_gray shadow-custom-light rounded-xl">
        <li
            v-for="option in options"
            :key="option.value"
            class="dropdown-item"
            :class="{ 'selected': modelValue === option.value }"
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