<template>
  <div>
    <div class="section-title">Year-by-Year Projection for {{ result.label }}</div>
    <ProjectionTable :projs="result.projs" :holdingYears="inputs.holdingYears" :isIO="inputs.isIO" />

    <el-divider />

    <div class="section-title">Capital Gains Tax at Sale</div>
    <CGTTable
      :cgt="result.cgt"
      :price="result.price"
      :sellingCostsPct="inputs.sellingCostsPct"
      :salePrice="result.projs[result.projs.length - 1].propertyValue"
    />

    <el-divider />

    <div class="two-col">
      <div>
        <div class="section-title">Equity Growth</div>
        <EquityChart :projs="result.projs" :height="260" />
      </div>
      <div>
        <div class="section-title">Wealth Composition</div>
        <WealthStackedChart :projs="result.projs" :height="260" />
      </div>
    </div>
  </div>
</template>
<script setup>

import ProjectionTable from '../components/outputs/ProjectionTable.vue'
import CGTTable from '../components/outputs/CGTTable.vue'
import EquityChart from '../components/charts/EquityChart.vue'
import WealthStackedChart from '../components/charts/WealthStackedChart.vue'

defineProps(['result', 'inputs'])
</script>
<style scoped>
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

@media (max-width: 768px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
