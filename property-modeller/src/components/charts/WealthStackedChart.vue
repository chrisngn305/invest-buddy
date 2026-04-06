<template>
  <div>
    <div class="legend">
      <span><span class="dot" style="background:#1d4ed8"></span> Equity</span>
      <span><span class="dot" style="background:#15803d"></span> Cumulative Savings</span>
    </div>
    <div :style="{ position: 'relative', height: height + 'px' }">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  projs: { type: Array, default: () => [] },
  height: { type: Number, default: 260 }
})

const fmtY = v => '$' + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? Math.round(v/1000)+'k' : v)

const chartData = computed(() => ({
  labels: props.projs.map(p => 'Yr ' + p.year),
  datasets: [
    { label: 'Equity', data: props.projs.map(p => p.equity), backgroundColor: '#1d4ed8', stack: 'wealth' },
    { label: 'Cumulative Savings', data: props.projs.map(p => Math.max(0, p.cumulativeSavings)), backgroundColor: '#15803d', stack: 'wealth' }
  ]
}))

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': $' + Math.round(ctx.raw).toLocaleString() } } },
  scales: {
    x: { stacked: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585' } },
    y: { stacked: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585', callback: fmtY } }
  }
}
</script>
<style scoped>
.legend { display: flex; gap: 16px; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
</style>
