<template>
  <div class="alert-banner" :class="'alert-' + type">
    <div class="alert-icon-wrap">
      <el-icon class="alert-icon"><component :is="iconMap[type]" /></el-icon>
    </div>
    <div class="alert-body">
      <span class="alert-title">{{ title }}</span>
      <span v-if="message" class="alert-message" v-html="message"></span>
    </div>
  </div>
</template>

<script setup>
import { SuccessFilled, WarningFilled, CircleCloseFilled, InfoFilled } from '@element-plus/icons-vue'

defineProps({ type: { type: String, default: 'blue' }, title: String, message: String })

const iconMap = {
  green: SuccessFilled,
  amber: WarningFilled,
  red:   CircleCloseFilled,
  blue:  InfoFilled
}
</script>

<style scoped>
.alert-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--el-border-radius-base);
  border-left-width: 3px;
  border-left-style: solid;
  border-top: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  margin-bottom: 14px;
}

/* Colour variants */
.alert-green {
  background: var(--green-bg);
  border-color: var(--green-bd);
  border-left-color: var(--green);
}
.alert-red {
  background: var(--red-bg);
  border-color: var(--red-bd);
  border-left-color: var(--red);
}
.alert-amber {
  background: var(--amber-bg);
  border-color: var(--amber-bd);
  border-left-color: var(--amber);
}
.alert-blue {
  background: var(--blue-bg);
  border-color: var(--blue-bd);
  border-left-color: var(--blue);
}

/* Icon */
.alert-icon-wrap {
  display: flex;
  align-items: center;
  padding-top: 1px;
  flex-shrink: 0;
}

.alert-icon { font-size: 16px; }

.alert-green .alert-icon { color: var(--green); }
.alert-red   .alert-icon { color: var(--red); }
.alert-amber .alert-icon { color: var(--amber); }
.alert-blue  .alert-icon { color: var(--blue); }

/* Text */
.alert-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.alert-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
}

.alert-green .alert-title { color: var(--green); }
.alert-red   .alert-title { color: var(--red); }
.alert-amber .alert-title { color: var(--amber); }
.alert-blue  .alert-title { color: var(--blue); }

.alert-message {
  font-size: 13px;
  color: var(--text);
  line-height: 1.6;
}
</style>
