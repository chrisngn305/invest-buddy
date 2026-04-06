<template>
  <div>
    <AlertBanner v-if="result.type === 'C'"
      type="blue"
      title="Two-Phase Strategy"
      :message="'<strong>Phase 1 (live in):</strong> Weekly surplus ' + fDollar(result.ph1Surplus) + '/pw — OO rate, commute extra, no CBD rent.<br><strong>Phase 2 (rent out):</strong> Weekly surplus ' + fDollar(result.ph2Surplus) + '/pw — INV rate, back in CBD, rental income offset.'"
    />

    <AlertBanner v-if="result.weeklySurplus < 0"
      type="red"
      title="Weekly Deficit"
      :message="'This scenario creates a weekly deficit of ' + fDollar(Math.abs(result.weeklySurplus)) + ' — review your inputs.'"
    />

    <div class="section-title">Weekly Cash Flow — {{ result.label }}</div>
    <CashFlowTable :result="result" :inputs="inputs" />

    <template v-if="result.type === 'B' || result.type === 'C'">
      <el-divider />
      <div class="section-title">Annual Investment P&amp;L — Year 1</div>
      <PnLTable :result="result" :inputs="inputs" />
    </template>

    <el-divider />
    <div class="section-title">Cash Flow Waterfall</div>
    <WaterfallChart :items="waterfallItems" :height="320" />
  </div>
</template>
<script setup>
import { computed } from 'vue'

import AlertBanner from '../components/outputs/AlertBanner.vue'
import CashFlowTable from '../components/outputs/CashFlowTable.vue'
import PnLTable from '../components/outputs/PnLTable.vue'
import WaterfallChart from '../components/charts/WaterfallChart.vue'
import { fDollar } from '../utils/format.js'

const props = defineProps(['result', 'inputs'])

const waterfallItems = computed(() => {
  const r = props.result
  const items = [
    { label: 'Net Income', value: r.weeklyNetIncome }
  ]
  if (r.type === 'B' || r.type === 'C') {
    items.push({ label: 'Rent Received', value: r.weeklyRentReceived || 0 })
    items.push({ label: 'Tax Refund', value: r.weeklyTaxSaving || 0 })
    items.push({ label: 'Rent Paying', value: -(r.weeklyRentPaid || 0) })
  }
  const mort = r.weeklyMortgage || r.weeklyMortgageOO || 0
  items.push({ label: 'Mortgage', value: -mort })
  items.push({ label: 'Owner Costs', value: -((r.weeklyCouncil || 0) + (r.weeklyInsurance || 0) + (r.weeklyMaintenance || 0) + (r.weeklyBodyCorp || 0)) })
  items.push({ label: 'Living', value: -r.weeklyLiving })
  items.push({ label: 'Net Surplus', value: r.weeklySurplus })
  return items
})
</script>
<style scoped>
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
</style>
