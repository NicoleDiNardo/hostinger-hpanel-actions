import { Link } from 'react-router-dom'
import styles from '../Worksheet.module.css'

export function WorksheetUI() {
  return (
    <article className={styles.board}>
      <p className={styles.kicker}>04 · UI</p>
      <h1>Before → after</h1>
      <p className={styles.deck}>
        Visual language follows the Hostinger stepping-stone frame: DM Sans, purple
        primary <code>#673DE6</code>, severity pink / yellow / blue.
      </p>

      <div className={styles.compare}>
        <section className={styles.comparePane}>
          <h2>Before</h2>
          <ul>
            <li>Greeting then five equal-weight to-do cards</li>
            <li>Websites pushed below the fold</li>
            <li>“Show less” still keeps the system always-on</li>
            <li>Offers and restore share the same visual hierarchy</li>
          </ul>
          <div className={styles.mockBefore}>
            <div className={styles.mockLine} />
            <div className={styles.mockCard} />
            <div className={styles.mockCard} />
            <div className={styles.mockCard} />
            <div className={styles.mockCard} />
            <div className={styles.mockCard} />
            <p className={styles.mockCaption}>Home = to-do wall</p>
          </div>
        </section>
        <section className={styles.comparePane}>
          <h2>After</h2>
          <ul>
            <li>Greeting + Actions summary entry</li>
            <li>All Critical actions listed on Home</li>
            <li>Websites reclaim the fold</li>
            <li>Full triage lives in Action Centre</li>
          </ul>
          <div className={styles.mockAfter}>
            <div className={styles.mockLine} />
            <div className={styles.mockStrip} />
            <div className={styles.mockSites}>
              <span />
              <span />
              <span />
            </div>
            <p className={styles.mockCaption}>Home = products + all Criticals</p>
          </div>
        </section>
      </div>

      <div className={styles.grid3}>
        <section className={styles.card}>
          <h2>Home</h2>
          <p>
            Prototype: <Link to="/">live Home</Link> with PriorityStrip, Actions chip,
            website cards, and “Recommended next”.
          </p>
        </section>
        <section className={styles.card}>
          <h2>Action Centre</h2>
          <p>
            Prototype: <Link to="/actions">live Actions</Link> with filters, site select,
            grouped rows, dismiss / snooze.
          </p>
        </section>
        <section className={styles.card}>
          <h2>States covered</h2>
          <p>Mixed severities, multi-site grouping, empty/all-clear, toast feedback.</p>
        </section>
      </div>

      <p className={styles.next}>
        <Link to="/worksheet/flows">← Flows</Link>
        <Link to="/worksheet/rationale">05 Rationale →</Link>
      </p>
    </article>
  )
}
