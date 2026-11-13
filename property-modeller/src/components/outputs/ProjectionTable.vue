<template>
  <div>
    <el-alert v-if="isIO" type="warning" :closable="false" title="Interest Only is selected, so the loan balance does not reduce over time" style="margin-bottom:12px" />
    <el-table :data="projs" size="small" :row-class-name="getRowClass">
      <el-table-column prop="year" label="Year" />
      <el-table-column prop="propertyValue" label="Property Value">
        <template #default="scope"><span class="text-green mono">{{ fDollar(scope.row.propertyValue) }}</span></template>
      </el-table-column>
      <el-table-column prop="loanBalance" label="Loan Balance">
        <template #default="scope"><span class="text-red mono">{{ fDollar(scope.row.loanBalance) }}</span></template>
      </el-table-column>
      <el-table-column prop="equity" label="Equity">
        <template #default="scope"><span class="mono">{{ fDollar(scope.row.equity) }}</span></template>
      </el-table-column>
      <el-table-column prop="weeklySurplus" label="Weekly Surplus">
        <template #default="scope"><span class="mono">{{ fDollar(scope.row.weeklySurplus) }}/pw</span></template>
      </el-table-column>
      <el-table-column prop="annualSavings" label="Annual Savings">
        <template #default="scope"><span class="mono">{{ fDollar(scope.row.annualSavings) }}</span></template>
      </el-table-column>
      <el-table-column prop="cumulativeSavings" label="Cum. Savings">
        <template #default="scope"><span class="mono">{{ fDollar(scope.row.cumulativeSavings) }}</span></template>
      </el-table-column>
      <el-table-column prop="totalWealth" label="Total Wealth">
        <template #default="scope"><span class="mono" style="font-weight:700">{{ fDollar(scope.row.totalWealth) }}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { fDollar } from '../../utils/format.js'
const props = defineProps(['projs', 'holdingYears', 'isIO'])
function getRowClass({ row }) {
  return row.year === props.holdingYears ? 'row-navy' : ''
}
</script>
