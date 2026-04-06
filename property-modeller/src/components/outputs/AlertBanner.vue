<template>
  <el-alert :type="typeMap[type]" :title="title" :closable="false" class="alert-banner" show-icon>
    <div v-html="message"></div>
  </el-alert>
</template>

<script setup>
defineProps({ type: { type: String, default: 'blue' }, title: String, message: String })
const typeMap = { green: 'success', amber: 'warning', red: 'error', blue: 'info' }
</script>

<style scoped>
.alert-banner { margin-bottom: 14px; }
</style>
