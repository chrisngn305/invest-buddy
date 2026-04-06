import { netWeekly, marginalRate, incomeTax } from './tax.js'
import { calcDuty, standardDuty } from './duty.js'
import { calcLMI } from './lmi.js'
import { weeklyPI, weeklyIO, yearlyInterest, loanBalance } from './mortgage.js'
import { assessSchemes } from './schemes.js'
import { calcCGT } from './cgt.js'
import { buildProjection } from './projections.js'

function autoDepr(price, isNew) {
  return isNew ? price * 0.012 : price * 0.004
}

function scoreScenario(type, surplus, totalWealth, allWealths) {
  const cfScore = surplus > 900 ? 5 : surplus > 650 ? 4 : surplus > 400 ? 3 : surplus > 150 ? 2 : 1
  const max = Math.max(...allWealths)
  const min = Math.min(...allWealths)
  const wealthScore = max === min ? 3 : Math.round(1 + 4 * (totalWealth - min) / (max - min))
  const commuteScore = { A: 2, B: 5, C: 4 }[type]
  const flexScore = { A: 1, B: 5, C: 4 }[type]
  const lifestyleScore = { A: 2, B: 5, C: 3 }[type]
  const total = cfScore * 2 + wealthScore + commuteScore + flexScore + lifestyleScore
  return { cfScore, wealthScore, commuteScore, flexScore, lifestyleScore, total }
}

export function calcA(inputs) {
  const depositPct = Math.max(inputs.depositPct, 5)
  const depositAmount = inputs.price * depositPct / 100
  const baseLoan = inputs.price - depositAmount
  const schemes = assessSchemes(inputs.price, inputs.isNewBuild, inputs.isFHB, depositPct, baseLoan)
  const loanAmount = baseLoan
  const dutyAmount = schemes.dutyAmount
  const legalFees = 3200
  const lifestyleSetup = 10000
  const fhogEligible = inputs.isFHB && inputs.isNewBuild && inputs.price < 750000
  const fhogAmount = fhogEligible ? 30000 : 0
  const upfrontTotal = depositAmount + dutyAmount + legalFees + lifestyleSetup - fhogAmount
  const availableCapital = inputs.savings + inputs.stocks + inputs.familyLoan
  const cashBuffer = availableCapital - upfrontTotal
  const weeklyNetIncome = netWeekly(inputs.incomeA) + netWeekly(inputs.incomeB)
  const weeklyMortgage = inputs.isIO ? weeklyIO(loanAmount, inputs.ooRate) : weeklyPI(loanAmount, inputs.ooRate, inputs.loanTerm)
  const weeklyCouncil = inputs.annualCouncil / 52
  const weeklyInsurance = inputs.annualInsurance / 52
  const weeklyMaintenance = inputs.price * inputs.maintPct / 100 / 52
  const weeklyBodyCorp = inputs.bodyCorpAnnual / 52
  const weeklyLifestyleInflation = 150
  const weeklySurplus = weeklyNetIncome - weeklyMortgage - weeklyCouncil - weeklyInsurance - weeklyMaintenance - weeklyBodyCorp - weeklyLifestyleInflation - inputs.weeklyLiving

  const projs = buildProjection(inputs, loanAmount, inputs.ooRate, 'A', 0, 0)
  const lastProj = projs[projs.length - 1]
  const salePrice = lastProj.propertyValue

  return {
    type: 'A',
    label: 'Buy to Live (PPOR)',
    price: inputs.price,
    depositPct,
    depositAmount,
    loanAmount,
    lmiAmount: 0,
    dutyAmount,
    legalFees,
    lifestyleSetup,
    fhogAmount,
    fhogEligible,
    fhbgEligible: schemes.fhbgEligible,
    dutySaved: schemes.dutySaved,
    lmiSaved: schemes.lmiSaved,
    upfrontTotal,
    availableCapital,
    cashBuffer,
    weeklyNetIncome,
    weeklyMortgage,
    weeklyCouncil,
    weeklyInsurance,
    weeklyMaintenance,
    weeklyBodyCorp,
    weeklyLifestyleInflation,
    weeklyLiving: inputs.weeklyLiving,
    weeklySurplus,
    projs,
    cgt: { totalCGT: 0, exempt: true, grossGain: salePrice - inputs.price },
    weightedScore: null
  }
}

export function calcB(inputs) {
  const depositPct = Math.max(inputs.depositPct, 10)
  const depositAmount = inputs.price * depositPct / 100
  const baseLoan = inputs.price - depositAmount
  const lmiAmount = calcLMI(baseLoan, inputs.price)
  const loanAmount = baseLoan + lmiAmount
  const dutyAmount = standardDuty(inputs.price)
  const legalFees = 2700
  const upfrontTotal = depositAmount + dutyAmount + legalFees
  const availableCapital = inputs.savings + inputs.stocks + inputs.familyLoan
  const cashBuffer = availableCapital - upfrontTotal

  const fhogForfeited = inputs.isFHB && inputs.isNewBuild && inputs.price < 750000 ? 30000 : 0
  const dutyWithFHB = calcDuty(inputs.price, inputs.isNewBuild, true)
  const dutyForfeited = standardDuty(inputs.price) - dutyWithFHB
  const lmiWithFHBG = inputs.isFHB && inputs.price <= 1000000 && depositPct >= 5 ? 0 : calcLMI(baseLoan, inputs.price)
  const lmiForfeited = calcLMI(baseLoan, inputs.price) - lmiWithFHBG
  const totalForfeited = fhogForfeited + dutyForfeited + lmiForfeited

  const weeklyNetIncome = netWeekly(inputs.incomeA) + netWeekly(inputs.incomeB)
  const weeklyMortgage = inputs.isIO ? weeklyIO(loanAmount, inputs.invRate) : weeklyPI(loanAmount, inputs.invRate, inputs.loanTerm)
  const weeklyRentReceived = inputs.weeklyRent * (52 - inputs.vacancyWeeks) / 52
  const weeklyMgmtFee = weeklyRentReceived * inputs.mgmtPct / 100
  const weeklyCouncil = inputs.annualCouncil / 52
  const weeklyInsurance = inputs.annualInsurance / 52
  const weeklyMaintenance = inputs.price * inputs.maintPct / 100 / 52
  const weeklyBodyCorp = inputs.bodyCorpAnnual / 52

  const grossRentAnnual = weeklyRentReceived * 52
  const interestYear1 = yearlyInterest(loanAmount, inputs.invRate, inputs.loanTerm, 1)
  const mgmtFeeAnnual = grossRentAnnual * inputs.mgmtPct / 100
  const maintenanceAnnual = inputs.price * inputs.maintPct / 100
  const depreciationAnnual = inputs.autoDepreciation ? autoDepr(inputs.price, inputs.isNewBuild) : inputs.manualDepr
  const netRentalResult = grossRentAnnual - interestYear1 - mgmtFeeAnnual - maintenanceAnnual - depreciationAnnual - inputs.annualCouncil - inputs.annualInsurance - inputs.bodyCorpAnnual

  let taxRefundAnnual = 0
  if (netRentalResult < 0) {
    const loss = Math.abs(netRentalResult)
    taxRefundAnnual = (loss / 2) * marginalRate(inputs.incomeA) + (loss / 2) * marginalRate(inputs.incomeB)
  }
  const weeklyTaxSaving = taxRefundAnnual / 52
  const effectiveAfterTaxCost = Math.max(0, Math.abs(netRentalResult) - taxRefundAnnual)

  const weeklySurplus = weeklyNetIncome - weeklyMortgage - inputs.weeklyRentPaid + weeklyRentReceived - weeklyMgmtFee - weeklyCouncil - weeklyInsurance - weeklyMaintenance - weeklyBodyCorp + weeklyTaxSaving - inputs.weeklyLiving

  const projs = buildProjection(inputs, loanAmount, inputs.invRate, 'B', 0, 0)
  const lastProj = projs[projs.length - 1]
  const salePrice = lastProj.propertyValue

  const cgt = calcCGT({
    salePrice,
    purchasePrice: inputs.price,
    sellingCostsPct: inputs.sellingCostsPct,
    incomeA: inputs.incomeA,
    incomeB: inputs.incomeB,
    isPPOR: false,
    cgtExempt: false
  })

  const depositNote = inputs.depositPct < 10 ? 'Deposit floored to 10% minimum for investment loans' : null

  return {
    type: 'B',
    label: 'Rentvest (Investment)',
    price: inputs.price,
    depositPct,
    depositAmount,
    loanAmount,
    lmiAmount,
    dutyAmount,
    legalFees,
    upfrontTotal,
    availableCapital,
    cashBuffer,
    fhogForfeited,
    dutyForfeited,
    lmiForfeited,
    totalForfeited,
    weeklyNetIncome,
    weeklyMortgage,
    weeklyRentPaid: inputs.weeklyRentPaid,
    weeklyRentReceived,
    weeklyMgmtFee,
    weeklyTaxSaving,
    weeklyCouncil,
    weeklyInsurance,
    weeklyMaintenance,
    weeklyBodyCorp,
    weeklyLiving: inputs.weeklyLiving,
    weeklySurplus,
    grossRentAnnual,
    interestYear1,
    mgmtFeeAnnual,
    maintenanceAnnual,
    depreciationAnnual,
    netRentalResult,
    taxRefundAnnual,
    effectiveAfterTaxCost,
    projs,
    cgt,
    depositNote,
    weightedScore: null
  }
}

export function calcC(inputs) {
  const depositPct = Math.max(inputs.depositPct, 5)
  const depositAmount = inputs.price * depositPct / 100
  const baseLoan = inputs.price - depositAmount
  const loanAmount = baseLoan
  const fhogEligible = inputs.price < 750000 && inputs.isFHB
  const fhogAmount = fhogEligible ? 30000 : 0
  const fhbgEligible = inputs.isFHB && inputs.price <= 1000000
  const cgtExempt = inputs.isFHB && inputs.holdingYears <= 7
  const legalFees = 2700
  const upfrontTotal = depositAmount + legalFees - fhogAmount
  const availableCapital = inputs.savings + inputs.stocks + inputs.familyLoan
  const cashBuffer = availableCapital - upfrontTotal

  const weeklyNetIncome = netWeekly(inputs.incomeA) + netWeekly(inputs.incomeB)
  const weeklyMortgageOO = weeklyPI(loanAmount, inputs.ooRate, inputs.loanTerm)
  const weeklyOwnerCosts = (inputs.annualCouncil + inputs.annualInsurance + inputs.bodyCorpAnnual + inputs.price * inputs.maintPct / 100) / 52
  const weeklyCommuteExtra = inputs.commuteExtra
  const ph1Surplus = weeklyNetIncome - weeklyMortgageOO - weeklyOwnerCosts - weeklyCommuteExtra - inputs.weeklyLiving

  const weeklyMortgageINV = weeklyPI(loanAmount, inputs.invRate, inputs.loanTerm)
  const weeklyRentReceived = inputs.weeklyRent * (52 - inputs.vacancyWeeks) / 52
  const weeklyMgmtFee = weeklyRentReceived * inputs.mgmtPct / 100

  const grossRentAnnual = weeklyRentReceived * 52
  const interestYear2 = yearlyInterest(loanAmount, inputs.invRate, inputs.loanTerm, 2)
  const depreciationAnnual = autoDepr(inputs.price, true)
  const mgmtFeeAnnual = grossRentAnnual * inputs.mgmtPct / 100
  const maintenanceAnnual = inputs.price * inputs.maintPct / 100
  const netRentalResult = grossRentAnnual - interestYear2 - mgmtFeeAnnual - maintenanceAnnual - depreciationAnnual - inputs.annualCouncil - inputs.annualInsurance - inputs.bodyCorpAnnual

  let taxRefundAnnual = 0
  if (netRentalResult < 0) {
    const loss = Math.abs(netRentalResult)
    taxRefundAnnual = (loss / 2) * marginalRate(inputs.incomeA) + (loss / 2) * marginalRate(inputs.incomeB)
  }
  const weeklyTaxSaving = taxRefundAnnual / 52

  const ph2Surplus = weeklyNetIncome - weeklyMortgageINV - inputs.weeklyRentPaid + weeklyRentReceived - weeklyMgmtFee - weeklyOwnerCosts + weeklyTaxSaving - inputs.weeklyLiving

  const projs = buildProjection(inputs, loanAmount, inputs.invRate, 'C', ph1Surplus, ph2Surplus)
  const lastProj = projs[projs.length - 1]
  const salePrice = lastProj.propertyValue

  const cgt = calcCGT({
    salePrice,
    purchasePrice: inputs.price,
    sellingCostsPct: inputs.sellingCostsPct,
    incomeA: inputs.incomeA,
    incomeB: inputs.incomeB,
    isPPOR: false,
    cgtExempt
  })

  return {
    type: 'C',
    label: 'Smart Hybrid (New Build)',
    price: inputs.price,
    depositPct,
    depositAmount,
    loanAmount,
    lmiAmount: 0,
    dutyAmount: 0,
    legalFees,
    fhogAmount,
    fhogEligible,
    fhbgEligible,
    cgtExempt,
    upfrontTotal,
    availableCapital,
    cashBuffer,
    weeklyMortgageOO,
    weeklyCommuteExtra,
    ph1Surplus,
    weeklyMortgageINV,
    weeklyRentPaid: inputs.weeklyRentPaid,
    weeklyRentReceived,
    weeklyTaxSaving,
    ph2Surplus,
    weeklySurplus: ph2Surplus,
    grossRentAnnual,
    interestYear2,
    mgmtFeeAnnual,
    maintenanceAnnual,
    depreciationAnnual,
    netRentalResult,
    taxRefundAnnual,
    effectiveAfterTaxCost: netRentalResult < 0 ? Math.max(0, Math.abs(netRentalResult) - taxRefundAnnual) : 0,
    projs,
    cgt,
    weightedScore: null
  }
}

export function calcAll(inputs) {
  const A = calcA(inputs)
  const B = calcB(inputs)
  const C = calcC(inputs)
  const lastA = A.projs[A.projs.length - 1]
  const lastB = B.projs[B.projs.length - 1]
  const lastC = C.projs[C.projs.length - 1]
  const wealthA = lastA.totalWealth
  const wealthB = lastB.totalWealth - B.cgt.totalCGT
  const wealthC = lastC.totalWealth - C.cgt.totalCGT
  A.weightedScore = scoreScenario('A', A.weeklySurplus, wealthA, [wealthA, wealthB, wealthC])
  B.weightedScore = scoreScenario('B', B.weeklySurplus, wealthB, [wealthA, wealthB, wealthC])
  C.weightedScore = scoreScenario('C', C.weeklySurplus, wealthC, [wealthA, wealthB, wealthC])
  return { A, B, C }
}
