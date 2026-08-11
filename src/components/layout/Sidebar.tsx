import { NavLink } from 'react-router-dom'
import { useActions } from '../../context/ActionsContext'
import styles from './Sidebar.module.css'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/websites', label: 'Websites', disabled: true },
  { to: '/domains', label: 'Domains', disabled: true },
  { to: '/horizons', label: 'Horizons', disabled: true },
  { to: '/emails', label: 'Emails', disabled: true },
  { to: '/actions', label: 'Actions' },
  { to: '/reach', label: 'Reach', disabled: true },
  { to: '/vps', label: 'VPS', disabled: true },
  { to: '/dark-web', label: 'Dark web monitoring', disabled: true },
  { to: '/billing', label: 'Billing', disabled: true },
  { to: '/marketplace', label: 'Marketplace', disabled: true },
]

const WORKSHEET = [
  { to: '/worksheet', label: '01 Framing', end: true },
  { to: '/worksheet/model', label: '02 Priority model' },
  { to: '/worksheet/flows', label: '03 Flows' },
  { to: '/worksheet/ui', label: '04 UI' },
  { to: '/worksheet/rationale', label: '05 Rationale' },
]

interface Props {
  open?: boolean
  onClose?: () => void
  hidden?: boolean
}

export function Sidebar({ open = false, onClose, hidden = false }: Props) {
  const { badgeCount, resetDemo } = useActions()

  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : ''}`}
      id="app-sidebar"
      aria-hidden={hidden}
      inert={hidden ? true : undefined}
    >
      <div className={styles.mobileHeader}>
        <p className={styles.mobileTitle}>Menu</p>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close menu"
          onClick={onClose}
        >
          <img src="/icons/cross.svg" alt="" width={16} height={16} />
        </button>
      </div>

      <nav className={styles.nav} aria-label="Main">
        {NAV.map((item) =>
          item.disabled ? (
            <span key={item.label} className={styles.navDisabled}>
              {item.label}
            </span>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={onClose}
            >
              <span>{item.label}</span>
              {item.to === '/actions' && badgeCount > 0 ? (
                <span className={styles.badge}>{badgeCount}</span>
              ) : null}
            </NavLink>
          ),
        )}
      </nav>

      <div className={styles.footer}>
        <span className={styles.navDisabled}>Account sharing</span>
        <button
          type="button"
          className={styles.resetMobile}
          onClick={() => {
            resetDemo()
            onClose?.()
          }}
        >
          Reset demo
        </button>
      </div>

      <div className={styles.worksheet}>
        <p className={styles.worksheetLabel}>Design worksheet</p>
        {WORKSHEET.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? `${styles.worksheetLink} ${styles.active}`
                : styles.worksheetLink
            }
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
