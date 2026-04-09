<template>
  <div class="comp-grid">
    <el-card v-for="r in results" :key="r.type" :class="['comp-card', { winner: r.type === winner }]">
      <template #header>
        <div class="comp-header" :class="'hdr-' + r.type">
          <span class="comp-label">{{ r.label }}</span>
          <el-tag v-if="r.type === winner" type="success" size="small">Top Score</el-tag>
        </div>
      </template>
      <div class="comp-rows">
        <div class="comp-row"><span>Weekly Surplus</span><span class="mono" :class="r.weeklySurplus >= 0 ? 'text-green' : 'text-red'">{{ fDollar(r.weeklySurplus) }}/pw</span></div>
        <div class="comp-row"><span>Cash Required</span><span class="mono">{{ fDollar(r.upfrontTotal) }}</span></div>
        <div class="comp-row"><span>Cash Buffer</span><span class="mono" :class="r.cashBuffer >= 0 ? 'text-green' : 'text-red'">{{ fDollar(r.cashBuffer) }}</span></div>
        <div class="comp-row"><span>Property (Yr {{ lastYear(r) }})</span><span class="mono text-green">{{ fDollar(lastProp(r)) }}</span></div>
        <div class="comp-row"><span>CGT Payable</span><span class="mono" :class="r.cgt.totalCGT === 0 ? 'text-green' : 'text-red'">{{ r.cgt.exempt ? '$0 EXEMPT' : fDollar(r.cgt.totalCGT) }}</span></div>
        <div class="comp-row"><span>Total Wealth</span><span class="mono text-blue" style="font-weight:700">{{ fDollar(lastWealth(r)) }}</span></div>
        <div class="comp-row score-row"><span>Score</span><span class="mono" style="font-weight:700">{{ r.weightedScore?.total ?? 0 }} / 35</span></div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { fDollar } from '../../utils/format.js'

const props = defineProps(['resultA', 'resultB', 'resultC', 'winner'])
const results = [props.resultA, props.resultB, props.resultC].filter(Boolean)

function lastProj(r) { return r.projs[r.projs.length - 1] }
function lastYear(r) { return lastProj(r).year }
function lastProp(r) { return lastProj(r).propertyValue }
function lastWealth(r) { return lastProj(r).totalWealth }
</script>

<style scoped>
.comp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

@media (max-width: 768px) {
  .comp-grid { grid-template-columns: 1fr; }
}
.comp-header {
  padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;
  border-radius: 4px 4px 0 0; margin: -20px -20px 0;
}
.hdr-A { background: #1e40af; }
.hdr-B { background: #15803d; }
.hdr-C { background: #92400e; }
.comp-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: white; }
.comp-rows { display: flex; flex-direction: column; gap: 8px; }
.comp-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 4px 0; border-bottom: 1px solid var(--border); }
.comp-row:last-child { border-bottom: none; }
.score-row { font-weight: 700; font-size: 14px; }
</style>
