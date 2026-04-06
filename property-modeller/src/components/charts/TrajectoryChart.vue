<template>
  <div>
    <div class="legend">
      <span><span class="dot" style="background:#1e40af"></span> A — PPOR</span>
      <span><span class="dot" style="background:#15803d"></span> B — Rentvest</span>
      <span><span class="dot" style="background:#92400e"></span> C — Hybrid</span>
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
  projsA: { type: Array, default: () => [] },
  projsB: { type: Array, default: () => [] },
  projsC: { type: Array, default: () => [] },
  height: { type: Number, default: 300 }
})

const fmtY = v => '$' + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? Math.round(v/1000)+'k' : v)

const chartData = computed(() => ({
  labels: props.projsA.map(p => 'Yr ' + p.year),
  datasets: [
    { label: 'A — PPOR', data: props.projsA.map(p => p.totalWealth), borderColor: '#1e40af', backgroundColor: 'rgba(30,64,175,0.07)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
    { label: 'B — Rentvest', data: props.projsB.map(p => p.totalWealth), borderColor: '#15803d', backgroundColor: 'rgba(21,128,61,0.07)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
    { label: 'C — Hybrid', data: props.projsC.map(p => p.totalWealth), borderColor: '#92400e', backgroundColor: 'rgba(146,64,14,0.07)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 }
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
