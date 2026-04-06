<template>
  <div class="topbar">
    <div class="topbar-left">
      <div class="logo-badge">Brisbane Modeller</div>
      <div class="topbar-links">
        <span class="topbar-link">2026</span>
        <span class="topbar-link">RBA 4.10%</span>
      </div>
    </div>
    <div class="topbar-right">
      <el-button @click="$emit('calculate')" class="calc-btn">Calculate ▶</el-button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['calculate'])
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--topbar-height);
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}
.topbar-left { display: flex; align-items: center; gap: 24px; }
.logo-badge {
  background: var(--gold);
  color: var(--navy);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
  white-space: nowrap;
}
.topbar-links { display: flex; gap: 24px; }
.topbar-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.6);
  cursor: default;
}
.topbar-right { display: flex; align-items: center; gap: 12px; }
.calc-btn {
  background: var(--gold) !important;
  border-color: var(--gold) !important;
  color: var(--navy) !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  border-radius: 2px !important;
  padding: 6px 16px !important;
  height: auto !important;
}
.calc-btn:hover {
  background: #b8952f !important;
  border-color: #b8952f !important;
}
</style>
