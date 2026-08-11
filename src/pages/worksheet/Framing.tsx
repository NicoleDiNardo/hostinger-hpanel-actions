import { Link } from 'react-router-dom'
import styles from '../Worksheet.module.css'

export function WorksheetFraming() {
  return (
    <article className={styles.board}>
      <p className={styles.kicker}>01 · Framing</p>
      <h1>hPanel Actions</h1>
      <p className={styles.deck}>
        Replace the always-on to-do wall with a priority-aware Action Centre so Home
        can serve websites again — and only true blockers interrupt.
      </p>

      <div className={styles.grid3}>
        <section className={styles.card}>
          <h2>Problem</h2>
          <ul>
            <li>Renewals, setup, and account requests share one undifferentiated list</li>
            <li>Users scroll past; CTA conversion stays low</li>
            <li>Key home content is buried below the fold</li>
            <li>Everything feels urgent → nothing feels urgent</li>
            <li>Product growth makes the list unscalable</li>
          </ul>
        </section>
        <section className={styles.card}>
          <h2>Goals</h2>
          <ul>
            <li>Reclaim Home fold for products &amp; sites</li>
            <li>Earn urgency with a clear severity model</li>
            <li>Improve focus on the highest-value CTAs</li>
            <li>Scale across many products &amp; multi-site users</li>
            <li>Stay usable for non-technical customers</li>
          </ul>
        </section>
        <section className={styles.card}>
          <h2>Non-goals</h2>
          <ul>
            <li>Pixel-perfect coverage of all 53 nudge types</li>
            <li>A passive “notification inbox” metaphor</li>
            <li>Marketing offers competing with billing blockers</li>
            <li>Solving every edge case in 4–6 hours</li>
          </ul>
        </section>
      </div>

      <section className={styles.card}>
        <h2>Principles</h2>
        <ol className={styles.principles}>
          <li>
            <strong>Urgency is earned</strong> — Critical actions list on Home
            (Task never capped Home to one item).
          </li>
          <li>
            <strong>Home is for products</strong> — Actions collapse to a summary entry + topbar badge.
          </li>
          <li>
            <strong>One primary next step</strong> — recommend, don’t dump.
          </li>
          <li>
            <strong>Triage over dump</strong> — filter by severity and site in Action Centre.
          </li>
          <li>
            <strong>User control</strong> — dismiss and snooze so the system doesn’t become another wall.
          </li>
        </ol>
      </section>

      <p className={styles.next}>
        Next: <Link to="/worksheet/model">02 Priority model →</Link>
      </p>
    </article>
  )
}
