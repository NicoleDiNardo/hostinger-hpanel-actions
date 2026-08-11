import type { ActionFilter } from '../../lib/priority'
import styles from './Filters.module.css'

const FILTERS: { id: ActionFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical' },
  { id: 'expiring', label: 'Expiring' },
  { id: 'setup', label: 'Setup' },
  { id: 'access', label: 'Access' },
  { id: 'offers', label: 'Offers' },
]

interface Props {
  value: ActionFilter
  onChange: (value: ActionFilter) => void
}

export function Filters({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Severity</p>
      <div className={styles.row} role="tablist" aria-label="Severity filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={value === f.id}
            className={value === f.id ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => onChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
