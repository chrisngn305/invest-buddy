<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="metric" label="Metric" />
    <el-table-column prop="weight" label="Weight" />
    <el-table-column prop="scoreA" label="A — PPOR">
      <template #default="scope"><span v-html="renderCell(scope.row.rawA, scope.row.isTotal, scope.row.winnerCol === 'A')"></span></template>
    </el-table-column>
    <el-table-column prop="scoreB" label="B — Rentvest">
      <template #default="scope"><span v-html="renderCell(scope.row.rawB, scope.row.isTotal, scope.row.winnerCol === 'B')"></span></template>
    </el-table-column>
    <el-table-column prop="scoreC" label="C — Hybrid">
      <template #default="scope"><span v-html="renderCell(scope.row.rawC, scope.row.isTotal, scope.row.winnerCol === 'C')"></span></template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['scoreA', 'scoreB', 'scoreC'])

function stars(n) {
  const filled = '★'.repeat(n)
  const empty = '☆'.repeat(5 - n)
  return `<span style="color:var(--gold)">${filled}</span><span style="color:var(--border)">${empty}</span>`
}

function renderCell(n, isTotal, bold) {
  if (isTotal) return fmtTotal(n, bold)
  return stars(n)
}

function fmtTotal(n, bold) {
  return `<span style="font-family:'JetBrains Mono';font-size:15px;${bold ? 'font-weight:700;color:var(--navy)' : ''}">${n}</span>`
}

const rows = computed(() => {
  const a = props.scoreA || {}
  const b = props.scoreB || {}
  const c = props.scoreC || {}
  const maxTotal = Math.max(a.total || 0, b.total || 0, c.total || 0)
  return [
    { metric: 'Cash Flow', weight: '×2', rawA: a.cfScore, rawB: b.cfScore, rawC: c.cfScore },
    { metric: '5-Year Wealth', weight: '×1', rawA: a.wealthScore, rawB: b.wealthScore, rawC: c.wealthScore },
    { metric: 'Commute', weight: '×1', rawA: a.commuteScore, rawB: b.commuteScore, rawC: c.commuteScore },
    { metric: 'Flexibility', weight: '×1', rawA: a.flexScore, rawB: b.flexScore, rawC: c.flexScore },
    { metric: 'Lifestyle', weight: '×1', rawA: a.lifestyleScore, rawB: b.lifestyleScore, rawC: c.lifestyleScore },
    {
      metric: 'TOTAL', weight: '/35', isTotal: true,
      rawA: a.total, rawB: b.total, rawC: c.total,
      winnerCol: a.total >= b.total && a.total >= c.total ? 'A' : b.total >= c.total ? 'B' : 'C'
    }
  ]
})

function getRowClass({ row }) { return row.isTotal ? 'row-score' : '' }
</script>
