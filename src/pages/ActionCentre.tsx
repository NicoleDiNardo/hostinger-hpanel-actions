import { useMemo, useState } from 'react'
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

export function ActionCentre() {
  const { activeActions, filterActions, badgeCount } = useActions()
  const [filter, setFilter] = useState<ActionFilter>('all')
  const [site, setSite] = useState('All sites')

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
        <Filters value={filter} onChange={setFilter} />
        <label className={styles.siteFilter}>
          <span className={styles.siteLabel}>Site</span>
          <span className={styles.siteSelectWrap}>
            <select
              className={styles.siteSelect}
              value={site}
              onChange={(e) => setSite(e.target.value)}
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
