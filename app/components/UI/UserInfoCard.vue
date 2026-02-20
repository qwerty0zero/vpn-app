<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { accountMock } from '@/data/account-mock'

import ClockIcon from '@/assets/icons/clock.svg'
import UserIcon from '@/assets/icons/user.svg'
import UserCheckIcon from '@/assets/icons/user-check.svg'
import ExchangeIcon from '@/assets/icons/exchange.svg'

const { t } = useI18n()

const isOpen = ref(false)



const toggle = () => {
    isOpen.value = !isOpen.value

}
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null
  return new Date(dateStr)
}

const statusInfo = computed(() => {
  if (!accountMock.status) {
    return { text: t('user_info.subscription_off'), isWarning: true }
  }

  const targetDate = parseDate(accountMock.expireDate)
  if (!targetDate) return { text: t('user_info.no_date'), class: '', isWarning: false }

  const now = new Date()
  now.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      text: t('user_info.expired_days_ago', { n: Math.abs(diffDays) }),
      isWarning: true
    }
  }
  else if (diffDays === 0) {
    return {
      text: t('user_info.expires_today'),
      isWarning: true
    }
  }
  else if (diffDays === 1) {
    return {
      text: t('user_info.expires_tomorrow'),
      isWarning: true
    }
  }
  else if (diffDays <= 3) {
    return {
      text: t('user_info.expires_in_days', { n: diffDays }),
      isWarning: true
    }
  }
  else {
    return {
      text: t('user_info.active'),
      isWarning: false
    }
  }
})

const contentItems = computed(() => [
  {
    label: t('user_info.labels.username'),
    value: accountMock.userName ? accountMock.userName : '--/--',
    img: UserIcon
  },
  {
    label: t('user_info.labels.status'),
    value: accountMock.status
        ? t('user_info.status_values.active')
        : t('user_info.status_values.inactive'),
    img: UserCheckIcon
  },
  {
    label: t('user_info.labels.expires'),
    value: accountMock.expireDate ? accountMock.expireDate : '--/--',
    img: ClockIcon
  },
  {
    label: t('user_info.labels.traffic'),
    value: `${accountMock.usedTraffic} / ${accountMock.totalTraffic} GB`,
    img: ExchangeIcon
  }
])

</script>

<template>
  <div class="status-card bg-bg_gray shadow-custom-light" @click="toggle">
    <h3 class="title">{{ accountMock.userName || '--/--' }}</h3>

    <span class="flex gap-3 items-center">
      <p class="subtitle" :class="{warn: statusInfo.isWarning}" >
        {{ statusInfo.text }}
      </p>
      <img
          v-if="statusInfo.isWarning"
          src="@/assets/icons/info-circle.svg"
          alt="info"
          role="img"
      >
    </span>

    <div :class="{ 'is-open': isOpen }" class="collapsible-wrapper">
      <div class="collapsible-content">
        <hr class="separator">
        <div class="content">
          <div v-for="(item, index) in contentItems" :key="index" class="row">
            <span class="icon">
              <img :alt="item.label" :src="item.img" role="img">
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
  font-size: var(--font-size-heading-lg);
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: var(--font-size-text);
  font-weight: 500;
  color: var(--color-green);
}
.subtitle.warn{
  color: var(--color-red);
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
  font-size: var(--font-size-heading);

  font-weight: 600;
}

.value {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--font-size-heading);

}
</style>