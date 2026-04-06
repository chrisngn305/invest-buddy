<template>
  <div>
    <div class="section-title">3-Way Comparison</div>
    <ComparisonCards :resultA="resultA" :resultB="resultB" :resultC="resultC" :winner="winner" />

    <el-divider />

    <div class="section-title">Weighted Scoring</div>
    <ScoreTable
      :scoreA="resultA.weightedScore"
      :scoreB="resultB.weightedScore"
      :scoreC="resultC.weightedScore"
    />

    <el-divider />

    <div class="section-title">Sensitivity Analysis — Total Wealth at Year {{ inputs.holdingYears }}</div>
    <SensitivityTable :inputs="inputs" :resultA="resultA" :resultB="resultB" :resultC="resultC" />

    <el-divider />

    <div class="section-title">Total Wealth Trajectory — All Scenarios</div>
    <TrajectoryChart :projsA="resultA.projs" :projsB="resultB.projs" :projsC="resultC.projs" :height="300" />
  </div>
</template>
<script setup>

import ComparisonCards from '../components/outputs/ComparisonCards.vue'
import ScoreTable from '../components/outputs/ScoreTable.vue'
import SensitivityTable from '../components/outputs/SensitivityTable.vue'
import TrajectoryChart from '../components/charts/TrajectoryChart.vue'

defineProps(['resultA', 'resultB', 'resultC', 'inputs', 'winner'])
</script>
<style scoped>
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
</style>
