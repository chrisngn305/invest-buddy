<template>
  <div class="topbar">
    <div class="topbar-left">
      <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <span></span><span></span><span></span>
      </button>
      <div class="logo-badge">Brisbane Modeller</div>
      <div class="topbar-links">
        <span class="topbar-link">2026</span>
        <span class="topbar-link" :title="`RBA cash rate target, ${inputs.rbaRates.cashRateAsOf}`">RBA {{ inputs.rbaRates.cashRate.toFixed(2) }}%</span>
      </div>
    </div>
    <div class="topbar-right">
      <el-button @click="$emit('calculate')" class="calc-btn">Calculate ▶</el-button>
    </div>
  </div>
</template>

<script setup>
import { useInputsStore } from '../../stores/inputs.js'

const inputs = useInputsStore()
defineEmits(['calculate', 'toggle-sidebar'])
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

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-right: 4px;
}
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: rgba(255,255,255,0.85);
  border-radius: 2px;
  transition: background 0.15s;
}
.hamburger:hover span { background: white; }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .topbar-links { display: none; }
  .logo-badge { font-size: 11px; }
}
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
