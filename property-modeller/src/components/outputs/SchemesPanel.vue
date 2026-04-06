<template>
  <div>
    <!-- Scenario B: forfeited support -->
    <div v-if="result.type === 'B'" class="forfeited-panel">
      <div class="panel-header red-header">
        <el-icon><WarningFilled /></el-icon>
        Government Support Forfeited
      </div>
      <el-table :data="forfeitedRows" size="small">
        <el-table-column prop="item" label="Item" />
        <el-table-column prop="amount" label="Amount">
          <template #default="scope">
            <span :class="scope.row.bold ? 'bold text-red' : 'text-red'">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Scenarios A and C: eligible schemes -->
    <div v-else class="schemes-grid">
      <el-card v-for="s in schemeCards" :key="s.name" class="scheme-card">
        <div class="scheme-content">
          <div class="scheme-top">
            <span class="status-dot" :class="'dot-' + s.dotColor"></span>
            <el-tag :type="tagTypeMap[s.dotColor]" size="small">{{ s.status }}</el-tag>
          </div>
          <div class="scheme-name">{{ s.name }}</div>
          <div class="scheme-amount mono">{{ s.amount }}</div>
          <div class="scheme-note">{{ s.note }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['result'])

const tagTypeMap = { green: 'success', red: 'danger', amber: 'warning' }

const forfeitedRows = computed(() => [
  { item: 'FHOG Lost', amount: '-' + fDollar(props.result.fhogForfeited) },
  { item: 'Stamp Duty Concession Lost', amount: '-' + fDollar(props.result.dutyForfeited) },
  { item: 'LMI Saving Lost', amount: '-' + fDollar(props.result.lmiForfeited) },
  { item: 'Total', amount: '-' + fDollar(props.result.totalForfeited), bold: true }
])

const schemeCards = computed(() => {
  const r = props.result
  return [
    {
      name: 'First Home Owner Grant',
      status: r.fhogEligible ? 'Eligible' : 'Not Eligible',
      dotColor: r.fhogEligible ? 'green' : 'red',
      amount: r.fhogEligible ? fDollar(r.fhogAmount) : '$0',
      note: r.fhogEligible ? 'New build < $750k' : r.price >= 750000 ? 'Price exceeds $750k cap' : 'Established property — not eligible'
    },
    {
      name: 'First Home Buyer Guarantee',
      status: r.fhbgEligible ? 'Eligible' : 'Not Eligible',
      dotColor: r.fhbgEligible ? 'green' : 'red',
      amount: r.fhbgEligible ? 'LMI Waived' : 'LMI Applies',
      note: r.fhbgEligible ? 'No LMI required — saves ' + fDollar(r.lmiSaved) : r.price > 1000000 ? 'Price exceeds $1M cap' : 'Not eligible'
    },
    {
      name: 'Stamp Duty Concession',
      status: r.dutyAmount === 0 ? 'Fully Exempt' : r.dutySaved > 0 ? 'Partial Concession' : 'No Concession',
      dotColor: r.dutyAmount === 0 ? 'green' : r.dutySaved > 0 ? 'amber' : 'red',
      amount: r.dutySaved > 0 ? fDollar(r.dutySaved) + ' saved' : r.dutyAmount === 0 ? '$0 duty payable' : fDollar(r.dutyAmount) + ' due',
      note: r.dutyAmount === 0 ? 'FHB new build concession applied' : r.dutySaved > 0 ? 'Partial taper between $700k–$800k' : 'Price > $800k — full duty applies'
    }
  ]
})
</script>

<style scoped>
.schemes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.scheme-card { background: var(--surface) !important; }
.scheme-content { display: flex; flex-direction: column; gap: 6px; }
.scheme-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-green { background: var(--green); }
.dot-red { background: var(--red); }
.dot-amber { background: var(--amber); }
.scheme-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--text); }
.scheme-amount { font-size: 18px; font-weight: 500; color: var(--navy); }
.scheme-note { font-size: 11px; color: var(--muted); line-height: 1.4; }
.forfeited-panel { border: 1px solid var(--red-bd); border-radius: 4px; overflow: hidden; }
.red-header { background: var(--red-bg); padding: 10px 16px; color: var(--red); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.bold { font-weight: 700; }
</style>
