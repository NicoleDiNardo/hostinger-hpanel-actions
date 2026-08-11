import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { INITIAL_ACTIONS, type PanelAction } from '../data/actions'
import {
  FILTER_TO_TIERS,
  TIER_RANK,
  type ActionFilter,
  type PriorityTier,
} from '../lib/priority'

/** Demo start states matching Figma journeys A / B / C */
export type DemoJourney = 'A' | 'B' | 'C'

function cloneInitial(): PanelAction[] {
  return INITIAL_ACTIONS.map((a) => ({ ...a }))
}

/** A = full inventory · B = Access-only (B1) · C = after email snooze (C1) */
export function actionsForJourney(journey: DemoJourney): PanelAction[] {
  const base = cloneInitial()
  if (journey === 'A') return base
  if (journey === 'B') {
    return base.map((a) =>
      a.nudgeType === 'requested_access'
        ? { ...a, status: 'active' as const }
        : { ...a, status: 'dismissed' as const },
    )
  }
  return base.map((a) =>
    a.nudgeType === 'email_plan_expiring'
      ? { ...a, status: 'snoozed' as const }
      : a,
  )
}

interface ActionsContextValue {
  actions: PanelAction[]
  activeActions: PanelAction[]
  criticalHomeActions: PanelAction[]
  badgeCount: number
  toast: string | null
  journey: DemoJourney
  dismiss: (id: string) => void
  snooze: (id: string) => void
  runCta: (action: PanelAction) => void
  clearToast: () => void
  resetDemo: () => void
  loadJourney: (journey: DemoJourney) => void
  filterActions: (filter: ActionFilter, site: string) => PanelAction[]
}

const ActionsContext = createContext<ActionsContextValue | null>(null)

function sortActions(list: PanelAction[]): PanelAction[] {
  return [...list].sort((a, b) => {
    const tierDiff = TIER_RANK[a.tier] - TIER_RANK[b.tier]
    if (tierDiff !== 0) return tierDiff
    const da = a.daysLeft ?? 999
    const db = b.daysLeft ?? 999
    return da - db
  })
}

export function ActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<PanelAction[]>(INITIAL_ACTIONS)
  const [toast, setToast] = useState<string | null>(null)
  const [journey, setJourney] = useState<DemoJourney>('A')

  const activeActions = useMemo(
    () => sortActions(actions.filter((a) => a.status === 'active')),
    [actions],
  )

  const criticalHomeActions = useMemo(
    () => activeActions.filter((a) => a.tier === 'P0'),
    [activeActions],
  )

  const badgeCount = activeActions.filter((a) =>
    (['P0', 'P1', 'P2', 'P3'] as PriorityTier[]).includes(a.tier),
  ).length

  const dismiss = useCallback((id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'dismissed' } : a)),
    )
  }, [])

  const snooze = useCallback((id: string) => {
    setActions((prev) => {
      const target = prev.find((a) => a.id === id)
      if (target?.nudgeType === 'email_plan_expiring') {
        setToast('Snoozed for 7 days · Business Starter Email')
      } else {
        setToast(`Snoozed for 7 days · ${target?.title ?? 'Action'}`)
      }
      return prev.map((a) => (a.id === id ? { ...a, status: 'snoozed' } : a))
    })
  }, [])

  const runCta = useCallback((action: PanelAction) => {
    if (action.nudgeType === 'hosting_plan_cancelled') {
      setActions((prev) =>
        prev.map((a) =>
          a.id === action.id ? { ...a, status: 'dismissed' } : a,
        ),
      )
      setToast('Hosting restored · rocketman.xyz is back online')
      return
    }

    if (action.nudgeType === 'requested_access') {
      setActions((prev) =>
        prev.map((a) =>
          a.id === action.id ? { ...a, status: 'dismissed' } : a,
        ),
      )
      setToast('Access granted · justina@gmail.com')
      return
    }

    if (action.nudgeType === 'email_plan_expiring') {
      setToast('Would open “Renew” for Business Starter Email')
      return
    }

    setToast(`Would open “${action.ctaLabel}”`)
  }, [])

  const clearToast = useCallback(() => setToast(null), [])

  const loadJourney = useCallback((next: DemoJourney) => {
    setJourney(next)
    setActions(actionsForJourney(next))
    if (next === 'C') {
      setToast('Snoozed for 7 days · Business Starter Email')
    } else {
      setToast(null)
    }
  }, [])

  const resetDemo = useCallback(() => {
    loadJourney('A')
  }, [loadJourney])

  const filterActions = useCallback(
    (filter: ActionFilter, site: string) => {
      const tiers = FILTER_TO_TIERS[filter]
      return activeActions.filter((a) => {
        const tierOk = !tiers || tiers.includes(a.tier)
        const siteOk =
          site === 'All sites' ||
          a.site === site ||
          (site !== 'All sites' && a.group === site)
        return tierOk && siteOk
      })
    },
    [activeActions],
  )

  const value: ActionsContextValue = {
    actions,
    activeActions,
    criticalHomeActions,
    badgeCount,
    toast,
    journey,
    dismiss,
    snooze,
    runCta,
    clearToast,
    resetDemo,
    loadJourney,
    filterActions,
  }

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  )
}

export function useActions() {
  const ctx = useContext(ActionsContext)
  if (!ctx) throw new Error('useActions must be used within ActionsProvider')
  return ctx
}
