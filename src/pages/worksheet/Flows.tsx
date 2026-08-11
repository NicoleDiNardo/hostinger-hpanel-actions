import { Link } from 'react-router-dom'
import styles from '../Worksheet.module.css'

export function WorksheetFlows() {
  return (
    <article className={styles.board}>
      <p className={styles.kicker}>03 · Flows</p>
      <h1>Core journeys</h1>
      <p className={styles.deck}>
        Three paths prove the system: clear Criticals, handle Access without
        interrupting Home, and use triage tools (snooze / filters / site focus).
      </p>

      <div className={styles.flowGrid}>
        <section className={styles.flowCard}>
          <h2>A · Clear Criticals</h2>
          <ol>
            <li>Home After — sites first + P0 Criticals</li>
            <li>Open Action Centre (All open)</li>
            <li>Restore hosting → toast on Home</li>
            <li>Action Centre updates (hosting row gone)</li>
            <li>Clear remaining → Empty Home + Empty AC</li>
          </ol>
        </section>
        <section className={styles.flowCard}>
          <h2>B · Access (P3)</h2>
          <ol>
            <li>Home shows no Critical strip (Access counted in badge only)</li>
            <li>Open Actions → Access filter</li>
            <li>Grant / Reject</li>
            <li>Empty Action Centre</li>
          </ol>
        </section>
        <section className={styles.flowCard}>
          <h2>C · Triage tools</h2>
          <ol>
            <li>Snooze an item (out of Open actions)</li>
            <li>Filter Offers (never on Home / badge)</li>
            <li>Focus one site (studio-bloom.com)</li>
            <li>Badge stays global open count</li>
          </ol>
        </section>
      </div>

      <section className={styles.card}>
        <h2>Try it in the prototype</h2>
        <p>
          Open the <strong>Design worksheet</strong> tab on the right for journey presets:{' '}
          <strong>A</strong> full Home, <strong>B</strong> Access-only, <strong>C</strong>{' '}
          after snooze. From C, try{' '}
          <Link to="/actions?filter=offers">Offers filter</Link> or{' '}
          <Link to="/actions?site=studio-bloom.com">studio-bloom site focus</Link>.
        </p>
      </section>

      <p className={styles.next}>
        <Link to="/worksheet/model">← Model</Link>
        <Link to="/worksheet/ui">04 UI →</Link>
      </p>
    </article>
  )
}
