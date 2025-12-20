<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'
const { notify } = useNotifications()

import BaseButton from "~/components/UI/BaseButton.vue";
import SetupStepCard from "~/components/UI/SetupStepCard.vue";
import UserInfoCard from "~/components/UI/UserInfoCard.vue";
import DefaultDropdown , { type DropdownOption } from "~/components/UI/DefaultDropdown.vue";
import AppSwitcher from "~/components/UI/AppSwitcher.vue";
import QrModal from "~/components/UI/QrModal.vue";

const currentOS = ref<DropdownOption | null>(null)
const currentData = ref<any>(null)

const handleUpdate = (data: any) => {
  currentData.value = data
  console.log('Новые данные загружены:', data)
}

const copyLink = async () => {
  try {
    const textToCopy =  window.location.href

    await navigator.clipboard.writeText(textToCopy)

    notify('Ссылка скопирована', '',2000)


  } catch (err) {
    notify('Ничего не произошло после нажатия кнопки?', 'Добавьте подписку вручную: получите ссылку в правом верхнем углу, скопируйте её и вставьте в приложении.  Если появится запрос — вставьте ссылку или нажмите «Из буфера» в левом нижнем углу.',5000)

    console.error('Не удалось скопировать: ', err)
  }
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
      <BaseButton  @click="copyLink" class="contex rounded rounded-full shadow-custom-light text-primary" >
        <template #icon>
          <img src="@/assets/icons/link.svg" alt="link" />
        </template>
      </BaseButton>

      <BaseButton  class="contex !border-primary-alpha rounded rounded-full shadow-custom-primary text-primary">
        <template #icon>
          <img src="@/assets/icons/telegram.svg" alt="telegram" />
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
          <BaseButton v-if="index === 0" class="secondary rounded-3xl shadow-custom-primary text-primary">
            <template #icon>
              <img src="@/assets/icons/external-link.svg" alt="external-link" />
            </template>
            Windows
          </BaseButton>

          <BaseButton
              v-if="index === 1"
              class="primary rounded-3xl"
              @click="openModal"
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

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
  z-index: -1;
}
</style>