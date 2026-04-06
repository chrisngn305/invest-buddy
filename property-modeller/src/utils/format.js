export const fDollar = (n, short = false) => {
  const v = Math.round(+n || 0)
  const abs = Math.abs(v)
  let s
  if (short && abs >= 1_000_000) s = '$' + (abs / 1_000_000).toFixed(2) + 'M'
  else if (short && abs >= 1_000) s = '$' + Math.round(abs / 1_000) + 'k'
  else s = '$' + abs.toLocaleString('en-AU')
  return v < 0 ? '-' + s : s
}

export const fWeekly = (n) => fDollar(n) + '/pw'
export const fPct = (n) => (+n).toFixed(2) + '%'
export const fSign = (n) => +n >= 0 ? 'positive' : 'negative'
