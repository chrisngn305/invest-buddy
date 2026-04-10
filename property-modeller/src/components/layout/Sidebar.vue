<template>
  <aside ref="sidebarEl" class="sidebar" :class="{ 'sidebar--open': open }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Investment Parameters</h2>
      <p class="sidebar-subtitle">Brisbane Metro</p>
    </div>

    <el-collapse v-model="activeNames" class="sidebar-collapse">
      <!-- Group 1: Finances -->
      <el-collapse-item name="0">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><Wallet /></el-icon></span>
            Your Finances
          </div>
        </template>
        <div class="input-section">
          <div class="row-2">
            <div class="field">
              <label>Income A</label>
              <el-input-number v-model="inputs.incomeA" :min="0" :step="1000" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
            <div class="field">
              <label>Income B</label>
              <el-input-number v-model="inputs.incomeB" :min="0" :step="1000" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
                <template #prefix><span class="input-prefix">$</span></template>
              </el-input-number>
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label>Cash Savings</label>
              <el-input-number v-model="inputs.savings" :min="0" :step="1000" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
            <div class="field">
              <label>Stocks/Shares</label>
              <el-input-number v-model="inputs.stocks" :min="0" :step="1000" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label>Weekly Living</label>
              <el-input-number v-model="inputs.weeklyLiving" :min="0" :step="50" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
            <div class="field">
              <label>Rent Paying</label>
              <el-input-number v-model="inputs.weeklyRentPaid" :min="0" :step="50" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
          </div>
          <div class="field">
            <label>First Home Buyer?</label>
            <el-radio-group v-model="inputs.isFHB" size="small">
              <el-radio-button :value="true">Yes — FHB</el-radio-button>
              <el-radio-button :value="false">No</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-collapse-item>

      <!-- Group 2: Property -->
      <el-collapse-item name="1">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><House /></el-icon></span>
            Property
          </div>
        </template>
        <div class="input-section">
          <div class="field">
            <label>Purchase Price</label>
            <el-input-number v-model="inputs.price" :min="0" :step="10000" :precision="0"
              controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
          </div>
          <div class="field">
            <label>Property Type</label>
            <el-radio-group v-model="inputs.isNewBuild" size="small">
              <el-radio-button :value="false">Established</el-radio-button>
              <el-radio-button :value="true">New Build</el-radio-button>
            </el-radio-group>
          </div>
          <div class="field">
            <label>Deposit</label>
            <el-input-number v-model="inputs.depositAmount" :min="0" :step="5000" :precision="0"
              controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
          </div>
          <div class="row-2">
            <div class="field">
              <label>OO Rate</label>
              <el-input-number v-model="inputs.ooRate" :min="0" :max="20" :step="0.25" :precision="2"
                controls-position="right" :formatter="v => `${v}%`" :parser="v => v.replace('%', '')" />
            </div>
            <div class="field">
              <label>Inv Rate</label>
              <el-input-number v-model="inputs.invRate" :min="0" :max="20" :step="0.25" :precision="2"
                controls-position="right" :formatter="v => `${v}%`" :parser="v => v.replace('%', '')" />
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label>Loan Term</label>
              <el-input-number v-model="inputs.loanTerm" :min="10" :max="30" :precision="0"
                controls-position="right" :formatter="v => `${v} year`" :parser="v => v.replace(' year', '')" />
            </div>
            <div class="field">
              <label>Repayment Type</label>
              <el-radio-group v-model="inputs.isIO" size="small">
                <el-radio-button :value="false">P&amp;I</el-radio-button>
                <el-radio-button :value="true">IO</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <!-- Group 3: Rental Income -->
      <el-collapse-item name="2">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><Money /></el-icon></span>
            Rental Income
          </div>
        </template>
        <div class="input-section">
          <div class="field">
            <label>Weekly Rent</label>
            <el-input-number v-model="inputs.weeklyRent" :min="0" :step="25" :precision="0"
              controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
          </div>
          <div class="field">
            <label>Management Fee <span class="mono val-display">{{ inputs.mgmtPct.toFixed(1) }}%</span></label>
            <el-slider v-model="inputs.mgmtPct" :min="6" :max="12" :step="0.5" />
          </div>
          <div class="field">
            <label>Vacancy <span class="mono val-display">{{ inputs.vacancyWeeks }} wk</span></label>
            <el-slider v-model="inputs.vacancyWeeks" :min="0" :max="6" :step="1" />
          </div>
        </div>
      </el-collapse-item>

      <!-- Group 4: Ongoing Costs -->
      <el-collapse-item name="3">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><TrendCharts /></el-icon></span>
            Ongoing Costs
          </div>
        </template>
        <div class="input-section">
          <div class="row-2">
            <div class="field">
              <label>Council Rates</label>
              <el-input-number v-model="inputs.annualCouncil" :min="0" :step="100" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
            <div class="field">
              <label>Insurance</label>
              <el-input-number v-model="inputs.annualInsurance" :min="0" :step="100" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label>Body Corp</label>
              <el-input-number v-model="inputs.bodyCorpAnnual" :min="0" :step="100" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
            <div class="field">
              <label>Commute Extra</label>
              <el-input-number v-model="inputs.commuteExtra" :min="0" :step="50" :precision="0"
                controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
            </div>
          </div>
          <div class="field">
            <label>Maintenance <span class="mono val-display">{{ inputs.maintPct.toFixed(1) }}%</span></label>
            <el-slider v-model="inputs.maintPct" :min="0.1" :max="2" :step="0.1" />
          </div>
          <div class="field">
            <label>Depreciation</label>
            <el-radio-group v-model="inputs.autoDepreciation" size="small">
              <el-radio-button :value="true">Auto-estimate</el-radio-button>
              <el-radio-button :value="false">Manual</el-radio-button>
            </el-radio-group>
            <small class="hint">Auto: ~1.2% new build / ~0.4% established</small>
          </div>
          <div class="field" v-show="!inputs.autoDepreciation">
            <label>Manual Depreciation</label>
            <el-input-number v-model="inputs.manualDepr" :min="0" :step="500" :precision="0"
              controls-position="right" :formatter="fmtDollar" :parser="parseDollar">
              <template #prefix><span class="input-prefix">$</span></template>
            </el-input-number>
          </div>
        </div>
      </el-collapse-item>

      <!-- Group 5: Projection Assumptions -->
      <el-collapse-item name="4">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><TopRight /></el-icon></span>
            Projection Assumptions
          </div>
        </template>
        <div class="input-section">
          <div class="row-2">
            <div class="field">
              <label>Growth Y1-2 <span class="mono val-display">{{ inputs.growthY1 }}%</span></label>
              <el-slider v-model="inputs.growthY1" :min="0" :max="20" :step="0.5" />
            </div>
            <div class="field">
              <label>Growth Y3+ <span class="mono val-display">{{ inputs.growthY3 }}%</span></label>
              <el-slider v-model="inputs.growthY3" :min="0" :max="15" :step="0.5" />
            </div>
          </div>
          <div class="field">
            <label>Holding Period</label>
            <el-radio-group v-model="inputs.holdingYears" size="small">
              <el-radio-button :value="3">3 yr</el-radio-button>
              <el-radio-button :value="5">5 yr</el-radio-button>
              <el-radio-button :value="7">7 yr</el-radio-button>
              <el-radio-button :value="10">10 yr</el-radio-button>
            </el-radio-group>
          </div>
          <div class="row-2">
            <div class="field">
              <label>Rent Growth <span class="mono val-display">{{ inputs.rentIncrease }}%</span></label>
              <el-slider v-model="inputs.rentIncrease" :min="0" :max="10" :step="0.5" />
            </div>
            <div class="field">
              <label>Income Growth <span class="mono val-display">{{ inputs.incomeGrowth }}%</span></label>
              <el-slider v-model="inputs.incomeGrowth" :min="0" :max="10" :step="0.5" />
            </div>
          </div>
        </div>
      </el-collapse-item>

      <!-- Group 6: Sale Assumptions -->
      <el-collapse-item name="5">
        <template #title>
          <div class="acc-header">
            <span class="acc-icon"><el-icon><PriceTag /></el-icon></span>
            Sale Assumptions
          </div>
        </template>
        <div class="input-section">
          <div class="field">
            <label>Selling Costs <span class="mono val-display">{{ inputs.sellingCostsPct.toFixed(1) }}%</span></label>
            <el-slider v-model="inputs.sellingCostsPct" :min="1" :max="4" :step="0.1" />
            <small class="hint">Agent commission ~2% + legal ~$2k</small>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="sidebar-footer">
      <div class="sidebar-footer-pulse">
        <span class="pulse-dot"></span>
        <span class="pulse-label">Live Market Feed</span>
      </div>
      <p class="sidebar-footer-text">
        Inner North-West median growth tracking at
        <span class="mono sidebar-footer-stat">+4.2%</span> YoY.
      </p>
    </div>

    <div class="resize-handle" @mousedown="startResize"></div>
    <button class="sidebar-close" @click="$emit('close')" aria-label="Close sidebar">✕</button>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useInputsStore } from '../../stores/inputs.js'

defineProps({ open: Boolean })
defineEmits(['close'])

const inputs = useInputsStore()
const activeNames = ref(['0', '1', '2'])
const sidebarEl = ref(null)

onMounted(() => {
  sidebarEl.value?.querySelectorAll('.el-input-number input').forEach(input => {
    input.setAttribute('inputmode', 'decimal')
  })
})

const fmtDollar = v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const parseDollar = v => v.replace(/\$\s?|(,*)/g, '')

const MIN_WIDTH = 220
const MAX_WIDTH = 480

function startResize(e) {
  e.preventDefault()
  const startX = e.clientX
  const startWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width'))

  function onMove(e) {
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + e.clientX - startX))
    document.documentElement.style.setProperty('--sidebar-width', newWidth + 'px')
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }

  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; top: var(--topbar-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
  background: var(--surface);
  border-right: 1px solid var(--border);
  z-index: 50;
  display: flex;
  flex-direction: column;
}
.resize-handle {
  position: absolute;
  top: 0;
  right: -3px;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  z-index: 60;
}
.resize-handle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: transparent;
  transition: background 0.15s;
}
.resize-handle:hover::after {
  background: var(--gold);
}
.sidebar-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.sidebar-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--navy);
}
.sidebar-subtitle {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-top: 2px;
}
.sidebar-footer {
  margin-top: auto;
  padding: 16px 20px;
  background: #f6f3ed;
  border-top: 1px solid rgba(197, 198, 206, 0.2);
  flex-shrink: 0;
}
.sidebar-footer-pulse {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text);
}
.sidebar-footer-text {
  font-size: 11px;
  line-height: 1.5;
  color: var(--muted);
}
.sidebar-footer-stat {
  color: var(--gold);
  font-size: 11px;
}
.acc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.acc-icon {
  width: 22px; height: 22px;
  background: var(--gold-pale);
  color: var(--gold);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}
.input-section { padding: 4px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label {
  font-size: 13px;
  color: var(--muted);
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.val-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--navy);
}
.hint {
  font-size: 10px;
  color: var(--muted);
  margin-top: 2px;
}

/* El-radio-group full width */
:deep(.el-radio-group) { display: flex; width: 100%; }
:deep(.el-radio-button) { flex: 1; }
:deep(.el-radio-button__inner) { width: 100%; text-align: center; }

/* El-input-number full width */
:deep(.el-input-number) { width: 100%; }

/* Close button — mobile only */
.sidebar-close {
  display: none;
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  color: var(--muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}
.sidebar-close:hover { color: var(--navy); background: var(--bg); }

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-105%);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    width: min(360px, 88vw) !important;
    box-shadow: 4px 0 32px rgba(13, 31, 60, 0.18);
  }
  .sidebar--open {
    transform: translateX(0);
  }
  .resize-handle { display: none; }
  .sidebar-close { display: block; }
  .row-2 { grid-template-columns: 1fr; }
}
</style>
