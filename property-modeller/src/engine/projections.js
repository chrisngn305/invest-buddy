import { netWeekly, marginalRate, incomeTax } from './tax.js'
import { loanBalance, yearlyInterest, weeklyPI } from './mortgage.js'

function autoDepr(price, isNew) {
  return isNew ? price * 0.012 : price * 0.004
}

export function buildProjection(inputs, loanAmount, annualRate, scenarioType, ph1Surplus, ph2Surplus) {
  const rows = []
  let propertyValue = inputs.price
  let cumulativeSavings = 0

  for (let year = 1; year <= inputs.holdingYears; year++) {
    const growthRate = year <= 2 ? inputs.growthY1 / 100 : inputs.growthY3 / 100
    propertyValue = propertyValue * (1 + growthRate)

    const currentLoanBalance = inputs.isIO
      ? loanAmount
      : loanBalance(loanAmount, annualRate, inputs.loanTerm, year * 12)

    const equity = propertyValue - currentLoanBalance

    const rentEscalation = Math.pow(1 + inputs.rentIncrease / 100, year - 1)
    const currentWeeklyRent = inputs.weeklyRent * rentEscalation
    const grossRent = currentWeeklyRent * (52 - inputs.vacancyWeeks)

    const currentIncomeA = inputs.incomeA * Math.pow(1 + inputs.incomeGrowth / 100, year - 1)
    const currentIncomeB = inputs.incomeB * Math.pow(1 + inputs.incomeGrowth / 100, year - 1)

    const interestPaid = inputs.isIO
      ? loanAmount * annualRate / 100
      : yearlyInterest(loanAmount, annualRate, inputs.loanTerm, year)

    const managementFee = grossRent * inputs.mgmtPct / 100
    const maintenance = inputs.price * inputs.maintPct / 100
    const councilRates = inputs.annualCouncil
    const insurance = inputs.annualInsurance
    const bodyCorp = inputs.bodyCorpAnnual
    const depreciation = inputs.autoDepreciation
      ? autoDepr(inputs.price, inputs.isNewBuild)
      : inputs.manualDepr

    const netRentalResult = grossRent - interestPaid - managementFee - maintenance - councilRates - insurance - bodyCorp - depreciation

    let taxRefund = 0
    if (netRentalResult < 0) {
      const loss = Math.abs(netRentalResult)
      const shareA = loss / 2
      const shareB = loss / 2
      const refundA = shareA * marginalRate(currentIncomeA)
      const refundB = shareB * marginalRate(currentIncomeB)
      taxRefund = refundA + refundB
    }

    const weeklyNetIncome = netWeekly(currentIncomeA) + netWeekly(currentIncomeB)
    const weeklyMort = weeklyPI(loanAmount, annualRate, inputs.loanTerm)
    const weeklyOwner = (inputs.annualCouncil + inputs.annualInsurance + inputs.bodyCorpAnnual + inputs.price * inputs.maintPct / 100) / 52

    let weeklySurplus
    if (scenarioType === 'A') {
      weeklySurplus = weeklyNetIncome - weeklyMort - weeklyOwner - 150 - inputs.weeklyLiving
    } else if (scenarioType === 'B') {
      const weeklyRentNet = (currentWeeklyRent * (52 - inputs.vacancyWeeks) / 52) * (1 - inputs.mgmtPct / 100)
      weeklySurplus = weeklyNetIncome - weeklyMort - inputs.weeklyRentPaid + weeklyRentNet - weeklyOwner + taxRefund / 52 - inputs.weeklyLiving
    } else {
      weeklySurplus = year === 1 ? ph1Surplus : ph2Surplus
    }

    const annualSavings = weeklySurplus * 52
    cumulativeSavings += annualSavings
    const totalWealth = equity + cumulativeSavings

    rows.push({
      year,
      propertyValue,
      loanBalance: currentLoanBalance,
      equity,
      grossRent,
      interestPaid,
      managementFee,
      maintenance,
      councilRates,
      insurance,
      bodyCorp,
      depreciation,
      netRentalResult,
      taxRefund,
      weeklySurplus,
      annualSavings,
      cumulativeSavings,
      totalWealth
    })
  }

  return rows
}
