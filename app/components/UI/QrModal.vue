<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrcodeVue from 'qrcode.vue'
import BaseButton from "~/components/UI/BaseButton.vue";
import {useNotifications} from "~/composables/useNotifications";

const { notify } = useNotifications()
const { t } = useI18n()
interface Props {
  isOpen: boolean
  title?: string
  text?: string
  qrData?: string
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'modal.qr.title',
  text: 'modal.qr.text',
  qrData: 'https://example.com',
  buttonText: 'modal.qr.btn_copy'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()


const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

const qrColor = ref('#4c0d0d')



const copyLink = async () => {
  try {
    const textToCopy =  window.location.href

    await navigator.clipboard.writeText(textToCopy)

    notify(t('modal.qr.copy_success'), '', 2000)

  } catch (err) {
    notify(
        t('modal.qr.copy_error_title'),
        t('modal.qr.copy_error_text'),
        2000
    )
    console.error('Не удалось скопировать: ', err)
  }
}

const handleConfirm = async () => {
  await copyLink()
  emit('confirm')
}
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (import.meta.client) {
    const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim()
    qrColor.value = 'rgb('+color+')' || '#3e1616'
  }
})
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop " @click.self="emit('close')">
        <div class="modal-content  rounded-3xl">

          <div class="modal-header">
            <p class="modal-text">{{ $t('modal.get_link_title') }}</p>

            <button class="close-btn" @click="emit('close')">
              <span class="close-icon">✕</span>
            </button>
          </div>

          <div class="modal-body">

            <div class="qr-wrapper">
              <QrcodeVue
                :value="qrData"
                level="H"
                :size="500"
                background="transparent"
                :foreground="qrColor"
                class="qr-code"
              />
            </div>
            <h3 class="modal-title">{{ $t(title) }}</h3>

            <p class="modal-text">{{ $t(text) }}</p>

          </div>

          <div class="modal-footer">
            <BaseButton  class="primary rounded-3xl action-btn shadow-custom-primary" @click="handleConfirm" >
              {{ $t(buttonText) }}
            </BaseButton>

          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style >
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 16px;
}

.modal-content {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: var(--color-gray);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-title {
  margin: 0;
  color: white;
  font-size: var(--font-size-heading-lg);
  font-weight: 600;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: var(--font-size-button);
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: white;
}

.modal-body {
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 1.2rem;

}

.modal-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--font-size-heading);
}

.qr-wrapper {

  width: 100%;
  max-width: 400px;
  aspect-ratio: 1 / 1;
}
.qr-code{
  width: 100% !important;
  height: auto !important;
  display: block;
}

.modal-footer {
  padding: 0 1.6rem 2rem 1.6rem;
}

.action-btn {
  width: 100% !important;
  justify-content: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}
</style>