<template>
  <div class="metric-grid">
    <el-card>
      <div class="metric">
        <span class="mlabel">Weekly Surplus</span>
        <span class="mvalue mono" :class="surplusClass">{{ fDollar(surplus) }}/pw</span>
        <span class="msub">after all costs</span>
      </div>
    </el-card>
    <el-card>
      <div class="metric">
        <span class="mlabel">Cash Required</span>
        <span class="mvalue mono">{{ fDollar(upfrontTotal) }}</span>
        <span class="msub">upfront total</span>
      </div>
    </el-card>
    <el-card :style="cashBuffer < 0 ? 'border-color: var(--red-bd) !important; border-left: 3px solid var(--red) !important;' : 'border-left: 3px solid var(--green) !important;'">
      <div class="metric">
        <span class="mlabel">Cash Buffer</span>
        <span class="mvalue mono" :class="cashBuffer >= 0 ? 'text-green' : 'text-red'">{{ fDollar(cashBuffer) }}</span>
        <span class="msub">{{ cashBuffer < 0 ? 'shortfall — needs funding' : 'remaining after costs' }}</span>
      </div>
    </el-card>
    <el-card>
      <div class="metric">
        <span class="mlabel">Total Wealth (Yr {{ holdingYears }})</span>
        <span class="mvalue mono text-blue">{{ fDollar(totalWealth, true) }}</span>
        <span class="msub">equity + savings</span>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar } from '../../utils/format.js'
const props = defineProps(['surplus', 'upfrontTotal', 'cashBuffer', 'totalWealth', 'holdingYears'])
const surplusClass = computed(() => {
  if (props.surplus > 500) return 'text-green'
  if (props.surplus >= 150) return 'text-amber'
  return 'text-red'
})
</script>

<style scoped>
.metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
.metric { display: flex; flex-direction: column; gap: 4px; }
.mlabel { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--muted); letter-spacing: 0.6px; }
.mvalue { font-size: 22px; font-weight: 500; color: var(--navy); line-height: 1.2; }
.msub { font-size: 11px; color: var(--muted); }
</style>
