import { Link } from 'react-router-dom'
import { useActions } from '../context/ActionsContext'
import { PriorityStrip } from '../components/actions/PriorityStrip'
import styles from './Home.module.css'

export function Home() {
  const { criticalHomeActions, badgeCount, activeActions, actions } =
    useActions()
  const criticalCount = criticalHomeActions.length
  const moreCount = Math.max(0, badgeCount - criticalCount)
  const hostingRestored = actions.some(
    (a) =>
      a.nudgeType === 'hosting_plan_cancelled' && a.status === 'dismissed',
  )

  const rocketCritical = criticalHomeActions.filter(
    (a) => a.site === 'rocketman.xyz',
  ).length

  let rocketStatus = 'All clear · no open actions'
  if (rocketCritical >= 2) {
    rocketStatus = '2 Critical actions · hosting cancelled + domain expired'
  } else if (rocketCritical === 1) {
    rocketStatus = 'Domain expired · renew needed'
  }

  // Match Figma A1: studio-bloom shows All clear on Home even with AC open items
  const studioStatus = 'All clear · no open actions'

  let summaryTitle = 'Actions · all clear'
  let summaryHint = 'Nothing needs you right now'
  let pageSubtitle = 'All clear · your websites, nothing interrupting'

  if (badgeCount > 0) {
    summaryTitle = `Actions · ${badgeCount} open`
    pageSubtitle = 'Your websites first · Critical actions list on Home'
    if (criticalCount > 0) {
      summaryHint =
        criticalCount === 1 && hostingRestored
          ? '1 critical remaining on Home · domain expired'
          : criticalCount === 1
            ? '1 Critical on Home · open Action Centre for the rest'
            : `${criticalCount} Critical on Home · open Action Centre for the rest`
    } else {
      summaryHint = 'Open Action Centre to triage'
    }
  }

  if (hostingRestored && criticalCount === 1) {
    pageSubtitle = 'Hosting restored · websites first again'
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Hello, Harry!</h1>
          <p className={styles.subtitle}>{pageSubtitle}</p>
        </div>
      </header>

      <Link to="/actions" className={styles.summary}>
        <div>
          <p className={styles.summaryTitle}>{summaryTitle}</p>
          <p className={styles.summaryHint}>{summaryHint}</p>
        </div>
        <span className={styles.summaryCta}>Open Actions →</span>
      </Link>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your websites</h2>
        <div className={styles.siteGrid}>
          <article className={styles.siteCard}>
            <div className={styles.siteIcon}>
              <img
                className={styles.siteEllipse}
                src="/icons/site-ellipse.svg"
                alt=""
                width={64}
                height={64}
              />
              <img
                className={styles.siteGlyph}
                src="/icons/site-globe.svg"
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className={styles.siteName}>rocketman.xyz</h3>
              <p className={styles.siteStatus}>{rocketStatus}</p>
            </div>
          </article>

          <article className={styles.siteCard}>
            <div className={styles.siteIcon}>
              <img
                className={styles.siteEllipse}
                src="/icons/site-ellipse.svg"
                alt=""
                width={64}
                height={64}
              />
              <img
                className={styles.siteGlyph}
                src="/icons/site-globe.svg"
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div>
              <h3 className={styles.siteName}>studio-bloom.com</h3>
              <p className={styles.siteStatus}>{studioStatus}</p>
            </div>
          </article>
        </div>
      </section>

      {criticalCount > 0 ? (
        <section className={styles.section}>
          <div className={styles.attentionHead}>
            <h2 className={styles.sectionTitle}>Needs attention</h2>
            <span className={styles.attentionCount}>{criticalCount}</span>
          </div>
          <div className={styles.strips}>
            {criticalHomeActions.map((action) => (
              <PriorityStrip key={action.id} action={action} />
            ))}
          </div>
          {moreCount > 0 ? (
            <Link to="/actions" className={styles.seeAll}>
              View {moreCount} more in Actions →
            </Link>
          ) : null}
        </section>
      ) : null}

      {/* keep activeActions referenced for future empty-state variants */}
      <span className={styles.srOnly}>{activeActions.length} open total</span>
    </div>
  )
}
