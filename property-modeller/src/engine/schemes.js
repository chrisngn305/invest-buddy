import { calcLMI } from './lmi.js'
import { calcDuty, standardDuty } from './duty.js'

export function assessSchemes(price, isNewBuild, isFHB, depositPct, loanAmount) {
  const fhogEligible = isFHB && isNewBuild && price < 750000
  const fhogAmount = fhogEligible ? 30000 : 0
  const fhbgEligible = isFHB && price <= 1000000 && depositPct >= 5
  const lmiAmount = fhbgEligible ? 0 : calcLMI(loanAmount, price)
  const lmiSaved = fhbgEligible ? calcLMI(loanAmount, price) : 0
  const dutyAmount = calcDuty(price, isNewBuild, isFHB)
  const dutySaved = standardDuty(price) - dutyAmount
  const dutyExempt = dutyAmount === 0

  return {
    fhogEligible,
    fhogAmount,
    fhbgEligible,
    lmiAmount,
    lmiSaved,
    dutyAmount,
    dutySaved,
    dutyExempt
  }
}
