import { Link } from 'react-router-dom'
import { NUDGE_TIER_MAP, TIER_LABEL, type PriorityTier } from '../../lib/priority'
import styles from '../Worksheet.module.css'

const TIERS: PriorityTier[] = ['P0', 'P1', 'P2', 'P3', 'P4']

const HOME: Record<PriorityTier, string> = {
  P0: 'All Critical actions on Home + badge',
  P1: 'Action Centre (default weight)',
  P2: 'Action Centre · Setup filter',
  P3: 'Action Centre · Access filter',
  P4: 'Offers only — never on Home',
}

export function WorksheetModel() {
  const byTier = TIERS.map((tier) => ({
    tier,
    nudges: Object.entries(NUDGE_TIER_MAP)
      .filter(([, t]) => t === tier)
      .map(([key]) => key),
  }))

  return (
    <article className={styles.board}>
      <p className={styles.kicker}>02 · Priority model</p>
      <h1>How nudges earn a place</h1>
      <p className={styles.deck}>
        The brief’s nudge list is inspiration. We map each type into P0–P4 so Home,
        badge, and Action Centre stay coherent as products grow.
      </p>

      <div className={styles.tierTable}>
        {byTier.map(({ tier, nudges }) => (
          <section key={tier} className={`${styles.tierRow} ${styles[tier]}`}>
            <div className={styles.tierHead}>
              <span className={styles.tierBadge}>{tier}</span>
              <div>
                <h2>{TIER_LABEL[tier]}</h2>
                <p>{HOME[tier]}</p>
              </div>
              <span className={styles.nudgeCount}>{nudges.length} types</span>
            </div>
            <div className={styles.nudgeChips}>
              {nudges.map((n) => (
                <code key={n}>{n}</code>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.card}>
        <h2>Multi-site rule</h2>
        <p>
          Group Action Centre rows by site/product. Home lists all Critical (P0) actions
          across sites and always names the affected property (“Affects rocketman.xyz”).
        </p>
      </section>

      <p className={styles.next}>
        <Link to="/worksheet">← Framing</Link>
        <Link to="/worksheet/flows">03 Flows →</Link>
      </p>
    </article>
  )
}
