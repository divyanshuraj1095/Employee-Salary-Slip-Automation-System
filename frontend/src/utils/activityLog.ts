import type { ActivityItem } from '../types/employee'

const STORAGE_KEY = 'payrollpro_activity'
const STATS_KEY = 'payrollpro_stats'

export interface StoredStats {
  slipsGenerated: number
  emailsSent: number
}

export function getActivities(): ActivityItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ActivityItem[]) : []
  } catch {
    return []
  }
}

export function addActivity(
  type: ActivityItem['type'],
  title: string,
  detail: string,
) {
  const item: ActivityItem = {
    id: crypto.randomUUID(),
    type,
    title,
    detail,
    timestamp: new Date().toISOString(),
  }
  const list = [item, ...getActivities()].slice(0, 20)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return item
}

export function getStoredStats(): StoredStats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    return raw
      ? (JSON.parse(raw) as StoredStats)
      : { slipsGenerated: 0, emailsSent: 0 }
  } catch {
    return { slipsGenerated: 0, emailsSent: 0 }
  }
}

export function updateStoredStats(partial: Partial<StoredStats>) {
  const current = getStoredStats()
  localStorage.setItem(
    STATS_KEY,
    JSON.stringify({ ...current, ...partial }),
  )
}
