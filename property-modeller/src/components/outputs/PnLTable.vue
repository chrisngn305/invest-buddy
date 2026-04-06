<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="item" label="Item" />
    <el-table-column prop="annual" label="Annual" />
    <el-table-column prop="weekly" label="Weekly" />
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

function row(item, annual, cls, isTotal = false) {
  return { item, annual: fDollar(annual), weekly: fDollar(annual / 52), cls, isTotal }
}

const rows = computed(() => {
  const r = props.result
  const interest = r.interestYear1 || r.interestYear2 || 0
  return [
    row('Gross Rent', r.grossRentAnnual, 'text-green'),
    row('Mortgage Interest', -interest, 'text-red'),
    row('Management Fee', -r.mgmtFeeAnnual, 'text-red'),
    row('Maintenance', -(r.maintenanceAnnual || 0), 'text-red'),
    row('Council Rates', -props.inputs.annualCouncil, 'text-red'),
    row('Insurance', -props.inputs.annualInsurance, 'text-red'),
    ...(props.inputs.bodyCorpAnnual > 0 ? [row('Body Corp', -props.inputs.bodyCorpAnnual, 'text-red')] : []),
    row('Depreciation', -r.depreciationAnnual, 'text-red'),
    row('Net Rental Result', r.netRentalResult, r.netRentalResult >= 0 ? 'text-green' : 'text-red bold', false),
    row('Tax Refund (neg. gearing)', r.taxRefundAnnual, 'text-green'),
    row('Effective After-Tax Cost', -(r.effectiveAfterTaxCost ?? 0), 'text-amber bold', true)
  ]
})

function getRowClass({ row }) {
  return row.isTotal ? 'row-amber' : ''
}
</script>
