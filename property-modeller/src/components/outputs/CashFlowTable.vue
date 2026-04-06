<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="item" label="Item" />
    <el-table-column prop="weekly" label="Per Week" />
    <el-table-column prop="monthly" label="Per Month" />
    <el-table-column prop="yearly" label="Per Year" />
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

function makeRow(item, weekly, cls, isNet = false, isSurplus = false) {
  const w = weekly
  const m = w * 52 / 12
  const y = w * 52
  return { item, weekly: fDollar(w), monthly: fDollar(m), yearly: fDollar(y), cls, isNet, isSurplus }
}

const rows = computed(() => {
  const r = props.result
  const list = []
  list.push(makeRow('Net Income (A+B)', r.weeklyNetIncome, 'text-green'))
  if (r.type === 'B') {
    list.push(makeRow('Rent Received (net)', r.weeklyRentReceived - r.weeklyMgmtFee, 'text-green'))
    list.push(makeRow('Tax Refund (weekly)', r.weeklyTaxSaving, 'text-green'))
    list.push(makeRow('Rent Paying (CBD)', -r.weeklyRentPaid, 'text-red'))
  }
  if (r.type === 'C') {
    list.push(makeRow('Rent Received (net)', r.weeklyRentReceived * (1 - props.inputs.mgmtPct/100), 'text-green'))
    list.push(makeRow('Tax Refund (weekly)', r.weeklyTaxSaving, 'text-green'))
    list.push(makeRow('Rent Paying (CBD)', -r.weeklyRentPaid, 'text-red'))
  }
  const mort = r.weeklyMortgage || r.weeklyMortgageINV || r.weeklyMortgageOO || 0
  list.push(makeRow('Mortgage', -mort, 'text-red'))
  const weeklyCouncil = r.weeklyCouncil ?? props.inputs.annualCouncil / 52
  const weeklyInsurance = r.weeklyInsurance ?? props.inputs.annualInsurance / 52
  const weeklyMaintenance = r.weeklyMaintenance ?? (props.inputs.price * props.inputs.maintPct / 100 / 52)
  const weeklyBodyCorp = r.weeklyBodyCorp ?? props.inputs.bodyCorpAnnual / 52
  list.push(makeRow('Council Rates', -weeklyCouncil, 'text-red'))
  list.push(makeRow('Insurance', -weeklyInsurance, 'text-red'))
  list.push(makeRow('Maintenance', -weeklyMaintenance, 'text-red'))
  if (props.inputs.bodyCorpAnnual > 0) list.push(makeRow('Body Corp', -weeklyBodyCorp, 'text-red'))
  if (r.type === 'A') list.push(makeRow('Lifestyle Inflation', -150, 'text-red'))
  if (r.type === 'C') list.push(makeRow('Commute Extra', -(r.weeklyCommuteExtra || 0), 'text-red'))
  list.push(makeRow('Living Expenses', -r.weeklyLiving, 'text-red'))
  list.push(makeRow('Net Weekly Surplus', r.weeklySurplus, r.weeklySurplus >= 0 ? 'text-green' : 'text-red', true, true))
  return list
})

function getRowClass({ row }) {
  if (row.isSurplus) return row.cls === 'text-green' ? 'row-navy' : 'row-red'
  return ''
}
</script>
