<template>
  <div>
    <div class="legend">
      <span><span class="dot" style="background:#15803d"></span> Property Value</span>
      <span><span class="dot" style="background:#dc2626"></span> Loan Balance</span>
      <span><span class="dot" style="background:#c9a84c"></span> Equity</span>
    </div>
    <div :style="{ position: 'relative', height: height + 'px' }">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps({
  projs: { type: Array, default: () => [] },
  height: { type: Number, default: 260 }
})

const fmtY = v => '$' + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? Math.round(v/1000)+'k' : v)
const labels = computed(() => props.projs.map(p => 'Yr ' + p.year))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Property Value', data: props.projs.map(p => p.propertyValue), borderColor: '#15803d', backgroundColor: 'rgba(21,128,61,0.08)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
    { label: 'Loan Balance', data: props.projs.map(p => p.loanBalance), borderColor: '#dc2626', backgroundColor: 'rgba(220,38,38,0.06)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
    { label: 'Equity', data: props.projs.map(p => p.equity), borderColor: '#c9a84c', borderDash: [4,3], fill: false, tension: 0.4, borderWidth: 2, pointRadius: 3 }
  ]
}))

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': $' + Math.round(ctx.raw).toLocaleString() } } },
  scales: {
    x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585' } },
    y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585', callback: fmtY } }
  }
}
</script>
<style scoped>
.legend { display: flex; gap: 16px; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
</style>
