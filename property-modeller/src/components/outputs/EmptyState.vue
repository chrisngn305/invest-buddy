<template>
  <div class="empty-wrap">
    <el-card class="empty-card">
      <div class="empty-content">
        <el-icon class="empty-icon"><House /></el-icon>
        <h2 class="empty-title">Your Property Investment Model</h2>
        <p class="empty-sub">Configure your finances and property details in the sidebar, then run the model to see a full analysis across three scenarios.</p>
        <el-button class="calc-btn" @click="$emit('calculate')">Calculate Now</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
defineEmits(['calculate'])
</script>

<style scoped>
.empty-wrap { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
.empty-card { max-width: 440px; width: 100%; }
.empty-content { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; padding: 32px; }
.empty-icon { font-size: 48px; color: var(--muted); opacity: 0.4; }
.empty-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; color: var(--navy); }
.empty-sub { color: var(--muted); max-width: 340px; line-height: 1.6; }
.calc-btn {
  background: var(--navy) !important;
  border-color: var(--navy) !important;
  color: white !important;
  font-weight: 600 !important;
}
</style>
