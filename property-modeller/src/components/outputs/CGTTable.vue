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

const props = defineProps(['cgt', 'price', 'sellingCostsPct', 'salePrice'])

const rows = computed(() => {
  const c = props.cgt
  const sellingCosts = props.salePrice * props.sellingCostsPct / 100
  return [
    { item: 'Sale Price', amount: fDollar(props.salePrice), cls: 'text-green' },
    { item: 'Purchase Price', amount: '-' + fDollar(props.price), cls: 'text-red' },
    { item: 'Selling Costs (' + props.sellingCostsPct + '%)', amount: '-' + fDollar(sellingCosts), cls: 'text-red' },
    { item: 'Gross Capital Gain', amount: fDollar(c.grossGain), cls: c.grossGain > 0 ? 'text-green' : 'text-red' },
    { item: '50% CGT Discount Applied', amount: c.exempt ? 'N/A (Exempt)' : '-' + fDollar(c.grossGain / 2), cls: 'text-muted' },
    { item: 'CGT Payable', amount: c.exempt ? '$0 (EXEMPT)' : fDollar(c.totalCGT), cls: c.exempt ? 'text-green bold' : 'text-red bold', isCGT: true },
    { item: 'Net Equity After CGT', amount: fDollar(c.netProceeds), cls: 'bold', isNet: true }
  ]
})

function getRowClass({ row }) {
  return row.isNet ? 'row-navy' : ''
}
</script>
