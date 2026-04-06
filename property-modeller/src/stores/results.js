import { defineStore } from 'pinia'
import { calcAll } from '../engine/scenarios.js'

export const useResultsStore = defineStore('results', {
  state: () => ({
    A: null,
    B: null,
    C: null,
    calculated: false
  }),
  getters: {
    hasResults: (state) => state.calculated,
    winner: (state) => {
      if (!state.calculated) return null
      const scores = {
        A: state.A?.weightedScore?.total ?? 0,
        B: state.B?.weightedScore?.total ?? 0,
        C: state.C?.weightedScore?.total ?? 0
      }
      return Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b)
    }
  },
  actions: {
    calculate(inputs) {
      const { A, B, C } = calcAll(inputs)
      this.A = A
      this.B = B
      this.C = C
      this.calculated = true
    }
  }
})
