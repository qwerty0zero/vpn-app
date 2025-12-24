<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'

import BaseButton from "~/components/UI/BaseButton.vue";
import SetupStepCard from "~/components/UI/SetupStepCard.vue";
import UserInfoCard from "~/components/UI/UserInfoCard.vue";
import DefaultDropdown , { type DropdownOption }  from "~/components/UI/DefaultDropdown.vue";
import AppSwitcher from "~/components/UI/AppSwitcher.vue";
import QrModal from "~/components/UI/QrModal.vue";

import downloadsData from '~/assets/json/downloads.json'

import WindowsIcon from '@/assets/icons/windows.svg'
import MacIcon from '@/assets/icons/macos.svg'
import AndroidIcon from '@/assets/icons/android.svg'
import IosIcon from '@/assets/icons/ios.svg'


type DownloadLinks = Record<string, string>
type DownloadsSchema = Record<string, DownloadLinks>
const downloads = downloadsData as DownloadsSchema

const { locale, t, tm, rt } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentOS = ref<string | null>(null)
const osOptions: DropdownOption[] = [
  { label: 'Windows', value: 'windows', icon: WindowsIcon },
  { label: 'macOS', value: 'macos', icon: MacIcon },
  { label: 'Android', value: 'android', icon: AndroidIcon },
  { label: 'iOS', value: 'ios', icon: IosIcon }
]
const currentLang = ref(locale.value)
const langOptions: DropdownOption[] = [
  { label: 'Русский', value: 'ru', icon: '' },
  { label: 'English', value: 'en', icon: '' }
]

const currentApp = ref<string>('happ')
const deepLink = 'https://www.google.com/'
const showQr = ref(false)

const currentData = computed(() => {
  const data = tm(`instructions.${currentApp.value}`)
  return Array.isArray(data) ? data : []
})

const downloadUrl = computed(() => {
  const links = downloads[currentApp.value]
  if (!links) return '#'
  return links[currentOS.value || 'windows'] ?? links.default ?? '#'
})

const formattedOS = computed(() => {
  if (!currentOS.value) return 'Windows';

  const map: Record<string, string> = {
    'ios': 'iOS',
    'macos': 'MacOs',
    'windows': 'Windows',
    'android': 'Android',
  };

  return map[currentOS.value] || 'Windows';
});

const handleUpdate = (data: { app: string }) => {
  currentApp.value = data
}

const openModal = () => {
  showQr.value = true
}

const onConfirm = () => {
  showQr.value = false
}

watch(currentLang, async (newLang) => {
  if (newLang === locale.value) return
  const path = switchLocalePath(newLang)
  await router.push(path)
})

watch(locale, (newLocale) => {
  if (currentLang.value !== newLocale) {
    currentLang.value = newLocale
  }
})

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  let detectedValue: string | null = null

  if (userAgent.includes('android')) detectedValue = 'android'
  else if (userAgent.includes('iphone') || userAgent.includes('ipad')) detectedValue = 'ios'
  else if (userAgent.includes('mac')) detectedValue = 'macos'
  else if (userAgent.includes('win')) detectedValue = 'windows'

  if (detectedValue && osOptions.some(opt => opt.value === detectedValue)) {
    currentOS.value = detectedValue
  }
})
</script>


<template>
  <div class="flex flex-col page relative z-10  backdrop-blur-md"  >
    <div class="button_group flex">


      <DefaultDropdown
          v-model="currentLang"
          :options="langOptions"
          class="lang-dropdown"
      >
        <template #trigger="{ selected, isOpen }">
          <BaseButton class="contex  rounded-full shadow-custom-light text-primary" >
            <template #icon>
              <img width="20" height="20" src="@/assets/icons/globe.svg" alt="lang" />
            </template>
          </BaseButton>
        </template>
      </DefaultDropdown>

      <BaseButton  @click="openModal" class="contex  rounded-full shadow-custom-light text-primary" >
        <template #icon>
          <img src="@/assets/icons/link.svg" alt="link" />
        </template>
      </BaseButton>

      <BaseButton href="https://telegram.me/BotFather"  target="_blank"  class="contex !border-primary-alpha  rounded-full shadow-custom-primary text-primary">
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="primary_color_svg">
            <path d="M18.5539 2.02312C18.3166 1.82573 18.0303 1.69637 17.7253 1.64879C17.4204 1.60121 17.1082 1.63721 16.8221 1.75294L1.88803 7.7824C1.56865 7.91381 1.29679 8.13923 1.10853 8.42875C0.920266 8.71827 0.824503 9.05821 0.83395 9.40343C0.843398 9.74865 0.957611 10.0828 1.16143 10.3616C1.36525 10.6404 1.64903 10.8506 1.97511 10.9644L4.99595 12.015L6.6797 17.583C6.70258 17.6574 6.73578 17.7282 6.77835 17.7933C6.7848 17.8033 6.79391 17.8108 6.80078 17.8205C6.84995 17.8891 6.90937 17.9498 6.97697 18.0003C6.9962 18.015 7.0146 18.0287 7.03515 18.0417C7.11427 18.0942 7.20188 18.1326 7.2941 18.1551L7.30396 18.156L7.30955 18.1584C7.365 18.1696 7.42143 18.1754 7.47801 18.1754C7.48345 18.1754 7.48829 18.1728 7.49368 18.1727C7.57906 18.1713 7.6637 18.1565 7.74459 18.1292C7.7634 18.1227 7.77953 18.112 7.79779 18.1043C7.8581 18.0793 7.91525 18.0472 7.96803 18.0088C8.0103 17.9732 8.05258 17.9376 8.09488 17.902L10.3467 15.4158L13.7052 18.0176C14.0009 18.2478 14.3649 18.3729 14.7396 18.3732C15.1322 18.3727 15.5128 18.2372 15.8174 17.9895C16.122 17.7417 16.3322 17.3968 16.4128 17.0125L19.1317 3.66538C19.1933 3.36498 19.1721 3.05347 19.0703 2.7642C18.9685 2.47493 18.79 2.21876 18.5539 2.02312V2.02312ZM7.80845 12.2803C7.6929 12.3954 7.61391 12.542 7.5814 12.7018L7.32347 13.9552L6.67009 11.7943L10.0578 10.0302L7.80845 12.2803ZM14.7266 16.7L10.7577 13.6255C10.5916 13.4972 10.3833 13.4361 10.1743 13.4545C9.96524 13.4729 9.77081 13.5694 9.62973 13.7248L8.90855 14.5208L9.16342 13.282L15.0659 7.37954C15.2068 7.23885 15.2926 7.05234 15.3079 6.85381C15.3231 6.65529 15.2668 6.45786 15.149 6.29731C15.0312 6.13675 14.8599 6.02368 14.6659 5.97857C14.472 5.93347 14.2683 5.95931 14.0918 6.05142L5.62074 10.4619L2.5171 9.32619L17.4992 3.33251L14.7266 16.7Z" />
          </svg>
        </template>
      </BaseButton>


    </div>


    <section class="setup">
      <UserInfoCard/>
      <div class="row flex">
        <h3 class="setup_title">{{ $t('setup.title') }}</h3>
        <DefaultDropdown
            v-model="currentOS"
            :options="osOptions"
            placeholder="Выберите платформу"
        />
      </div>
      <AppSwitcher @update="handleUpdate"/>
      <TransitionGroup
          name="list"
          tag="div"
          class="setup_list"
      >
        <SetupStepCard
            v-for="(el, index) in currentData"
            :key="index"
            :title="rt(el.title)"
            :text="rt(el.text)"
            :index
        >
          <BaseButton v-if="index === 0" :href="downloadUrl" target="_blank" class="secondary rounded-3xl shadow-custom-primary text-primary">
            <template #icon>
              <svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg" class="primary_color_svg">
                <path d="M15 9.01669C14.779 9.01669 14.567 9.10448 14.4108 9.26076C14.2545 9.41704 14.1667 9.62901 14.1667 9.85002V15.8334C14.1667 16.0544 14.0789 16.2663 13.9226 16.4226C13.7663 16.5789 13.5544 16.6667 13.3334 16.6667H4.16669C3.94567 16.6667 3.73371 16.5789 3.57743 16.4226C3.42115 16.2663 3.33335 16.0544 3.33335 15.8334V6.66669C3.33335 6.44567 3.42115 6.23371 3.57743 6.07743C3.73371 5.92115 3.94567 5.83335 4.16669 5.83335H10.15C10.371 5.83335 10.583 5.74556 10.7393 5.58928C10.8956 5.433 10.9834 5.22103 10.9834 5.00002C10.9834 4.77901 10.8956 4.56705 10.7393 4.41076C10.583 4.25448 10.371 4.16669 10.15 4.16669H4.16669C3.50365 4.16669 2.86776 4.43008 2.39892 4.89892C1.93008 5.36776 1.66669 6.00365 1.66669 6.66669V15.8334C1.66669 16.4964 1.93008 17.1323 2.39892 17.6011C2.86776 18.07 3.50365 18.3334 4.16669 18.3334H13.3334C13.9964 18.3334 14.6323 18.07 15.1011 17.6011C15.57 17.1323 15.8334 16.4964 15.8334 15.8334V9.85002C15.8334 9.62901 15.7456 9.41704 15.5893 9.26076C15.433 9.10448 15.221 9.01669 15 9.01669ZM18.2667 2.18335C18.1821 1.97973 18.0203 1.81792 17.8167 1.73335C17.7165 1.69065 17.6089 1.668 17.5 1.66669H12.5C12.279 1.66669 12.067 1.75448 11.9108 1.91076C11.7545 2.06704 11.6667 2.27901 11.6667 2.50002C11.6667 2.72103 11.7545 2.933 11.9108 3.08928C12.067 3.24556 12.279 3.33335 12.5 3.33335H15.4917L6.90835 11.9084C6.83025 11.9858 6.76825 12.078 6.72594 12.1795C6.68364 12.2811 6.66185 12.39 6.66185 12.5C6.66185 12.61 6.68364 12.719 6.72594 12.8205C6.76825 12.9221 6.83025 13.0142 6.90835 13.0917C6.98582 13.1698 7.07799 13.2318 7.17954 13.2741C7.28109 13.3164 7.39001 13.3382 7.50002 13.3382C7.61003 13.3382 7.71895 13.3164 7.8205 13.2741C7.92205 13.2318 8.01422 13.1698 8.09169 13.0917L16.6667 4.50835V7.50002C16.6667 7.72103 16.7545 7.933 16.9108 8.08928C17.067 8.24556 17.279 8.33335 17.5 8.33335C17.721 8.33335 17.933 8.24556 18.0893 8.08928C18.2456 7.933 18.3334 7.72103 18.3334 7.50002V2.50002C18.332 2.39112 18.3094 2.28354 18.2667 2.18335V2.18335Z"/>
              </svg>
            </template>
            {{formattedOS}}
          </BaseButton>

          <BaseButton
              v-if="index === 1"
              :href="deepLink"
              class="primary rounded-3xl"
              target="_blank"
          >
            {{ $t('setup.add_subscription') }}
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
  flex-grow: 1;
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

</style>