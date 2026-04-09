<template>
  <div>
    <MetricCards
      :surplus="result.weeklySurplus"
      :upfrontTotal="result.upfrontTotal"
      :cashBuffer="result.cashBuffer"
      :totalWealth="result.projs[result.projs.length - 1].totalWealth"
      :holdingYears="inputs.holdingYears"
    />

    <AlertBanner v-if="result.cashBuffer < 0"
      type="red"
      title="Capital Shortfall"
      :message="fDollar(Math.abs(result.cashBuffer)) + ' additional capital required to proceed with this purchase.'"
    />

    <AlertBanner v-if="result.type === 'B'"
      type="red"
      title="Government Support Forfeited"
      :message="'By purchasing as an investor you forfeited <strong>' + fDollar(result.totalForfeited) + '</strong> in government support: FHOG ' + fDollar(result.fhogForfeited) + ', Stamp Duty Concession ' + fDollar(result.dutyForfeited) + ', LMI Saving ' + fDollar(result.lmiForfeited) + '.'"
    />

    <AlertBanner v-if="result.type === 'C' && result.cgtExempt"
      type="green"
      title="6-Year CGT Exemption Applies"
      :message="'You qualify for the main residence CGT exemption, saving an estimated <strong>' + fDollar(cgtSaved) + '</strong> in capital gains tax vs a direct investment purchase.'"
    />

    <el-alert v-if="result.depositNote" type="info" :closable="false" :title="result.depositNote" style="margin-bottom:14px" />

    <template v-if="result.type === 'B'">
      <div class="three-col" style="margin-top: 24px;">
        <SchemesPanel :result="result" />
        <UpfrontTable :result="result" :inputs="inputs" />
        <LoanTable :result="result" :inputs="inputs" />
      </div>
    </template>

    <template v-else>
      <div class="section-title">Government Schemes</div>
      <SchemesPanel :result="result" />
      <div class="two-col" style="margin-top: 24px;">
        <UpfrontTable :result="result" :inputs="inputs" />
        <LoanTable :result="result" :inputs="inputs" />
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import MetricCards from '../components/outputs/MetricCards.vue'
import AlertBanner from '../components/outputs/AlertBanner.vue'
import SchemesPanel from '../components/outputs/SchemesPanel.vue'
import UpfrontTable from '../components/outputs/UpfrontTable.vue'
import LoanTable from '../components/outputs/LoanTable.vue'
import { fDollar } from '../utils/format.js'
import { calcCGT } from '../engine/cgt.js'

const props = defineProps(['result', 'inputs'])

const cgtSaved = computed(() => {
  if (props.result.type !== 'C') return 0
  const lastProj = props.result.projs[props.result.projs.length - 1]
  const hypothetical = calcCGT({
    salePrice: lastProj.propertyValue,
    purchasePrice: props.inputs.price,
    sellingCostsPct: props.inputs.sellingCostsPct,
    incomeA: props.inputs.incomeA,
    incomeB: props.inputs.incomeB,
    isPPOR: false,
    cgtExempt: false
  })
  return hypothetical.totalCGT
})
</script>
<style scoped>
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.two-col   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }
.three-col { display: grid; grid-template-columns: 0.65fr 1fr 1fr; gap: 20px; align-items: stretch; }

@media (max-width: 768px) {
  .two-col, .three-col { grid-template-columns: 1fr; }
}
</style>
