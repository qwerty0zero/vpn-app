<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'
import { computed } from 'vue'

import BaseButton from "~/components/UI/BaseButton.vue";
import SetupStepCard from "~/components/UI/SetupStepCard.vue";
import UserInfoCard from "~/components/UI/UserInfoCard.vue";
import DefaultDropdown  from "~/components/UI/DefaultDropdown.vue";
import AppSwitcher from "~/components/UI/AppSwitcher.vue";
import QrModal from "~/components/UI/QrModal.vue";
import DefaultSvg from "~/components/UI/DefaultSvg.vue";

import telegramIcon from '@/assets/icons/telegram.svg'
import externalLinkIcon from '@/assets/icons/external-link.svg'

import happData from "~/assets/json/happ.json"
import downloadsData from '~/assets/json/downloads.json'

type DownloadLinks = Record<string, string>
type DownloadsSchema = Record<string, DownloadLinks>
const downloads = downloadsData as DownloadsSchema

const { notify } = useNotifications()

type DataType = typeof happData

const currentOS = ref<string | null>(null)
const currentData = ref<DataType>(happData)
const currentApp = ref<string>('happ')
const deepLink = 'https://www.google.com/'

const downloadUrl = computed(() => {
  const links = downloads[currentApp.value]
  return links?.[currentOS.value] ?? links?.default ?? '#'
})


const handleUpdate = (data: DataType) => {
  currentData.value = data.content
  currentApp.value = data.app
}

const showQr = ref(false)

const openModal = () => {
  showQr.value = true
}

const onConfirm = () => {
  console.log('Кнопка нажата')
  showQr.value = false
}

</script>


<template>
  <div class="flex flex-col page" >
    <div class="button_group flex">
      <BaseButton  @click="openModal" class="contex  rounded-full shadow-custom-light text-primary" >
        <template #icon>
          <img src="@/assets/icons/link.svg" alt="link" />
        </template>
      </BaseButton>

      <BaseButton href="https://telegram.me/BotFather"  target="_blank"  class="contex !border-primary-alpha  rounded-full shadow-custom-primary text-primary">
        <template #icon>
          <DefaultSvg :src="telegramIcon"/>
        </template>
      </BaseButton>
    </div>


    <section class="setup">
      <UserInfoCard/>
      <div class="row flex">
        <h3 class="setup_title">Установка</h3>
        <DefaultDropdown v-model="currentOS" placeholder="Windows"/>
      </div>
      <AppSwitcher @update="handleUpdate"/>

      <TransitionGroup
          name="list"
          tag="div"
          class="setup_list"
      >
        <SetupStepCard
            v-for="(el, index) in currentData"
            :key="el.title"
            :title="el.title"
            :text="el.text"
            :index="index"
        >
          <BaseButton v-if="index === 0" :href="downloadUrl" target="_blank" class="secondary rounded-3xl shadow-custom-primary text-primary">
            <template #icon>
              <DefaultSvg :src="externalLinkIcon"/>
            </template>
            {{currentOS || 'Windows'}}
          </BaseButton>

          <BaseButton
              v-if="index === 1"
              :href="deepLink"
              class="primary rounded-3xl"
              target="_blank"
          >
            Добавить подписку
          </BaseButton>
        </SetupStepCard>
      </TransitionGroup>
    </section>





  </div>
  <QrModal
      :is-open="showQr"

      qr-data="https://mysite.com/connect/12345"
      @close="showQr = false"
      @confirm="onConfirm"
  />
</template>


<style scoped>
.page{
  padding: 1.6rem;
  gap: 2.4rem;
}
.setup, .setup_list{
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
}
.setup_list{
  position: relative;
}
.button_group{
  gap: 0.8rem;
  align-self: flex-end;
}

.setup_title{
  font-size: 2.8rem;
}
.row{
  gap: 0.8rem;
  justify-content: space-between;

}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from{
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>