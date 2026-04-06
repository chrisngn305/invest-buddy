import { incomeTax } from './tax.js'

export function calcCGT({ salePrice, purchasePrice, sellingCostsPct, incomeA, incomeB, isPPOR, cgtExempt }) {
  const sellingCosts = salePrice * sellingCostsPct / 100
  const grossGain = salePrice - purchasePrice - sellingCosts

  if (isPPOR || cgtExempt) {
    return {
      grossGain,
      taxableGain: 0,
      totalCGT: 0,
      netProceeds: salePrice - sellingCosts,
      cgtA: 0,
      cgtB: 0,
      exempt: true
    }
  }

  if (grossGain <= 0) {
    return {
      grossGain,
      taxableGain: 0,
      totalCGT: 0,
      netProceeds: salePrice - sellingCosts,
      cgtA: 0,
      cgtB: 0,
      exempt: false
    }
  }

  const taxableGain = grossGain * 0.5
  const shareA = taxableGain / 2
  const shareB = taxableGain / 2

  const cgtA = incomeTax(incomeA + shareA) - incomeTax(incomeA)
  const cgtB = incomeTax(incomeB + shareB) - incomeTax(incomeB)
  const totalCGT = cgtA + cgtB

  return {
    grossGain,
    taxableGain,
    cgtA,
    cgtB,
    totalCGT,
    netProceeds: salePrice - sellingCosts - totalCGT,
    exempt: false
  }
}
