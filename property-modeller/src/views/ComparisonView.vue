<template>
  <div>
    <div class="section-title">3-Way Comparison</div>
    <ComparisonCards :resultA="resultA" :resultB="resultB" :resultC="resultC" :winner="winner" />

    <el-divider />

    <div class="score-header">
      <div class="section-title" style="margin:0">Weighted Scoring</div>
      <button class="edit-weights-btn" @click="showWeights = !showWeights">
        {{ showWeights ? 'Hide Weights' : 'Adjust Weights' }}
      </button>
    </div>

    <Transition name="weights-slide">
      <div v-if="showWeights" class="weights-panel">
        <div class="weights-grid">
          <div v-for="m in metrics" :key="m.key" class="weight-item">
            <div class="weight-label">{{ m.label }}</div>
            <div class="weight-note">{{ m.note }}</div>
            <div class="weight-control">
              <el-slider
                v-model="inputsStore.scoreWeights[m.key]"
                :min="0" :max="5" :step="1"
                :show-tooltip="false"
                size="small"
              />
              <span class="weight-value">×{{ inputsStore.scoreWeights[m.key] }}</span>
            </div>
          </div>
        </div>
        <el-divider style="margin: 16px 0 20px" />

        <div class="panel-sub-title">Personal Ratings — Your Experience per Scenario</div>
        <div class="ratings-table">
          <div class="ratings-header-row">
            <div class="ratings-col-label"></div>
            <div class="ratings-col-header scenario-a">A — Own &amp; Live</div>
            <div class="ratings-col-header scenario-b">B — Rent &amp; Invest</div>
            <div class="ratings-col-header scenario-c">C — Hybrid</div>
          </div>
          <div v-for="m in subjectiveMetrics" :key="m.key" class="ratings-row">
            <div class="ratings-col-label">
              <div class="weight-label">{{ m.label }}</div>
              <div class="weight-note">{{ m.note }}</div>
            </div>
            <div v-for="sc in ['A','B','C']" :key="sc" class="ratings-cell">
              <el-rate v-model="inputsStore.scoreRatings[sc][m.key]" :max="5" size="small" />
            </div>
          </div>
        </div>

        <button class="reset-btn" @click="resetAll">Reset all to defaults</button>

      </div>
    </Transition>

    <ScoreTable
      :scoreA="resultA.weightedScore"
      :scoreB="resultB.weightedScore"
      :scoreC="resultC.weightedScore"
      :weights="inputsStore.scoreWeights"
      :ratings="inputsStore.scoreRatings"
    />

    <el-divider />

    <div class="section-title">Sensitivity Analysis — Total Wealth at Year {{ inputs.holdingYears }}</div>
    <SensitivityTable :inputs="inputs" :resultA="resultA" :resultB="resultB" :resultC="resultC" />

    <el-divider />

    <div class="section-title">Total Wealth Trajectory — All Scenarios</div>
    <TrajectoryChart :projsA="resultA.projs" :projsB="resultB.projs" :projsC="resultC.projs" :height="300" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useInputsStore } from '../stores/inputs.js'
import ComparisonCards from '../components/outputs/ComparisonCards.vue'
import ScoreTable from '../components/outputs/ScoreTable.vue'
import SensitivityTable from '../components/outputs/SensitivityTable.vue'
import TrajectoryChart from '../components/charts/TrajectoryChart.vue'

defineProps(['resultA', 'resultB', 'resultC', 'inputs', 'winner'])

const inputsStore = useInputsStore()
const showWeights = ref(false)

const metrics = [
  { key: 'cf',        label: 'Cash Flow',     note: 'Weekly surplus after all costs' },
  { key: 'wealth',    label: 'Wealth Growth', note: 'Total wealth at holding period end' },
  { key: 'commute',   label: 'Commute',       note: 'Freedom to live close to work' },
  { key: 'flex',      label: 'Flexibility',   note: 'Ability to move or upgrade easily' },
  { key: 'lifestyle', label: 'Lifestyle',     note: 'Comfort, space & stability' },
]

const subjectiveMetrics = [
  { key: 'commute',   label: 'Commute',     note: 'How well each scenario suits your commute needs' },
  { key: 'flex',      label: 'Flexibility', note: 'Ability to move, upgrade, or change plans' },
  { key: 'lifestyle', label: 'Lifestyle',   note: 'Comfort, space & day-to-day stability' },
]

function resetAll() {
  Object.assign(inputsStore.scoreWeights, { cf: 2, wealth: 1, commute: 1, flex: 1, lifestyle: 1 })
  Object.assign(inputsStore.scoreRatings.A, { commute: 2, flex: 1, lifestyle: 2 })
  Object.assign(inputsStore.scoreRatings.B, { commute: 5, flex: 5, lifestyle: 5 })
  Object.assign(inputsStore.scoreRatings.C, { commute: 4, flex: 4, lifestyle: 3 })
}
</script>
<style scoped>
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

.score-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.edit-weights-btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--navy);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 5px 12px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.edit-weights-btn:hover { background: var(--border); }

.weights-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--el-border-radius-base);
  padding: 20px 24px;
  margin-bottom: 16px;
}

.weights-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 16px;
}

.weight-item { display: flex; flex-direction: column; gap: 4px; }

.weight-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--navy);
}

.weight-note {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.4;
  margin-bottom: 6px;
}

.weight-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.weight-control .el-slider { flex: 1; }

.weight-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
  min-width: 24px;
}

.panel-sub-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 14px;
}

.ratings-table { display: flex; flex-direction: column; gap: 0; margin-bottom: 16px; }

.ratings-header-row, .ratings-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  align-items: center;
  gap: 0;
}

.ratings-header-row { margin-bottom: 8px; }

.ratings-row {
  border-top: 1px solid #f1ede8;
  padding: 10px 0;
}

.ratings-col-label { padding-right: 12px; }

.ratings-col-header {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  padding: 4px 0;
  border-radius: 5px;
}

.scenario-a { color: var(--blue);  background: var(--blue-bg,  #eff6ff); }
.scenario-b { color: var(--green); background: var(--green-bg); }
.scenario-c { color: var(--amber); background: var(--amber-bg); }

.ratings-cell { display: flex; justify-content: center; }

.reset-btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
.reset-btn:hover { color: var(--navy); }

/* Slide transition */
.weights-slide-enter-active, .weights-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.weights-slide-enter-from, .weights-slide-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 768px) {
  .weights-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .ratings-header-row, .ratings-row { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; }
  .ratings-col-label { display: none; }
  .weights-panel { padding: 16px; }
}
</style>
