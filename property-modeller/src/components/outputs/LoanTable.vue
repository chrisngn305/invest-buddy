<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="detail" label="Detail" />
    <el-table-column prop="value" label="Value" />
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar, fPct } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

const rows = computed(() => {
  const r = props.result
  const rate = r.type === 'A' ? props.inputs.ooRate : props.inputs.invRate
  return [
    { detail: 'Purchase Price', value: fDollar(r.price), highlight: false },
    { detail: 'Deposit', value: fDollar(r.depositAmount) + ' (' + r.depositPct + '%)', highlight: false },
    { detail: 'Loan Amount', value: fDollar(r.loanAmount), highlight: true },
    { detail: 'Interest Rate', value: fPct(rate), highlight: false },
    { detail: 'Loan Term', value: props.inputs.loanTerm + ' years', highlight: false },
    { detail: 'Repayment Type', value: props.inputs.isIO ? 'Interest Only' : 'Principal & Interest', highlight: false },
    { detail: 'Weekly Repayment', value: fDollar(r.weeklyMortgage || r.weeklyMortgageOO) + '/pw', highlight: true }
  ]
})

function getRowClass({ row }) {
  return row.highlight ? 'row-highlight' : ''
}
</script>
