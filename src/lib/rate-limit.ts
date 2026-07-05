const hits = new Map<string, number[]>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 3

export function isRateLimited(key: string) {
  const now = Date.now()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(key, timestamps)
  return false
}
