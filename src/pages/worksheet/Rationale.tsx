import { Link } from 'react-router-dom'
import styles from '../Worksheet.module.css'

export function WorksheetRationale() {
  return (
    <article className={styles.board}>
      <p className={styles.kicker}>05 · Rationale</p>
      <h1>Why Actions — not a notification centre</h1>
      <p className={styles.deck}>
        The brief hypothesizes a notification centre. We kept a dedicated centre, but
        rejected the inbox metaphor because most items are tasks with outcomes.
      </p>

      <div className={styles.grid2}>
        <section className={styles.card}>
          <h2>Tradeoffs</h2>
          <ul>
            <li>
              <strong>Page over drawer</strong> — multi-site triage needs room; a drawer
              would recreate a cramped list.
            </li>
            <li>
              <strong>“Actions” over “Notifications”</strong> — language matches renew /
              restore / grant, not “mark as read”.
            </li>
            <li>
              <strong>All Criticals on Home</strong> — no artificial 1-item cap; every P0
              lists on Home, everything else earns a visit to the centre.
            </li>
            <li>
              <strong>Offers quarantined</strong> — never on Home, never in Critical filter.
            </li>
          </ul>
        </section>
        <section className={styles.card}>
          <h2>What we cut</h2>
          <ul>
            <li>Mobile-first layouts (desktop proof first)</li>
            <li>Per-nudge bespoke layouts for all 53 types</li>
            <li>Real billing / auth integrations</li>
            <li>Complex preference settings for digests</li>
          </ul>
        </section>
      </div>

      <section className={styles.card}>
        <h2>AI in the process</h2>
        <p>
          Used AI to accelerate structure, priority mapping, and prototype scaffolding.
          Decisions that remain mine to defend in interview: naming (“Actions”), listing
          all Criticals on Home (no 1-item cap), multi-site grouping, and excluding
          offers from Home — because those directly address the brief’s conversion and
          fold problems.
        </p>
      </section>

      <section className={styles.card}>
        <h2>Figma handoff note</h2>
        <p>
          Duplicate the Hostinger task file as your worksheet. Mirror these five boards
          (<code>01–05</code>) beside the original brief, then paste screenshots from the
          live prototype for hi-fi UI. See <code>FIGMA_WORKSHEET.md</code> in the repo for
          copy-ready text.
        </p>
      </section>

      <p className={styles.next}>
        <Link to="/worksheet/ui">← UI</Link>
        <Link to="/">Open prototype Home →</Link>
      </p>
    </article>
  )
}
