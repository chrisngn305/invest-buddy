import { defineStore } from 'pinia'
import rbaRates from '../data/rba-rates.json'

export const useInputsStore = defineStore('inputs', {
  state: () => ({
    incomeA: 80000,
    incomeB: 80000,
    savings: 40000,
    stocks: 5000,
    weeklyLiving: 612,
    weeklyRentPaid: 520,
    isFHB: true,
    price: 950000,
    isNewBuild: false,
    depositAmount: 95000,
    // Defaults come from the RBA snapshot refreshed weekly by .github/workflows/rba-rates.yml
    ooRate: rbaRates.ooRate,
    invRate: rbaRates.invRate,
    rbaRates,
    loanTerm: 30,
    isIO: false,
    weeklyRent: 720,
    mgmtPct: 8.5,
    vacancyWeeks: 2,
    annualCouncil: 2500,
    annualInsurance: 2000,
    bodyCorpAnnual: 0,
    commuteExtra: 100,
    maintPct: 0.5,
    autoDepreciation: true,
    manualDepr: 8000,
    growthY1: 7,
    growthY3: 5,
    holdingYears: 5,
    rentIncrease: 4,
    incomeGrowth: 2,
    sellingCostsPct: 2.5,
    scoreWeights: { cf: 2, wealth: 1, commute: 1, flex: 1, lifestyle: 1 },
    scoreRatings: {
      A: { commute: 2, flex: 1, lifestyle: 2 },
      B: { commute: 5, flex: 5, lifestyle: 5 },
      C: { commute: 4, flex: 4, lifestyle: 3 }
    }
  }),
  getters: {
    totalCapital: (state) => state.savings + state.stocks
  }
})
