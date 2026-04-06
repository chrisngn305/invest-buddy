<template>
  <el-table :data="rows" size="small" :row-class-name="getRowClass">
    <el-table-column prop="item" label="Item" />
    <el-table-column prop="amount" label="Amount">
      <template #default="scope">
        <span :class="scope.row.cls">{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

const rows = computed(() => {
  const r = props.result
  const list = [
    { item: 'Deposit', amount: fDollar(r.depositAmount), cls: 'text-red', key: 'dep' },
    { item: 'Stamp Duty', amount: fDollar(r.dutyAmount), cls: r.dutyAmount === 0 ? 'text-green' : 'text-red', key: 'duty' },
    { item: 'Legal Fees', amount: fDollar(r.legalFees), cls: 'text-red', key: 'legal' },
  ]
  if (r.type === 'A') {
    list.push({ item: 'Lifestyle Setup', amount: fDollar(r.lifestyleSetup), cls: 'text-red', key: 'life' })
  }
  if (r.lmiAmount > 0) {
    list.push({ item: 'LMI (capitalised)', amount: fDollar(r.lmiAmount), cls: 'text-red', key: 'lmi' })
  }
  if (r.fhogAmount > 0) {
    list.push({ item: 'FHOG Grant', amount: '-' + fDollar(r.fhogAmount), cls: 'text-green', key: 'fhog' })
  }
  list.push({ item: 'Total Required', amount: fDollar(r.upfrontTotal), cls: 'total-val', key: 'total', isTotal: true })
  list.push({ item: 'Available Capital', amount: fDollar(r.availableCapital), cls: 'text-green', key: 'avail' })
  list.push({ item: 'Cash Buffer', amount: fDollar(r.cashBuffer), cls: r.cashBuffer >= 0 ? 'text-green' : 'text-red', key: 'buf', isBuffer: true })
  return list
})

function getRowClass({ row }) {
  if (row.isTotal) return 'row-total'
  if (row.isBuffer) return 'row-tinted'
  return ''
}
</script>
