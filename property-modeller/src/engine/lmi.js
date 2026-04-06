export function calcLMI(loanAmount, propertyPrice) {
  const lvr = loanAmount / propertyPrice
  if (lvr <= 0.80) return 0
  if (lvr <= 0.85) return loanAmount * 0.0066
  if (lvr <= 0.90) return loanAmount * 0.016
  if (lvr <= 0.95) return loanAmount * 0.024
  return loanAmount * 0.030
}
