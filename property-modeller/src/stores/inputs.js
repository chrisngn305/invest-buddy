import { defineStore } from 'pinia'

export const useInputsStore = defineStore('inputs', {
  state: () => ({
    incomeA: 80000,
    incomeB: 80000,
    savings: 40000,
    stocks: 5000,
    familyLoan: 70000,
    weeklyLiving: 612,
    weeklyRentPaid: 520,
    isFHB: true,
    price: 950000,
    isNewBuild: false,
    depositPct: 10,
    ooRate: 6.50,
    invRate: 6.80,
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
    sellingCostsPct: 2.5
  }),
  getters: {
    totalCapital: (state) => state.savings + state.stocks + state.familyLoan
  }
})
