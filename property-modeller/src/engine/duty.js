export function standardDuty(price) {
  if (price <= 5000) return 0
  if (price <= 75000) return (price - 5000) * 0.015
  if (price <= 540000) return 1050 + (price - 75000) * 0.035
  if (price <= 1000000) return 17325 + (price - 540000) * 0.045
  return 38025 + (price - 1000000) * 0.0575
}

export function calcDuty(price, isNewBuild, isFHB) {
  if (!isFHB) return standardDuty(price)
  if (isNewBuild) return 0
  if (price < 700000) return 0
  if (price <= 800000) {
    const concession = 17325 * ((800000 - price) / 100000)
    return Math.max(0, standardDuty(price) - concession)
  }
  return standardDuty(price)
}
