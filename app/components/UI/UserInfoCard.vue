<script lang="ts" setup>
import { ref, computed } from 'vue'
import { accountMock } from '@/data/account-mock'

import ClockIcon from '@/assets/icons/clock.svg'
import UserIcon from '@/assets/icons/user.svg'
import UserCheckIcon from '@/assets/icons/user-check.svg'
import ExchangeIcon from '@/assets/icons/exchange.svg'

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  const [day, month, year] = dateStr.split('.').map(Number)
  return new Date(year, month - 1, day)
}

const statusInfo = computed(() => {
  if (!accountMock.status) {
    return { text: 'Подписка отключена', class: 'text-red', isWarning: true }
  }

  const targetDate = parseDate(accountMock.expireDate)
  if (!targetDate) return { text: 'Нет даты', class: '', isWarning: false }

  const now = new Date()
  now.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      text: `Истекла ${Math.abs(diffDays)} дн. назад`,
      class: 'text-red',
      isWarning: true
    }
  }
  else if (diffDays === 0) {
    return {
      text: 'Истекает сегодня',
      class: 'text-red',
      isWarning: true
    }
  }
  else if (diffDays === 1) {
    return {
      text: 'Истекает завтра',
      class: 'text-red',
      isWarning: true
    }
  }
  else if (diffDays <= 3) {
    return {
      text: `Истекает через ${diffDays} дня`,
      class: 'text-red',
      isWarning: true
    }
  }
  else {
    return {
      text: 'Активна',
      class: 'text-green',
      isWarning: false
    }
  }
})

const contentItems = computed(() => [
  {
    label: 'Имя пользователя',
    value: accountMock.userName,
    img: UserIcon
  },
  {
    label: 'Статус',
    value: accountMock.status ? 'Активен' : 'Неактивен',
    img: UserCheckIcon
  },
  {
    label: 'Истекает',
    value: accountMock.expireDate,
    img: ClockIcon
  },
  {
    label: 'Трафик',
    value: `${accountMock.usedTraffic} / ${accountMock.totalTraffic} GB`,
    img: ExchangeIcon
  }
])
</script>

<template>
  <div class="status-card bg-bg_gray shadow-custom-light" @click="toggle">
    <h3 class="title">{{ accountMock.userName }}</h3>

    <span class="flex gap-3 items-center">
      <p class="subtitle" :class="statusInfo.class">
        {{ statusInfo.text }}
      </p>
      <img
          v-if="statusInfo.isWarning"
          src="@/assets/icons/info-circle.svg"
          alt="инфо"
          role="icon"
      >
    </span>

    <div :class="{ 'is-open': isOpen }" class="collapsible-wrapper">
      <div class="collapsible-content">
        <hr class="separator">
        <div class="content">
          <div v-for="(item, index) in contentItems" :key="index" class="row">
            <span class="icon">
              <img :alt="item.label" :src="item.img" role="icon">
            </span>
            <div class="text-content">
              <span class="label">{{ item.label }}:</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-card {
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.text-red {
  color: #FF4D4D;
}
.text-green {
  color: #4CAF50;
}

.collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.collapsible-wrapper.is-open {
  grid-template-rows: 1fr;
}

.collapsible-content {
  min-height: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 1.6rem;
}

.separator {
  margin-top: 1.6rem;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 1.3rem;
  font-weight: 500;
}

.items-center {
  align-items: center;
}

.icon {
  width: 3.6rem;
  height: 3.6rem;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.7rem;
  font-weight: 600;
}

.value {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.7rem;
}
</style>