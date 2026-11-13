// Loads the RBA rates snapshot (refreshed weekly by a GitHub Action into public/rba-rates.json)
// and applies it to the inputs store. Falls back silently to the store defaults on failure.

export async function applyRbaRates(inputs) {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}rba-rates.json`, { cache: 'no-cache' })
    if (!res.ok) return
    const data = await res.json()
    if (!Number.isFinite(data.ooRate) || !Number.isFinite(data.invRate)) return

    inputs.ooRate = data.ooRate
    inputs.invRate = data.invRate
    inputs.rbaRates = data
  } catch {
    // offline / file missing: keep defaults
  }
}
