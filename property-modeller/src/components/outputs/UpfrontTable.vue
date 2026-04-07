<template>
  <div class="cost-card">
    <h3 class="card-title">
      <el-icon class="card-icon"><Tickets /></el-icon>
      Upfront Costs
    </h3>

    <div class="rows">
      <div class="cost-row" v-for="row in mainRows" :key="row.key">
        <span class="row-label">{{ row.item }}</span>
        <span class="row-value mono" :class="row.cls">{{ row.amount }}</span>
      </div>
    </div>

    <div class="buffer-row" :class="result.cashBuffer >= 0 ? 'buffer-ok' : 'buffer-err'">
      <span class="row-label">Cash Buffer</span>
      <span class="row-value mono">{{ fDollar(result.cashBuffer) }}</span>
    </div>

    <div class="total-row">
      <span class="total-label">Total Outlay</span>
      <span class="total-value mono">{{ fDollar(result.upfrontTotal) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Tickets } from '@element-plus/icons-vue'
import { fDollar } from '../../utils/format.js'

const props = defineProps(['result', 'inputs'])

const mainRows = computed(() => {
  const r = props.result
  const list = [
    { key: 'price', item: 'Purchase Price', amount: fDollar(r.price), cls: '' },
    { key: 'dep',   item: `Cash Deposit (${r.depositPct}%)`, amount: fDollar(r.depositAmount), cls: '' },
    { key: 'duty',  item: 'Stamp Duty', amount: fDollar(r.dutyAmount), cls: r.dutyAmount === 0 ? 'val-green' : 'val-red' },
    { key: 'legal', item: 'Legal Fees', amount: fDollar(r.legalFees), cls: '' },
  ]
  if (r.type === 'A')   list.push({ key: 'life', item: 'Lifestyle Setup', amount: fDollar(r.lifestyleSetup), cls: '' })
  if (r.lmiAmount > 0)  list.push({ key: 'lmi',  item: 'LMI (capitalised)', amount: fDollar(r.lmiAmount), cls: 'val-red' })
  if (r.fhogAmount > 0) list.push({ key: 'fhog', item: 'FHOG Grant', amount: '−' + fDollar(r.fhogAmount), cls: 'val-green' })
  list.push({ key: 'avail', item: 'Available Capital', amount: fDollar(r.availableCapital), cls: 'val-green' })
  return list
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
  gap: 0;
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

.val-green { color: var(--green); font-weight: 600; }
.val-red   { color: var(--red);   font-weight: 600; }

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.buffer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 8px 12px;
  border-radius: 7px;
}

.buffer-ok  { background: var(--green-bg); }
.buffer-err { background: var(--red-bg); }

.buffer-ok  .row-label, .buffer-ok  .row-value { color: var(--green); }
.buffer-err .row-label, .buffer-err .row-value { color: var(--red); }

.buffer-ok .row-value, .buffer-err .row-value { font-weight: 700; }
</style>
