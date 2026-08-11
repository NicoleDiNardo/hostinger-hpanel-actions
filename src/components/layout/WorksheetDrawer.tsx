import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './WorksheetDrawer.module.css'

const WORKSHEET = [
  { to: '/worksheet', label: '01 Framing', end: true },
  { to: '/worksheet/model', label: '02 Priority model' },
  { to: '/worksheet/flows', label: '03 Flows' },
  { to: '/worksheet/ui', label: '04 UI' },
  { to: '/worksheet/rationale', label: '05 Rationale' },
]

export function WorksheetDrawer() {
  const location = useLocation()
  const onWorksheet = location.pathname.startsWith('/worksheet')
  const [open, setOpen] = useState(onWorksheet)

  useEffect(() => {
    if (onWorksheet) setOpen(true)
  }, [onWorksheet])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={`${styles.wrap} ${open ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.tab}
        aria-expanded={open}
        aria-controls="worksheet-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.tabLabel}>Design worksheet</span>
        <img
          className={styles.tabChevron}
          src="/icons/nav-chevron.svg"
          alt=""
          width={16}
          height={16}
        />
      </button>

      {open ? (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close worksheet drawer"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="worksheet-drawer"
        className={styles.panel}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className={styles.panelHead}>
          <div>
            <p className={styles.kicker}>Design worksheet</p>
            <h2 className={styles.title}>Take-home boards</h2>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Collapse worksheet"
            onClick={() => setOpen(false)}
          >
            <img src="/icons/cross.svg" alt="" width={16} height={16} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Design worksheet">
          {WORKSHEET.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className={styles.hint}>
          Prototype chrome only — not part of the hPanel solution UI.
        </p>
      </aside>
    </div>
  )
}
