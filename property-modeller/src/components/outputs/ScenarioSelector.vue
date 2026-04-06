<template>
  <div class="selector-wrap">
    <div class="selector-track">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="s-tab"
        :class="{ active: modelValue === s.id }"
        @click="$emit('update:modelValue', s.id)"
      >
        <span class="s-dot" :class="'dot-' + s.id"></span>
        <span class="s-text">{{ s.label }}</span>
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
const scenarios = [
  { id: 'A', label: 'Buy to Live' },
  { id: 'B', label: 'Rentvest' },
  { id: 'C', label: 'Smart Hybrid' }
]
</script>
<style scoped>
.selector-wrap {
  margin-bottom: 20px;
}

.selector-track {
  display: inline-flex;
  background: var(--border);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}

.s-tab {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 18px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  white-space: nowrap;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
}

.s-tab.active {
  background: var(--surface);
  color: var(--navy);
  box-shadow: 0 1px 4px rgba(13, 31, 60, 0.10), inset 0 1px 0 rgba(255,255,255,0.9);
}

/* Coloured indicator dot */
.s-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.35;
  transition: opacity 0.18s;
}
.s-tab.active .s-dot { opacity: 1; }

.dot-A { background: var(--blue); }
.dot-B { background: var(--green); }
.dot-C { background: var(--amber); }

.s-tab:hover:not(.active) { color: var(--text); background: rgba(255,255,255,0.5); }
</style>
