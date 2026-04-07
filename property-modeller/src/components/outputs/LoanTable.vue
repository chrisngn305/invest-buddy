<template>
  <div class="cost-card">
    <h3 class="card-title">
      <el-icon class="card-icon"><Wallet /></el-icon>
      Loan Structure
    </h3>

    <div class="rows">
      <div class="cost-row" v-for="row in rows" :key="row.detail">
        <span class="row-label">{{ row.detail }}</span>
        <span v-if="row.badge" class="badge" :class="row.badgeCls">{{ row.value }}</span>
        <span v-else class="row-value mono" :class="row.cls">{{ row.value }}</span>
      </div>
    </div>

    <div class="total-row">
      <span class="total-label">{{ isIO ? 'Annual Interest Cost' : 'Annual Repayments' }}</span>
      <span class="total-value mono">{{ annualCost }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Wallet } from '@element-plus/icons-vue'
import { fDollar, fPct } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

const isIO = computed(() => props.inputs.isIO)
const rate  = computed(() => props.result.type === 'A' ? props.inputs.ooRate : props.inputs.invRate)
const weeklyMort = computed(() => props.result.weeklyMortgage || props.result.weeklyMortgageOO || props.result.weeklyMortgageINV || 0)
const annualCost = computed(() => fDollar(weeklyMort.value * 52))

const rows = computed(() => {
  const r = props.result
  const ioPill   = { badge: true, badgeCls: 'badge-amber', value: 'Interest Only' }
  const piPill   = { badge: true, badgeCls: 'badge-green', value: 'Principal & Interest' }
  const taxPill  = r.type !== 'A' ? [{ detail: 'Tax Deductibility', ...{ badge: true, badgeCls: 'badge-green', value: '100% Eligible' } }] : []
  return [
    { detail: 'Loan Amount',    value: fDollar(r.loanAmount), cls: 'val-bold' },
    { detail: 'Product Type',   ...(isIO.value ? ioPill : piPill) },
    { detail: 'Interest Rate',  value: fPct(rate.value), cls: '' },
    { detail: 'Loan Term',      value: props.inputs.loanTerm + ' years', cls: '' },
    { detail: 'Weekly Payment', value: fDollar(weeklyMort.value) + '/pw', cls: 'val-bold' },
    ...taxPill
  ]
})
</script>

<style scoped>
.cost-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--el-border-radius-base);
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 20px;
}

.card-icon {
  font-size: 18px;
  color: var(--gold);
}

.rows {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cost-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1ede8;
}

.row-label {
  font-size: 13px;
  color: var(--muted);
}

.row-value {
  font-size: 13px;
  color: var(--text);
}

.val-bold { font-weight: 600; color: var(--navy); }
.val-green { color: var(--green); font-weight: 600; }

/* Status badges */
.badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 5px;
}

.badge-amber { background: var(--amber-bg); color: var(--amber); }
.badge-green { background: var(--green-bg); color: var(--green); }

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
}

.total-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.total-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--navy);
}
</style>
