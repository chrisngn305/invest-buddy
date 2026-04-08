<template>
  <div>
    <TopBar @calculate="handleCalculate" />

    <div class="layout">
      <Sidebar />

      <main class="main-content">
        <MethodologyView v-if="activeTab === 'methodology'" />

        <template v-else-if="activeTab !== 'methodology'">
          <EmptyState v-if="!resultsStore.hasResults" @calculate="handleCalculate" />
        </template>

        <template v-if="activeTab !== 'methodology' && resultsStore.hasResults">
          <ScenarioSelector
            v-if="activeTab !== 'comparison' && activeTab !== 'methodology'"
            v-model="activeScenario"
          />

          <OverviewView
            v-if="activeTab === 'overview'"
            :result="activeResult"
            :inputs="inputsStore.$state"
          />
          <CashFlowView
            v-if="activeTab === 'cashflow'"
            :result="activeResult"
            :inputs="inputsStore.$state"
          />
          <ProjectionsView
            v-if="activeTab === 'projections'"
            :result="activeResult"
            :inputs="inputsStore.$state"
          />
          <ComparisonView
            v-if="activeTab === 'comparison'"
            :result-a="resultsStore.A"
            :result-b="resultsStore.B"
            :result-c="resultsStore.C"
            :inputs="inputsStore.$state"
            :winner="resultsStore.winner"
          />
        </template>
      </main>
    </div>

    <nav class="bottom-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="bottom-nav-item"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <el-icon><component :is="tab.icon" /></el-icon>
        <span>{{ tab.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInputsStore } from './stores/inputs.js'
import { useResultsStore } from './stores/results.js'
import TopBar from './components/layout/TopBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import EmptyState from './components/outputs/EmptyState.vue'
import ScenarioSelector from './components/outputs/ScenarioSelector.vue'
import OverviewView from './views/OverviewView.vue'
import CashFlowView from './views/CashFlowView.vue'
import ProjectionsView from './views/ProjectionsView.vue'
import ComparisonView from './views/ComparisonView.vue'
import MethodologyView from './views/MethodologyView.vue'

const inputsStore = useInputsStore()
const resultsStore = useResultsStore()

const activeTab = ref('overview')
const activeScenario = ref('A')

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'Grid' },
  { id: 'cashflow', label: 'Cash Flow', icon: 'Wallet' },
  { id: 'projections', label: 'Projections', icon: 'TrendCharts' },
  { id: 'comparison', label: '3-Way Compare', icon: 'DataAnalysis' },
  { id: 'methodology', label: 'Methodology', icon: 'Document' }
]

const activeResult = computed(() => resultsStore[activeScenario.value])

function handleCalculate() {
  resultsStore.calculate(inputsStore.$state)
  activeTab.value = 'overview'
}
</script>

<style scoped>
/* Layout */
.layout {
  display: flex;
  padding-top: var(--topbar-height);
}

.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  padding: 28px 32px 96px;
  min-height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
}

/* ── Bottom nav ── */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: var(--sidebar-width);
  right: 0;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 32px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  box-shadow: 0 -2px 16px rgba(13, 31, 60, 0.05);
  z-index: 40;
}
.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.bottom-nav-item i { font-size: 18px; }
.bottom-nav-item span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.bottom-nav-item.active { color: var(--navy); border-bottom-color: var(--gold); }
.bottom-nav-item:hover { color: var(--navy); }
</style>
