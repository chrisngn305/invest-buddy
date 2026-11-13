// Fetches the latest housing lending rates + cash rate from the RBA and writes
// public/rba-rates.json. Run weekly by .github/workflows/rba-rates.yml
// (the RBA doesn't send CORS headers, so the browser can't fetch these directly).
//
//   node scripts/fetch-rba-rates.mjs

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const OUT = fileURLToPath(new URL('../public/rba-rates.json', import.meta.url))
const BASE = 'https://www.rba.gov.au/statistics/tables/csv'

// F6: Housing lending rates. "New loans funded in the month; Variable-rate; All institutions"
const F6 = { url: `${BASE}/f6-data.csv`, oo: 'FLRHOFVA', inv: 'FLRHIFVA' }
// F1.1: Money market. Cash Rate Target
const F11 = { url: `${BASE}/f1.1-data.csv`, cash: 'FIRMMCRT' }

// Minimal CSV parser (handles quoted fields with commas)
function parseCsv(text) {
  return text.replace(/^﻿/, '').split(/\r?\n/).map(line => {
    const out = []
    let cur = '', q = false
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (q) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ }
        else if (c === '"') q = false
        else cur += c
      } else if (c === '"') q = true
      else if (c === ',') { out.push(cur); cur = '' }
      else cur += c
    }
    out.push(cur)
    return out
  })
}

// Returns { date: 'YYYY-MM-DD', value: Number } for the latest non-empty observation of each series
async function latest(url, seriesIds) {
  const res = await fetch(url, { headers: { 'User-Agent': 'property-modeller-rates-fetcher' } })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  const rows = parseCsv(await res.text())
  const ids = rows.find(r => r[0] === 'Series ID')
  if (!ids) throw new Error(`${url}: no "Series ID" row`)
  const data = rows.filter(r => /^\d{2}\/\d{2}\/\d{4}$/.test(r[0]))

  const result = {}
  for (const [key, id] of Object.entries(seriesIds)) {
    const col = ids.indexOf(id)
    if (col < 0) throw new Error(`${url}: series ${id} not found`)
    const row = data.findLast(r => r[col] !== undefined && r[col].trim() !== '')
    if (!row) throw new Error(`${url}: no data for ${id}`)
    const value = Number(row[col])
    if (!Number.isFinite(value) || value <= 0 || value > 25) throw new Error(`${id}: implausible value ${row[col]}`)
    const [d, m, y] = row[0].split('/')
    result[key] = { date: `${y}-${m}-${d}`, value }
  }
  return result
}

const [f6, f11] = await Promise.all([
  latest(F6.url, { ooRate: F6.oo, invRate: F6.inv }),
  latest(F11.url, { cashRate: F11.cash }),
])

const payload = {
  fetchedAt: new Date().toISOString(),
  ooRate: f6.ooRate.value,
  invRate: f6.invRate.value,
  ratesAsOf: f6.ooRate.date,
  cashRate: f11.cashRate.value,
  cashRateAsOf: f11.cashRate.date,
  source: 'RBA F6 (new variable housing loans, all institutions) & F1.1 (cash rate target)',
}

await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n')
console.log(`Wrote ${OUT}`, payload)
