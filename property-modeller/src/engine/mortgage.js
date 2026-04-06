export function weeklyPI(principal, annualRate, years) {
  const r = annualRate / 100 / 52
  const n = years * 52
  if (r === 0) return principal / n
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
}

export function weeklyIO(principal, annualRate) {
  return principal * (annualRate / 100) / 52
}

export function loanBalance(principal, annualRate, years, atMonth) {
  const rm = annualRate / 100 / 12
  const n = years * 12
  if (rm === 0) return Math.max(0, principal - (principal / n) * atMonth)
  const pmt = principal * rm * Math.pow(1 + rm, n) / (Math.pow(1 + rm, n) - 1)
  const balance = principal * Math.pow(1 + rm, atMonth) - pmt * (Math.pow(1 + rm, atMonth) - 1) / rm
  return Math.max(0, balance)
}

export function yearlyInterest(principal, annualRate, years, year) {
  const balStart = loanBalance(principal, annualRate, years, (year - 1) * 12)
  const balEnd = loanBalance(principal, annualRate, years, year * 12)
  const pmt = weeklyPI(principal, annualRate, years) * 52
  return pmt - (balStart - balEnd)
}
