import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GROUP_ORDER, SITES } from '../data/actions'
import { useActions } from '../context/ActionsContext'
import { ActionCard } from '../components/actions/ActionCard'
import { Filters } from '../components/actions/Filters'
import type { ActionFilter } from '../lib/priority'
import styles from './ActionCentre.module.css'

const FILTER_TITLE: Record<ActionFilter, string> = {
  all: 'Open actions',
  critical: 'Critical',
  expiring: 'Expiring',
  setup: 'Setup',
  access: 'Access',
  offers: 'Offers',
}

const FILTER_IDS = Object.keys(FILTER_TITLE) as ActionFilter[]

function parseFilter(raw: string | null): ActionFilter {
  if (raw && FILTER_IDS.includes(raw as ActionFilter)) return raw as ActionFilter
  return 'all'
}

function parseSite(raw: string | null): string {
  if (raw && SITES.includes(raw)) return raw
  return 'All sites'
}

export function ActionCentre() {
  const { activeActions, filterActions, badgeCount, journey } = useActions()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<ActionFilter>(() =>
    parseFilter(searchParams.get('filter')),
  )
  const [site, setSite] = useState(() => parseSite(searchParams.get('site')))

  // Journey presets / deep links can change the URL or inventory
  useEffect(() => {
    setFilter(parseFilter(searchParams.get('filter')))
    setSite(parseSite(searchParams.get('site')))
  }, [searchParams, journey])

  const setFilterAndUrl = (next: ActionFilter) => {
    setFilter(next)
    const params = new URLSearchParams(searchParams)
    if (next === 'all') params.delete('filter')
    else params.set('filter', next)
    setSearchParams(params, { replace: true })
  }

  const setSiteAndUrl = (next: string) => {
    setSite(next)
    const params = new URLSearchParams(searchParams)
    if (next === 'All sites') params.delete('site')
    else params.set('site', next)
    setSearchParams(params, { replace: true })
  }

  const visible = filterActions(filter, site)

  const titleCount =
    filter === 'all' && site === 'All sites'
      ? badgeCount
      : filter === 'offers'
        ? visible.length
        : visible.filter((a) => a.tier !== 'P4').length || visible.length

  const grouped = useMemo(() => {
    const map = new Map<string, typeof visible>()
    for (const action of visible) {
      const key = action.group
      const list = map.get(key) ?? []
      list.push(action)
      map.set(key, list)
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map(
      (g) => [g, map.get(g)!] as const,
    )
  }, [visible])

  const empty = visible.length === 0

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Actions</h1>
        <p className={styles.subtitle}>
          Grouped by site · filter by severity or site
        </p>
      </header>

      <div className={styles.openHead}>
        <h2 className={styles.openTitle}>
          {FILTER_TITLE[filter]}
          {site !== 'All sites' && filter === 'all' ? ` · ${site}` : ''}
        </h2>
        {!empty && titleCount > 0 ? (
          <span className={styles.openCount}>{titleCount}</span>
        ) : null}
      </div>

      <div className={styles.toolbar}>
        <Filters value={filter} onChange={setFilterAndUrl} />
        <label className={styles.siteFilter}>
          <span className={styles.siteLabel}>Site</span>
          <span className={styles.siteSelectWrap}>
            <select
              className={styles.siteSelect}
              value={site}
              onChange={(e) => setSiteAndUrl(e.target.value)}
            >
              {SITES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <img
              className={styles.siteChevron}
              src="/icons/chevron-down.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
        </label>
      </div>

      {empty ? (
        <div className={styles.empty}>
          <h2>You’re all caught up</h2>
          <p>
            No open actions. When something needs you, it shows up here.
          </p>
        </div>
      ) : (
        <div className={styles.groups}>
          {grouped.map(([groupName, items]) => (
            <section key={groupName} className={styles.group}>
              <h3
                className={
                  groupName === 'Offers'
                    ? `${styles.groupTitle} ${styles.groupOffers}`
                    : styles.groupTitle
                }
              >
                {groupName}
                <span
                  className={
                    groupName === 'Offers'
                      ? styles.groupCountHidden
                      : styles.groupCount
                  }
                >
                  {items.length} open
                </span>
              </h3>
              <div className={styles.list}>
                {items.map((action) => (
                  <ActionCard key={action.id} action={action} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <span className={styles.srOnly}>{activeActions.length}</span>
    </div>
  )
}
