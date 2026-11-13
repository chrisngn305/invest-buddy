<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="metric" label="Metric" />
    <el-table-column prop="weight" label="Weight" />
    <el-table-column prop="scoreA" label="A: PPOR">
      <template #default="scope"><span v-html="renderCell(scope.row.rawA, scope.row.isTotal, scope.row.winnerCol === 'A')"></span></template>
    </el-table-column>
    <el-table-column prop="scoreB" label="B: Rentvest">
      <template #default="scope"><span v-html="renderCell(scope.row.rawB, scope.row.isTotal, scope.row.winnerCol === 'B')"></span></template>
    </el-table-column>
    <el-table-column prop="scoreC" label="C: Hybrid">
      <template #default="scope"><span v-html="renderCell(scope.row.rawC, scope.row.isTotal, scope.row.winnerCol === 'C')"></span></template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['scoreA', 'scoreB', 'scoreC', 'weights', 'ratings'])

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
  const w = props.weights || { cf: 2, wealth: 1, commute: 1, flex: 1, lifestyle: 1 }
  const r = props.ratings || { A: {}, B: {}, C: {} }

  const commuteA = r.A?.commute ?? a.commuteScore
  const commuteB = r.B?.commute ?? b.commuteScore
  const commuteC = r.C?.commute ?? c.commuteScore
  const flexA = r.A?.flex ?? a.flexScore
  const flexB = r.B?.flex ?? b.flexScore
  const flexC = r.C?.flex ?? c.flexScore
  const lifestyleA = r.A?.lifestyle ?? a.lifestyleScore
  const lifestyleB = r.B?.lifestyle ?? b.lifestyleScore
  const lifestyleC = r.C?.lifestyle ?? c.lifestyleScore

  const totalA = (a.cfScore || 0) * w.cf + (a.wealthScore || 0) * w.wealth + commuteA * w.commute + flexA * w.flex + lifestyleA * w.lifestyle
  const totalB = (b.cfScore || 0) * w.cf + (b.wealthScore || 0) * w.wealth + commuteB * w.commute + flexB * w.flex + lifestyleB * w.lifestyle
  const totalC = (c.cfScore || 0) * w.cf + (c.wealthScore || 0) * w.wealth + commuteC * w.commute + flexC * w.flex + lifestyleC * w.lifestyle
  const maxPossible = 5 * (w.cf + w.wealth + w.commute + w.flex + w.lifestyle)

  return [
    { metric: 'Cash Flow',     weight: `×${w.cf}`,        rawA: a.cfScore,    rawB: b.cfScore,    rawC: c.cfScore },
    { metric: 'Wealth Growth', weight: `×${w.wealth}`,    rawA: a.wealthScore, rawB: b.wealthScore, rawC: c.wealthScore },
    { metric: 'Commute',       weight: `×${w.commute}`,   rawA: commuteA,     rawB: commuteB,     rawC: commuteC },
    { metric: 'Flexibility',   weight: `×${w.flex}`,      rawA: flexA,        rawB: flexB,        rawC: flexC },
    { metric: 'Lifestyle',     weight: `×${w.lifestyle}`, rawA: lifestyleA,   rawB: lifestyleB,   rawC: lifestyleC },
    {
      metric: 'TOTAL', weight: `/${maxPossible}`, isTotal: true,
      rawA: totalA, rawB: totalB, rawC: totalC,
      winnerCol: totalA >= totalB && totalA >= totalC ? 'A' : totalB >= totalC ? 'B' : 'C'
    }
  ]
})

function getRowClass({ row }) { return row.isTotal ? 'row-score' : '' }
</script>
