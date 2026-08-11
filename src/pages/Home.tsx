import { Link } from 'react-router-dom'
import { useActions } from '../context/ActionsContext'
import { PriorityStrip } from '../components/actions/PriorityStrip'
import styles from './Home.module.css'

function siteChipStatus(
  site: string,
  criticalHomeActions: ReturnType<typeof useActions>['criticalHomeActions'],
  activeActions: ReturnType<typeof useActions>['activeActions'],
) {
  const siteCriticals = criticalHomeActions.filter((a) => a.site === site)
  const siteOpen = activeActions.filter(
    (a) => a.site === site && a.tier !== 'P4',
  ).length

  if (site === 'rocketman.xyz') {
    if (siteCriticals.length >= 2) {
      return '2 Critical actions · hosting cancelled + domain expired'
    }
    if (siteCriticals.length === 1) {
      return 'Domain expired · renew needed'
    }
  } else if (siteCriticals.length > 0) {
    return siteCriticals.length === 1
      ? '1 Critical · open Actions'
      : `${siteCriticals.length} Critical · open Actions`
  }

  if (siteOpen > 0) {
    return siteOpen === 1
      ? 'No Criticals · 1 open in Actions'
      : `No Criticals · ${siteOpen} open in Actions`
  }

  return 'All clear · no open actions'
}

export function Home() {
  const { criticalHomeActions, badgeCount, activeActions, actions } =
    useActions()
  const criticalCount = criticalHomeActions.length
  const moreCount = Math.max(0, badgeCount - criticalCount)
  const hostingRestored = actions.some(
    (a) =>
      a.nudgeType === 'hosting_plan_cancelled' && a.status === 'dismissed',
  )
  const accessOnly =
    badgeCount > 0 &&
    criticalCount === 0 &&
    activeActions.some((a) => a.tier === 'P3')

  const rocketStatus = siteChipStatus(
    'rocketman.xyz',
    criticalHomeActions,
    activeActions,
  )
  const studioStatus = siteChipStatus(
    'studio-bloom.com',
    criticalHomeActions,
    activeActions,
  )

  let summaryTitle = 'Actions · all clear'
  let summaryHint = 'Nothing needs you right now'
  let pageSubtitle = 'All clear · your websites, nothing interrupting'

  if (badgeCount > 0) {
    summaryTitle = `Actions · ${badgeCount} open`
    if (criticalCount > 0) {
      pageSubtitle = 'Your websites first · Critical actions list on Home'
      summaryHint =
        criticalCount === 1 && hostingRestored
          ? '1 critical remaining on Home · domain expired'
          : criticalCount === 1
            ? '1 Critical on Home · open Action Centre for the rest'
            : `${criticalCount} Critical on Home · open Action Centre for the rest`
    } else if (accessOnly) {
      pageSubtitle = 'No Critical actions on Home · access waiting in Actions'
      summaryHint = 'Access request waiting · open Actions to grant or reject'
    } else {
      pageSubtitle = 'No Critical actions on Home · triage in Actions'
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
