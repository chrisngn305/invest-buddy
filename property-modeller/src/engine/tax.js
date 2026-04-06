export function incomeTax(gross) {
  let tax = 0
  if (gross <= 18200) tax = 0
  else if (gross <= 45000) tax = (gross - 18200) * 0.19
  else if (gross <= 120000) tax = 5092 + (gross - 45000) * 0.325
  else if (gross <= 180000) tax = 29467 + (gross - 120000) * 0.37
  else tax = 51667 + (gross - 180000) * 0.45
  const medicare = gross * 0.02
  return tax + medicare
}

export function netAnnual(gross) {
  return gross - incomeTax(gross)
}

export function netWeekly(gross) {
  return netAnnual(gross) / 52
}

export function marginalRate(gross) {
  if (gross <= 18200) return 0
  if (gross <= 45000) return 0.19
  if (gross <= 120000) return 0.325
  if (gross <= 180000) return 0.37
  return 0.45
}
