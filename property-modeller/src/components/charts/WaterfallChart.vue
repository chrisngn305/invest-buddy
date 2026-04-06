<template>
  <div>
    <div class="legend">
      <span><span class="dot" style="background:#2563eb"></span> Inflows</span>
      <span><span class="dot" style="background:#9ca3af"></span> Outflows</span>
      <span><span class="dot" style="background:#15803d"></span> Net result</span>
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
  items: { type: Array, default: () => [] },
  height: { type: Number, default: 260 }
})

const fmtY = v => '$' + (Math.abs(v) >= 1000000 ? (Math.abs(v)/1000000).toFixed(1)+'M' : Math.abs(v) >= 1000 ? Math.round(Math.abs(v)/1000)+'k' : v)

const chartData = computed(() => ({
  labels: props.items.map(i => i.label),
  datasets: [{
    data: props.items.map(i => i.value),
    backgroundColor: props.items.map(i => {
      if (i.label === 'Net Surplus') return i.value >= 0 ? '#15803d' : '#dc2626'
      return i.value > 0 ? '#2563eb' : '#9ca3af'
    }),
    borderRadius: 4
  }]
}))

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': $' + Math.round(Math.abs(ctx.raw)).toLocaleString() } } },
  scales: {
    x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585', callback: fmtY } },
    y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#7c7585' } }
  }
}
</script>
<style scoped>
.legend { display: flex; gap: 16px; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
</style>
