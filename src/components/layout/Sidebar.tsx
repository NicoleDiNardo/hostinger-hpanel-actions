import { NavLink } from 'react-router-dom'
import { useActions } from '../../context/ActionsContext'
import styles from './Sidebar.module.css'

type NavItem = {
  to?: string
  label: string
  icon: string
  end?: boolean
  disabled?: boolean
  chevron?: boolean
  badge?: boolean
}

const NAV: NavItem[] = [
  { to: '/', label: 'Home', icon: 'nav-home', end: true },
  { to: '/websites', label: 'Websites', icon: 'nav-websites', disabled: true, chevron: true },
  { to: '/domains', label: 'Domains', icon: 'nav-domains', disabled: true, chevron: true },
  { to: '/horizons', label: 'Horizons', icon: 'nav-horizons', disabled: true },
  { to: '/emails', label: 'Emails', icon: 'nav-emails', disabled: true },
  { to: '/actions', label: 'Actions', icon: 'nav-actions', badge: true },
  { to: '/reach', label: 'Reach', icon: 'nav-reach', disabled: true },
  { to: '/vps', label: 'VPS', icon: 'nav-vps', disabled: true },
  {
    to: '/dark-web',
    label: 'Dark web monitoring',
    icon: 'nav-dark-web',
    disabled: true,
  },
  { to: '/billing', label: 'Billing', icon: 'nav-billing', disabled: true, chevron: true },
  {
    to: '/marketplace',
    label: 'Marketplace',
    icon: 'nav-marketplace',
    disabled: true,
    chevron: true,
  },
]

function NavIcon({ name, chevron = false }: { name: string; chevron?: boolean }) {
  return (
    <img
      className={chevron ? styles.navChevron : styles.navIcon}
      src={`/icons/${name}.svg`}
      alt=""
      width={chevron ? 16 : 24}
      height={chevron ? 16 : 24}
      aria-hidden
    />
  )
}

function NavRowContent({
  item,
  badgeCount,
}: {
  item: NavItem
  badgeCount: number
}) {
  return (
    <>
      <span className={styles.navStart}>
        <NavIcon name={item.icon} />
        <span className={styles.navLabel}>{item.label}</span>
      </span>
      <span className={styles.navEnd}>
        {item.badge && badgeCount > 0 ? (
          <span className={styles.badge}>{badgeCount}</span>
        ) : null}
        {item.chevron ? <NavIcon name="nav-chevron" chevron /> : null}
      </span>
    </>
  )
}

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
          item.disabled || !item.to ? (
            <span key={item.label} className={styles.navDisabled}>
              <NavRowContent item={item} badgeCount={badgeCount} />
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
              <NavRowContent item={item} badgeCount={badgeCount} />
            </NavLink>
          ),
        )}
      </nav>

      <div className={styles.footer}>
        <span className={styles.navDisabled}>
          <NavRowContent
            item={{
              label: 'Account sharing',
              icon: 'nav-account-sharing',
            }}
            badgeCount={0}
          />
        </span>
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
    </aside>
  )
}
