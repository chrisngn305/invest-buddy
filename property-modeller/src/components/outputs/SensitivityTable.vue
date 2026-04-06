<template>
  <el-table :data="rows" size="small">
    <el-table-column prop="scenario" label="Growth Scenario" />
    <el-table-column prop="wealthA" label="A — PPOR">
      <template #default="scope"><span class="mono">{{ scope.row.wealthA }}</span></template>
    </el-table-column>
    <el-table-column prop="wealthB" label="B — Rentvest (after CGT)">
      <template #default="scope"><span class="mono">{{ scope.row.wealthB }}</span></template>
    </el-table-column>
    <el-table-column prop="wealthC" label="C — Hybrid (after CGT)">
      <template #default="scope"><span class="mono">{{ scope.row.wealthC }}</span></template>
    </el-table-column>
    <el-table-column prop="gap" label="B vs A Gap">
      <template #default="scope">
        <span class="mono" :class="scope.row.gapPos ? 'text-green' : 'text-red'">{{ scope.row.gap }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { calcAll } from '../../engine/scenarios.js'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['inputs', 'resultA', 'resultB', 'resultC'])

function runScenario(growthOverride) {
  const modified = { ...props.inputs, ...growthOverride }
  return calcAll(modified)
}

function getWealth(r) { return r.projs[r.projs.length - 1].totalWealth }
function getWealthAfterCGT(r) { return getWealth(r) - r.cgt.totalCGT }

const rows = computed(() => {
  const configs = [
    { label: 'Bear (4% / 3%)', override: { growthY1: 4, growthY3: 3 } },
    { label: 'Base (' + props.inputs.growthY1 + '% / ' + props.inputs.growthY3 + '%)', override: {} },
    { label: 'Bull (10% / 9%)', override: { growthY1: 10, growthY3: 9 } }
  ]
  return configs.map(cfg => {
    const { A, B, C } = runScenario(cfg.override)
    const wA = getWealth(A)
    const wB = getWealthAfterCGT(B)
    const wC = getWealthAfterCGT(C)
    const gap = wB - wA
    return {
      scenario: cfg.label,
      wealthA: fDollar(wA),
      wealthB: fDollar(wB),
      wealthC: fDollar(wC),
      gap: fDollar(gap),
      gapPos: gap >= 0
    }
  })
})
</script>
